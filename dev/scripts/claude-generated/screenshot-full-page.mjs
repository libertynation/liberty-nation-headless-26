import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '../../..');

const viewports = {
  desktop: { width: 1920, height: 1080 },
  tablet: { width: 768, height: 1024 },
  mobile: { width: 375, height: 812 },
};

const pages = [
  { name: 'homepage', url: 'http://localhost:3004/' },
  { name: 'article', url: 'http://localhost:3004/president-trump-signs-bill-to-open-government' },
  { name: 'category-politics', url: 'http://localhost:3004/category/politics' },
  { name: 'category-economy', url: 'http://localhost:3004/category/economy' },
  { name: 'category-culture', url: 'http://localhost:3004/category/culture' },
  { name: 'newsletters', url: 'http://localhost:3004/newsletters' },
  { name: 'subscribe', url: 'http://localhost:3004/subscribe' },
  { name: 'donate', url: 'http://localhost:3004/donate' },
];

async function captureFullPageScreenshots() {
  console.log('Starting full-page screenshot capture...\n');

  const browser = await chromium.launch({ headless: true });

  for (const [viewportName, viewport] of Object.entries(viewports)) {
    console.log(`\n📱 Capturing ${viewportName} screenshots (${viewport.width}x${viewport.height})...`);

    const context = await browser.newContext({
      viewport,
      deviceScaleFactor: viewportName === 'mobile' ? 2 : 1,
    });

    const page = await context.newPage();

    for (const pageInfo of pages) {
      try {
        console.log(`  📸 ${pageInfo.name}...`);

        // Navigate to page
        await page.goto(pageInfo.url, { waitUntil: 'networkidle', timeout: 30000 });

        // Wait for animations to complete
        await page.waitForTimeout(2000);

        // Additional wait for lazy-loaded images
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

        // Take screenshot
        const screenshotPath = join(
          projectRoot,
          'dev',
          'screenshots',
          'claude-generated',
          viewportName,
          `${pageInfo.name}.png`
        );

        await page.screenshot({
          path: screenshotPath,
          fullPage: true,
        });

        console.log(`    ✅ Saved to: ${viewportName}/${pageInfo.name}.png`);

      } catch (error) {
        console.error(`    ❌ Error capturing ${pageInfo.name}:`, error.message);
      }
    }

    await context.close();
  }

  await browser.close();
  console.log('\n✨ Full-page screenshot capture complete!\n');
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  captureFullPageScreenshots().catch(console.error);
}

export { captureFullPageScreenshots };
