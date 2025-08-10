const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuration
const inputDir = 'public/images';
const outputDir = 'public/images/webp';
const quality = 80;
const formats = ['webp', 'avif'];

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Get all image files
function getImageFiles(dir) {
  const files = fs.readdirSync(dir);
  const imageFiles = [];

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      imageFiles.push(...getImageFiles(filePath));
    } else if (isImageFile(file)) {
      imageFiles.push(filePath);
    }
  });

  return imageFiles;
}

// Check if file is an image
function isImageFile(filename) {
  const ext = path.extname(filename).toLowerCase();
  return ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff'].includes(ext);
}

// Convert image to different formats
async function convertImage(inputPath) {
  const filename = path.basename(inputPath, path.extname(inputPath));

  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    console.log(`Converting ${inputPath} (${metadata.width}x${metadata.height})`);

    // Convert to WebP
    await image.webp({ quality }).toFile(path.join(outputDir, `${filename}.webp`));

    // Convert to AVIF (if supported)
    try {
      await image.avif({ quality }).toFile(path.join(outputDir, `${filename}.avif`));
    } catch (error) {
      console.log(`AVIF conversion failed for ${filename}: ${error.message}`);
    }

    // Create responsive sizes
    const sizes = [640, 750, 828, 1080, 1200, 1920];

    for (const size of sizes) {
      if (metadata.width >= size) {
        // WebP responsive sizes
        await image
          .resize(size, null, { withoutEnlargement: true })
          .webp({ quality })
          .toFile(path.join(outputDir, `${filename}-${size}.webp`));
      }
    }

    console.log(`✅ Converted ${filename}`);
  } catch (error) {
    console.error(`❌ Error converting ${inputPath}:`, error.message);
  }
}

// Main conversion process
async function convertAllImages() {
  console.log('🔄 Starting image conversion...');
  console.log(`Input directory: ${inputDir}`);
  console.log(`Output directory: ${outputDir}`);
  console.log(`Quality: ${quality}`);
  console.log(`Formats: ${formats.join(', ')}`);
  console.log('');

  const imageFiles = getImageFiles(inputDir);

  if (imageFiles.length === 0) {
    console.log('No image files found to convert.');
    return;
  }

  console.log(`Found ${imageFiles.length} images to convert:`);
  imageFiles.forEach((file) => console.log(`  - ${file}`));
  console.log('');

  // Convert images in parallel (with concurrency limit)
  const concurrency = 4;
  const chunks = [];

  for (let i = 0; i < imageFiles.length; i += concurrency) {
    chunks.push(imageFiles.slice(i, i + concurrency));
  }

  for (let i = 0; i < chunks.length; i++) {
    console.log(`Processing batch ${i + 1}/${chunks.length}...`);
    await Promise.all(chunks[i].map(convertImage));
  }

  console.log('');
  console.log('🎉 Image conversion completed!');

  // Generate image manifest
  generateImageManifest();
}

// Generate image manifest for easy reference
function generateImageManifest() {
  const manifest = {
    generated: new Date().toISOString(),
    images: {},
  };

  const webpFiles = fs.readdirSync(outputDir);

  webpFiles.forEach((file) => {
    if (file.endsWith('.webp') || file.endsWith('.avif')) {
      const filename = path.basename(file, path.extname(file));
      const ext = path.extname(file);

      if (!manifest.images[filename]) {
        manifest.images[filename] = {};
      }

      manifest.images[filename][ext] = `/images/webp/${file}`;
    }
  });

  const manifestPath = path.join(outputDir, 'manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

  console.log(`📋 Image manifest generated: ${manifestPath}`);
}

// Run the conversion
convertAllImages().catch(console.error);
