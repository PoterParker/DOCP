"use client";

import { createContext, createElement, isValidElement, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import styles from "./text-editor.module.css";

type Run = { text: string; color?: string };
type Texts = Record<string, Run[]>;
const Context = createContext({ editing: false, revision: 0, get: (_id: string): Run[] | undefined => undefined, update: (_id: string, _runs: Run[]) => {} });
const escape = (text: string) => text.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
function markup(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return escape(String(node));
  if (Array.isArray(node)) return node.map(markup).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) {
    const tag = typeof node.type === "string" && ["mark", "em", "strong", "b", "i", "br", "span"].includes(node.type) ? node.type : "span";
    return tag === "br" ? "<br>" : `<${tag}>${markup(node.props.children)}</${tag}>`;
  }
  return "";
}
function hex(color: string) {
  if (/^#[\da-f]{6}$/i.test(color)) return color;
  const values = color.match(/^rgba?\((\d+)[, ]+(\d+)[, ]+(\d+)/);
  return values ? "#" + values.slice(1, 4).map(n => Number(n).toString(16).padStart(2, "0")).join("") : undefined;
}
function readRuns(element: HTMLElement): Run[] {
  const runs: Run[] = [];
  const walk = (node: Node, color?: string) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent || "";
      if (!text) return;
      const previous = runs[runs.length - 1];
      if (previous && previous.color === color) previous.text += text;
      else runs.push({ text, ...(color ? { color } : {}) });
    } else if (node instanceof HTMLElement) {
      if (node.tagName === "BR") { runs.push({ text: "\n" }); return; }
      const nextColor = node !== element && (node.style.color || node.tagName === "MARK") ? hex(getComputedStyle(node).color) : color;
      if ((node.tagName === "DIV" || node.tagName === "P") && runs.length) runs.push({ text: "\n" });
      node.childNodes.forEach(child => walk(child, nextColor));
    }
  };
  walk(element);
  return runs.length ? runs : [{ text: "" }];
}

export function EditableText({ id, children }: { id: string; children: ReactNode }) {
  const context = useContext(Context);
  const defaults = markup(children);
  const html = useMemo(() => {
    const runs = context.get(id);
    return runs ? runs.map(run => run.color ? `<span style="color:${run.color}">${escape(run.text)}</span>` : escape(run.text)).join("") : defaults;
  }, [id, context.revision, context.get, defaults]);
  const innerHTML = useMemo(() => ({ __html: html }), [html]);
  const ref = useRef<HTMLElement>(null);
  return createElement("editable-copy", {
    key: id, ref, "data-text-key": id, contentEditable: context.editing, suppressContentEditableWarning: true,
    spellCheck: false, role: context.editing ? "textbox" : undefined, tabIndex: context.editing ? 0 : undefined,
    "aria-label": context.editing ? "编辑文字" : undefined, dangerouslySetInnerHTML: innerHTML,
    onClick: (event: React.MouseEvent<HTMLElement>) => { if (context.editing) { event.stopPropagation(); if (event.currentTarget.closest("a")) event.preventDefault(); } },
    onKeyDown: (event: React.KeyboardEvent) => { if (context.editing) event.stopPropagation(); },
    onInput: () => { if (ref.current) context.update(id, readRuns(ref.current)); },
    onPaste: (event: React.ClipboardEvent) => {
      if (!context.editing) return;
      event.preventDefault();
      const selection = window.getSelection();
      if (!selection?.rangeCount || !ref.current) return;
      const range = selection.getRangeAt(0);
      range.deleteContents(); const text = document.createTextNode(event.clipboardData.getData("text/plain"));
      range.insertNode(text); range.setStartAfter(text); range.collapse(true); selection.removeAllRanges(); selection.addRange(range);
      context.update(id, readRuns(ref.current));
    },
  });
}

