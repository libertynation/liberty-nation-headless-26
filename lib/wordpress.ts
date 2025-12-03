const API_URL = process.env.WORDPRESS_API_URL || 'https://libertynation.com/wp-json/wp/v2';
const WP_USERNAME = process.env.WP_APP_USERNAME;
const WP_PASSWORD = process.env.WP_APP_PASSWORD;

export interface WordPressPost {
  id: number;
  date: string;
  modified: string;
  slug: string;
  status: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  author: number;
  featured_media: number;
  categories: number[];
  tags: number[];
  acf?: {
    author_quote?: string;
    [key: string]: any;
  };
  yoast_head_json?: {
    title?: string;
    description?: string;
    canonical?: string;
    og_locale?: string;
    og_type?: string;
    og_title?: string;
    og_description?: string;
    og_url?: string;
    og_site_name?: string;
    og_image?: Array<{
      width: number;
      height: number;
      url: string;
      type: string;
    }>;
    author?: string;
    twitter_card?: string;
    twitter_creator?: string;
    twitter_site?: string;
    robots?: {
      index?: string;
      follow?: string;
      'max-snippet'?: string;
      'max-image-preview'?: string;
      'max-video-preview'?: string;
    };
    schema?: any;
    article_published_time?: string;
    article_modified_time?: string;
  };
  _embedded?: {
    author: Array<{
      id: number;
      name: string;
      slug: string;
      description?: string;
      avatar_urls?: {
        '24'?: string;
        '48'?: string;
        '96'?: string;
        [key: string]: string | undefined;
      };
      acf?: {
        title?: string;
        [key: string]: any;
      };
    }>;
    'wp:featuredmedia'?: Array<{
      id: number;
      source_url: string;
      alt_text: string;
      media_details: {
        width: number;
        height: number;
      };
    }>;
    'wp:term': Array<Array<{
      id: number;
      name: string;
      slug: string;
      taxonomy?: string;
    }>>;
  };
}

export interface WordPressCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
  description?: string;
  taxonomy?: string;
  parent?: number;
}

export interface WordPressAuthor {
  id: number;
  name: string;
  slug: string;
  description: string;
  avatar_urls?: {
    '24'?: string;
    '48'?: string;
    '96'?: string;
    [key: string]: string | undefined;
  };
  acf?: {
    title?: string;
    twitter?: string;
    facebook?: string;
    linkedin?: string;
    [key: string]: any;
  };
  url?: string;
  link?: string;
}

// Guest Author from Co-Authors Plus taxonomy
export interface GuestAuthor {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy: string;
  acf?: {
    title?: string;
    avatar?: string;
    twitter?: string;
    facebook?: string;
    linkedin?: string;
    [key: string]: any;
  };
}

export interface APIResponse<T> {
  data: T;
  total?: number;
  totalPages?: number;
  totalItems?: number;
}

