const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [16, 32, 48, 64, 128, 192, 256, 512];

async function generateFavicon() {
  const svgBuffer = fs.readFileSync(path.join(__dirname, '../public/logo.svg'));
  
  // Generate favicon.ico
  await sharp(svgBuffer)
    .resize(32, 32)
    .toFile(path.join(__dirname, '../public/favicon.ico'));
  
  // Generate PNG files
  for (const size of sizes) {
    await sharp(svgBuffer)
      .resize(size, size)
      .toFile(path.join(__dirname, `../public/logo${size}.png`));
  }
  
  // Update manifest.json
  const manifest = {
    short_name: "OPhim",
    name: "OPhim - Xem Phim Online",
    icons: sizes.map(size => ({
      src: `logo${size}.png`,
      sizes: `${size}x${size}`,
      type: "image/png"
    })),
    start_url: ".",
    display: "standalone",
    theme_color: "#ff512f",
    background_color: "#ffffff"
  };
  
  fs.writeFileSync(
    path.join(__dirname, '../public/manifest.json'),
    JSON.stringify(manifest, null, 2)
  );
}

generateFavicon().catch(console.error); 