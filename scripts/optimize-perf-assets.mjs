/**
 * Compress testimonial avatars for faster load (displayed at 52px).
 */
import sharp from "sharp";
import { readdir, writeFile } from "fs/promises";
import { join } from "path";
import { fileURLToPath } from "url";

const root = join(fileURLToPath(import.meta.url), "..", "..");
const dir = join(root, "public/testimonials");

const files = (await readdir(dir)).filter((f) => f.endsWith(".png"));

for (const file of files) {
  const input = join(dir, file);
  const base = file.replace(/\.png$/i, "");
  const output = join(dir, `${base}.webp`);
  const buf = await sharp(input).resize(104, 104, { fit: "cover" }).webp({ quality: 82 }).toBuffer();
  await writeFile(output, buf);
  console.log("OK", `${base}.webp`, `${(buf.length / 1024).toFixed(1)}KB`);
}
