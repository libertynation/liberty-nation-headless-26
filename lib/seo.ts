import type { Metadata } from 'next';
import type { WordPressPost, WordPressCategory, WordPressAuthor } from './wordpress';
import { stripHtmlTags } from './wordpress';

const SITE_URL = 'https://www.libertynation.com';
const SITE_NAME = 'Liberty Nation';

/**
 * Generate comprehensive SEO metadata for a WordPress post
 */
export function generatePostMetadata(post: WordPressPost): Metadata {
  const yoast = post.yoast_head_json;

  // Use Yoast SEO data if available, fallback to post data
  const title = yoast?.title || `${post.title.rendered} | ${SITE_NAME}`;
  const description = yoast?.description || stripHtmlTags(post.excerpt.rendered).substring(0, 160);
  const canonical = yoast?.canonical || `${SITE_URL}/${post.slug}`;
  const imageUrl = yoast?.og_image?.[0]?.url || post._embedded?.['wp:featuredmedia']?.[0]?.source_url;

  const metadata: Metadata = {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: yoast?.og_title || title,
      description: yoast?.og_description || description,
      url: yoast?.og_url || canonical,
      siteName: yoast?.og_site_name || SITE_NAME,
      type: 'article',
      publishedTime: yoast?.article_published_time || post.date,
      modifiedTime: yoast?.article_modified_time || post.modified,
      authors: [yoast?.author || 'Liberty Nation'],
      ...(imageUrl && {
        images: [
          {
            url: imageUrl,
            width: yoast?.og_image?.[0]?.width || 1200,
            height: yoast?.og_image?.[0]?.height || 630,
            alt: post.title.rendered,
          },
        ],
      }),
    },
    twitter: {
      card: (yoast?.twitter_card as any) || 'summary_large_image',
      title: yoast?.og_title || title,
      description: yoast?.og_description || description,
      creator: yoast?.twitter_creator || '@libertynation',
      site: yoast?.twitter_site || '@libertynation',
      ...(imageUrl && {
        images: [imageUrl],
      }),
    },
    robots: {
      index: yoast?.robots?.index === 'index',
      follow: yoast?.robots?.follow === 'follow',
      googleBot: {
        index: yoast?.robots?.index === 'index',
        follow: yoast?.robots?.follow === 'follow',
      },
    },
  };

  return metadata;
}

/**
 * Generate SEO metadata for a category page
 */
export function generateCategoryMetadata(
  category: WordPressCategory,
  page: number = 1
): Metadata {
  const title = page > 1
    ? `${category.name} - Page ${page} | ${SITE_NAME}`
    : `${category.name} | ${SITE_NAME}`;

  const description = category.description
    ? stripHtmlTags(category.description).substring(0, 160)
    : `Read the latest ${category.name.toLowerCase()} articles from ${SITE_NAME}`;

  const canonical = page > 1
    ? `${SITE_URL}/category/${category.slug}?page=${page}`
    : `${SITE_URL}/category/${category.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      site: '@libertynation',
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

/**
 * Generate SEO metadata for an author page
 */
export function generateAuthorMetadata(
  author: WordPressAuthor,
  page: number = 1
): Metadata {
  const title = page > 1
    ? `${author.name} - Page ${page} | ${SITE_NAME}`
    : `${author.name} | ${SITE_NAME}`;

  const description = author.description
    ? stripHtmlTags(author.description).substring(0, 160)
    : `Read articles by ${author.name} on ${SITE_NAME}`;

  const canonical = page > 1
    ? `${SITE_URL}/author/${author.slug}?page=${page}`
    : `${SITE_URL}/author/${author.slug}`;

  const avatarUrl = author.avatar_urls?.['96'];

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      type: 'profile',
      ...(avatarUrl && {
        images: [
          {
            url: avatarUrl,
            width: 96,
            height: 96,
            alt: author.name,
          },
        ],
      }),
    },
    twitter: {
      card: 'summary',
      title,
      description,
      site: '@libertynation',
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

/**
 * Generate SEO metadata for static pages
 */
export function generateStaticPageMetadata(
  pageTitle: string,
  pageDescription: string,
  slug: string
): Metadata {
  const title = `${pageTitle} | ${SITE_NAME}`;
  const canonical = `${SITE_URL}/${slug}`;

  return {
    title,
    description: pageDescription,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description: pageDescription,
      url: canonical,
      siteName: SITE_NAME,
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title,
      description: pageDescription,
      site: '@libertynation',
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

/**
 * Generate SEO metadata for the homepage
 */
export function generateHomeMetadata(): Metadata {
  const title = `${SITE_NAME} - Free Thinking. Free Speech.`;
  const description = 'Independent news and opinion from a libertarian and constitutional perspective. Read the latest political news, culture commentary, and analysis.';

  return {
    title,
    description,
    alternates: {
      canonical: SITE_URL,
    },
    openGraph: {
      title,
      description,
      url: SITE_URL,
      siteName: SITE_NAME,
      type: 'website',
      images: [
        {
          url: `${SITE_URL}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      site: '@libertynation',
      creator: '@libertynation',
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
