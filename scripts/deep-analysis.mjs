import { chromium } from 'playwright';
import fs from 'fs';

async function deepAnalysis() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 },
  });

  await page.goto('https://www.thefp.com/', { waitUntil: 'networkidle' });

  // Get EXACT measurements
  const measurements = await page.evaluate(() => {
    const results = {};

    // Header
    const header = document.querySelector('header') || document.querySelector('[class*="header"]');
    if (header) {
      const style = window.getComputedStyle(header);
      results.header = {
        height: header.offsetHeight,
        padding: style.padding,
        background: style.backgroundColor,
        borderBottom: style.borderBottom,
      };
    }

    // Logo
    const logo = document.querySelector('[class*="logo"]') || document.querySelector('img[alt*="Free Press"]');
    if (logo) {
      results.logo = {
        width: logo.offsetWidth,
        height: logo.offsetHeight,
      };
    }

    // Main container
    const main = document.querySelector('main') || document.body.children[1];
    if (main) {
      const style = window.getComputedStyle(main);
      results.mainContainer = {
        maxWidth: style.maxWidth,
        padding: style.padding,
        background: style.backgroundColor,
        display: style.display,
        gap: style.gap,
      };
    }

    // Get all article elements
    const articles = Array.from(document.querySelectorAll('article')).slice(0, 10);
    results.articles = articles.map((article, i) => {
      const heading = article.querySelector('h1, h2, h3');
      const image = article.querySelector('img');
      const style = window.getComputedStyle(article);

      const headingStyle = heading ? window.getComputedStyle(heading) : null;

      return {
        index: i,
        width: article.offsetWidth,
        height: article.offsetHeight,
        background: style.backgroundColor,
        padding: style.padding,
        margin: style.margin,
        border: style.border,
        borderRadius: style.borderRadius,
        boxShadow: style.boxShadow,
        heading: headingStyle ? {
          fontSize: headingStyle.fontSize,
          fontWeight: headingStyle.fontWeight,
          fontFamily: headingStyle.fontFamily,
          lineHeight: headingStyle.lineHeight,
          letterSpacing: headingStyle.letterSpacing,
          textTransform: headingStyle.textTransform,
          color: headingStyle.color,
          marginBottom: headingStyle.marginBottom,
        } : null,
        hasImage: !!image,
        imageSize: image ? { width: image.offsetWidth, height: image.offsetHeight } : null,
      };
    });

    // Grid structure
    const grid = document.querySelector('[style*="grid"], [class*="grid"]');
    if (grid) {
      const style = window.getComputedStyle(grid);
      results.gridLayout = {
        display: style.display,
        gridTemplateColumns: style.gridTemplateColumns,
        gap: style.gap,
        columnGap: style.columnGap,
        rowGap: style.rowGap,
      };
    }

    // Featured article (usually largest)
    const featured = document.querySelector('[class*="featured"], article:nth-of-type(1)');
    if (featured) {
      const featuredHeading = featured.querySelector('h1, h2');
      const featuredImage = featured.querySelector('img');
      const style = window.getComputedStyle(featured);
      const headingStyle = featuredHeading ? window.getComputedStyle(featuredHeading) : null;

      results.featuredArticle = {
        width: featured.offsetWidth,
        height: featured.offsetHeight,
        background: style.backgroundColor,
        padding: style.padding,
        heading: headingStyle ? {
          fontSize: headingStyle.fontSize,
          fontWeight: headingStyle.fontWeight,
          fontFamily: headingStyle.fontFamily,
          lineHeight: headingStyle.lineHeight,
          textTransform: headingStyle.textTransform,
          color: headingStyle.color,
        } : null,
        imageSize: featuredImage ? {
          width: featuredImage.offsetWidth,
          height: featuredImage.offsetHeight,
        } : null,
      };
    }

    return results;
  });

  console.log('\n📐 EXACT MEASUREMENTS:');
  console.log(JSON.stringify(measurements, null, 2));

  fs.writeFileSync('./design-analysis/exact-measurements.json', JSON.stringify(measurements, null, 2));

  console.log('\n✅ Saved to: ./design-analysis/exact-measurements.json');
  console.log('\n⏸️  Browser left open for manual inspection. Press Ctrl+C when done.');
}

deepAnalysis().catch(console.error);
