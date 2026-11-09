import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import test from 'node:test';

async function render(){
 const url=new URL('../dist/server/index.js',import.meta.url);url.searchParams.set('test',`${process.pid}-${Date.now()}`);
 const {default:worker}=await import(url.href);
 return worker.fetch(new Request('http://localhost/',{headers:{accept:'text/html'}}),{ASSETS:{fetch:async()=>new Response('Not found',{status:404})}},{waitUntil(){},passThroughOnException(){}});
}

test('server-renders the current six-case portfolio and contact information',async()=>{
 const response=await render();assert.equal(response.status,200);assert.match(response.headers.get('content-type')??'',/^text\/html\b/i);
 const html=await response.text();
 assert.match(html,/<title>Shawnappy 杨潇｜游戏交互设计作品集<\/title>/);
 const ids=[...html.matchAll(/<article id="project-([^"]+)"/g)].map(m=>m[1]);
 assert.deepEqual(ids,['coin-pusher','fishing-game','team-competition','quarantine-gameplay','gem-workshop','extraction-gameplay']);
 for(const text of ['Shawnappy','杨潇','Tap4Fun','猿族时代','腾讯互娱','网易互娱','15700675264','shawnappi6@foxmail.com']) assert.ok(html.includes(text),`Missing ${text}`);
 assert.doesNotMatch(html,/id="about"|href="#about"/);
 assert.doesNotMatch(html,/data-text-editor="true"/);
 assert.match(html,/回到顶部/);
});

test('retains social metadata and public deployment scripts',async()=>{
 const [layout,pkg]=await Promise.all([readFile(new URL('../app/layout.tsx',import.meta.url),'utf8'),readFile(new URL('../package.json',import.meta.url),'utf8')]);
 assert.match(layout,/openGraph:/);assert.match(layout,/description:/);
 assert.ok(JSON.parse(pkg).scripts['build:pages'].includes('build-github-pages.mjs'));
 const edits=JSON.parse(await readFile(new URL('../dist/client/resources/text-edits.json',import.meta.url),'utf8'));
 assert.equal(edits.version,1);assert.equal(typeof edits.texts,'object');
});
