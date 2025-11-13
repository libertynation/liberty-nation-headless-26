import { chromium } from 'playwright';
import fs from 'fs';

const OUTPUT_DIR = './design-analysis';

async function compareDesigns() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 2
  });
  const page = await context.newPage();

  console.log('📸 Capturing Liberty Nation redesign...');
  await page.goto('http://localhost:3003', { waitUntil: 'networkidle', timeout: 30000 });

  // Wait for images to load
  await page.waitForTimeout(2000);

  await page.screenshot({
    path: `${OUTPUT_DIR}/liberty-nation-redesign.png`,
    fullPage: false
  });

  console.log('✅ Screenshot saved!');
  console.log('📸 Redesign: ./design-analysis/liberty-nation-redesign.png');
  console.log('📸 Original (The Free Press): ./design-analysis/viewport.png');

  await browser.close();
}

compareDesigns().catch(console.error);
