/**
 * Generate PNG favicons from SVG
 * Run with: node scripts/generate-favicons.mjs
 */

import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');

async function generateFavicons() {
    try {
        // Try to use sharp (Astro's dependency)
        const sharp = (await import('sharp')).default;
        
        const svgPath = join(publicDir, 'favicon.svg');
        const svgBuffer = await fs.readFile(svgPath);
        
        // Generate different sizes
        const sizes = [
            { size: 16, name: 'favicon-16x16.png' },
            { size: 32, name: 'favicon-32x32.png' },
            { size: 48, name: 'favicon-48x48.png' },
            { size: 180, name: 'apple-touch-icon.png' },
            { size: 192, name: 'android-chrome-192x192.png' },
            { size: 512, name: 'android-chrome-512x512.png' },
        ];
        
        for (const { size, name } of sizes) {
            await sharp(svgBuffer)
                .resize(size, size)
                .png()
                .toFile(join(publicDir, name));
            console.log(`✓ Generated ${name}`);
        }
        
        // Generate ICO file (16x16 and 32x32 combined)
        // Note: Sharp doesn't support ICO directly, so we'll just use PNG
        
        console.log('\n✅ All favicons generated successfully!');
        console.log('\nNext steps:');
        console.log('1. Update Layout.astro with the new favicon links');
        console.log('2. Update site.webmanifest with the new icons');
        
    } catch (error) {
        if (error.code === 'ERR_MODULE_NOT_FOUND') {
            console.error('❌ Sharp is not installed. Installing...');
            console.log('Run: npm install sharp --save-dev');
            console.log('Then run this script again: node scripts/generate-favicons.mjs');
        } else {
            console.error('❌ Error generating favicons:', error.message);
        }
        process.exit(1);
    }
}

generateFavicons();
