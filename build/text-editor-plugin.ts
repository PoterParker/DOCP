import type { Plugin } from "vite";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

export function textEditor(): Plugin {
  return {
    name: "local-portfolio-text-editor",
    apply: "serve",
    config: () => ({ server: { watch: { ignored: ["**/resources/text-edits.json", "**/resources/text-edits.json.tmp"] } } }),
    configureServer(server) {
      const file = resolve(server.config.root, "public/resources/text-edits.json");
      server.middlewares.use("/__portfolio_text", async (req, res) => {
        res.setHeader("Content-Type", "application/json; charset=utf-8");
        res.setHeader("Cache-Control", "no-store");
        const reply = (status: number, body: unknown) => { res.statusCode = status; res.end(JSON.stringify(body)); };
        const host = req.headers.host || "";
        let local = false;
        try { local = ["localhost", "127.0.0.1", "[::1]"].includes(new URL(`http://${host}`).hostname); } catch { /* Reject invalid hosts. */ }
        try { if (req.headers.origin && new URL(req.headers.origin).host !== host) local = false; } catch { local = false; }
        if (!local) return reply(403, { error: "仅支持在本地保存" });
        try {
          if (req.method === "GET") return reply(200, { available: true });
          if (req.method !== "POST") return reply(405, { error: "不支持此请求" });
          if (!req.headers["content-type"]?.startsWith("application/json")) return reply(415, { error: "需要 JSON 文本数据" });
          let raw = "";
          for await (const chunk of req) { raw += chunk.toString(); if (Buffer.byteLength(raw) > 1024 * 1024) return reply(413, { error: "文本过大" }); }
          const value = JSON.parse(raw);
          if (value.version !== 1 || !value.texts || Array.isArray(value.texts) || typeof value.texts !== "object") return reply(400, { error: "文本格式错误" });
          for (const [key, runs] of Object.entries(value.texts)) {
            if (["__proto__", "constructor", "prototype"].includes(key) || !/^[\w.:/-]{1,200}$/.test(key) || !Array.isArray(runs) || runs.length > 1000 || runs.some(run => !run || typeof run.text !== "string" || run.text.length > 20000 || (run.color !== undefined && !/^#[\da-f]{6}$/i.test(run.color)))) return reply(400, { error: "文字或颜色格式错误" });
          }
          const serialized = JSON.stringify({ version: 1, texts: value.texts }, null, 2) + "\n";
          await mkdir(resolve(server.config.root, ".codex_tmp"), { recursive: true });
          await writeFile(resolve(server.config.root, ".codex_tmp/text-edits-backup.json"), await readFile(file, "utf8"));
          await writeFile(`${file}.tmp`, serialized, "utf8");
          await rename(`${file}.tmp`, file);
          reply(200, { saved: true });
        } catch { reply(500, { error: "保存失败，请重试" }); }
      });
    },
  };
}