export function TextEditorProvider({ children }: { children: ReactNode }) {
  const [available, setAvailable] = useState(false);
  const [editing, setEditing] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [revision, setRevision] = useState(0);
  const [status, setStatus] = useState("");
  const values = useRef<Texts>({});
  const selected = useRef<{ range: Range; element: HTMLElement } | null>(null);
  const get = useCallback((id: string) => values.current[id], []);
  const update = useCallback((id: string, runs: Run[]) => { values.current[id] = runs; setDirty(true); setStatus(""); }, []);
  useEffect(() => {
    let mounted = true;
    Promise.all([
      fetch("/resources/text-edits.json", { cache: "no-store" }).then(r => { if (!r.ok) throw Error(); return r.json(); }),
      ["localhost", "127.0.0.1", "[::1]"].includes(location.hostname) ? fetch("/__portfolio_text").then(r => r.ok).catch(() => false) : Promise.resolve(false),
    ]).then(([data, local]) => {
      if (!mounted) return;
      const valid: Texts = {};
      if (data.version === 1 && data.texts && typeof data.texts === "object") for (const [key, runs] of Object.entries(data.texts)) {
        if (Array.isArray(runs) && runs.every(run => typeof run?.text === "string" && (run.color === undefined || /^#[\da-f]{6}$/i.test(run.color)))) valid[key] = runs;
      }
      values.current = valid; setRevision(n => n + 1); setAvailable(local);
    }).catch(() => { if (mounted) setStatus("文本配置加载失败，请刷新"); });
    return () => { mounted = false; };
  }, []);
  useEffect(() => {
    const warn = (event: BeforeUnloadEvent) => { if (dirty) { event.preventDefault(); event.returnValue = ""; } };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);
  useEffect(() => {
    if (!editing) return;
    document.body.classList.add("portfolio-text-editing");
    const capture = () => {
      const selection = window.getSelection();
      if (!selection?.rangeCount || selection.isCollapsed) return;
      const range = selection.getRangeAt(0);
      const node = range.commonAncestorContainer;
      const element = (node instanceof Element ? node : node.parentElement)?.closest<HTMLElement>("[data-text-key]");
      if (element?.contains(range.startContainer) && element.contains(range.endContainer)) selected.current = { range: range.cloneRange(), element };
      else selected.current = null;
    };
    document.addEventListener("selectionchange", capture);
    return () => { document.body.classList.remove("portfolio-text-editing"); document.removeEventListener("selectionchange", capture); selected.current = null; };
  }, [editing]);
  const colorSelection = (color?: string) => {
    const target = selected.current;
    if (!target || !target.element.isConnected) { setStatus("先选中要换色的文字"); return; }
    const { range, element } = target;
    const fragment = range.extractContents();
    const nextColor = color || getComputedStyle(element).color;
    fragment.querySelectorAll("*").forEach(node => { if (node instanceof HTMLElement) node.style.color = nextColor; });
    const span = document.createElement("span");
    span.style.color = nextColor;
    span.append(fragment); range.insertNode(span); range.selectNodeContents(span);
    const selection = window.getSelection(); selection?.removeAllRanges(); selection?.addRange(range);
    selected.current = { element, range: range.cloneRange() };
    update(element.dataset.textKey!, readRuns(element));
  };
  const save = async () => {
    setSaving(true); setStatus("");
    try {
      const response = await fetch("/__portfolio_text", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ version: 1, texts: values.current }) });
      if (!response.ok) throw Error((await response.json()).error || "保存失败");
      setDirty(false); setStatus("已保存到项目"); return true;
    } catch (error) { setStatus(error instanceof Error ? error.message : "保存失败，请重试"); return false; }
    finally { setSaving(false); }
  };
  const exit = async () => { if (!dirty || await save()) setEditing(false); };
  return <Context.Provider value={{ editing, revision, get, update }}>
    {children}
    {available && <aside className={styles.editor} data-text-editor="true" aria-label="临时文本编辑器">
      {!editing ? <button className={styles.enter} type="button" onClick={() => { setEditing(true); setStatus(""); }}>✎ 编辑文本</button> : <>
        <div className={styles.state}><b>文本编辑</b><small>{dirty ? "未保存" : "已保存"}</small></div>
        <div className={styles.colors} aria-label="选中文字换色">
          {["#f8f2e7", "#6bd6e6", "#ab92ff", "#ffd66b", "#ff8e72"].map(color => <button type="button" key={color} aria-label={`文字颜色 ${color}`} style={{ background: color }} onMouseDown={event => event.preventDefault()} onClick={() => colorSelection(color)} />)}
          <label className={styles.custom} title="自定义文字颜色">＋<input type="color" aria-label="自定义文字颜色" defaultValue="#6bd6e6" onChange={event => colorSelection(event.target.value)} /></label>
          <button className={styles.clear} type="button" onMouseDown={event => event.preventDefault()} onClick={() => colorSelection()}>清除颜色</button>
        </div>
        <button className={styles.save} type="button" disabled={saving || !dirty} onClick={save}>{saving ? "保存中…" : "保存"}</button>
        <button type="button" disabled={saving} onClick={exit}>退出编辑</button>
        {status && <output className={styles.status} aria-live="polite">{status}</output>}
      </>}
    </aside>}
  </Context.Provider>;
}
