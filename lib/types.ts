/**
 * WordPress API type definitions
 * This file only contains types, no runtime code, so it's safe to import in client components
 */

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

export interface APIResponse<T> {
  data: T;
  total?: number;
  totalPages?: number;
}
