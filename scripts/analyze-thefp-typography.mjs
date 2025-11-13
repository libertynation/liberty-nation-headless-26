import { chromium } from 'playwright';

const THEFP_URL = 'https://www.thefp.com';

async function analyzeTypography() {
  console.log('🎬 Launching browser...');
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
  });

  const page = await context.newPage();

  try {
    console.log(`🌐 Navigating to ${THEFP_URL}...`);
    await page.goto(THEFP_URL, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(3000);

    console.log('🔍 Analyzing exact typography and layout...\n');

    const analysis = await page.evaluate(() => {
      const measurements = {};

      // Find main container
      const main = document.querySelector('main') || document.body;
      const mainStyles = window.getComputedStyle(main);
      measurements.mainBackground = mainStyles.backgroundColor;
      measurements.mainPadding = mainStyles.padding;

      // Find the three-column layout
      const grid = document.querySelector('[class*="grid"], [class*="flex"]');
      if (grid) {
        const gridStyles = window.getComputedStyle(grid);
        measurements.gridGap = gridStyles.gap || gridStyles.columnGap;
        measurements.gridColumns = gridStyles.gridTemplateColumns;
      }

      // Analyze sidebar article cards (left/right)
      const sidebarArticles = Array.from(document.querySelectorAll('article')).slice(0, 6);
      if (sidebarArticles.length > 0) {
        const firstCard = sidebarArticles[0];
        const cardTitle = firstCard.querySelector('h2, h3, a');
        const cardMeta = firstCard.querySelector('[class*="meta"], [class*="author"], time');
        const cardImage = firstCard.querySelector('img');

        if (cardTitle) {
          const titleStyles = window.getComputedStyle(cardTitle);
          measurements.sidebarTitle = {
            fontSize: titleStyles.fontSize,
            fontWeight: titleStyles.fontWeight,
            lineHeight: titleStyles.lineHeight,
            fontFamily: titleStyles.fontFamily,
            marginBottom: titleStyles.marginBottom,
            color: titleStyles.color,
          };
        }

        if (cardMeta) {
          const metaStyles = window.getComputedStyle(cardMeta);
          measurements.sidebarMeta = {
            fontSize: metaStyles.fontSize,
            fontWeight: metaStyles.fontWeight,
            color: metaStyles.color,
            fontFamily: metaStyles.fontFamily,
          };
        }

        if (cardImage) {
          const imgBox = cardImage.getBoundingClientRect();
          measurements.sidebarImageSize = {
            width: imgBox.width,
            height: imgBox.height,
            aspectRatio: (imgBox.width / imgBox.height).toFixed(2),
          };
        }
      }

      // Analyze featured/hero article (center)
      const heroHeadline = document.querySelector('h1, [class*="hero"] h2, [class*="featured"] h1');
      if (heroHeadline) {
        const heroStyles = window.getComputedStyle(heroHeadline);
        const heroBox = heroHeadline.getBoundingClientRect();
        measurements.heroHeadline = {
          fontSize: heroStyles.fontSize,
          fontWeight: heroStyles.fontWeight,
          lineHeight: heroStyles.lineHeight,
          fontFamily: heroStyles.fontFamily,
          letterSpacing: heroStyles.letterSpacing,
          color: heroStyles.color,
          width: heroBox.width,
          textTransform: heroStyles.textTransform,
        };
      }

      // Find hero image
      const heroImage = document.querySelector('[class*="hero"] img, [class*="featured"] img');
      if (heroImage) {
        const heroImgBox = heroImage.getBoundingClientRect();
        measurements.heroImageSize = {
          width: heroImgBox.width,
          height: heroImgBox.height,
          aspectRatio: (heroImgBox.width / heroImgBox.height).toFixed(2),
        };
      }

      // Get spacing between elements
      const allArticles = Array.from(document.querySelectorAll('article'));
      if (allArticles.length >= 2) {
        const first = allArticles[0].getBoundingClientRect();
        const second = allArticles[1].getBoundingClientRect();
        measurements.articleSpacing = (second.top - first.bottom).toFixed(0) + 'px';
      }

      return measurements;
    });

    console.log('📊 Typography & Layout Analysis:\n');
    console.log(JSON.stringify(analysis, null, 2));

    await page.waitForTimeout(5000); // Keep browser open to inspect

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await browser.close();
  }
}

analyzeTypography().catch(console.error);
