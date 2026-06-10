/**
 * Removes outer black matte from product mockups while preserving interior blacks
 * (spine, artwork). Uses distance from colorful content — not edge flood-fill.
 */
import sharp from "sharp";
import { rename, unlink } from "fs/promises";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const CONTENT_TOL = 25;
const BLACK_TOL = 15;
const DIST_THRESHOLD = 30;

async function removeOuterBlackMatte(input) {
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });

  const w = info.width;
  const h = info.height;
  const buf = Buffer.from(data);

  const idx = (x, y) => (y * w + x) * 4;

  const isBlack = (x, y, tol = BLACK_TOL) => {
    const i = idx(x, y);
    return buf[i] <= tol && buf[i + 1] <= tol && buf[i + 2] <= tol;
  };

  const isContent = (x, y) => !isBlack(x, y, CONTENT_TOL);

  const dist = new Int32Array(w * h).fill(999999);
  const queue = [];

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (isContent(x, y)) {
        const vi = y * w + x;
        dist[vi] = 0;
        queue.push([x, y]);
      }
    }
  }

  for (let qi = 0; qi < queue.length; qi++) {
    const [x, y] = queue[qi];
    const d = dist[y * w + x];
    const next = d + 1;
    if (next > DIST_THRESHOLD + 1) continue;

    for (const [nx, ny] of [
      [x + 1, y],
      [x - 1, y],
      [x, y + 1],
      [x, y - 1],
    ]) {
      if (nx < 0 || nx >= w || ny < 0 || ny >= h) continue;
      const vi = ny * w + nx;
      if (dist[vi] > next) {
        dist[vi] = next;
        queue.push([nx, ny]);
      }
    }
  }

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const vi = y * w + x;
      if (isBlack(x, y) && dist[vi] > DIST_THRESHOLD) {
        const i = idx(x, y);
        buf[i + 3] = 0;
      }
    }
  }

  const tmp = `${input}.tmp.png`;
  await sharp(buf, { raw: { width: w, height: h, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toFile(tmp);
  try {
    await unlink(input);
  } catch {
    /* ignore */
  }
  await rename(tmp, input);
  console.log("OK:", input, `${w}x${h}`);
}

const files = process.argv.slice(2);
if (!files.length) {
  console.error("Usage: node remove-outer-matte.mjs <file.png> [...]");
  process.exit(1);
}

for (const file of files) {
  await removeOuterBlackMatte(file);
}
