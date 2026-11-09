"use client";

import { useRef, useState } from "react";
import type { PointerEvent, KeyboardEvent } from "react";
import styles from "./xray-prototype.module.css";

const root = "/resources/系统玩法/检疫玩法/原型/official";
const tools = [
  { id: "wash", title: "冲泥", actor: "wash-clean", tool: "Shower", result: "清洗完毕", note: "泥土逐渐清除" },
  { id: "xray", title: "透视仪", actor: "npc-dressed", tool: "Instrument2", result: "发现感染迹象", note: "显露衣物下的伤口" },
  { id: "thermo", title: "温度计", actor: "thermo-person", tool: "Instrument1", result: "体征读取完成", note: "显示脉搏与体温" },
];
const initialPosition = { x: 45, y: 62 };
const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

export default function XrayPrototype() {
  const [held, setHeld] = useState(false);
  const [progress, setProgress] = useState(0);
  const [position, setPosition] = useState(initialPosition);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const padRef = useRef<HTMLDivElement>(null);
  const tracking = useRef<{ id: number; x: number; y: number; lastX: number; lastY: number } | null>(null);
  const travel = useRef(0);
  const resetIntent = useRef(false);
  const done = progress >= 1;
  const phase = done ? 2 : progress > 0 ? 1 : 0;

  const applyMovement = (dx: number, dy: number, distance: number) => {
    travel.current += distance;
    const next = Math.min(1, travel.current / 240);
    setProgress(next);
    setPosition(next === 1 ? { x: 76, y: 42 } : { x: clamp(45 + dx * .4, 25, 76), y: clamp(62 + dy * .4, 27, 70) });
    const maxX = Math.max(0, (padRef.current?.clientWidth ?? 480) / 2 - 57);
    const maxY = Math.max(0, (padRef.current?.clientHeight ?? 156) / 2 - 64);
    setOffset({ x: clamp(dx, -maxX, maxX), y: clamp(dy, -maxY, maxY) });
  };
  const start = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.button !== 0) return;
    resetIntent.current = done;
    if (done) return;
    event.preventDefault();
    tracking.current = { id: event.pointerId, x: event.clientX, y: event.clientY, lastX: event.clientX, lastY: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
    setHeld(true);
  };
  const move = (event: PointerEvent<HTMLButtonElement>) => {
    const start = tracking.current;
    if (!start || start.id !== event.pointerId || done) return;
    const distance = Math.hypot(event.clientX - start.lastX, event.clientY - start.lastY);
    start.lastX = event.clientX; start.lastY = event.clientY;
    applyMovement(event.clientX - start.x, event.clientY - start.y, distance);
  };
  const release = () => { tracking.current = null; setHeld(false); setOffset({ x: 0, y: 0 }); };
  const reset = () => { release(); resetIntent.current = false; travel.current = 0; setProgress(0); setPosition(initialPosition); };
  const keyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Escape") { release(); return; }
    if (event.key === " " || event.key === "Enter") { event.preventDefault(); if (done) reset(); else setHeld(true); return; }
    const arrows: Record<string, [number, number]> = { ArrowLeft: [-15, 0], ArrowRight: [15, 0], ArrowUp: [0, -15], ArrowDown: [0, 15] };
    if (held && !done && arrows[event.key]) {
      event.preventDefault(); const [dx, dy] = arrows[event.key];
      applyMovement(offset.x + dx, offset.y + dy, 25);
    }
  };
  const scanning = held || done;
  return <section className={styles.prototype} aria-label="三种检疫工具同步体验">
    <div className={styles.screens}>
      {tools.map((tool, i) => <article key={tool.id} className={styles.toolPanel} data-tool={tool.id} data-complete={done}>
        <header className={styles.panelHeading}><span>0{i + 1}</span><h6>{tool.title}</h6></header>
        <div className={styles.phone}>
          <img className={styles.scene} src={`${root}/Quarantine_Background.webp`} alt="" draggable={false} />
          <img className={styles.actor} src={`${root}/${tool.actor}.webp`} alt={`${tool.title}检测对象`} draggable={false} />
          {tool.id === "wash" && <img className={styles.actor} src={`${root}/wash-dirty.webp`} alt="" style={{ opacity: 1 - progress }} draggable={false} />}
          {tool.id === "xray" && scanning && <div className={styles.reveal} data-xray-reveal="true" style={{ clipPath: `circle(21% at ${position.x}% ${position.y}%)` }}>
            <img className={styles.scene} src={`${root}/Quarantine_Background.webp`} alt="" />
            <img className={styles.actor} src={`${root}/npc-underlayer.webp`} alt="扫描圈内显露皮肤与感染伤口" />
          </div>}
          <div className={styles.sceneShade} />
          {tool.id === "xray" && scanning && <img className={styles.aim} style={{ left: `${position.x}%`, top: `${position.y}%` }} src={`${root}/Quarantine_icon_Aim${done ? "Red" : "Blue"}.webp`} alt="" />}
          {tool.id === "thermo" && progress > 0 && <div className={styles.vitals} style={{ opacity: Math.min(1, progress * 3) }}>
            <div><small>脉搏</small><strong>{Math.round(80 + progress * 49)}</strong><span>{done ? "异常" : "读取中"}</span></div>
            <div><small>体温</small><strong>{(36.5 + progress * 6.3).toFixed(1)}<em>°C</em></strong><span>{done ? "已感染" : "读取中"}</span></div>
          </div>}
          {tool.id === "wash" ? <div className={styles.washRig} style={{ left: `${held ? position.x : 59}%`, top: `${held ? position.y : 74}%` }}>
            {held && !done && <img className={styles.water} src={`${root}/washwater_nobg.webp`} alt="冲洗水流" draggable={false} />}
            <img className={styles.washGun} src={`${root}/Quarantine_icon_Shower${held ? "_LiftUp" : ""}.webp`} alt="" draggable={false} />
          </div> : <img className={`${styles.device} ${held ? styles.raised : ""}`} style={{ left: `${held ? position.x : 59}%`, top: `${held ? position.y : 74}%` }} src={`${root}/Quarantine_icon_${tool.tool}${held ? "_LiftUp" : ""}.webp`} alt="" draggable={false} />}
          <div className={`${styles.feedback} ${done && tool.id !== "wash" ? styles.danger : ""}`} aria-live="polite">
            <b>{done ? tool.result : held ? tool.note : "等待操作"}</b><div><i style={{ width: `${progress * 100}%` }} /></div>
          </div>
        </div>
      </article>)}
    </div>
    <div className={styles.controls}>
      <div className={styles.pad} ref={padRef}>
        <span className={styles.padArrow}>↔</span>
        <button className={`${styles.handle} ${held ? styles.pressed : ""}`} type="button" onPointerDown={start} onPointerMove={move} onPointerUp={release} onPointerCancel={release} onLostPointerCapture={release} onKeyDown={keyDown} onKeyUp={event => { if (event.key === " " || event.key === "Enter") event.preventDefault(); }} onClick={event => { if (done && (resetIntent.current || event.detail === 0)) reset(); }} onBlur={release} aria-label={done ? "重新体验三种检疫工具" : "按住并拖动，同时操作三种检疫工具"} aria-pressed={held} data-idle={!held && progress === 0} data-complete={done} style={{ transform: `translate(${offset.x}px,${offset.y}px)` }}><span>{done ? "✓" : "✥"}</span><b>{done ? "完成" : "按住拖动"}</b></button>
      <div className={styles.guide}>
        <ol>{["按住", "拖动", "反馈"].map((step, i) => <li key={step} className={phase === i ? styles.current : ""}><span>0{i + 1}</span>{step}{i < 2 && <i>→</i>}</li>)}</ol>
      </div>
      </div>
    </div>
  </section>;
}
