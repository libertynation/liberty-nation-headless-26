#!/usr/bin/env node

/**
 * Verify article page rendering and check for author card
 */

import { chromium } from 'playwright';

const BASE_URL = 'http://localhost:3004';
const ARTICLE_URL = `${BASE_URL}/president-trump-signs-bill-to-open-government`;

async function verifyArticlePage() {
  console.log('Starting article page verification...\n');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();

  // Collect console messages
  const consoleMessages = [];
  page.on('console', msg => {
    consoleMessages.push(`[${msg.type()}] ${msg.text()}`);
  });

  // Collect errors
  const errors = [];
  page.on('pageerror', error => {
    errors.push(error.message);
  });

  try {
    console.log(`Loading: ${ARTICLE_URL}`);
    await page.goto(ARTICLE_URL, { waitUntil: 'networkidle', timeout: 30000 });

    // Wait for content to load
    await page.waitForTimeout(2000);

    // Check for author card at bottom
    console.log('\n=== Checking for Author Card ===');
    const authorCards = await page.$$('div:has(> h3:has-text("About the Author"))');
    console.log(`Found ${authorCards.length} author card(s)`);

    if (authorCards.length > 0) {
      for (let i = 0; i < authorCards.length; i++) {
        const card = authorCards[i];
        const hasImage = await card.$('img');
        const text = await card.textContent();
        console.log(`\nAuthor Card ${i + 1}:`);
        console.log(`  - Has image: ${hasImage ? 'Yes' : 'No'}`);
        console.log(`  - Text content: ${text.substring(0, 200)}...`);
      }
    } else {
      console.log('⚠️  No author card found with "About the Author" heading');
    }

    // Check for compact author card
    console.log('\n=== Checking for Compact Author Card ===');
    const compactCards = await page.$$('[class*="border-t border-gray-300"]:has(img[alt])');
    console.log(`Found ${compactCards.length} compact author card(s)`);

    // Scroll to bottom to see full author card
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);

    // Take screenshots
    console.log('\n=== Taking Screenshots ===');

    // Top of page (title area)
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);
    await page.screenshot({
      path: 'dev/screenshots/article-title.png',
      fullPage: false
    });
    console.log('✅ Saved: dev/screenshots/article-title.png');

    // Scroll to author metadata section
    await page.evaluate(() => {
      const elements = document.querySelectorAll('h2');
      for (const el of elements) {
        if (el.textContent.includes('By')) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          break;
        }
      }
    });
    await page.waitForTimeout(1000);
    await page.screenshot({
      path: 'dev/screenshots/article-metadata.png',
      fullPage: false
    });
    console.log('✅ Saved: dev/screenshots/article-metadata.png');

    // Bottom of article (author card)
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);
    await page.screenshot({
      path: 'dev/screenshots/article-bottom.png',
      fullPage: false
    });
    console.log('✅ Saved: dev/screenshots/article-bottom.png');

    // Full page screenshot
    await page.screenshot({
      path: 'dev/screenshots/article-fullpage.png',
      fullPage: true
    });
    console.log('✅ Saved: dev/screenshots/article-fullpage.png');

    // Check typography
    console.log('\n=== Typography Check ===');
    const h1Font = await page.$eval('h1', el => window.getComputedStyle(el).fontFamily);
    const pFont = await page.$eval('p', el => window.getComputedStyle(el).fontFamily);
    const h2Font = await page.$eval('h2', el => window.getComputedStyle(el).fontFamily);

    console.log(`H1 font family: ${h1Font}`);
    console.log(`H2 font family: ${h2Font}`);
    console.log(`P font family: ${pFont}`);

    if (h1Font.includes('Lora')) {
      console.log('✅ H1 using Lora (correct)');
    } else {
      console.log('❌ H1 NOT using Lora');
    }

    if (pFont.includes('Libre Baskerville')) {
      console.log('✅ P using Libre Baskerville (correct)');
    } else {
      console.log('❌ P NOT using Libre Baskerville');
    }

    // Report console messages
    if (consoleMessages.length > 0) {
      console.log('\n=== Console Messages ===');
      consoleMessages.slice(0, 10).forEach(msg => console.log(msg));
    }

    // Report errors
    if (errors.length > 0) {
      console.log('\n=== Page Errors ===');
      errors.forEach(err => console.log(`❌ ${err}`));
    } else {
      console.log('\n✅ No page errors detected');
    }

  } catch (error) {
    console.error('Error during verification:', error);
  } finally {
    await browser.close();
  }

  console.log('\n✅ Verification complete!');
}

verifyArticlePage().catch(console.error);
