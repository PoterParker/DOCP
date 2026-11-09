import { copyFile, mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const source = "C:/Users/yangxiao/AppData/Local/Temp/codex-clipboard-098add23-5f1e-4843-b120-f0cdd9933ce4.png";
const outputRoot = path.resolve("public/resources/系统玩法/检疫玩法");
const documentRoot = path.join(outputRoot, "交互稿");
const screenRoot = path.join(outputRoot, "图片");
const keyScreenRoot = path.join(outputRoot, "关键界面");
const coverRoot = path.join(outputRoot, "封面");

await mkdir(documentRoot, { recursive: true });
await mkdir(screenRoot, { recursive: true });
await mkdir(keyScreenRoot, { recursive: true });
await mkdir(coverRoot, { recursive: true });
await copyFile(source, path.join(documentRoot, "检疫玩法交互稿.png"));

const crops = [
  { name: "1-体验设计总览.png", left: 0, top: 720, width: 2741, height: 1540 },
  { name: "2-幸存者类型与系统接入.png", left: 0, top: 2050, width: 2741, height: 1140 },
  { name: "3-检疫流程总览.png", left: 0, top: 3190, width: 2741, height: 760 },
  { name: "4-冲泥与身份确认.png", left: 70, top: 3990, width: 2600, height: 1260 },
  { name: "5-透视仪与温度计.png", left: 70, top: 5260, width: 2600, height: 1120 },
  { name: "6-生存决策.png", left: 70, top: 6370, width: 2600, height: 960 },
];

for (const crop of crops) {
  await sharp(source)
    .extract({ left: crop.left, top: crop.top, width: crop.width, height: crop.height })
    .png({ compressionLevel: 9 })
    .toFile(path.join(screenRoot, crop.name));
}

const keyScreens = [
  { name: "1-冲泥前.png", left: 275, top: 3990, width: 455, height: 760 },
  { name: "2-冲洗操作.png", left: 800, top: 3990, width: 455, height: 760 },
  { name: "3-身份确认.png", left: 2090, top: 3990, width: 455, height: 720 },
  { name: "4-透视仪检测.png", left: 161, top: 5260, width: 450, height: 604 },
  { name: "5-体温异常.png", left: 1894, top: 5260, width: 338, height: 500 },
  { name: "6-最终决策.png", left: 1141, top: 6280, width: 450, height: 710 },
];

for (const screen of keyScreens) {
  await sharp(source)
    .extract({ left: screen.left, top: screen.top, width: screen.width, height: screen.height })
    .resize({ width: 900, kernel: sharp.kernel.lanczos3 })
    .sharpen({ sigma: 0.6 })
    .png({ compressionLevel: 9 })
    .toFile(path.join(keyScreenRoot, screen.name));
}

await sharp(source)
  .extract({ left: 275, top: 4120, width: 455, height: 273 })
  .resize({ width: 1600, kernel: sharp.kernel.lanczos3 })
  .sharpen({ sigma: 0.6 })
  .png({ compressionLevel: 9 })
  .toFile(path.join(coverRoot, "检疫玩法封面.png"));

console.log(`Created ${crops.length} presentation crops and ${keyScreens.length} key screens.`);
