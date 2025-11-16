#!/usr/bin/env node

/**
 * Test script to ensure no 404s exist on the site
 * Tests all major routes and reports any failures
 */

const BASE_URL = 'http://localhost:3004';

const routes = [
  // Main routes
  { path: '/', name: 'Homepage' },

  // Content pages
  { path: '/newsletters', name: 'Newsletters' },
  { path: '/donate', name: 'Donate' },
  { path: '/subscribe', name: 'Subscribe' },
  { path: '/about', name: 'About' },
  { path: '/contact', name: 'Contact' },
  { path: '/authors', name: 'Authors' },
  { path: '/search', name: 'Search' },
  { path: '/signin', name: 'Sign In' },

  // Media sections
  { path: '/lntv', name: 'LNTV' },
  { path: '/audio', name: 'Audio/Radio' },
  { path: '/liberty-vault', name: 'Liberty Vault' },

  // Policy pages
  { path: '/privacy-policy', name: 'Privacy Policy' },
  { path: '/terms-and-conditions', name: 'Terms and Conditions' },
  { path: '/republishing-guidelines', name: 'Republishing Guidelines' },

  // Category pages (examples)
  { path: '/category/politics', name: 'Politics Category' },
  { path: '/category/economy', name: 'Economy Category' },
  { path: '/category/culture', name: 'Culture Category' },
];

async function testRoute(route) {
  const url = `${BASE_URL}${route.path}`;

  try {
    const response = await fetch(url, {
      method: 'HEAD',
      redirect: 'follow'
    });

    const status = response.status;

    if (status === 404) {
      return { ...route, status, success: false, error: '404 Not Found' };
    } else if (status >= 400) {
      return { ...route, status, success: false, error: `HTTP ${status}` };
    } else {
      return { ...route, status, success: true };
    }
  } catch (error) {
    return { ...route, status: 0, success: false, error: error.message };
  }
}

async function runTests() {
  console.log('═══════════════════════════════════════════════════════════');
  console.log('   Liberty Nation - Page Availability Test');
  console.log('═══════════════════════════════════════════════════════════\n');

  console.log(`Testing ${routes.length} routes...\n`);

  const results = [];
  let successCount = 0;
  let failCount = 0;

  for (const route of routes) {
    const result = await testRoute(route);
    results.push(result);

    if (result.success) {
      console.log(`✅ ${result.name.padEnd(30)} [${result.status}] ${route.path}`);
      successCount++;
    } else {
      console.log(`❌ ${result.name.padEnd(30)} [${result.status}] ${route.path}`);
      console.log(`   Error: ${result.error}`);
      failCount++;
    }
  }

  console.log('\n═══════════════════════════════════════════════════════════');
  console.log(`Results: ${successCount} passed, ${failCount} failed`);
  console.log('═══════════════════════════════════════════════════════════\n');

  if (failCount > 0) {
    console.log('❌ FAILED: Some pages returned errors\n');
    console.log('Failed pages:');
    results
      .filter(r => !r.success)
      .forEach(r => {
        console.log(`  - ${r.name}: ${r.path} (${r.error})`);
      });
    process.exit(1);
  } else {
    console.log('✅ SUCCESS: All pages are accessible!\n');
    process.exit(0);
  }
}

runTests().catch(error => {
  console.error('Test runner error:', error);
  process.exit(1);
});
