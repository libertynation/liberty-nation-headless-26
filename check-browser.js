const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const errors = [];
  const warnings = [];

  page.on('console', msg => {
    const type = msg.type();
    const text = msg.text();
    console.log(`[${type.toUpperCase()}]`, text);
    if (type === 'error') errors.push(text);
    if (type === 'warning') warnings.push(text);
  });

  page.on('pageerror', error => {
    console.log('[PAGE ERROR]', error.message);
    errors.push(error.message);
  });

  await page.goto('http://localhost:4000');
  await page.waitForTimeout(8000);

  console.log('\n=== CHECKING LAYOUT ===');

  // Check hero grid
  const heroGrid = await page.$('.grid.grid-cols-1.lg\\:grid-cols-\\[26\\%_48\\%_26\\%\\]');
  console.log('Hero grid found:', !!heroGrid);

  if (heroGrid) {
    const computedStyle = await heroGrid.evaluate(el => {
      return window.getComputedStyle(el).gridTemplateColumns;
    });
    console.log('Grid columns:', computedStyle);
  }

  // Check for Editor's Choice images
  const editorImages = await page.$$('img[alt*=""]');
  console.log('Total images on page:', editorImages.length);

  console.log('\n=== SUMMARY ===');
  console.log('Errors:', errors.length);
  console.log('Warnings:', warnings.length);

  if (errors.length > 0) {
    console.log('\n=== ERRORS ===');
    errors.forEach(err => console.log(err));
  }

  await browser.close();
})();
