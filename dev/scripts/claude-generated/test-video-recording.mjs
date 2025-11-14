#!/usr/bin/env node

import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { mkdir } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '../../..');

async function testVideoRecording() {
  console.log('Testing video recording...\n');

  const videosDir = join(projectRoot, 'dev', 'videos', 'claude-generated');
  console.log('Videos directory:', videosDir);

  await mkdir(videosDir, { recursive: true });
  console.log('Directory created\n');

  const browser = await chromium.launch({ headless: true });
  console.log('Browser launched\n');

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    recordVideo: {
      dir: videosDir,
      size: { width: 1920, height: 1080 }
    }
  });
  console.log('Context created with video recording\n');

  const page = await context.newPage();
  console.log('Page created\n');

  console.log('Navigating to homepage...');
  await page.goto('http://localhost:3004/', { waitUntil: 'networkidle', timeout: 30000 });
  console.log('Page loaded\n');

  console.log('Waiting 3 seconds...');
  await page.waitForTimeout(3000);

  console.log('Scrolling down...');
  await page.evaluate(() => {
    window.scrollTo({ top: 1000, behavior: 'smooth' });
  });
  await page.waitForTimeout(2000);

  console.log('Scrolling back up...');
  await page.evaluate(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  await page.waitForTimeout(2000);

  const video = page.video();
  console.log('Got video reference:', !!video);

  await context.close();
  console.log('Context closed\n');

  if (video) {
    const videoPath = await video.path();
    console.log('✅ Video saved to:', videoPath);
  } else {
    console.log('❌ No video created');
  }

  await browser.close();
  console.log('Browser closed');
}

testVideoRecording().catch(console.error);
