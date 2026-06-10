import sharp from "sharp";
import { mkdir, readdir, unlink } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const assetsDir =
  "C:/Users/Felipe/.cursor/projects/c-Users-Felipe-Desktop-PROJETOS-CURSOR-LP-MP4-CERTO/assets";
const outDir = join(__dirname, "..", "public", "design-gallery");

const WIDTH = 540;
const HEIGHT = 720; // 3:4 vertical

const latestIds = {
  1: "8155b8ed-b3b9-465e-a086-7036a399555c",
  2: "f8a3fe5d-c310-4433-8ec8-d27a6431c98d",
  3: "a5bd6f2c-092d-462c-99e4-c3dba7eae860",
  4: "cbde350a-acec-41ec-b31a-128a5f96f2f6",
  5: "8ba4620d-4a05-428d-93ba-ca48c1d12274",
  6: "af6b9fef-dcbb-4e96-b6bf-8ab49607a75a",
  7: "6880d20c-d697-49e1-98dd-7768c977f105",
  8: "10e0457d-67d0-4f7c-be3a-de5a8b1b437b",
  9: "57f4a93f-2608-4d98-9e96-00ad652f8095",
  10: "b408ecd3-b186-4ed6-8890-96c45a126034",
  11: "4ae80364-0289-4ff0-be5f-5ef44d131220",
  12: "2b890f19-fe4a-4c96-851b-9ee799bca342",
  13: "55c393c0-fbf8-474c-9e19-0b00952cca04",
  14: "25741032-ae72-4f7e-b604-2a68d80de47f",
  15: "7b9b631e-2c92-4bec-af04-72d6f8a994a5",
  16: "caa65963-f5eb-4d67-8ff3-f241f97b6416",
  17: "9d8b2c97-c525-4b5c-a631-6de637a90518",
  18: "a097ae44-c790-46b9-838d-14894efbbbfd",
  19: "6da6b3c7-88fb-46d2-8125-b3d1ed6ea0ac",
  20: "ff10152b-4d72-40fb-a772-4e6df91fdee1",
  21: "e8384ed7-6182-4798-b70e-851d42d3ab8b",
  22: "c66dda19-cbcb-4bb0-87be-323e836cbad3",
  23: "552c2086-2ebf-4344-95de-fa5d7a73255a",
  24: "136f04d8-98f9-40ff-8fdb-9bf7c58c5781",
  25: "1727422a-0530-4291-85b4-811631b785a8",
  26: "a701a1d5-4927-4d55-ae3a-ced4adfe6de9",
  27: "5de84598-c369-4be8-81ab-d03adf58ba68",
};

const files = await readdir(assetsDir);
const byNum = {};

for (const [num, id] of Object.entries(latestIds)) {
  const match = files.find((f) => f.includes(`images_${num}-${id}`));
  if (!match) throw new Error(`Missing asset for image ${num}`);
  byNum[num] = join(assetsDir, match);
}

await mkdir(outDir, { recursive: true });

for (const old of await readdir(outDir)) {
  await unlink(join(outDir, old));
}

for (let i = 1; i <= 27; i++) {
  const out = join(outDir, `${i}.webp`);
  await sharp(byNum[i])
    .resize({ height: HEIGHT, fit: "inside" })
    .resize(WIDTH, HEIGHT, { fit: "fill" })
    .webp({ quality: 85 })
    .toFile(out);
  const meta = await sharp(out).metadata();
  console.log(`OK ${i}.webp ${meta.width}x${meta.height}`);
}
