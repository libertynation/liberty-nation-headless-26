#!/usr/bin/env node

import { captureFullPageScreenshots } from './screenshot-full-page.mjs';
import { captureSectionScreenshots } from './screenshot-sections.mjs';

console.log('═══════════════════════════════════════════════════════════');
console.log('   Liberty Nation - Comprehensive Screenshot Capture');
console.log('═══════════════════════════════════════════════════════════\n');

async function main() {
  try {
    console.log('⏱️  Starting screenshot capture process...\n');
    const startTime = Date.now();

    // Capture full-page screenshots
    console.log('STEP 1: Full-Page Screenshots');
    console.log('─'.repeat(60));
    await captureFullPageScreenshots();

    // Capture section screenshots
    console.log('\nSTEP 2: Section-by-Section Screenshots');
    console.log('─'.repeat(60));
    await captureSectionScreenshots();

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);

    console.log('\n═══════════════════════════════════════════════════════════');
    console.log(`✨ All screenshots captured successfully in ${duration}s`);
    console.log('═══════════════════════════════════════════════════════════\n');

    console.log('📁 Screenshots saved to:');
    console.log('   • dev/screenshots/claude-generated/desktop/');
    console.log('   • dev/screenshots/claude-generated/tablet/');
    console.log('   • dev/screenshots/claude-generated/mobile/');
    console.log('   • dev/screenshots/claude-generated/sections/\n');

    console.log('Next steps:');
    console.log('   1. Review screenshots in the folders above');
    console.log('   2. Run design review agents for detailed analysis\n');

  } catch (error) {
    console.error('\n❌ Error during screenshot capture:', error);
    process.exit(1);
  }
}

main();
