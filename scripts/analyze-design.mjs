import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const SITE_URL = 'https://www.thefp.com/';
const OUTPUT_DIR = './design-analysis';

async function analyzeDesign() {
  // Create output directory
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 2
  });
  const page = await context.newPage();

  console.log(`🔍 Analyzing ${SITE_URL}...`);
  await page.goto(SITE_URL, { waitUntil: 'networkidle' });

  // Take full-page screenshot
  console.log('📸 Capturing full-page screenshot...');
  await page.screenshot({
    path: `${OUTPUT_DIR}/full-page.png`,
    fullPage: true
  });

  // Take viewport screenshot
  console.log('📸 Capturing viewport screenshot...');
  await page.screenshot({
    path: `${OUTPUT_DIR}/viewport.png`,
    fullPage: false
  });

  // Analyze header
  console.log('📋 Analyzing header...');
  const headerData = await page.evaluate(() => {
    const header = document.querySelector('header') || document.querySelector('[role="banner"]');
    if (!header) return null;

    const computedStyle = window.getComputedStyle(header);
    return {
      backgroundColor: computedStyle.backgroundColor,
      height: computedStyle.height,
      padding: computedStyle.padding,
      borderBottom: computedStyle.borderBottom,
      position: computedStyle.position,
      zIndex: computedStyle.zIndex,
    };
  });

  // Analyze typography
  console.log('🔤 Analyzing typography...');
  const typographyData = await page.evaluate(() => {
    const elements = {
      h1: document.querySelector('h1'),
      h2: document.querySelector('h2'),
      h3: document.querySelector('h3'),
      p: document.querySelector('p'),
      a: document.querySelector('a'),
    };

    const typography = {};
    Object.entries(elements).forEach(([tag, el]) => {
      if (el) {
        const style = window.getComputedStyle(el);
        typography[tag] = {
          fontFamily: style.fontFamily,
          fontSize: style.fontSize,
          fontWeight: style.fontWeight,
          lineHeight: style.lineHeight,
          letterSpacing: style.letterSpacing,
          textTransform: style.textTransform,
          color: style.color,
        };
      }
    });

    return typography;
  });

  // Analyze layout structure
  console.log('📐 Analyzing layout...');
  const layoutData = await page.evaluate(() => {
    const main = document.querySelector('main') || document.querySelector('[role="main"]');
    const container = document.querySelector('.container, [class*="container"]');

    const getStyles = (el) => {
      if (!el) return null;
      const style = window.getComputedStyle(el);
      return {
        maxWidth: style.maxWidth,
        width: style.width,
        padding: style.padding,
        margin: style.margin,
        display: style.display,
        gridTemplateColumns: style.gridTemplateColumns,
        gap: style.gap,
      };
    };

    return {
      main: getStyles(main),
      container: getStyles(container),
    };
  });

  // Analyze color palette
  console.log('🎨 Analyzing colors...');
  const colorData = await page.evaluate(() => {
    const colors = new Set();
    const elements = document.querySelectorAll('*');

    elements.forEach(el => {
      const style = window.getComputedStyle(el);
      if (style.color) colors.add(style.color);
      if (style.backgroundColor && style.backgroundColor !== 'rgba(0, 0, 0, 0)') {
        colors.add(style.backgroundColor);
      }
      if (style.borderColor) colors.add(style.borderColor);
    });

    return Array.from(colors).slice(0, 20); // Top 20 most common colors
  });

  // Analyze spacing
  console.log('📏 Analyzing spacing...');
  const spacingData = await page.evaluate(() => {
    const articles = Array.from(document.querySelectorAll('article')).slice(0, 5);
    return articles.map((article, i) => {
      const style = window.getComputedStyle(article);
      return {
        index: i,
        margin: style.margin,
        padding: style.padding,
        gap: style.gap,
        width: style.width,
        height: style.height,
      };
    });
  });

  // Extract article structure
  console.log('📰 Analyzing article structure...');
  const articleData = await page.evaluate(() => {
    const articles = Array.from(document.querySelectorAll('article')).slice(0, 10);
    return articles.map((article, i) => {
      const img = article.querySelector('img');
      const heading = article.querySelector('h1, h2, h3, h4, h5, h6');
      const excerpt = article.querySelector('p');
      const link = article.querySelector('a');

      const getElStyle = (el) => {
        if (!el) return null;
        const style = window.getComputedStyle(el);
        return {
          fontSize: style.fontSize,
          fontWeight: style.fontWeight,
          fontFamily: style.fontFamily,
          lineHeight: style.lineHeight,
          marginBottom: style.marginBottom,
          color: style.color,
        };
      };

      return {
        index: i,
        hasImage: !!img,
        imageSize: img ? `${img.width}x${img.height}` : null,
        heading: heading ? {
          text: heading.textContent.substring(0, 50),
          style: getElStyle(heading),
        } : null,
        excerpt: excerpt ? {
          text: excerpt.textContent.substring(0, 80),
          style: getElStyle(excerpt),
        } : null,
      };
    });
  });

  // Get computed styles for specific elements
  console.log('🎯 Analyzing specific UI elements...');
  const uiElements = await page.evaluate(() => {
    const selectors = {
      subscribeButton: 'button:has-text("Subscribe"), a:has-text("Subscribe")',
      newsletterLink: 'a:has-text("Newsletter")',
      signInLink: 'a:has-text("Sign")',
    };

    const elements = {};
    Object.entries(selectors).forEach(([key, selector]) => {
      try {
        const el = document.querySelector(selector);
        if (el) {
          const style = window.getComputedStyle(el);
          elements[key] = {
            text: el.textContent,
            fontSize: style.fontSize,
            fontWeight: style.fontWeight,
            padding: style.padding,
            backgroundColor: style.backgroundColor,
            color: style.color,
            borderRadius: style.borderRadius,
            border: style.border,
            textTransform: style.textTransform,
            letterSpacing: style.letterSpacing,
          };
        }
      } catch (e) {
        elements[key] = null;
      }
    });

    return elements;
  });

  // Save all analysis data
  const analysisData = {
    timestamp: new Date().toISOString(),
    url: SITE_URL,
    header: headerData,
    typography: typographyData,
    layout: layoutData,
    colors: colorData,
    spacing: spacingData,
    articles: articleData,
    uiElements: uiElements,
  };

  fs.writeFileSync(
    `${OUTPUT_DIR}/analysis.json`,
    JSON.stringify(analysisData, null, 2)
  );

  console.log('✅ Analysis complete! Files saved to:', OUTPUT_DIR);
  console.log('📄 Analysis data:', `${OUTPUT_DIR}/analysis.json`);
  console.log('📸 Screenshots:', `${OUTPUT_DIR}/full-page.png`, `${OUTPUT_DIR}/viewport.png`);

  await browser.close();
}

analyzeDesign().catch(console.error);
