#!/usr/bin/env node

/**
 * Capture author card specifically
 */

import { chromium } from 'playwright';

async function captureAuthorCard() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 }
  });

  await page.goto('http://localhost:3004/president-trump-signs-bill-to-open-government', {
    waitUntil: 'networkidle'
  });

  await page.waitForTimeout(2000);

  // Scroll to the author card (it's in the content section)
  await page.evaluate(() => {
    const h3s = Array.from(document.querySelectorAll('h3'));
    const aboutAuthor = h3s.find(h3 => h3.textContent === 'Michele White' &&
                                       h3.closest('div')?.textContent.includes('About the Author'));
    if (aboutAuthor) {
      aboutAuthor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });

  await page.waitForTimeout(1500);

  // Take screenshot centered on author card
  await page.screenshot({
    path: 'dev/screenshots/author-card-detail.png',
    fullPage: false
  });

  console.log('✅ Saved: dev/screenshots/author-card-detail.png');

  await browser.close();
}

captureAuthorCard().catch(console.error);
