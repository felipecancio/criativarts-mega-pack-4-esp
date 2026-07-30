import sharp from "sharp";
import { mkdir, readdir, unlink, writeFile, rm, stat, copyFile } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { existsSync } from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const srcDir = "C:/Users/Felipe/Desktop/imgs";
const outDir = join(__dirname, "..", "public", "design-gallery");
const tmpDir = join(__dirname, "..", "public", "design-gallery-tmp");

const VERTICAL_W = 540;
const VERTICAL_H = 720;
const HORIZONTAL_MAX_W = 1200;
const WEBP_QUALITY = 78;

async function pickSources(files) {
  const byNum = new Map();
  for (const file of files) {
    const match = file.match(/^(\d+)\.(jpe?g|png|webp)$/i);
    if (!match) continue;
    const num = Number(match[1]);
    const full = join(srcDir, file);
    const prev = byNum.get(num);
    if (!prev) {
      byNum.set(num, { file, full });
      continue;
    }
    const prevSize = (await stat(prev.full)).size;
    const nextSize = (await stat(full)).size;
    if (nextSize > prevSize) byNum.set(num, { file, full });
  }
  return byNum;
}

async function processVertical(src, out) {
  await sharp(src)
    .rotate()
    .resize(VERTICAL_W, VERTICAL_H, { fit: "cover", position: "centre" })
    .webp({ quality: WEBP_QUALITY, effort: 6 })
    .toFile(out);
}

async function processHorizontal(src, out) {
  const meta = await sharp(src).rotate().metadata();
  const width = Math.min(HORIZONTAL_MAX_W, meta.width || HORIZONTAL_MAX_W);
  await sharp(src)
    .rotate()
    .resize({ width, fit: "inside", withoutEnlargement: true })
    .webp({ quality: WEBP_QUALITY, effort: 6 })
    .toFile(out);
}

async function sleep(ms) {
  await new Promise((r) => setTimeout(r, ms));
}

async function clearDir(dir) {
  if (!existsSync(dir)) return;
  for (const old of await readdir(dir)) {
    const p = join(dir, old);
    for (let i = 0; i < 8; i++) {
      try {
        await unlink(p);
        break;
      } catch (e) {
        if (i === 7) throw e;
        await sleep(300);
      }
    }
  }
}

const files = await readdir(srcDir);
const sources = await pickSources(files);

await mkdir(tmpDir, { recursive: true });
await mkdir(outDir, { recursive: true });

const missing = [];
const verticalNums = [];
for (let i = 1; i <= 27; i++) {
  if (!sources.has(i)) {
    missing.push(i);
    continue;
  }
  verticalNums.push(i);
  const out = join(tmpDir, `${i}.webp`);
  await processVertical(sources.get(i).full, out);
  const meta = await sharp(out).metadata();
  const size = (await stat(out)).size;
  console.log(`V ${i}.webp ${meta.width}x${meta.height} ${(size / 1024).toFixed(0)}KB <- ${sources.get(i).file}`);
}

const horizontalNums = [];
for (const i of [28, 29, 30]) {
  if (!sources.has(i)) {
    missing.push(i);
    continue;
  }
  horizontalNums.push(i);
  const out = join(tmpDir, `${i}.webp`);
  await processHorizontal(sources.get(i).full, out);
  const meta = await sharp(out).metadata();
  const size = (await stat(out)).size;
  console.log(`H ${i}.webp ${meta.width}x${meta.height} ${(size / 1024).toFixed(0)}KB <- ${sources.get(i).file}`);
}

await clearDir(outDir);
for (const f of await readdir(tmpDir)) {
  await copyFile(join(tmpDir, f), join(outDir, f));
}
await rm(tmpDir, { recursive: true, force: true });

console.log("\nDone.");
console.log("Vertical:", verticalNums.join(", "));
console.log("Horizontal:", horizontalNums.join(", "));
if (missing.length) console.log("Missing:", missing.join(", "));