async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const url = `${API_URL}${endpoint}`;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...((options.headers || {}) as Record<string, string>),
  };

  // Add Basic Auth if credentials are available
  if (WP_USERNAME && WP_PASSWORD) {
    const token = Buffer.from(`${WP_USERNAME}:${WP_PASSWORD}`).toString('base64');
    headers['Authorization'] = `Basic ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
    next: {
      revalidate: 60, // Cache for 60 seconds (news site - need fresh content)
      tags: ['wordpress-api'] // Tag for on-demand revalidation
    },
  });

  if (!response.ok) {
    throw new Error(`WordPress API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

async function fetchAPIWithPagination<T>(endpoint: string, options: RequestInit = {}): Promise<APIResponse<T>> {
  const url = `${API_URL}${endpoint}`;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...((options.headers || {}) as Record<string, string>),
  };

  // Add Basic Auth if credentials are available
  if (WP_USERNAME && WP_PASSWORD) {
    const token = Buffer.from(`${WP_USERNAME}:${WP_PASSWORD}`).toString('base64');
    headers['Authorization'] = `Basic ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
    next: {
      revalidate: 60, // Cache for 60 seconds (news site - need fresh content)
      tags: ['wordpress-api'] // Tag for on-demand revalidation
    },
  });

  if (!response.ok) {
    throw new Error(`WordPress API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  const total = response.headers.get('X-WP-Total');
  const totalPages = response.headers.get('X-WP-TotalPages');

  return {
    data,
    total: total ? parseInt(total, 10) : undefined,
    totalPages: totalPages ? parseInt(totalPages, 10) : undefined,
  };
}

export async function getPosts(params: {
  per_page?: number;
  page?: number;
  categories?: string;
  _embed?: boolean;
  orderby?: string;
  order?: 'asc' | 'desc';
  exclude?: number[];
} = {}): Promise<WordPressPost[]> {
  const searchParams = new URLSearchParams();

  if (params.per_page) searchParams.set('per_page', params.per_page.toString());
  if (params.page) searchParams.set('page', params.page.toString());
  if (params.categories) searchParams.set('categories', params.categories);
  if (params._embed !== false) searchParams.set('_embed', 'true');
  if (params.orderby) searchParams.set('orderby', params.orderby);
  if (params.order) searchParams.set('order', params.order);
  if (params.exclude) searchParams.set('exclude', params.exclude.join(','));

  const query = searchParams.toString();
  return fetchAPI(`/posts${query ? `?${query}` : ''}`);
}

export async function getPostBySlug(slug: string): Promise<WordPressPost | null> {
  const posts = await fetchAPI(`/posts?slug=${slug}&_embed=true`);
  return posts.length > 0 ? posts[0] : null;
}

export async function getPost(id: number): Promise<WordPressPost> {
  return fetchAPI(`/posts/${id}?_embed=true`);
}

export async function getCategories(): Promise<WordPressCategory[]> {
  return fetchAPI('/categories?per_page=100');
}

export async function getCategory(slug: string): Promise<WordPressCategory | null> {
  const categories = await fetchAPI(`/categories?slug=${slug}`);
  return categories.length > 0 ? categories[0] : null;
}

export async function getCategoryById(id: number): Promise<WordPressCategory | null> {
  try {
    return await fetchAPI(`/categories/${id}`);
  } catch (error) {
    console.error('Error fetching category:', error);
    return null;
  }
}

export async function getPostsByCategory(categoryId: number, params: {
  per_page?: number;
  page?: number;
  _embed?: boolean;
} = {}): Promise<APIResponse<WordPressPost[]>> {
  const searchParams = new URLSearchParams();
  searchParams.set('categories', categoryId.toString());

  if (params.per_page) searchParams.set('per_page', params.per_page.toString());
  if (params.page) searchParams.set('page', params.page.toString());
  if (params._embed !== false) searchParams.set('_embed', 'true');

  const query = searchParams.toString();
  return fetchAPIWithPagination<WordPressPost[]>(`/posts?${query}`);
}

// Get child categories of a parent category
export async function getChildCategories(parentId: number): Promise<WordPressCategory[]> {
  try {
    const categories = await fetchAPI(`/categories?parent=${parentId}&per_page=100`);
    return categories;
  } catch (error) {
    console.error('Error fetching child categories:', error);
    return [];
  }
}

// Get posts from a category and all its child categories
export async function getPostsByCategoryWithChildren(categoryId: number, params: {
  per_page?: number;
  page?: number;
  _embed?: boolean;
} = {}): Promise<APIResponse<WordPressPost[]>> {
  // Get child categories
  const childCategories = await getChildCategories(categoryId);

  // Build list of all category IDs (parent + children)
  const categoryIds = [categoryId, ...childCategories.map(cat => cat.id)];

  // Fetch posts from all categories
  const searchParams = new URLSearchParams();
  searchParams.set('categories', categoryIds.join(','));

  if (params.per_page) searchParams.set('per_page', params.per_page.toString());
  if (params.page) searchParams.set('page', params.page.toString());
  if (params._embed !== false) searchParams.set('_embed', 'true');

  const query = searchParams.toString();
  return fetchAPIWithPagination<WordPressPost[]>(`/posts?${query}`);
}

export async function getAuthors(params: {
  per_page?: number;
  page?: number;
} = {}): Promise<WordPressAuthor[]> {
  try {
    // WordPress /users endpoint requires authentication
    // Get latest posts and extract unique authors from embedded data
    const posts = await fetchAPI(`/posts?per_page=100&_embed=true`);

    // Extract unique authors from posts
    const authorsMap = new Map<number, WordPressAuthor>();

    for (const post of posts) {
      const authorData = post._embedded?.author?.[0];
      if (authorData && !authorsMap.has(authorData.id)) {
        authorsMap.set(authorData.id, authorData);
      }
    }

    return Array.from(authorsMap.values());
  } catch (error) {
    console.error('Error fetching authors:', error);
    return [];
  }
}

// Fetch guest authors from Co-Authors Plus taxonomy
export async function getGuestAuthors(params: {
  per_page?: number;
  page?: number;
} = {}): Promise<GuestAuthor[]> {
  const { per_page = 100, page = 1 } = params;

  try {
    const guestAuthors = await fetchAPI(`/guest-author?per_page=${per_page}&page=${page}`);
    return guestAuthors;
  } catch (error) {
    console.error('Error fetching guest authors:', error);
    return [];
  }
}

// Get all authors (both regular WP users from posts and guest authors)
export async function getAllAuthors(): Promise<Array<{
  id: number;
  name: string;
  slug: string;
  description: string;
  postCount: number;
  avatar?: string;
  title?: string;
  isGuestAuthor: boolean;
}>> {
  try {
    // Fetch guest authors from the taxonomy endpoint
    const guestAuthors = await getGuestAuthors({ per_page: 100 });

    // Also get regular WP users from posts
    const regularAuthors = await getAuthors({ per_page: 100 });

    // Combine and deduplicate by slug
    const authorsMap = new Map<string, {
      id: number;
      name: string;
      slug: string;
      description: string;
      postCount: number;
      avatar?: string;
      title?: string;
      isGuestAuthor: boolean;
    }>();

    // Add guest authors first (they have more complete data usually)
    for (const author of guestAuthors) {
      if (!authorsMap.has(author.slug)) {
        authorsMap.set(author.slug, {
          id: author.id,
          name: author.name,
          slug: author.slug,
          description: author.description || '',
          postCount: author.count || 0,
          avatar: author.acf?.avatar,
          title: author.acf?.title,
          isGuestAuthor: true,
        });
      }
    }

    // Add regular authors if not already present
    for (const author of regularAuthors) {
      if (!authorsMap.has(author.slug)) {
        authorsMap.set(author.slug, {
          id: author.id,
          name: author.name,
          slug: author.slug,
          description: author.description || '',
          postCount: 0, // We don't have this from the embedded data
          avatar: author.avatar_urls?.['96'] || author.avatar_urls?.['48'],
          title: author.acf?.title,
          isGuestAuthor: false,
        });
      }
    }

    return Array.from(authorsMap.values());
  } catch (error) {
    console.error('Error fetching all authors:', error);
    return [];
  }
}

export async function getAuthorBySlug(slug: string): Promise<WordPressAuthor | null> {
  try {
    // Priority 1: Check guest-author taxonomy (Co-Authors Plus plugin)
    // This is the primary author system used by Liberty Nation
    try {
      // Include acf_format=standard to ensure ACF fields are returned
      const guestAuthors = await fetchAPI(`/guest-author?slug=${encodeURIComponent(slug)}&acf_format=standard`);
      if (guestAuthors && guestAuthors.length > 0) {
        const ga = guestAuthors[0];
        console.log('Guest author data:', JSON.stringify(ga, null, 2));
        // Convert guest-author format to WordPressAuthor format
        // Get photo from ACF - check multiple possible field names
        const avatarUrl = ga.acf?.photo?.url || ga.acf?.photo || ga.acf?.avatar?.url || ga.acf?.avatar || null;
        return {
          id: ga.id,
          name: ga.name,
          slug: ga.slug,
          description: ga.description || '',
          avatar_urls: avatarUrl ? { '96': avatarUrl, '48': avatarUrl, '24': avatarUrl } : undefined,
          acf: ga.acf,
          link: ga.link,
        };
      }
    } catch (guestAuthorError) {
      // Guest author endpoint failed, continue to fallbacks
      console.log('Guest author lookup failed, trying fallbacks');
    }

    // Priority 2: Search through recent posts to find author with matching slug
    // This catches regular WordPress users who appear in post embeds
    try {
      const posts = await fetchAPI(`/posts?per_page=50&_embed=true`);
      for (const post of posts) {
        // Check guest-author in wp:term (index 2)
        const guestAuthorTerm = post._embedded?.['wp:term']?.[2]?.[0];
        if (guestAuthorTerm && guestAuthorTerm.slug === slug) {
          return {
            id: guestAuthorTerm.id,
            name: guestAuthorTerm.name,
            slug: guestAuthorTerm.slug,
            description: guestAuthorTerm.description || '',
            acf: (guestAuthorTerm as any).acf,
            link: (guestAuthorTerm as any).link,
          };
        }

        // Check regular author embed
        const authorData = post._embedded?.author?.[0];
        if (authorData && authorData.slug === slug && !('code' in authorData)) {
          return authorData;
        }

        // Check if slug matches generated slug from Yoast author name
        const yoastAuthor = post.yoast_head_json?.author;
        if (yoastAuthor) {
          const generatedSlug = yoastAuthor.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
          if (generatedSlug === slug) {
            // Found! Create an author object from Yoast data
            return {
              id: 0, // We don't have the real ID
              name: yoastAuthor,
              slug: generatedSlug,
              description: '', // No bio available from Yoast
            };
          }
        }
      }
    } catch (postsError) {
      console.log('Posts search failed for author');
    }

    // Priority 3: Try users endpoint (requires authentication, may fail)
    try {
      const users = await fetchAPI(`/users?slug=${encodeURIComponent(slug)}`);
      if (users && users.length > 0) {
        return users[0];
      }
    } catch (usersError) {
      // Users endpoint failed (likely 401), this is expected
      console.log('Users endpoint requires authentication');
    }

    // Priority 4: Generate author from slug (fallback for Yoast-only authors)
    // If no author was found, create a synthetic author from the slug
    // The posts will be filtered by Yoast author name in getPostsByAuthorSlug
    const nameFromSlug = slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    // Return a minimal author object that will let the page render
    // The actual posts will be found by matching Yoast author names
    return {
      id: 0,
      name: nameFromSlug,
      slug: slug,
      description: '',
    };
  } catch (error) {
    console.error('Error fetching author by slug:', error);
    return null;
  }
}

export async function getAuthorById(id: number): Promise<WordPressAuthor | null> {
  try {
    return await fetchAPI(`/users/${id}`);
  } catch (error) {
    console.error('Error fetching author:', error);
    return null;
  }
}

export async function getPostsByAuthor(authorId: number, params: {
  per_page?: number;
  page?: number;
  _embed?: boolean;
} = {}): Promise<APIResponse<WordPressPost[]>> {
  const searchParams = new URLSearchParams();
  searchParams.set('author', authorId.toString());

  if (params.per_page) searchParams.set('per_page', params.per_page.toString());
  if (params.page) searchParams.set('page', params.page.toString());
  if (params._embed !== false) searchParams.set('_embed', 'true');

  const query = searchParams.toString();
  return fetchAPIWithPagination<WordPressPost[]>(`/posts?${query}`);
}

export async function getPostsByAuthorSlug(authorSlug: string, params: {
  per_page?: number;
  page?: number;
  _embed?: boolean;
} = {}): Promise<APIResponse<WordPressPost[]>> {
  const perPage = params.per_page || 12;
  const page = params.page || 1;

  // Priority 1: Try guest-author taxonomy (Co-Authors Plus)
  try {
    const guestAuthors = await fetchAPI(`/guest-author?slug=${encodeURIComponent(authorSlug)}`);
    if (guestAuthors && guestAuthors.length > 0) {
      const guestAuthorId = guestAuthors[0].id;
      const searchParams = new URLSearchParams();
      searchParams.set('per_page', perPage.toString());
      searchParams.set('page', page.toString());
      searchParams.set('_embed', 'true');
      searchParams.set('guest-author', guestAuthorId.toString());
      return fetchAPIWithPagination<WordPressPost[]>(`/posts?${searchParams.toString()}`);
    }
  } catch (error) {
    console.log('Guest author posts lookup failed, trying Yoast author search');
  }

  // Priority 2: Search posts by Yoast author name (primary method for this site)
  // Most authors on Liberty Nation are identified by Yoast SEO author field
  try {
    // Step 1: Fetch posts WITHOUT embed (much smaller response ~50KB vs 4MB)
    // yoast_head_json.author is available without _embed
    const batchSize = 100;
    const matchingPostIds: number[] = [];
    let currentPage = 1;
    let hasMorePosts = true;
    let estimatedTotal = 0;

    // First pass: Find all matching post IDs (fast, no embed)
    while (hasMorePosts && matchingPostIds.length < 500) { // Cap at 500 posts max
      const response = await fetchAPIWithPagination<WordPressPost[]>(
        `/posts?per_page=${batchSize}&page=${currentPage}`
      );

      const posts = response.data;
      if (!posts || posts.length === 0) {
        hasMorePosts = false;
        break;
      }

      // Filter posts where Yoast author matches
      for (const post of posts) {
        const postAuthor = post.yoast_head_json?.author;
        if (postAuthor) {
          const postAuthorSlug = postAuthor.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
          if (postAuthorSlug === authorSlug) {
            matchingPostIds.push(post.id);
          }
        }
      }

      if (posts.length < batchSize || (response.totalPages && currentPage >= response.totalPages)) {
        hasMorePosts = false;
      }
      currentPage++;

      // Stop if we have enough for pagination
      if (matchingPostIds.length >= (page * perPage) + perPage) {
        estimatedTotal = matchingPostIds.length + (hasMorePosts ? 50 : 0);
        break;
      }

      // Safety limit
      if (currentPage > 30) {
        hasMorePosts = false;
      }
    }

    estimatedTotal = estimatedTotal || matchingPostIds.length;

    if (matchingPostIds.length === 0) {
      return { data: [], totalPages: 0, totalItems: 0 };
    }

    // Step 2: Get the IDs we need for this page
    const startIndex = (page - 1) * perPage;
    const pagePostIds = matchingPostIds.slice(startIndex, startIndex + perPage);

    if (pagePostIds.length === 0) {
      return { data: [], totalPages: Math.ceil(matchingPostIds.length / perPage), totalItems: matchingPostIds.length };
    }

    // Step 3: Fetch just those posts with embed (small request)
    const postsWithEmbed = await fetchAPI(
      `/posts?include=${pagePostIds.join(',')}&_embed=true&per_page=${pagePostIds.length}`
    );

    // Sort by the original order (include doesn't preserve order)
    const sortedPosts = pagePostIds
      .map(id => postsWithEmbed.find((p: WordPressPost) => p.id === id))
      .filter(Boolean) as WordPressPost[];

    return {
      data: sortedPosts,
      totalPages: Math.ceil(estimatedTotal / perPage),
      totalItems: estimatedTotal,
    };
  } catch (error) {
    console.error('Error fetching posts by Yoast author:', error);
  }

  // Return empty result if nothing found
  return { data: [], totalPages: 0, totalItems: 0 };
}

// Helper functions to extract embedded data
export function getFeaturedImageUrl(post: WordPressPost): string | null {
  return post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;
}

export function getAuthorName(post: WordPressPost): string {
  // First try Yoast SEO author field (most reliable for this site)
  const yoastAuthor = post.yoast_head_json?.author;
  if (yoastAuthor) {
    return yoastAuthor;
  }

  // Try to get guest-author from wp:term (index 2)
  // The wp:term array contains: [0] = categories, [1] = tags, [2] = guest-author
  const guestAuthor = post._embedded?.['wp:term']?.[2]?.[0]?.name;
  if (guestAuthor) {
    return guestAuthor;
  }

  // Fallback to regular author embed (usually returns error for this site)
  const regularAuthor = post._embedded?.author?.[0]?.name;
  if (regularAuthor && !('code' in (post._embedded?.author?.[0] || {}))) {
    return regularAuthor;
  }

  // Final fallback
  return 'Liberty Nation';
}

export function getCategoryName(post: WordPressPost): string {
  return post._embedded?.['wp:term']?.[0]?.[0]?.name || 'NEWS';
}

// Check if post is in LNTV category (600) or any of its child categories
export async function isLNTVPost(post: WordPressPost): Promise<boolean> {
  // Check if post directly has LNTV category (600)
  if (post.categories.includes(600)) {
    return true;
  }

  // Check if any of the post's categories are children of LNTV (600)
  for (const catId of post.categories) {
    try {
      const category = await getCategoryById(catId);
      if (category && category.parent === 600) {
        return true;
      }
    } catch (error) {
      console.error(`Error checking category ${catId}:`, error);
    }
  }

  return false;
}

// Re-export utility functions from lib/utils for backwards compatibility
// This allows client components to import these without pulling in Node.js dependencies
export { stripHtmlTags, decodeHtmlEntities, formatDate } from './utils';

export function getExcerpt(post: WordPressPost): string {
  // Import locally to avoid circular dependency
  const { decodeHtmlEntities: decode, stripHtmlTags: strip } = require('./utils');

  // Prefer ACF author_quote if available
  if (post.acf?.author_quote) {
    return decode(post.acf.author_quote);
  }
  // Otherwise use regular excerpt, strip HTML and decode entities
  return decode(strip(post.excerpt.rendered));
}

export function getAuthorAvatar(post: WordPressPost): string | null {
  // Priority 1: Check Yoast SEO schema for author image (most reliable source)
  try {
    const yoastSchema = (post as any).yoast_head_json?.schema;
    if (yoastSchema && yoastSchema['@graph']) {
      // Find the Person object in the schema graph
      const personNode = yoastSchema['@graph'].find((node: any) => node['@type'] === 'Person');
      if (personNode?.image?.url) {
        return personNode.image.url;
      }
    }
  } catch (e) {
    // Continue to next method if Yoast parsing fails
  }

  // Priority 2: Check ACF fields for custom author photo
  const acfPhoto = post._embedded?.author?.[0]?.acf?.photo;
  if (acfPhoto) {
    // ACF might store as URL string or object with url property
    if (typeof acfPhoto === 'string') {
      return acfPhoto;
    } else if (acfPhoto?.url) {
      return acfPhoto.url;
    }
  }

  // Priority 3: Check for image field in ACF
  const acfImage = post._embedded?.author?.[0]?.acf?.image;
  if (acfImage) {
    if (typeof acfImage === 'string') {
      return acfImage;
    } else if (acfImage?.url) {
      return acfImage.url;
    }
  }

  // Priority 4: Check Co-Authors Plus guest author data (wp:term taxonomy)
  const guestAuthors = post._embedded?.['wp:term']?.[2]; // Co-Authors Plus uses index 2
  if (guestAuthors && guestAuthors.length > 0) {
    const guestAuthor = guestAuthors[0] as any;
    // Check for custom image in various possible fields
    if (guestAuthor?.meta?.avatar) {
      return guestAuthor.meta.avatar;
    }
    if (guestAuthor?.acf?.photo) {
      const photo = guestAuthor.acf.photo;
      if (typeof photo === 'string') {
        return photo;
      } else if (photo?.url) {
        return photo.url;
      }
    }
  }

  // Priority 5: Check WordPress Gravatar avatar_urls
  const avatarUrls = post._embedded?.author?.[0]?.avatar_urls;
  if (avatarUrls) {
    // Try to get the highest resolution available
    return avatarUrls['96'] || avatarUrls['48'] || avatarUrls['24'] || null;
  }

  return null;
}

export function getAuthorTitle(post: WordPressPost): string | null {
  // Check if author has a title in ACF
  return post._embedded?.author?.[0]?.acf?.title || null;
}

export function getAuthorSlug(post: WordPressPost): string | null {
  // Priority 1: Try to get guest-author slug from wp:term (index 2)
  // This is used by Co-Authors Plus plugin
  const guestAuthorSlug = post._embedded?.['wp:term']?.[2]?.[0]?.slug;
  if (guestAuthorSlug) {
    return guestAuthorSlug;
  }

  // Priority 2: Try embedded author data (regular WordPress user)
  const authorSlug = post._embedded?.author?.[0]?.slug;
  if (authorSlug && !('code' in (post._embedded?.author?.[0] || {}))) {
    return authorSlug;
  }

  // Priority 3: Generate slug from author name (Yoast or embedded)
  const authorName = getAuthorName(post);
  if (authorName && authorName !== 'Unknown Author') {
    return authorName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  }

  return null;
}

// Function to strip WordPress shortcodes from content
export function stripShortcodes(content: string): string {
  // Remove all shortcodes [shortcode] and [shortcode attr="value"]content[/shortcode]
  return content
    // Remove self-closing shortcodes: [shortcode], [shortcode attr="value"]
    .replace(/\[([a-zA-Z0-9_-]+)(?:\s+[^\]]+)?\]/g, '')
    // Remove paired shortcodes: [shortcode]...[/shortcode]
    .replace(/\[([a-zA-Z0-9_-]+)(?:\s+[^\]]+)?\](.*?)\[\/\1\]/gs, '$2')
    // Remove any remaining closing shortcodes
    .replace(/\[\/[a-zA-Z0-9_-]+\]/g, '');
}

// Function to process content and handle WordPress shortcodes
export function processContent(content: string): string {
  let processed = content;

  // Handle specific shortcodes that should be replaced with meaningful content
  // Example: Replace [briefing-embed] shortcodes with nothing (already rendered server-side)
  processed = processed.replace(/\[briefing-embed[^\]]*\]/g, '');

  // Remove ElevenLabs audio widget shortcodes (these render as inline HTML already)
  processed = processed.replace(/<div id="elevenlabs-audionative-widget"[^>]*><\/div>/g, '');
  processed = processed.replace(/<script[^>]*elevenlabs[^>]*><\/script>/g, '');

  // Remove YouTube placement divs
  processed = processed.replace(/<div id="YouTube-Placement"><\/div>/g, '');

  // Strip any remaining shortcodes
  processed = stripShortcodes(processed);

  return processed;
}
