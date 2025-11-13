import { chromium } from 'playwright';
import { promises as fs } from 'fs';
import path from 'path';

const THEFP_URL = 'https://www.thefp.com';
const OUTPUT_DIR = path.join(process.cwd(), 'design-analysis', 'thefp-current');

async function captureTheFPDesign() {
  console.log('🎬 Launching browser...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  });

  const page = await context.newPage();

  try {
    // Create output directory
    await fs.mkdir(OUTPUT_DIR, { recursive: true });
    console.log(`📁 Output directory: ${OUTPUT_DIR}`);

    // Navigate to The Free Press homepage
    console.log(`🌐 Navigating to ${THEFP_URL}...`);
    await page.goto(THEFP_URL, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000); // Wait for any animations

    // Take full page screenshot
    console.log('📸 Capturing full homepage...');
    await page.screenshot({
      path: path.join(OUTPUT_DIR, 'homepage-full.png'),
      fullPage: true
    });

    // Take viewport screenshot
    console.log('📸 Capturing viewport...');
    await page.screenshot({
      path: path.join(OUTPUT_DIR, 'homepage-viewport.png'),
      fullPage: false
    });

    // Capture header
    console.log('📸 Capturing header...');
    const header = await page.locator('header').first();
    if (await header.count() > 0) {
      await header.screenshot({
        path: path.join(OUTPUT_DIR, 'header.png')
      });
    }

    // Capture hero/featured article section
    console.log('📸 Capturing hero section...');
    await page.screenshot({
      path: path.join(OUTPUT_DIR, 'hero-section.png'),
      clip: { x: 0, y: 0, width: 1920, height: 900 }
    });

    // Find and navigate to an article
    console.log('🔍 Finding an article...');
    const articleLinks = await page.locator('article a[href*="/p/"], a[href*="/article/"]').all();

    if (articleLinks.length > 0) {
      const firstArticleHref = await articleLinks[0].getAttribute('href');
      let articleUrl = firstArticleHref;

      if (!articleUrl.startsWith('http')) {
        articleUrl = new URL(articleUrl, THEFP_URL).href;
      }

      console.log(`📰 Navigating to article: ${articleUrl}`);
      await page.goto(articleUrl, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(2000);

      // Capture article page
      console.log('📸 Capturing article page...');
      await page.screenshot({
        path: path.join(OUTPUT_DIR, 'article-full.png'),
        fullPage: true
      });

      await page.screenshot({
        path: path.join(OUTPUT_DIR, 'article-viewport.png'),
        fullPage: false
      });

      // Capture article header/title area
      console.log('📸 Capturing article header...');
      await page.screenshot({
        path: path.join(OUTPUT_DIR, 'article-header.png'),
        clip: { x: 0, y: 0, width: 1920, height: 600 }
      });

      // Extract article styling information
      console.log('🔍 Analyzing article styling...');
      const articleData = await page.evaluate(() => {
        const getComputedStyles = (selector) => {
          const el = document.querySelector(selector);
          if (!el) return null;
          const styles = window.getComputedStyle(el);
          return {
            fontFamily: styles.fontFamily,
            fontSize: styles.fontSize,
            fontWeight: styles.fontWeight,
            lineHeight: styles.lineHeight,
            color: styles.color,
            marginTop: styles.marginTop,
            marginBottom: styles.marginBottom,
            paddingTop: styles.paddingTop,
            paddingBottom: styles.paddingBottom,
          };
        };

        return {
          title: getComputedStyles('h1'),
          subtitle: getComputedStyles('h2'),
          paragraph: getComputedStyles('article p, .post-content p, .article-content p'),
          link: getComputedStyles('article a, .post-content a, .article-content a'),
          blockquote: getComputedStyles('article blockquote, .post-content blockquote'),
        };
      });

      await fs.writeFile(
        path.join(OUTPUT_DIR, 'article-styles.json'),
        JSON.stringify(articleData, null, 2)
      );
      console.log('💾 Saved article styles to article-styles.json');
    }

    // Go back to homepage for more analysis
    console.log('🏠 Returning to homepage...');
    await page.goto(THEFP_URL, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);

    // Extract homepage design data
    console.log('🔍 Analyzing homepage design...');
    const designData = await page.evaluate(() => {
      const getComputedStyles = (selector) => {
        const el = document.querySelector(selector);
        if (!el) return null;
        const styles = window.getComputedStyle(el);
        return {
          fontFamily: styles.fontFamily,
          fontSize: styles.fontSize,
          fontWeight: styles.fontWeight,
          lineHeight: styles.lineHeight,
          color: styles.color,
          backgroundColor: styles.backgroundColor,
          padding: styles.padding,
          margin: styles.margin,
        };
      };

      return {
        body: getComputedStyles('body'),
        header: getComputedStyles('header'),
        mainHeadline: getComputedStyles('h1'),
        cardTitle: getComputedStyles('article h2, article h3'),
        bodyText: getComputedStyles('p'),
        links: getComputedStyles('a'),
      };
    });

    await fs.writeFile(
      path.join(OUTPUT_DIR, 'design-data.json'),
      JSON.stringify(designData, null, 2)
    );
    console.log('💾 Saved design data to design-data.json');

    console.log('✅ Screenshot capture complete!');
    console.log(`📁 Files saved to: ${OUTPUT_DIR}`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    throw error;
  } finally {
    await browser.close();
  }
}

captureTheFPDesign().catch(console.error);
