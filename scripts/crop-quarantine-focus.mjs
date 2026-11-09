import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const source = "public/resources/系统玩法/检疫玩法/交互稿/检疫玩法交互稿.png";
const output = "public/resources/系统玩法/检疫玩法/设计重点";
await mkdir(output, { recursive: true });
for (const crop of [
  { name: "体验曲线-原图.png", left: 80, top: 860, width: 2540, height: 1100 },
  { name: "幸存者分类-原图.png", left: 80, top: 1980, width: 2560, height: 970 },
  { name: "检疫流程-原图.png", left: 120, top: 3240, width: 2540, height: 520 },
  { name: "工具操作对照-原图.png", left: 70, top: 5260, width: 2600, height: 740 },
  { name: "去留决策-原图.png", left: 70, top: 6070, width: 2600, height: 1334 },
  { name: "冲泥-引导.png", left: 278, top: 3990, width: 448, height: 750 },
  { name: "冲泥-反馈.png", left: 1315, top: 3990, width: 447, height: 750 },
  { name: "透视仪-引导.png", left: 161, top: 5066, width: 448, height: 796 },
  { name: "透视仪-反馈.png", left: 994, top: 5205, width: 334, height: 594 },
  { name: "温度计-引导.png", left: 1429, top: 5066, width: 448, height: 796 },
  { name: "温度计-反馈.png", left: 1894, top: 5158, width: 328, height: 611 },
]) {
  const { name, ...region } = crop;
  await sharp(source).extract(region).png({ compressionLevel: 9 }).toFile(`${output}/${name}`);
}
