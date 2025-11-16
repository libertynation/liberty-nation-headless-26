#!/usr/bin/env node

/**
 * Debug script to check author card rendering
 */

import { chromium } from 'playwright';

const ARTICLE_URL = 'http://localhost:3004/president-trump-signs-bill-to-open-government';

async function debugAuthorCard() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 }
  });

  await page.goto(ARTICLE_URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  console.log('=== DEBUG: Author Card Elements ===\n');

  // Get the full HTML structure of the content area
  const contentSection = await page.$('div.max-w-\\[900px\\]');
  if (contentSection) {
    const html = await contentSection.innerHTML();

    // Check if "About the Author" text exists
    const hasAboutAuthor = html.includes('About the Author');
    console.log(`Contains "About the Author": ${hasAboutAuthor}`);

    // Check if "Michele White" appears after the prose content
    const hasMicheleWhite = html.includes('Michele White');
    console.log(`Contains "Michele White": ${hasMicheleWhite}`);

    // Count divs with border classes
    const borderDivs = await contentSection.$$('div[class*="border"]');
    console.log(`Found ${borderDivs.length} divs with border classes in content section`);

    // Look for any h3 elements
    const h3Elements = await contentSection.$$('h3');
    console.log(`\nFound ${h3Elements.length} h3 elements in content section:`);
    for (const h3 of h3Elements) {
      const text = await h3.textContent();
      console.log(`  - "${text.substring(0, 100)}"`);
    }

    // Check for images
    const images = await contentSection.$$('img');
    console.log(`\nFound ${images.length} images in content section`);
    for (const img of images) {
      const alt = await img.getAttribute('alt');
      const src = await img.getAttribute('src');
      console.log(`  - Alt: "${alt}", Src: ${src?.substring(0, 60)}...`);
    }

    // Check last 2000 characters of HTML
    console.log(`\n=== Last 2000 chars of content section HTML ===`);
    console.log(html.slice(-2000));
  } else {
    console.log('❌ Could not find content section');
  }

  // Also check the entire page for AuthorCard-like elements
  console.log('\n\n=== Search entire page for author-related elements ===');

  const allH3s = await page.$$('h3');
  console.log(`\nAll H3 elements on page (${allH3s.length} total):`);
  for (const h3 of allH3s) {
    const text = await h3.textContent();
    console.log(`  - "${text}"`);
  }

  await browser.close();
}

debugAuthorCard().catch(console.error);
