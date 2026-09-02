/**
 * Removes baked-in checkerboard from bonus mockups.
 * Keeps neutral pixels near colorful artwork; removes isolated checkerboard tiles.
 */
import sharp from "sharp";
import { mkdir, writeFile } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

function isCheckerboard(r, g, b) {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const avg = (r + g + b) / 3;
  const sat = max - min;
  if (sat > 28) return false;
  if (avg <= 22) return true;
  if (avg >= 235) return true;
  if (avg >= 175 && avg <= 234) return true;
  return false;
}

function isColorful(r, g, b) {
  return Math.max(r, g, b) - Math.min(r, g, b) > 32;
}

function buildColorDistance(pixels, width, height, channels) {
  const idx = (x, y) => (y * width + x) * channels;
  const dist = new Int32Array(width * height).fill(999999);
  const queue = [];

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const pi = idx(x, y);
      if (isColorful(pixels[pi], pixels[pi + 1], pixels[pi + 2])) {
        const vi = y * width + x;
        dist[vi] = 0;
        queue.push([x, y]);
      }
    }
  }

  for (let qi = 0; qi < queue.length; qi++) {
    const [x, y] = queue[qi];
    const d = dist[y * width + x];
    const next = d + 1;
    if (next > 40) continue;

    for (const [nx, ny] of [
      [x + 1, y],
      [x - 1, y],
      [x, y + 1],
      [x, y - 1],
    ]) {
      if (nx < 0 || nx >= width || ny < 0 || ny >= height) continue;
      const vi = ny * width + nx;
      if (dist[vi] > next) {
        dist[vi] = next;
        queue.push([nx, ny]);
      }
    }
  }

  return dist;
}

function removeCheckerboard(pixels, width, height, channels, dist, keepDistance, lightOnly = false) {
  const idx = (x, y) => (y * width + x) * channels;
  let removed = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const pi = idx(x, y);
      if (pixels[pi + 3] < 10) continue;
      if (
        isCheckerboard(pixels[pi], pixels[pi + 1], pixels[pi + 2]) &&
        dist[y * width + x] > keepDistance &&
        (!lightOnly || (pixels[pi] + pixels[pi + 1] + pixels[pi + 2]) / 3 >= 175)
      ) {
        pixels[pi + 3] = 0;
        removed++;
      }
    }
  }

  return removed;
}

async function processMockup(inputPath, outputPath, passes) {
  const { data, info } = await sharp(inputPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const pixels = Buffer.from(data);
  const dist = buildColorDistance(pixels, width, height, channels);

  let totalRemoved = 0;
  for (const pass of passes) {
    totalRemoved += removeCheckerboard(
      pixels,
      width,
      height,
      channels,
      dist,
      pass.keepDistance,
      pass.lightOnly ?? false,
    );
  }

  await mkdir(dirname(outputPath), { recursive: true });

  const buf = await sharp(pixels, { raw: { width, height, channels } })
    .trim({ threshold: 1 })
    .webp({ quality: 85, effort: 6, alphaQuality: 100 })
    .toBuffer();

  await writeFile(outputPath, buf);

  const meta = await sharp(buf).metadata();
  console.log(
    "OK:",
    outputPath,
    `${meta.width}x${meta.height}`,
    `${(buf.length / 1024).toFixed(0)}KB`,
    `removed: ${totalRemoved}`,
  );
}

const assets = join(
  "C:/Users/Felipe/.cursor/projects/c-Users-Felipe-Desktop-PROJETOS-CURSOR-LP-MP4-CERTO/assets",
);

const jobs = [
  {
    input: join(
      assets,
      "c__Users_Felipe_AppData_Roaming_Cursor_User_workspaceStorage_91013acdde91851fb989d8795be73120_images_MEGA_PACK_MONEY_DOLLAR-3c2a85ca-52a4-4369-a4c6-030bd534072e.jpg",
    ),
    output: join(root, "public/bonus-images/mockups/bonus-money-dollar-mockup.webp"),
    passes: [{ keepDistance: 3 }],
  },
  {
    input: join(
      assets,
      "c__Users_Felipe_AppData_Roaming_Cursor_User_workspaceStorage_91013acdde91851fb989d8795be73120_images_MEGA_PACK_FUTBOL-76c93b21-9d42-4b54-961e-1186fae99a93.jpg",
    ),
    output: join(root, "public/bonus-images/mockups/bonus-futbol-mockup.webp"),
    passes: [
      { keepDistance: 4 },
      { keepDistance: 2, lightOnly: true },
    ],
  },
];

for (const { input, output, passes } of jobs) {
  await processMockup(input, output, passes);
}
