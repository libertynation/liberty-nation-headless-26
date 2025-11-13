import { chromium } from 'playwright';
import fs from 'fs';

async function analyzeBothSites() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 2
  });

  const OUTPUT_DIR = './design-analysis';
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Analyze The Free Press
  console.log('\n📸 Analyzing The Free Press (thefp.com)...');
  const fpPage = await context.newPage();
  await fpPage.goto('https://www.thefp.com/', { waitUntil: 'networkidle', timeout: 60000 });

  await fpPage.screenshot({
    path: `${OUTPUT_DIR}/thefp-full-page.png`,
    fullPage: true
  });

  const fpAnalysis = await fpPage.evaluate(() => {
    const data = {};

    // Header analysis
    const header = document.querySelector('header');
    if (header) {
      const headerStyle = window.getComputedStyle(header);
      data.header = {
        height: header.offsetHeight,
        background: headerStyle.backgroundColor,
        borderBottom: headerStyle.borderBottom,
        position: headerStyle.position,
      };

      const logo = header.querySelector('img, [class*="logo"]');
      if (logo) {
        data.logo = {
          width: logo.offsetWidth,
          height: logo.offsetHeight,
          src: logo.src || logo.textContent,
        };
      }

      const nav = header.querySelectorAll('a, button');
      data.headerLinks = Array.from(nav).map(el => ({
        text: el.textContent.trim(),
        fontSize: window.getComputedStyle(el).fontSize,
        fontWeight: window.getComputedStyle(el).fontWeight,
      }));
    }

    // Main layout structure
    const main = document.querySelector('main') || document.body;
    const mainStyle = window.getComputedStyle(main);
    data.mainLayout = {
      background: mainStyle.backgroundColor,
      maxWidth: mainStyle.maxWidth,
      padding: mainStyle.padding,
    };

    // All sections
    data.sections = [];
    const sections = document.querySelectorAll('section, [class*="section"]');
    sections.forEach((section, i) => {
      const style = window.getComputedStyle(section);
      data.sections.push({
        index: i,
        background: style.backgroundColor,
        padding: style.padding,
        marginTop: style.marginTop,
        hasHeading: !!section.querySelector('h2, h3'),
        headingText: section.querySelector('h2, h3')?.textContent.trim(),
      });
    });

    return data;
  });

  console.log('✅ The Free Press analyzed');

  // Analyze Liberty Nation
  console.log('\n📸 Analyzing Liberty Nation (libertynation.com)...');
  const lnPage = await context.newPage();
  await lnPage.goto('https://www.libertynation.com/', { waitUntil: 'networkidle', timeout: 60000 });

  await lnPage.screenshot({
    path: `${OUTPUT_DIR}/libertynation-current.png`,
    fullPage: true
  });

  const lnAnalysis = await lnPage.evaluate(() => {
    const data = {};

    // Header
    const header = document.querySelector('header');
    if (header) {
      data.header = {
        height: header.offsetHeight,
      };
    }

    // Logo
    const logo = document.querySelector('[class*="logo"] img, .site-title img');
    if (logo) {
      data.logo = {
        src: logo.src,
        width: logo.offsetWidth,
        height: logo.offsetHeight,
      };
    }

    return data;
  });

  console.log('✅ Liberty Nation analyzed');

  // Save analyses
  fs.writeFileSync(
    `${OUTPUT_DIR}/complete-analysis.json`,
    JSON.stringify({ theFreePress: fpAnalysis, libertyNation: lnAnalysis }, null, 2)
  );

  console.log('\n✅ Analysis complete!');
  console.log('📄 Data: ./design-analysis/complete-analysis.json');
  console.log('📸 The Free Press: ./design-analysis/thefp-full-page.png');
  console.log('📸 Liberty Nation Current: ./design-analysis/libertynation-current.png');

  await browser.close();
}

analyzeBothSites().catch(console.error);
