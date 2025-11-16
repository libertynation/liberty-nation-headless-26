import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getPosts, getPostBySlug, getCategory, getFeaturedImageUrl, getAuthorName, getCategoryName, formatDate, getAuthorAvatar, getAuthorTitle, stripHtmlTags, decodeHtmlEntities, isLNTVPost, processContent } from '@/lib/wordpress';
import { getLatestYouTubeVideos } from '@/lib/youtube';
import { generatePostMetadata, generateCategoryMetadata, generateStaticPageMetadata } from '@/lib/seo';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ShareButtons from '@/components/ShareButtons';
import FollowTopicButton from '@/components/FollowTopicButton';
import AuthorCard from '@/components/AuthorCard';
import AnimatedSectionHeader from '@/components/AnimatedSectionHeader';

// ISR: Revalidate every 60 seconds for news site - fast updates critical
export const revalidate = 60;

// Allow dynamic params (pages not in generateStaticParams)
export const dynamicParams = true;

// List of valid category and static page slugs
const VALID_CATEGORIES = ['politics', 'economy', 'culture', 'opinion', 'podcasts', 'videos'];
const STATIC_PAGES = ['about', 'contact', 'newsletters', 'signin'];

// Generate static params for just static pages at build time
// Posts and categories will be generated on-demand with ISR
export async function generateStaticParams() {
  const staticParams = STATIC_PAGES.map((slug) => ({
    slug,
  }));

  return staticParams;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;

  // Check if it's a static page
  const staticPages: Record<string, { title: string; description: string }> = {
    about: {
      title: 'About Us',
      description: 'Liberty Nation is an independent news and opinion website dedicated to bringing you the latest news, analysis, and commentary from a libertarian and constitutional perspective.',
    },
    contact: {
      title: 'Contact',
      description: 'Get in touch with Liberty Nation. We welcome your feedback, story tips, and inquiries.',
    },
    newsletters: {
      title: 'Daily Briefing',
      description: 'Stay informed with Liberty Nation\'s Daily Briefing. Get the latest news, analysis, and commentary delivered straight to your inbox.',
    },
    signin: {
      title: 'Sign In',
      description: 'Sign in to your Liberty Nation account to access exclusive features and personalized content.',
    },
  };

  if (staticPages[slug]) {
    return generateStaticPageMetadata(
      staticPages[slug].title,
      staticPages[slug].description,
      slug
    );
  }

  // Check if it's a category
  const categoryData = await getCategory(slug);
  if (categoryData) {
    return generateCategoryMetadata(categoryData);
  }

  // Otherwise, try to get it as a post
  const post = await getPostBySlug(slug);
  if (post) {
    return generatePostMetadata(post);
  }

  return {
    title: 'Page Not Found | Liberty Nation',
    description: 'The page you are looking for could not be found.',
  };
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params;

  // Handle static pages first
  if (slug === 'about') {
    return (
      <>
        <Header />
        <main className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="font-headline text-5xl md:text-6xl font-bold uppercase mb-8 tracking-tight">
            About Liberty Nation
          </h1>
          <div className="prose prose-lg max-w-none font-serif">
            <p className="text-[19px] leading-[1.7] mb-6">
              Liberty Nation is an independent news and opinion website dedicated to bringing you the latest news, analysis, and commentary from a libertarian and constitutional perspective.
            </p>
            <p className="text-[19px] leading-[1.7] mb-6">
              Our mission is to promote free thinking, free speech, and the principles that made America great. We believe in limited government, individual liberty, free markets, and the Constitution.
            </p>
            <h2 className="font-headline text-3xl font-bold uppercase mt-12 mb-6">Our Values</h2>
            <ul className="space-y-3">
              <li className="text-[19px] leading-[1.7]"><strong>Free Speech:</strong> We defend the right to express ideas freely.</li>
              <li className="text-[19px] leading-[1.7]"><strong>Liberty:</strong> Individual freedom is paramount.</li>
              <li className="text-[19px] leading-[1.7]"><strong>Truth:</strong> We seek to report honestly and without bias.</li>
              <li className="text-[19px] leading-[1.7]"><strong>Constitution:</strong> The foundation of American freedom.</li>
            </ul>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (slug === 'contact') {
    return (
      <>
        <Header />
        <main className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="font-headline text-5xl md:text-6xl font-bold uppercase mb-8 tracking-tight">
            Contact Us
          </h1>
          <div className="prose prose-lg max-w-none font-serif">
            <p className="text-[19px] leading-[1.7] mb-6">
              We'd love to hear from you. Whether you have a story tip, feedback, or just want to say hello, we're here to listen.
            </p>
            <h2 className="font-headline text-3xl font-bold uppercase mt-12 mb-6">Get In Touch</h2>
            <p className="text-[19px] leading-[1.7] mb-6">
              Email: <a href="mailto:contact@libertynation.com" className="text-primary-red hover:underline">contact@libertynation.com</a>
            </p>
            <p className="text-[19px] leading-[1.7] mb-6">
              For editorial inquiries: <a href="mailto:editor@libertynation.com" className="text-primary-red hover:underline">editor@libertynation.com</a>
            </p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (slug === 'newsletters') {
    return (
      <>
        <Header />
        <main className="bg-bg-offwhite">
          {/* Page Header */}
          <div className="bg-white border-b-4 border-primary-red py-16">
            <div className="max-w-[900px] mx-auto px-8 text-center">
              <h1 className="font-display font-bold text-5xl md:text-6xl mb-6 tracking-tight text-text-dark">
                Daily Briefing
              </h1>
              <p className="font-serif text-xl leading-[1.7] text-text-dark max-w-[700px] mx-auto">
                Get the day's most important stories, analysis, and commentary delivered to your inbox every morning. No fluff. No propaganda. Just truth.
              </p>
            </div>
          </div>

          {/* Newsletter Signup Section */}
          <div className="py-20">
            <div className="max-w-[800px] mx-auto px-8">
              <div className="bg-white px-12 py-10 rounded-sm shadow-lg border-4 border-text-dark">
                <div className="inline-flex items-center gap-3 mb-4 bg-black/10 px-6 py-2 rounded-full text-black">
                  <svg className="w-5 h-5 animate-pulse text-black" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  <span className="font-sans font-bold text-sm uppercase tracking-widest text-black">
                    Daily Briefing
                  </span>
                </div>

                <h2 className="font-display font-bold text-4xl md:text-5xl mb-4 uppercase leading-tight text-black">
                  Your Morning Dose of Liberty
                </h2>
                  <p className="font-serif text-xl mb-8 leading-relaxed text-black">
                    Get the day's most important stories, analysis, and commentary delivered to your inbox every morning.
                    No fluff. No propaganda. Just truth.
                  </p>

                  <form className="flex flex-col sm:flex-row gap-3 mb-4 group">
                    <div className="flex-1 relative">
                      <input
                        type="email"
                        placeholder="Enter your email address"
                        className="w-full px-6 py-4 border-2 border-gray-300 font-sans text-base text-black focus:outline-none focus:border-black transition-all duration-300 rounded-sm shadow-sm focus:shadow-lg"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-black text-white px-8 py-4 font-sans font-black text-sm uppercase hover:bg-gray-800 transition-all duration-300 whitespace-nowrap rounded-sm shadow-lg hover:shadow-xl hover:scale-105"
                    >
                      Get The Briefing
                    </button>
                  </form>

                  <div className="flex items-center justify-center gap-6 text-xs text-black">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="font-sans font-semibold text-black">Free Forever</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="font-sans font-semibold text-black">No Spam</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="font-sans font-semibold text-black">Unsubscribe Anytime</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          {/* Benefits Section */}
          <div className="bg-white py-16 border-t border-border-gray">
            <div className="max-w-[1200px] mx-auto px-8">
              <h2 className="font-display font-bold text-3xl md:text-4xl mb-12 text-center text-text-dark">
                Why Subscribe to the Daily Briefing?
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-red rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                      <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <h3 className="font-sans font-bold text-lg mb-2 text-text-dark">Curated Daily</h3>
                  <p className="font-serif text-text-gray">
                    Hand-picked stories that matter, delivered every morning before your coffee gets cold.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-red rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <h3 className="font-sans font-bold text-lg mb-2 text-text-dark">Ad-Free</h3>
                  <p className="font-serif text-text-gray">
                    Pure news and analysis. No ads, no sponsored content, no distractions.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-red rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <h3 className="font-sans font-bold text-lg mb-2 text-text-dark">Unbiased</h3>
                  <p className="font-serif text-text-gray">
                    Independent journalism focused on truth, not political narratives.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (slug === 'signin') {
    return (
      <>
        <Header />
        <main className="max-w-md mx-auto px-4 py-12">
          <h1 className="font-headline text-4xl md:text-5xl font-bold uppercase mb-8 tracking-tight text-center">
            Sign In
          </h1>
          <div className="bg-white border-2 border-border-gray rounded-lg p-8">
            <form className="space-y-6">
              <div>
                <label className="block font-sans text-sm font-semibold mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border-2 border-border-gray rounded font-sans focus:outline-none focus:border-primary-red transition"
                  required
                />
              </div>
              <div>
                <label className="block font-sans text-sm font-semibold mb-2">Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-3 border-2 border-border-gray rounded font-sans focus:outline-none focus:border-primary-red transition"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary-red text-white px-8 py-3 font-sans font-bold text-sm uppercase hover:bg-[#e02835] transition rounded"
              >
                Sign In
              </button>
            </form>
            <p className="text-center mt-6 font-sans text-sm text-text-gray">
              Don't have an account? <a href="#" className="text-primary-red hover:underline font-semibold">Sign up</a>
            </p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Check if it's a category page
  let categoryData;
  try {
    categoryData = await getCategory(slug);
  } catch (error) {
    console.error(`Error fetching category ${slug}:`, error);
    categoryData = null;
  }
  
  if (categoryData) {
    let posts: Awaited<ReturnType<typeof getPosts>> = [];
    try {
      posts = await getPosts({ categories: categoryData.id.toString(), per_page: 30 });
    } catch (error) {
      console.error(`Error fetching posts for category ${slug}:`, error);
    }

    return (
      <>
        <Header />

        <main className="max-w-7xl mx-auto px-4 py-12">
          {/* Category Header */}
          <div className="mb-12 pb-8 border-b-2 border-border-gray">
            <h1 className="font-headline text-5xl md:text-6xl font-bold uppercase mb-4 tracking-tight">
              {categoryData.name}
            </h1>
            <p className="font-sans text-text-gray">
              {categoryData.count} {categoryData.count === 1 ? 'article' : 'articles'}
            </p>
          </div>

          {/* Articles Grid */}
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => {
                const imageUrl = getFeaturedImageUrl(post);
                const author = getAuthorName(post);
                const date = formatDate(post.date);

                return (
                  <article key={post.id} className="group">
                    <Link href={`/${post.slug}`}>
                      {imageUrl && (
                        <div className="relative w-full aspect-[580/436] mb-4 rounded overflow-hidden">
                          <Image
                            src={imageUrl}
                            alt={post.title.rendered}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        </div>
                      )}

                      <h2 className="font-serif text-[22px] font-bold leading-tight mb-3 group-hover:text-primary-red transition">
                        {post.title.rendered}
                      </h2>

                      <p className="font-serif text-text-gray mb-3 leading-relaxed line-clamp-3">
                        {post.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 120)}...
                      </p>

                      <div className="flex items-center gap-2 text-xs font-sans uppercase">
                        <span className="text-primary-red font-semibold">{author}</span>
                        <span className="text-text-gray">•</span>
                        <span className="text-text-gray">{date}</span>
                      </div>
                    </Link>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="font-sans text-xl text-text-gray">
                No articles found in this category.
              </p>
            </div>
          )}
        </main>

        <Footer />
      </>
    );
  }

  // Finally, try to load it as an article
  let post;
  try {
    post = await getPostBySlug(slug);
  } catch (error) {
    console.error(`Error fetching post ${slug}:`, error);
    notFound();
  }

  if (!post) {
    notFound();
  }

  const imageUrl = getFeaturedImageUrl(post);
  const author = getAuthorName(post);

  // Get author slug - try embedded author first, then create from guest author name
  let authorSlug = post._embedded?.author?.[0]?.slug || '';
  if (!authorSlug) {
    // Try to get guest author slug from wp:term
    const guestAuthorSlug = post._embedded?.['wp:term']?.[2]?.[0]?.slug;
    if (guestAuthorSlug) {
      authorSlug = guestAuthorSlug;
    } else {
      // Create slug from author name as fallback
      authorSlug = author.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    }
  }

  const authorBio = post._embedded?.author?.[0]?.description || `${author} is a contributing writer for Liberty Nation, covering politics, culture, and current events with a focus on constitutional liberty and American values.`;
  const authorAvatar = getAuthorAvatar(post);
  const authorTitle = getAuthorTitle(post);
  const category = getCategoryName(post);
  const date = formatDate(post.date);

  // Check if post is in LNTV category (ID: 600) or child categories - hide featured image for LNTV posts
  const isLNTV = await isLNTVPost(post);
  const shouldShowFeaturedImage = imageUrl && !isLNTV;

  // Fetch YouTube videos from Liberty Nation channel
  let youtubeVideos: Awaited<ReturnType<typeof getLatestYouTubeVideos>> = [];
  try {
    youtubeVideos = await getLatestYouTubeVideos(3);
    console.log('YouTube videos fetched:', youtubeVideos.length, 'videos');
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
  }

  // Fetch related articles from the same category (excluding current post)
  const primaryCategoryId = post.categories[0];
  let relatedArticlesResponse: Awaited<ReturnType<typeof getPosts>> = [];
  try {
    relatedArticlesResponse = await getPosts({
      categories: primaryCategoryId.toString(),
      per_page: 4,
      exclude: [post.id]
    });
  } catch (error) {
    console.error('Error fetching related articles:', error);
  }
  const relatedArticles = relatedArticlesResponse.slice(0, 3);

  // Get ACF fields for shorts section and audio
  const authorQuote = post.acf?.author_quote || null;
  // Check multiple possible audio field names
  const audioUrl = post.acf?.audio_url ||
                   post.acf?.audio ||
                   post.acf?.audio_file ||
                   post.acf?.podcast_url ||
                   post.acf?.article_audio ||
                   null;

  // Debug: log if we have ACF data but no audio
  if (post.acf && !audioUrl) {
    console.log('Post ACF fields available:', Object.keys(post.acf));
  }

  return (
    <>
      <Header />

      <article className="bg-bg-offwhite">
        {/* SECTION 1: Title Only - Full Width */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-12 pb-8">
          {/* Title - LARGE typography using Lora */}
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.05] font-bold mb-0 text-gray-900 tracking-tight">
            {decodeHtmlEntities(post.title.rendered)}
          </h1>

          {/* Audio Player - At top after title if available */}
          {audioUrl && (
            <div className="mt-8 bg-white border-2 border-gray-200 rounded-lg p-6 shadow-md max-w-[900px]">
              <div className="flex items-center gap-4 mb-4">
                <svg className="w-6 h-6 text-primary-red" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                </svg>
                <h3 className="font-sans font-bold text-lg text-text-dark uppercase tracking-wide">
                  Listen to this article
                </h3>
              </div>
              <audio controls className="w-full" preload="metadata">
                <source src={audioUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          )}
        </div>

        {/* SECTION 2: Split Layout - Featured Image Left, Metadata Right */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 pb-12">
          <div className={`grid grid-cols-1 gap-12 ${shouldShowFeaturedImage ? 'lg:grid-cols-2' : 'lg:grid-cols-1'}`}>
            {/* LEFT: Featured Image */}
            {shouldShowFeaturedImage && (
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-200">
                <Image
                  src={imageUrl}
                  alt={post.title.rendered}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            )}

            {/* RIGHT: Metadata & Author Info - Flex column with space-between to push share buttons to bottom */}
            <div className={`flex flex-col ${!shouldShowFeaturedImage ? 'max-w-[800px]' : ''}`}>
              {/* Top Content */}
              <div className="flex flex-col gap-8">
                {/* Author Quote (priority) or Excerpt/Dek (fallback) - ENHANCED */}
                {(authorQuote || post.excerpt.rendered) && (
                  <p className="font-serif text-2xl md:text-3xl lg:text-4xl leading-[1.4] text-gray-800 font-normal">
                    {authorQuote ? authorQuote : decodeHtmlEntities(stripHtmlTags(post.excerpt.rendered))}
                  </p>
                )}

                {/* Author Name - ENHANCED */}
                <div>
                  <Link href={`/author/${authorSlug}`} className="group">
                    <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-primary-red group-hover:text-text-dark mb-2 transition-colors duration-300 font-bold leading-[1.2]">
                      By {author}
                    </h2>
                  </Link>
                  {authorTitle && (
                    <p className="font-sans text-base md:text-lg text-gray-600 mt-2">{authorTitle}</p>
                  )}
                </div>

                {/* Date & Category */}
                <div className="flex items-center gap-3 text-sm md:text-base font-sans text-gray-600 uppercase tracking-wide">
                  <span>{date}</span>
                  {category && (
                    <>
                      <span>—</span>
                      <Link href={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}>
                        <span className="hover:text-primary-red transition">{category}</span>
                      </Link>
                    </>
                  )}
                </div>

                {/* Author Card - Compact variant in metadata section */}
                {authorSlug && (
                  <div className="border-t border-gray-300 pt-6">
                    <AuthorCard
                      name={author}
                      slug={authorSlug}
                      title={authorTitle}
                      bio={authorBio}
                      avatar={authorAvatar}
                      variant="compact"
                    />
                  </div>
                )}
              </div>

              {/* Bottom: Follow & Share Buttons - FLUSH TO BOTTOM, aligned with bottom of image */}
              <div className="flex items-center gap-4 pt-8 mt-auto border-t-2 border-gray-300">
                <FollowTopicButton
                  author={author}
                  category={category}
                  title={post.title.rendered}
                />
                <div className="scale-110">
                  <ShareButtons
                    title={post.title.rendered}
                    url={`https://www.libertynation.com/${post.slug}`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: Readable Content Section (max-w-[900px] - Wider for better reading) */}
        <div className="max-w-[900px] mx-auto px-6 md:px-8 py-12">
          {/* Content - Clean readable typography with elegant blockquotes */}
          <div
            className="prose prose-xl max-w-none font-serif
              prose-headings:font-serif prose-headings:font-bold prose-headings:text-gray-900
              prose-h2:text-4xl prose-h2:mt-14 prose-h2:mb-6 prose-h2:leading-tight
              prose-h3:text-3xl prose-h3:mt-12 prose-h3:mb-5
              prose-h4:text-2xl prose-h4:mt-10 prose-h4:mb-4
              prose-p:text-[21px] prose-p:leading-[1.75] prose-p:mb-8 prose-p:text-gray-900
              prose-a:text-primary-red prose-a:no-underline hover:prose-a:underline prose-a:transition-colors prose-a:font-medium
              prose-strong:font-bold prose-strong:text-gray-900
              prose-em:italic
              prose-img:my-12 prose-img:w-full prose-img:rounded-sm prose-img:shadow-lg
              prose-figcaption:text-base prose-figcaption:text-gray-600 prose-figcaption:mt-4 prose-figcaption:text-center prose-figcaption:italic
              prose-ul:my-8 prose-ul:list-disc prose-ul:pl-8
              prose-ol:my-8 prose-ol:list-decimal prose-ol:pl-8
              prose-li:text-[21px] prose-li:leading-[1.75] prose-li:mb-3
              prose-blockquote:not-italic prose-blockquote:font-serif prose-blockquote:text-[21px] prose-blockquote:leading-[1.6] prose-blockquote:text-gray-700 prose-blockquote:border-l-4 prose-blockquote:border-gray-300 prose-blockquote:pl-6 prose-blockquote:my-8
              prose-hr:border-gray-300 prose-hr:my-14"
            dangerouslySetInnerHTML={{ __html: processContent(post.content.rendered) }}
          />

          {/* Full Author Card at end of article */}
          {authorSlug && (
            <AuthorCard
              name={author}
              slug={authorSlug}
              title={authorTitle}
              bio={authorBio}
              avatar={authorAvatar}
              variant="default"
            />
          )}
        </div>

        {/* SECTION 4: Liberty Nation Shorts - Clips of the Day */}
        <div className="bg-gradient-to-br from-black via-gray-900 to-black py-16 md:py-20 border-t-4 border-primary-red">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className="font-display font-bold text-4xl md:text-5xl text-white uppercase tracking-tight mb-3">
                Liberty Nation TV
              </h2>
              <p className="font-serif text-lg text-gray-300 max-w-2xl mx-auto">
                Watch the latest video commentary and analysis
              </p>
            </div>

            {/* Author Quote Card - If Available */}
            {authorQuote && (
              <div className="max-w-3xl mx-auto mb-12">
                <div className="bg-white/5 backdrop-blur-sm border-l-4 border-primary-red p-8 hover:bg-white/10 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <svg className="w-8 h-8 text-primary-red flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                    </svg>
                    <div className="flex-1">
                      <p className="font-serif text-xl text-white leading-relaxed italic">
                        {authorQuote}
                      </p>
                      <p className="font-sans text-sm text-gray-400 mt-3 uppercase tracking-wide">
                        — {author}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Video Grid - YouTube Videos */}
            {youtubeVideos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {youtubeVideos.map((video) => {
                const videoDate = new Date(video.publishedAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                });

                return (
                  <article key={video.id} className="group">
                    <a href={video.videoUrl} target="_blank" rel="noopener noreferrer">
                      <div className="relative w-full aspect-video bg-gray-800 mb-4 overflow-hidden rounded-sm">
                        <Image
                          src={video.thumbnailUrl}
                          alt={video.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 400px"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/50 transition-colors duration-300">
                          <div className="w-16 h-16 bg-primary-red rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-xl">
                            <div className="w-0 h-0 border-l-[16px] border-l-white border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent ml-1" />
                          </div>
                        </div>
                      </div>
                      <h3 className="font-serif font-bold text-lg text-white group-hover:text-primary-red transition-colors duration-300 mb-2 line-clamp-2">
                        {video.title}
                      </h3>
                      <p className="font-sans text-sm text-gray-400 uppercase tracking-wide">
                        {videoDate}
                      </p>
                    </a>
                  </article>
                );
              })}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="font-serif text-xl text-gray-400">
                  Loading latest videos...
                </p>
              </div>
            )}

            {/* View All Videos CTA */}
            <div className="text-center mt-12">
              <Link
                href="/category/lntv"
                className="inline-flex items-center gap-3 px-8 py-4 bg-primary-red text-white font-sans font-bold text-sm uppercase tracking-wide hover:bg-white hover:text-primary-red transition-all duration-300 group"
              >
                <span>Watch All Videos</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* SECTION 5: Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="bg-white py-16 md:py-20">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">
              {/* Section Header with Animated Borders */}
              <AnimatedSectionHeader
                title={`More from ${category || 'Liberty Nation'}`}
                subtitle="Continue reading stories that matter"
              />

              {/* Related Articles Grid - Real Data */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {relatedArticles.map((article) => {
                  const relatedImage = getFeaturedImageUrl(article);
                  const relatedAuthor = getAuthorName(article);
                  const relatedDate = formatDate(article.date);
                  const relatedExcerpt = stripHtmlTags(article.excerpt.rendered);

                  return (
                    <article key={article.id} className="group">
                      <Link href={`/${article.slug}`}>
                        {relatedImage && (
                          <div className="relative w-full aspect-[4/3] bg-gray-200 mb-4 overflow-hidden shadow-md group-hover:shadow-xl transition-shadow duration-300">
                            <Image
                              src={relatedImage}
                              alt={decodeHtmlEntities(article.title.rendered)}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                              sizes="(max-width: 768px) 100vw, 400px"
                            />
                            <div className="absolute inset-0 bg-primary-red/0 group-hover:bg-primary-red/10 transition-colors duration-300" />
                          </div>
                        )}
                        <h3 className="font-display font-bold text-2xl leading-tight mb-3 group-hover:text-primary-red transition-colors duration-300">
                          {decodeHtmlEntities(article.title.rendered)}
                        </h3>
                        <p className="font-serif text-base text-text-gray mb-3 line-clamp-2">
                          {relatedExcerpt.substring(0, 120)}...
                        </p>
                        <div className="flex items-center gap-2 text-xs font-sans uppercase tracking-wide">
                          <span className="text-primary-red font-bold">{relatedAuthor}</span>
                          <span className="text-text-gray">—</span>
                          <span className="text-text-gray">{relatedDate}</span>
                        </div>
                      </Link>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 6: Newsletter Signup CTA */}
        <div className="bg-gradient-to-br from-gray-50 to-white py-16 md:py-20 border-t border-b border-gray-200">
          <div className="max-w-[900px] mx-auto px-6 md:px-12 text-center">
            <div className="bg-white px-8 md:px-12 py-10 md:py-12 rounded-sm shadow-xl border-2 border-gray-200">
              <div className="inline-flex items-center gap-3 mb-4 bg-primary-red/10 px-6 py-2 rounded-full">
                <svg className="w-5 h-5 text-primary-red" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <span className="font-sans font-bold text-sm uppercase tracking-widest text-primary-red">
                  Daily Briefing
                </span>
              </div>

              <h2 className="font-display font-bold text-3xl md:text-4xl mb-4 uppercase leading-tight text-text-dark">
                Never Miss a Story
              </h2>
                <p className="font-serif text-lg md:text-xl mb-8 leading-relaxed text-text-dark max-w-2xl mx-auto">
                  Get the day's most important stories delivered to your inbox every morning. No spam, ever.
                </p>

                <form className="flex flex-col sm:flex-row gap-3 max-w-[600px] mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-6 py-4 border-2 border-gray-300 font-sans text-base focus:outline-none focus:border-primary-red transition rounded-sm"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-primary-red text-white px-8 py-4 font-sans font-bold text-sm uppercase hover:bg-text-dark transition whitespace-nowrap rounded-sm"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
      </article>

      <Footer />
    </>
  );
}
