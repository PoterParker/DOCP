import { cp, mkdir, rm } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const sourceRoot = join(projectRoot, "public", "resources", "运营活动");
const outputRoot = join(projectRoot, "dist", "client", "resources", "运营活动");

const assetGroups = [
  ["推币机", "图片"],
  ["推币机", "文档"],
  ["钓鱼游戏", "图片"],
  ["钓鱼游戏", "文档"],
  ["钓鱼游戏", "视频"],
  ["组队竞赛活动", "图片"],
  ["组队竞赛活动", "文档"],
];

const assetFiles = [
  ["推币机", "视频", "推币机-网页.mp4"],
  ["组队竞赛活动", "视频", "组队竞赛活动-网页.mp4"],
];

const profileFiles = ["yangxiao-portrait-cutout.png"];
const standaloneGroups = ["英雄视频系统"];

await rm(join(projectRoot, "dist", "client", "resources"), {
  recursive: true,
  force: true,
});

for (const [project, group] of assetGroups) {
  const source = join(sourceRoot, project, group);
  const destination = join(outputRoot, project, group);
  await mkdir(dirname(destination), { recursive: true });
  await cp(source, destination, { recursive: true });
}

for (const [project, group, file] of assetFiles) {
  const source = join(sourceRoot, project, group, file);
  const destination = join(outputRoot, project, group, file);
  await mkdir(dirname(destination), { recursive: true });
  await cp(source, destination);
}

for (const file of profileFiles) {
  const source = join(projectRoot, "public", "resources", "profile", file);
  const destination = join(projectRoot, "dist", "client", "resources", "profile", file);
  await mkdir(dirname(destination), { recursive: true });
  await cp(source, destination);
}

for (const group of standaloneGroups) {
  const source = join(projectRoot, "public", "resources", group);
  const destination = join(projectRoot, "dist", "client", "resources", group);
  await mkdir(dirname(destination), { recursive: true });
  await cp(source, destination, { recursive: true });
}

console.log(`Copied ${assetGroups.length} asset groups, ${assetFiles.length} web videos, ${standaloneGroups.length} standalone group, and ${profileFiles.length} profile image.`);
