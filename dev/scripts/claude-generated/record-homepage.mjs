#!/usr/bin/env node

import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { mkdir, rename } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '../../..');

async function recordHomepage() {
  console.log('Recording homepage demo...\n');

  const videosDir = join(projectRoot, 'dev', 'videos', 'claude-generated');
  await mkdir(videosDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    recordVideo: {
      dir: videosDir,
      size: { width: 1920, height: 1080 }
    }
  });

  const page = await context.newPage();

  try {
    console.log('Loading homepage...');
    await page.goto('http://localhost:3004/', { waitUntil: 'networkidle', timeout: 30000 });

    console.log('Waiting for animations...');
    await page.waitForTimeout(3000);

    // Wait for images
    await page.evaluate(() => {
      return new Promise((resolve) => {
        const images = Array.from(document.querySelectorAll('img'));
        let loaded = 0;
        const total = images.length;
        if (total === 0) { resolve(); return; }
        images.forEach(img => {
          if (img.complete) { loaded++; if (loaded === total) resolve(); }
          else { img.onload = img.onerror = () => { loaded++; if (loaded === total) resolve(); }; }
        });
        setTimeout(resolve, 5000);
      });
    });

    console.log('Starting human-like scroll...\n');

    // Pause at top
    console.log('📍 At Hero section (3s pause)');
    await page.waitForTimeout(3000);

    // Scroll to Breaking Headlines
    console.log('📍 Scrolling to Breaking Headlines...');
    await page.evaluate(() => window.scrollTo({ top: 800, behavior: 'smooth' }));
    await page.waitForTimeout(1000);
    console.log('⏸️  Pausing at Breaking Headlines (2.5s)');
    await page.waitForTimeout(2500);

    // Scroll to Category Buttons
    console.log('📍 Scrolling to Category Buttons...');
    await page.evaluate(() => window.scrollTo({ top: 1400, behavior: 'smooth' }));
    await page.waitForTimeout(1000);
    console.log('⏸️  Pausing at Category Buttons (2s)');
    await page.waitForTimeout(2000);

    // Scroll to Daily Briefing
    console.log('📍 Scrolling to Daily Briefing...');
    await page.evaluate(() => window.scrollTo({ top: 2000, behavior: 'smooth' }));
    await page.waitForTimeout(1000);
    console.log('⏸️  Pausing at Daily Briefing (3s)');
    await page.waitForTimeout(3000);

    // Scroll to Footer
    console.log('📍 Scrolling to Footer...');
    await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' }));
    await page.waitForTimeout(1000);
    console.log('⏸️  Pausing at Footer (2s)');
    await page.waitForTimeout(2000);

    // Scroll back to top
    console.log('📍 Scrolling back to top...');
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
    await page.waitForTimeout(2000);

    console.log('\n✅ Recording complete!');

  } catch (error) {
    console.error('❌ Error:', error.message);
    throw error;
  }

  const video = page.video();
  await context.close();

  if (video) {
    const videoPath = await video.path();
    const newVideoPath = join(videosDir, 'homepage-demo.webm');
    await rename(videoPath, newVideoPath);
    console.log(`\n💾 Video saved: homepage-demo.webm`);
    console.log(`   Path: ${newVideoPath}`);
  }

  await browser.close();
}

recordHomepage().catch(console.error);
