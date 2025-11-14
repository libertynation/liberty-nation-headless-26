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

const sections = {
  homepage: {
    url: 'http://localhost:3004/',
    sections: [
      { name: 'header', selector: 'header' },
      { name: 'hero-section', selector: 'main > div:nth-child(1)' },
      { name: 'breaking-headlines', selector: 'main > div:nth-child(2)' },
      { name: 'category-buttons', selector: 'main > div:nth-child(3)' },
      { name: 'daily-briefing', selector: 'main > div:nth-child(4)' },
      { name: 'footer', selector: 'footer' },
    ],
  },
  article: {
    url: 'http://localhost:3004/president-trump-signs-bill-to-open-government',
    sections: [
      { name: 'header', selector: 'header' },
      { name: 'article-header', selector: 'article header' },
      { name: 'article-content', selector: 'article .prose' },
      { name: 'author-card', selector: 'article > div:has(img[alt*="avatar"])' },
      { name: 'share-buttons', selector: 'div:has([aria-label*="Share"])' },
      { name: 'footer', selector: 'footer' },
    ],
  },
};

async function captureSectionScreenshots() {
  console.log('Starting section-by-section screenshot capture...\n');

  const browser = await chromium.launch({ headless: true });

  for (const [pageName, pageConfig] of Object.entries(sections)) {
    console.log(`\n📄 Processing ${pageName}...`);

    for (const [viewportName, viewport] of Object.entries(viewports)) {
      console.log(`\n  📱 ${viewportName} (${viewport.width}x${viewport.height})...`);

      const context = await browser.newContext({
        viewport,
        deviceScaleFactor: viewportName === 'mobile' ? 2 : 1,
      });

      const page = await context.newPage();

      try {
        // Navigate to page
        await page.goto(pageConfig.url, { waitUntil: 'networkidle', timeout: 30000 });

        // Wait for initial animations
        await page.waitForTimeout(3000);

        // Scroll through page to trigger any scroll-based animations
        await page.evaluate(async () => {
          const scrollHeight = document.documentElement.scrollHeight;
          const viewportHeight = window.innerHeight;
          const scrollSteps = Math.ceil(scrollHeight / viewportHeight);

          for (let i = 0; i < scrollSteps; i++) {
            window.scrollTo({
              top: i * viewportHeight,
              behavior: 'smooth',
            });
            await new Promise(resolve => setTimeout(resolve, 500));
          }

          // Scroll back to top
          window.scrollTo({ top: 0, behavior: 'smooth' });
          await new Promise(resolve => setTimeout(resolve, 500));
        });

        // Additional wait for animations to settle
        await page.waitForTimeout(2000);

        // Capture each section
        for (const section of pageConfig.sections) {
          try {
            const element = await page.$(section.selector);

            if (!element) {
              console.log(`    ⚠️  Section not found: ${section.name}`);
              continue;
            }

            // Scroll element into view
            await element.scrollIntoViewIfNeeded();
            await page.waitForTimeout(1000);

            // Take screenshot
            const screenshotPath = join(
              projectRoot,
              'dev',
              'screenshots',
              'claude-generated',
              'sections',
              `${pageName}-${section.name}-${viewportName}.png`
            );

            await element.screenshot({
              path: screenshotPath,
            });

            console.log(`    ✅ ${section.name}`);

          } catch (error) {
            console.error(`    ❌ Error capturing ${section.name}:`, error.message);
          }
        }

      } catch (error) {
        console.error(`  ❌ Error loading ${pageName}:`, error.message);
      }

      await context.close();
    }
  }

  await browser.close();
  console.log('\n✨ Section screenshot capture complete!\n');
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  captureSectionScreenshots().catch(console.error);
}

export { captureSectionScreenshots };
