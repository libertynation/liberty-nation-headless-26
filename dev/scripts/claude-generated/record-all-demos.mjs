#!/usr/bin/env node

import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { mkdir, rename } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '../../..');

// Page configurations
const pages = [
  {
    name: 'article',
    url: 'http://localhost:3004/president-trump-signs-bill-to-open-government',
    scrollPoints: [
      { name: 'Article Header', position: 0, pause: 3000 },
      { name: 'Article Content', position: 800, pause: 4000 },
      { name: 'Mid Article', position: 1600, pause: 3000 },
      { name: 'Author Card', position: 2400, pause: 2000 },
      { name: 'Footer', position: 'end', pause: 2000 }
    ]
  },
  {
    name: 'category-politics',
    url: 'http://localhost:3004/category/politics',
    scrollPoints: [
      { name: 'Category Header', position: 0, pause: 2500 },
      { name: 'Articles Grid Top', position: 600, pause: 3000 },
      { name: 'Articles Grid Mid', position: 1400, pause: 3000 },
      { name: 'Footer', position: 'end', pause: 2000 }
    ]
  },
  {
    name: 'newsletters',
    url: 'http://localhost:3004/newsletters',
    scrollPoints: [
      { name: 'Newsletter Header', position: 0, pause: 2500 },
      { name: 'Newsletter Options', position: 800, pause: 3000 },
      { name: 'More Options', position: 1400, pause: 2500 },
      { name: 'Footer', position: 'end', pause: 2000 }
    ]
  }
];

async function recordPageDemo(browser, videosDir, pageConfig) {
  console.log(`\n📹 Recording: ${pageConfig.name}`);
  console.log('─'.repeat(60));

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    recordVideo: {
      dir: videosDir,
      size: { width: 1920, height: 1080 }
    }
  });

  const page = await context.newPage();

  try {
    console.log(`  🌐 Loading ${pageConfig.url}...`);
    await page.goto(pageConfig.url, { waitUntil: 'networkidle', timeout: 30000 });

    console.log('  ⏱️  Waiting for animations...');
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

    console.log('  📜 Starting human-like scroll...\n');

    for (const scrollPoint of pageConfig.scrollPoints) {
      console.log(`    📍 ${scrollPoint.name}...`);

      if (scrollPoint.position === 'end') {
        await page.evaluate(() => {
          window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
        });
      } else if (scrollPoint.position > 0) {
        await page.evaluate((pos) => {
          window.scrollTo({ top: pos, behavior: 'smooth' });
        }, scrollPoint.position);
      }

      await page.waitForTimeout(1000); // Wait for scroll to complete
      console.log(`    ⏸️  Pausing ${scrollPoint.pause}ms`);
      await page.waitForTimeout(scrollPoint.pause);
    }

    // Scroll back to top
    console.log('\n    📍 Scrolling back to top...');
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
    await page.waitForTimeout(2000);

    console.log('  ✅ Recording complete!');

  } catch (error) {
    console.error(`  ❌ Error: ${error.message}`);
    throw error;
  }

  const video = page.video();
  await context.close();

  if (video) {
    const videoPath = await video.path();
    const newVideoPath = join(videosDir, `${pageConfig.name}-demo.webm`);
    await rename(videoPath, newVideoPath);
    console.log(`  💾 Video saved: ${pageConfig.name}-demo.webm`);
  }
}

async function recordAllDemos() {
  console.log('═══════════════════════════════════════════════════════════');
  console.log('   Liberty Nation - Demo Video Recording (1920x1080)');
  console.log('═══════════════════════════════════════════════════════════\n');

  const startTime = Date.now();

  const videosDir = join(projectRoot, 'dev', 'videos', 'claude-generated');
  await mkdir(videosDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });

  for (const pageConfig of pages) {
    await recordPageDemo(browser, videosDir, pageConfig);
  }

  await browser.close();

  const duration = ((Date.now() - startTime) / 1000).toFixed(2);

  console.log('\n═══════════════════════════════════════════════════════════');
  console.log(`✨ All demo videos recorded in ${duration}s`);
  console.log('═══════════════════════════════════════════════════════════\n');

  console.log('📁 Videos saved to: dev/videos/claude-generated/\n');

  console.log('📝 Recorded videos:');
  console.log('   • homepage-demo.webm (already recorded)');
  console.log('   • article-demo.webm');
  console.log('   • category-politics-demo.webm');
  console.log('   • newsletters-demo.webm\n');
}

recordAllDemos().catch(console.error);
