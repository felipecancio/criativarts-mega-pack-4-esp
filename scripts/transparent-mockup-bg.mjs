/**
 * Flood-fills near-black pixels connected to image edges → transparent.
 */
import sharp from "sharp";
import { rename, unlink } from "fs/promises";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const tol = 42;

async function transparentize(input) {
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });

  const w = info.width;
  const h = info.height;
  const buf = Buffer.from(data);

  const idx = (x, y) => (y * w + x) * 4;
  const visited = new Uint8Array(w * h);

  const isNearBlack = (x, y) => {
    const i = idx(x, y);
    return buf[i] <= tol && buf[i + 1] <= tol && buf[i + 2] <= tol;
  };

  const queue = [];
  const push = (x, y) => {
    if (x < 0 || x >= w || y < 0 || y >= h) return;
    const vi = y * w + x;
    if (visited[vi]) return;
    if (!isNearBlack(x, y)) return;
    visited[vi] = 1;
    queue.push([x, y]);
  };

  for (let x = 0; x < w; x++) {
    push(x, 0);
    push(x, h - 1);
  }
  for (let y = 0; y < h; y++) {
    push(0, y);
    push(w - 1, y);
  }

  for (let qi = 0; qi < queue.length; qi++) {
    const [x, y] = queue[qi];
    const i = idx(x, y);
    buf[i + 3] = 0;
    push(x + 1, y);
    push(x - 1, y);
    push(x, y + 1);
    push(x, y - 1);
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
  console.error("Usage: node transparent-mockup-bg.mjs <file.png> [...]");
  process.exit(1);
}

for (const file of files) {
  await transparentize(file);
}
