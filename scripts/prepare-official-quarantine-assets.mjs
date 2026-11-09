import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { execFileSync } from "node:child_process";

const source = "E:/X16client/client/client/Assets/Gameplay/X16/Res/Quarantine/Res/UI/Sprite";
const output = "public/resources/系统玩法/检疫玩法/原型/official";
await mkdir(output, { recursive: true });
for (const name of ["Quarantine_Background", "Quarantine_icon_Instrument2", "Quarantine_icon_Instrument2_LiftUp", "Quarantine_icon_AimBlue", "Quarantine_icon_AimBlue1", "Quarantine_icon_AimRed", "Quarantine_icon_AimRed1", "Quarantine_icon_Shower", "Quarantine_icon_Shower_LiftUp", "Quarantine_icon_Instrument1", "Quarantine_icon_Instrument1_LiftUp", "washwater_nobg"]) {
  await sharp(join(source, `${name}.png`)).webp({ lossless: true }).toFile(join(output, `${name}.webp`));
}
// The game's side-by-side videos pack RGB on the left and alpha on the right.
// Decode their matching first frames; never fit separate wound images to a different pose.
const videoRoot = "E:/X16client/client/client/Assets/Gameplay/X16/Res/Common/Video/Other/Quarantine";
const ffmpeg = process.env.FFMPEG_PATH || "C:/Users/yangxiao/AppData/Local/Microsoft/WinGet/Packages/Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe/ffmpeg-8.1.1-full_build/bin/ffmpeg.exe";
const layers = [["NPC_1_sbs.mp4", "npc-dressed"], ["NPC_1_stand_sbs.mp4", "npc-underlayer"], ["NPC_2_DirtIdle_nobg_sbs.mp4", "wash-dirty"], ["NPC_2_end_sbs.mp4", "wash-clean"], ["NPC_2_sbs.mp4", "thermo-person"]];
for (const [video, name] of layers) {
  const input = execFileSync(ffmpeg, ["-v", "error", "-i", join(videoRoot, video), "-frames:v", "1", "-f", "image2pipe", "-vcodec", "png", "pipe:1"], { maxBuffer: 20 * 1024 * 1024 });
  const { width, height } = await sharp(input).metadata();
  const half = width / 2;
  const rgb = await sharp(input).extract({ left: 0, top: 0, width: half, height }).removeAlpha().png().toBuffer();
  const alpha = await sharp(input).extract({ left: half, top: 0, width: half, height }).greyscale().raw().toBuffer();
  await sharp(rgb).joinChannel(alpha, { raw: { width: half, height, channels: 1 } }).webp({ lossless: true }).toFile(join(output, `${name}.webp`));
}
await writeFile(join(output,"asset-sources.json"), JSON.stringify({
  spriteRoot: source,
  npcLayers: { dressed: "Res/Common/Video/Other/Quarantine/NPC_1_sbs.mp4", revealed: "Res/Common/Video/Other/Quarantine/NPC_1_stand_sbs.mp4", frame: 0, alpha: "SBS right-half grayscale" },
  toolScenes: Object.fromEntries(layers.map(([video, name]) => [name, `${videoRoot}/${video}`])),
}, null, 2));
console.log("Prepared official background, two matched NPC layers, detector poses and scan rings.");
