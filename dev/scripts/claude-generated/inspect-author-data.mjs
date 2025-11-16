#!/usr/bin/env node

/**
 * Inspect the WordPress API response to find author photo location
 */

const API_URL = 'https://www.libertynation.com/wp-json/wp/v2/posts?slug=president-trump-signs-bill-to-open-government&_embed=true';

async function inspectAuthorData() {
  console.log('Fetching post from WordPress API...\n');

  try {
    const response = await fetch(API_URL);
    const posts = await response.json();

    if (!posts || posts.length === 0) {
      console.log('No posts found');
      return;
    }

    const post = posts[0];

    console.log('=== Author Data Structure ===\n');

    // Check _embedded.author
    if (post._embedded?.author?.[0]) {
      const author = post._embedded.author[0];
      console.log('Author object keys:', Object.keys(author));
      console.log('\nAuthor name:', author.name);
      console.log('Author slug:', author.slug);

      // Check ACF
      if (author.acf) {
        console.log('\nACF fields:', Object.keys(author.acf));
        console.log('ACF data:', JSON.stringify(author.acf, null, 2));
      } else {
        console.log('\nNo ACF fields found on author');
      }

      // Check avatar_urls
      if (author.avatar_urls) {
        console.log('\nAvatar URLs:', author.avatar_urls);
      } else {
        console.log('\nNo avatar_urls found');
      }

      // Check meta
      if (author.meta) {
        console.log('\nMeta fields:', author.meta);
      }
    }

    // Check _embedded['wp:term']
    if (post._embedded?.['wp:term']) {
      console.log('\n\n=== wp:term Data ===');
      console.log('Number of term arrays:', post._embedded['wp:term'].length);

      for (let i = 0; i < post._embedded['wp:term'].length; i++) {
        const terms = post._embedded['wp:term'][i];
        console.log(`\nTerm array [${i}]: ${terms.length} items`);

        if (terms.length > 0) {
          const firstTerm = terms[0];
          console.log(`  Name: ${firstTerm.name}`);
          console.log(`  Taxonomy: ${firstTerm.taxonomy}`);
          console.log(`  Keys: ${Object.keys(firstTerm).join(', ')}`);

          if (firstTerm.acf) {
            console.log(`  ACF: ${JSON.stringify(firstTerm.acf, null, 2)}`);
          }
          if (firstTerm.meta) {
            console.log(`  Meta: ${JSON.stringify(firstTerm.meta, null, 2)}`);
          }
        }
      }
    }

    // Search for any field containing 'michele' or '.jpg' or '.png'
    console.log('\n\n=== Searching for image URLs ===');
    const postString = JSON.stringify(post);
    const imageMatches = postString.match(/https:\/\/[^\s"]+\.(jpg|jpeg|png|webp)/gi);
    if (imageMatches) {
      const uniqueImages = [...new Set(imageMatches)];
      console.log(`Found ${uniqueImages.length} unique image URLs:`);
      uniqueImages.forEach((url, i) => {
        if (url.includes('michele') || url.includes('author') || url.includes('photo')) {
          console.log(`\n[${i + 1}] ${url}`);
        }
      });
    }

  } catch (error) {
    console.error('Error fetching post:', error.message);
  }
}

inspectAuthorData().catch(console.error);
