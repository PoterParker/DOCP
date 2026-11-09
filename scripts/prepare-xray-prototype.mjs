import sharp from "sharp";
import { mkdir } from "node:fs/promises";
const root = "public/resources/系统玩法/检疫玩法";
await mkdir(`${root}/原型`, { recursive: true });
await sharp(`${root}/原型/透视仪素材原帧.png`)
  .extract({ left: 190, top: 390, width: 143, height: 110 })
  .png().toFile(`${root}/原型/透视仪工具.png`);
await sharp(`${root}/设计重点/透视仪-反馈.png`)
  .extract({ left: 153, top: 246, width: 104, height: 104 })
  .png().toFile(`${root}/原型/感染检查细节.png`);
await sharp(`${root}/交互稿/检疫玩法交互稿.png`)
  .extract({ left: 730, top: 5420, width: 118, height: 118 })
  .png().toFile(`${root}/原型/正常检查细节.png`);
