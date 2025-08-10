/*
  Generate a small 16x16 medical-themed favicon (red background with white cross) as an .ico file
  and write it to both public/favicon.ico and src/app/favicon.ico.
*/

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

function createMedicalFaviconICO(): Buffer {
  const width = 16;
  const height = 16;

  // Create pixel data (BGRA), top-left origin for our array; we'll flip when writing BMP
  const pixels = new Uint8Array(width * height * 4);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      // Base: red background
      pixels[i + 0] = 0x00; // B
      pixels[i + 1] = 0x00; // G
      pixels[i + 2] = 0xff; // R
      pixels[i + 3] = 0xff; // A

      // White cross (two pixels thick) centered at rows/cols 7 and 8
      if (x === 7 || x === 8 || y === 7 || y === 8) {
        pixels[i + 0] = 0xff; // B
        pixels[i + 1] = 0xff; // G
        pixels[i + 2] = 0xff; // R
        pixels[i + 3] = 0xff; // A
      }
    }
  }

  // Build the BMP info header (BITMAPINFOHEADER, 40 bytes)
  const bmpHeader = Buffer.alloc(40);
  bmpHeader.writeUInt32LE(40, 0); // biSize
  bmpHeader.writeInt32LE(width, 4); // biWidth
  bmpHeader.writeInt32LE(height * 2, 8); // biHeight (XOR + AND mask)
  bmpHeader.writeUInt16LE(1, 12); // biPlanes
  bmpHeader.writeUInt16LE(32, 14); // biBitCount
  bmpHeader.writeUInt32LE(0, 16); // biCompression (BI_RGB)
  bmpHeader.writeUInt32LE(width * height * 4, 20); // biSizeImage (XOR only)
  bmpHeader.writeInt32LE(0, 24); // biXPelsPerMeter
  bmpHeader.writeInt32LE(0, 28); // biYPelsPerMeter
  bmpHeader.writeUInt32LE(0, 32); // biClrUsed
  bmpHeader.writeUInt32LE(0, 36); // biClrImportant

  // XOR bitmap (pixel data) must be written bottom-up
  const xor = Buffer.alloc(width * height * 4);
  for (let y = 0; y < height; y++) {
    const srcRowStart = y * width * 4;
    const dstRowStart = (height - 1 - y) * width * 4;
    xor.set(pixels.subarray(srcRowStart, srcRowStart + width * 4), dstRowStart);
  }

  // AND mask: 1bpp, rows padded to 32 bits. For 16px width => 16 bits => 2 bytes, pad to 4 bytes per row.
  // We'll mark all pixels as fully opaque (zeros in AND mask).
  const andRowSize = 4; // padded
  const andMask = Buffer.alloc(andRowSize * height, 0x00);

  const imageData = Buffer.concat([bmpHeader, xor, andMask]);

  // ICO header (ICONDIR)
  const iconDir = Buffer.alloc(6);
  iconDir.writeUInt16LE(0, 0); // reserved
  iconDir.writeUInt16LE(1, 2); // type = 1 (icon)
  iconDir.writeUInt16LE(1, 4); // count

  // ICONDIRENTRY
  const entry = Buffer.alloc(16);
  entry.writeUInt8(width, 0); // width
  entry.writeUInt8(height, 1); // height
  entry.writeUInt8(0, 2); // color count
  entry.writeUInt8(0, 3); // reserved
  entry.writeUInt16LE(1, 4); // planes
  entry.writeUInt16LE(32, 6); // bitcount
  entry.writeUInt32LE(imageData.length, 8); // bytes in res
  entry.writeUInt32LE(6 + 16, 12); // image offset

  return Buffer.concat([iconDir, entry, imageData]);
}

function writeIcon(targetPath: string, data: Buffer) {
  mkdirSync(dirname(targetPath), { recursive: true });
  writeFileSync(targetPath, data);
}

const ico = createMedicalFaviconICO();
writeIcon("public/favicon.ico", ico);
writeIcon("src/app/favicon.ico", ico);
console.log("Generated favicon.ico at public/ and src/app/");



