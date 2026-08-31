import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the portfolio home page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Shawnappy 杨潇｜游戏交互设计作品集<\/title>/i);
  assert.match(html, /Shawnappy/);
  assert.match(html, /推币机/);
  assert.match(html, /钓鱼游戏/);
  assert.match(html, /组队竞赛活动/);
  assert.match(html, /精选作品/);
  assert.match(html, /杨潇/);
  assert.match(html, /Tap4Fun/);
  assert.match(html, /腾讯互娱/);
  assert.match(html, /网易互娱/);
  assert.match(html, /15700675264/);
  assert.match(html, /shawnappi6@foxmail\.com/);
  assert.match(html, /EXPERIENCE/);
  assert.doesNotMatch(html, /个人履历/);
  assert.doesNotMatch(html, /广东财经大学/);
});

test("keeps portfolio content and metadata production-ready", async () => {
  const [page, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.equal((page.match(/id: "/g) ?? []).length, 9);
  assert.equal((page.match(/highlights: \[/g) ?? []).length, 9);
  assert.equal((page.match(/focusStep: \d/g) ?? []).length, 27);
  assert.match(page, /InteractionFlowViz/);
  assert.match(page, /className="focus-context"/);
  assert.match(page, /className={`media-showcase/);
  assert.ok(page.indexOf('className="media-banner"') < page.indexOf('className={`screen-grid'));
  assert.doesNotMatch(page, /className="case-columns"/);
  assert.doesNotMatch(page, /className="detail-intro"/);
  assert.match(page, /has-blueprint/);
  assert.match(page, /aria-modal="true"/);
  assert.match(page, /aria-pressed=/);
  assert.match(page, /className="hero-resume"/);
  assert.match(page, /className="career-current"/);
  assert.match(page, /yangxiao-portrait-cutout\.png/);
  assert.match(layout, /openGraph:/);
  assert.doesNotMatch(page, /联系方式待补充/);
  assert.doesNotMatch(packageJson, /WRANGLER_LOG_PATH=/);
});
