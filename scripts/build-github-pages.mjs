import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { extname, join } from "node:path";
import { fileURLToPath } from "node:url";

const outputDir = new URL("../.github-pages/", import.meta.url);
const outputPath = fileURLToPath(outputDir);
const basePath = "/DOCP";

async function renderHomePage() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("pages", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const response = await worker.fetch(
    new Request("https://poterparker.github.io/", {
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

  if (!response.ok) {
    throw new Error(`Failed to render portfolio HTML: ${response.status}`);
  }

  return response.text();
}

function withPagesBase(content) {
  return content
    .replaceAll("/assets/", `${basePath}/assets/`)
    .replaceAll("/resources/", `${basePath}/resources/`)
    .replaceAll('href="/"', `href="${basePath}/"`);
}

async function rewriteAssetPaths(directory) {
  const { readdir } = await import("node:fs/promises");
  const entries = await readdir(directory, { withFileTypes: true });

  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      await rewriteAssetPaths(path);
      continue;
    }

    if (![".css", ".html", ".js", ".json"].includes(extname(entry.name))) {
      continue;
    }

    const source = await readFile(path, "utf8");
    const rewritten = withPagesBase(source);
    if (rewritten !== source) {
      await writeFile(path, rewritten, "utf8");
    }
  }
}

await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });
await cp(new URL("../dist/client/", import.meta.url), outputDir, { recursive: true });

const html = withPagesBase(await renderHomePage());
await writeFile(new URL("index.html", outputDir), html, "utf8");
await writeFile(new URL("404.html", outputDir), html, "utf8");
await writeFile(new URL(".nojekyll", outputDir), "", "utf8");
await rewriteAssetPaths(outputPath);

console.log(`GitHub Pages output created at ${outputPath}`);
