#!/usr/bin/env node

/**
 * Find the exact location of Michele's photo in the API response
 */

const API_URL = 'https://www.libertynation.com/wp-json/wp/v2/posts?slug=president-trump-signs-bill-to-open-government&_embed=true';

function findPath(obj, target, path = []) {
  for (const [key, value] of Object.entries(obj)) {
    const currentPath = [...path, key];

    if (typeof value === 'string' && value.includes(target)) {
      console.log(`Found at path: ${currentPath.join(' -> ')}`);
      console.log(`Value: ${value}\n`);
    } else if (typeof value === 'object' && value !== null) {
      findPath(value, target, currentPath);
    }
  }
}

async function findPhoto() {
  console.log('Fetching post from WordPress API...\n');

  try {
    const response = await fetch(API_URL);
    const posts = await response.json();

    if (!posts || posts.length === 0) {
      console.log('No posts found');
      return;
    }

    const post = posts[0];

    console.log('=== Searching for michele photo in post data ===\n');
    findPath(post, 'michele-.4-new-photo');

    console.log('\n=== Checking _embedded structure ===');
    if (post._embedded) {
      console.log('_embedded keys:', Object.keys(post._embedded));

      if (post._embedded.author) {
        console.log('\nAuthor array length:', post._embedded.author.length);
        console.log('First author:', JSON.stringify(post._embedded.author[0], null, 2).substring(0, 500));
      }
    }

  } catch (error) {
    console.error('Error:', error.message);
  }
}

findPhoto().catch(console.error);
