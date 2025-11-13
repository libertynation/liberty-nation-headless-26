import { chromium } from 'playwright';
import { promises as fs } from 'fs';
import path from 'path';

const LOCAL_URL = 'http://localhost:3007';
const OUTPUT_DIR = path.join(process.cwd(), 'design-analysis', 'local-site');

async function captureLocalSite() {
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

    // Capture Homepage
    console.log(`🌐 Navigating to homepage...`);
    await page.goto(LOCAL_URL, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);

    console.log('📸 Capturing homepage full page...');
    await page.screenshot({
      path: path.join(OUTPUT_DIR, 'homepage-full.png'),
      fullPage: true
    });

    console.log('📸 Capturing homepage viewport...');
    await page.screenshot({
      path: path.join(OUTPUT_DIR, 'homepage-viewport.png'),
      fullPage: false
    });

    // Capture an article page
    console.log('🔍 Finding an article...');
    const articleLinks = await page.locator('article a[href^="/"]').all();

    if (articleLinks.length > 0) {
      const firstArticleHref = await articleLinks[0].getAttribute('href');
      const articleUrl = `${LOCAL_URL}${firstArticleHref}`;

      console.log(`📰 Navigating to article: ${articleUrl}`);
      await page.goto(articleUrl, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(2000);

      console.log('📸 Capturing article page full...');
      await page.screenshot({
        path: path.join(OUTPUT_DIR, 'article-full.png'),
        fullPage: true
      });

      console.log('📸 Capturing article viewport...');
      await page.screenshot({
        path: path.join(OUTPUT_DIR, 'article-viewport.png'),
        fullPage: false
      });

      // Capture article content area
      console.log('📸 Capturing article content...');
      await page.screenshot({
        path: path.join(OUTPUT_DIR, 'article-content.png'),
        clip: { x: 300, y: 200, width: 1320, height: 1400 }
      });
    }

    // Capture Search page
    console.log('🔍 Navigating to search page...');
    await page.goto(`${LOCAL_URL}/search`, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(1000);

    console.log('📸 Capturing search page...');
    await page.screenshot({
      path: path.join(OUTPUT_DIR, 'search-page.png'),
      fullPage: false
    });

    // Capture a category page
    console.log('📰 Navigating to Politics category...');
    await page.goto(`${LOCAL_URL}/politics`, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);

    console.log('📸 Capturing category page...');
    await page.screenshot({
      path: path.join(OUTPUT_DIR, 'category-page.png'),
      fullPage: true
    });

    // Capture About page
    console.log('📄 Navigating to About page...');
    await page.goto(`${LOCAL_URL}/about`, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(1000);

    console.log('📸 Capturing about page...');
    await page.screenshot({
      path: path.join(OUTPUT_DIR, 'about-page.png'),
      fullPage: false
    });

    console.log('✅ Screenshot capture complete!');
    console.log(`📁 Files saved to: ${OUTPUT_DIR}`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    throw error;
  } finally {
    await browser.close();
  }
}

captureLocalSite().catch(console.error);
