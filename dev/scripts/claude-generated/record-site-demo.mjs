#!/usr/bin/env node

import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { mkdir, rename } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '../../..');

// Desktop viewport for demo recording
const viewport = { width: 1920, height: 1080 };

// Pages to record
const pages = [
  {
    name: 'homepage',
    url: 'http://localhost:3004/',
    sections: [
      { name: 'Hero', pauseDuration: 3000 },
      { name: 'Breaking Headlines', pauseDuration: 2500 },
      { name: 'Category Buttons', pauseDuration: 2000 },
      { name: 'Daily Briefing', pauseDuration: 3000 },
      { name: 'Footer', pauseDuration: 2000 }
    ]
  },
  {
    name: 'article',
    url: 'http://localhost:3004/president-trump-signs-bill-to-open-government',
    sections: [
      { name: 'Article Header', pauseDuration: 3000 },
      { name: 'Article Content', pauseDuration: 4000 },
      { name: 'Author Card', pauseDuration: 2000 },
      { name: 'Share Buttons', pauseDuration: 1500 },
      { name: 'Footer', pauseDuration: 2000 }
    ]
  },
  {
    name: 'category-politics',
    url: 'http://localhost:3004/category/politics',
    sections: [
      { name: 'Category Header', pauseDuration: 2500 },
      { name: 'Articles Grid', pauseDuration: 3500 },
      { name: 'Footer', pauseDuration: 2000 }
    ]
  },
  {
    name: 'newsletters',
    url: 'http://localhost:3004/newsletters',
    sections: [
      { name: 'Newsletter Header', pauseDuration: 2500 },
      { name: 'Newsletter Options', pauseDuration: 3000 },
      { name: 'Footer', pauseDuration: 2000 }
    ]
  }
];

/**
 * Simulate human-like scrolling with pauses at sections
 */
async function humanScroll(page, sections) {
  console.log('    Starting human-like scroll simulation...');

  // Initial pause at top
  await page.waitForTimeout(2000);

  // Get full page height
  const scrollHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  const viewportHeight = viewport.height;

  // Calculate scroll positions for each section
  const sectionCount = sections.length;
  const scrollStep = scrollHeight / (sectionCount + 1);

  for (let i = 0; i < sectionCount; i++) {
    const section = sections[i];
    const targetScroll = scrollStep * (i + 1);

    console.log(`    📍 Scrolling to: ${section.name}...`);

    // Smooth scroll to section
    await page.evaluate((target) => {
      window.scrollTo({
        top: target,
        behavior: 'smooth'
      });
    }, targetScroll);

    // Wait for scroll to complete
    await page.waitForTimeout(1000);

    // Pause to showcase section and animations
    console.log(`    ⏸️  Pausing ${section.pauseDuration}ms at ${section.name}`);
    await page.waitForTimeout(section.pauseDuration);
  }

  // Smooth scroll back to top
  console.log('    📍 Scrolling back to top...');
  await page.evaluate(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  await page.waitForTimeout(2000);
}

/**
 * Record demo video for a single page
 */
async function recordPageDemo(browser, pageInfo) {
  console.log(`\n📹 Recording: ${pageInfo.name}`);
  console.log('─'.repeat(60));

  // Create context with video recording enabled
  const videosDir = join(projectRoot, 'dev', 'videos', 'claude-generated');
  await mkdir(videosDir, { recursive: true });

  const context = await browser.newContext({
    viewport,
    recordVideo: {
      dir: videosDir,
      size: viewport
    }
  });

  const page = await context.newPage();

  try {
    // Navigate to page
    console.log(`  🌐 Loading ${pageInfo.url}...`);
    await page.goto(pageInfo.url, { waitUntil: 'networkidle', timeout: 30000 });

    // Wait for initial animations to complete
    console.log('  ⏱️  Waiting for animations to settle...');
    await page.waitForTimeout(3000);

    // Wait for images to load
    await page.evaluate(() => {
      return new Promise((resolve) => {
        const images = Array.from(document.querySelectorAll('img'));
        let loaded = 0;
        const total = images.length;

        if (total === 0) {
          resolve();
          return;
        }

        images.forEach(img => {
          if (img.complete) {
            loaded++;
            if (loaded === total) resolve();
          } else {
            img.onload = img.onerror = () => {
              loaded++;
              if (loaded === total) resolve();
            };
          }
        });

        // Timeout after 5 seconds
        setTimeout(resolve, 5000);
      });
    });

    // Perform human-like scrolling
    await humanScroll(page, pageInfo.sections);

    console.log('  ✅ Recording complete!');

  } catch (error) {
    console.error(`  ❌ Error recording ${pageInfo.name}:`, error.message);
  }

  // Get video reference before closing
  const video = page.video();

  // Close context to finalize video
  await context.close();

  // Get the video path after closing (this finalizes the recording)
  if (video) {
    const videoPath = await video.path();

    // Rename video to meaningful name
    const newVideoPath = join(videosDir, `${pageInfo.name}-demo.webm`);
    await rename(videoPath, newVideoPath);

    console.log(`  💾 Video saved: ${pageInfo.name}-demo.webm`);
  }
}

/**
 * Main recording function
 */
async function recordSiteDemo() {
  console.log('═══════════════════════════════════════════════════════════');
  console.log('   Liberty Nation - Site Demo Recording (1920x1080)');
  console.log('═══════════════════════════════════════════════════════════\n');

  const startTime = Date.now();

  const browser = await chromium.launch({
    headless: true
  });

  for (const pageInfo of pages) {
    await recordPageDemo(browser, pageInfo);
  }

  await browser.close();

  const duration = ((Date.now() - startTime) / 1000).toFixed(2);

  console.log('\n═══════════════════════════════════════════════════════════');
  console.log(`✨ All demo videos recorded in ${duration}s`);
  console.log('═══════════════════════════════════════════════════════════\n');

  console.log('📁 Videos saved to:');
  console.log('   • dev/videos/claude-generated/\n');

  console.log('📝 Note:');
  console.log('   Videos are recorded in WebM format.');
  console.log('   You can convert to MP4 using ffmpeg if needed:\n');
  console.log('   ffmpeg -i input.webm -c:v libx264 -crf 23 -c:a aac output.mp4\n');
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  recordSiteDemo().catch(console.error);
}

export { recordSiteDemo };
