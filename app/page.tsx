import { getPosts, getFeaturedImageUrl, getAuthorName, formatDate, getExcerpt, decodeHtmlEntities, type WordPressPost } from '@/lib/wordpress';
import { generateHomeMetadata } from '@/lib/seo';
import { getLatestYouTubeVideos } from '@/lib/youtube';
import Header from '@/components/Header';
import FeaturedArticle from '@/components/FeaturedArticle';
import ArticleCard from '@/components/ArticleCard';
import Footer from '@/components/Footer';
import BreakingHeadlines from '@/components/BreakingHeadlines';
import MoreSection from '@/components/MoreSection';
import SectionViewMore from '@/components/SectionViewMore';
import AnimatedSection from '@/components/AnimatedSection';
import CategoryButtons from '@/components/CategoryButtons';
import { Spotlight } from '@/components/Spotlight';
import ExclusivesSliderFinal from '@/components/ExclusivesSliderFinal';
import DailyExclusives from '@/components/DailyExclusives';
import PoliticsSection from '@/components/PoliticsSection';
import FadeInSection from '@/components/FadeInSection';
import Image from 'next/image';
import Link from 'next/link';
import SectionHeader from '@/components/SectionHeader';
import { grids, spacing, typography, transitions, aspectRatios, authorMeta } from '@/lib/design-tokens';

// ISR: Revalidate every 60 seconds for news site - fast updates critical
export const revalidate = 60;

// SEO Metadata
export const metadata = generateHomeMetadata();

export default async function HomePage() {
  // Fetch all data in parallel for better performance
  // Wrap in try-catch to handle SSL cert issues during Vercel builds
  // ISR will update the page with real data after deployment
  let articlesResponse: WordPressPost[] = [];
  let posts: WordPressPost[] = [];
  let dailyExclusives: WordPressPost[] = [];
  let politicsArticles: WordPressPost[] = [];
  let lntvPosts: WordPressPost[] = [];
  let audioPosts: WordPressPost[] = [];
  let cultureArticles: WordPressPost[] = [];
  let opinionArticles: WordPressPost[] = [];
  let breakingPosts: WordPressPost[] = [];
  let youtubeVideos: Awaited<ReturnType<typeof getLatestYouTubeVideos>> = [];

  try {
    [
      articlesResponse,
      posts,
      dailyExclusives,
      politicsArticles,
      lntvPosts,
      audioPosts,
      cultureArticles,
      opinionArticles,
      breakingPosts
    ] = await Promise.all([
      getPosts({ per_page: 1, categories: '5016', orderby: 'date', order: 'desc' }),
      getPosts({ per_page: 30 }),
      getPosts({ per_page: 7, categories: '5016', orderby: 'date', order: 'desc' }), // Daily Exclusives
      getPosts({ per_page: 5, categories: '441', orderby: 'date', order: 'desc' }), // U.S. Politics
      getPosts({ per_page: 3, categories: '600', orderby: 'date', order: 'desc' }),
      getPosts({ per_page: 3, categories: '3390', orderby: 'date', order: 'desc' }),
      getPosts({ per_page: 3, categories: '444', orderby: 'date', order: 'desc' }),
      getPosts({ per_page: 6, categories: '11601', orderby: 'date', order: 'desc' }),
      getPosts({ per_page: 5 })
    ]);
  } catch (error) {
    console.error('Error fetching posts during build:', error);
    // During Vercel build, SSL cert issues may occur - empty arrays already initialized, let ISR update
  }

  // Fetch YouTube videos as fallback for LNTV section if needed
  try {
    youtubeVideos = await getLatestYouTubeVideos(3);
    console.log('Homepage: YouTube videos fetched:', youtubeVideos.length, 'videos');
  } catch (error) {
    console.error('Homepage: Error fetching YouTube videos:', error);
  }

  const featuredPost = articlesResponse?.[0];

  // If no data (build failure), render a minimal page that will be updated by ISR
  if (!featuredPost || !posts || posts.length === 0) {
    return (
      <>
        <Header />
        <main className="bg-bg-offwhite min-h-screen flex items-center justify-center">
          <div className="text-center p-8">
            <h1 className="font-display font-black text-4xl mb-4">Liberty Nation</h1>
            <p className="font-serif text-lg text-text-gray">
              Loading latest content... This page will update shortly.
            </p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Filter out featured post from general posts
  const filteredPosts = posts.filter(post => post.id !== featuredPost?.id);

  // Distribute posts across sections - sidebar posts from general categories
  const leftColumnPosts = filteredPosts.slice(0, 2);
  const rightColumnPosts = filteredPosts.slice(2, 4);

  const exclusivesArticles = filteredPosts.slice(8, 12);
  const moreArticles = filteredPosts.slice(15, 23);

  return (
    <>
      <Header />

      {/* Main Three-Column Layout */}
      <main className="bg-bg-offwhite">
        {/* Hero Section */}
        <div className={`max-w-[1600px] mx-auto ${spacing.container.default} ${spacing.section.sm}`}>
          <div className={`${grids.threeColumn.container} ${grids.threeColumn.gap} ${grids.threeColumn.alignment}`}>
            {/* Left Column */}
            <aside className={`flex flex-col ${spacing.gap.md}`}>
              {leftColumnPosts.map((post) => (
                <ArticleCard key={post.id} post={post} variant="sidebar" />
              ))}
            </aside>

            {/* Center Featured */}
            <div>
              <FeaturedArticle post={featuredPost} />
            </div>

            {/* Right Column */}
            <aside className={`flex flex-col ${spacing.gap.md}`}>
              {rightColumnPosts.map((post) => (
                <ArticleCard key={post.id} post={post} variant="sidebar" />
              ))}
            </aside>
          </div>
        </div>

        {/* Breaking Headlines Section */}
        <FadeInSection delay={0.1}>
          <div className={`${spacing.section.lg}`}>
            <BreakingHeadlines posts={breakingPosts} />
          </div>
        </FadeInSection>

        {/* Daily Briefing Signup Section */}
        <FadeInSection delay={0.3}>
          <AnimatedSection bgColor="red" className={`border-t border-b border-border-gray bg-bg-offwhite ${spacing.section.lg} ${spacing.section.lg}`}>
          <div className="max-w-max mx-auto px-4 sm:px-6 lg:px-8">
            <div className="white-card bg-white px-6 sm:px-8 md:px-10 lg:px-12 py-6 sm:py-8 md:py-10 rounded-sm shadow-lg text-center text-black transition-all duration-[1200ms]">
              <div className="badge-dark inline-flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 bg-black/10 px-4 sm:px-6 py-2 rounded-full text-black">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <span className="font-sans font-black text-xs sm:text-sm uppercase tracking-widest">
                  Daily Briefing
                </span>
              </div>

              <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-3 sm:mb-4 uppercase leading-tight text-black">
                Your Morning Dose of Liberty
              </h2>
              <p className="font-serif text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-[650px] mx-auto leading-relaxed text-black">
                Get the day's most important stories, analysis, and commentary delivered to your inbox every morning.
                No fluff. No propaganda. Just truth.
              </p>

              <form className="flex flex-col sm:flex-row gap-3 max-w-[600px] mx-auto mb-3 sm:mb-4 group">
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
        </AnimatedSection>
        </FadeInSection>

        {/* Daily Exclusives Section - Magazine-Style Layout */}
        <FadeInSection delay={0.1}>
          <DailyExclusives posts={dailyExclusives} />
        </FadeInSection>

        {/* U.S. Politics Section - The Free Press Style */}
        <FadeInSection delay={0.2}>
          <PoliticsSection posts={politicsArticles} />
        </FadeInSection>

        {/* LNTV (Videos) Section - with YouTube fallback */}
        <FadeInSection delay={0.1}>
          <div className={`bg-bg-offwhite ${spacing.section.lg} relative overflow-hidden`}>
          <div className={`max-w-[1400px] mx-auto ${spacing.container.default}`}>
            {/* Section Header */}
            <SectionHeader title="Liberty Nation TV" ctaHref="/category/lntv" ctaText="Watch more videos" />
            <div className={`${grids.articles.triple} ${spacing.gap.lg}`}>
              {/* Show LNTV posts if available, otherwise show YouTube videos */}
              {lntvPosts.length > 0 ? lntvPosts.map((post) => (
                <article key={post.id} className="group text-center">
                  <Link href={`/${post.slug}`}>
                    {post._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
                      <div className={`relative w-full ${aspectRatios.hero} bg-gray-200 ${spacing.mb.sm} overflow-hidden`}>
                        <Image
                          src={post._embedded['wp:featuredmedia'][0].source_url}
                          alt={decodeHtmlEntities(post.title.rendered)}
                          fill
                          className={`object-cover ${transitions.transform} ease-out group-hover:scale-105`}
                          sizes="(max-width: 768px) 100vw, 400px"
                        />
                        <div className={`absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/60 ${transitions.color}`}>
                          <div className={`w-16 h-16 bg-primary-red rounded-full flex items-center justify-center ${transitions.normal} group-hover:scale-110`}>
                            <div className="w-0 h-0 border-l-[16px] border-l-white border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent ml-1" />
                          </div>
                        </div>
                      </div>
                    )}
                    <h3 className={`font-display font-black ${typography.card.medium} ${spacing.mb.sm} group-hover:text-primary-red ${transitions.color}`}>
                      {decodeHtmlEntities(post.title.rendered)}
                    </h3>
                    <div className={`flex items-center justify-center ${authorMeta.containerGap.tight} ${typography.meta.small} font-sans uppercase tracking-wide`}>
                      <span className="text-primary-red font-bold">{getAuthorName(post).toUpperCase()}</span>
                      <span className="text-black">—</span>
                      <span className="text-gray-600">{formatDate(post.date)}</span>
                    </div>
                  </Link>
                </article>
              )) : youtubeVideos.map((video) => (
                <article key={video.id} className="group text-center">
                  <a href={video.videoUrl} target="_blank" rel="noopener noreferrer">
                    <div className={`relative w-full ${aspectRatios.hero} bg-gray-200 ${spacing.mb.sm} overflow-hidden`}>
                      <Image
                        src={video.thumbnailUrl}
                        alt={video.title}
                        fill
                        className={`object-cover ${transitions.transform} ease-out group-hover:scale-105`}
                        sizes="(max-width: 768px) 100vw, 400px"
                      />
                      <div className={`absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/60 ${transitions.color}`}>
                        <div className={`w-16 h-16 bg-primary-red rounded-full flex items-center justify-center ${transitions.normal} group-hover:scale-110`}>
                          <div className="w-0 h-0 border-l-[16px] border-l-white border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent ml-1" />
                        </div>
                      </div>
                    </div>
                    <h3 className={`font-display font-black ${typography.card.medium} ${spacing.mb.sm} group-hover:text-primary-red ${transitions.color}`}>
                      {video.title}
                    </h3>
                    <div className={`flex items-center justify-center ${authorMeta.containerGap.tight} ${typography.meta.small} font-sans uppercase tracking-wide`}>
                      <span className="text-primary-red font-bold">LIBERTY NATION</span>
                      <span className="text-black">—</span>
                      <span className="text-gray-600">{new Date(video.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                  </a>
                </article>
              ))}
            </div>
            <div className="lg:hidden">
              <SectionViewMore href="/category/lntv" actionText="Watch more videos" />
            </div>
          </div>
        </div>
        </FadeInSection>

        {/* Dailies Section - Less prominent than other sections */}
        <FadeInSection delay={0.2}>
          <div className="bg-bg-offwhite py-10 sm:py-12 lg:py-14">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header - Using SectionHeader component */}
            <SectionHeader title="Dailies" ctaHref="/category/articles" ctaText="See All" />

            {/* Simple 4-column grid for dailies */}
            {cultureArticles.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {cultureArticles.slice(0, 4).map((post) => (
                  <article key={post.id} className="group">
                    <Link href={`/${post.slug}`}>
                      {getFeaturedImageUrl(post) && (
                        <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-200 mb-3">
                          <Image
                            src={getFeaturedImageUrl(post)!}
                            alt={decodeHtmlEntities(post.title.rendered)}
                            fill
                            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                            sizes="(max-width: 768px) 50vw, 25vw"
                          />
                        </div>
                      )}
                      <h4 className="font-display font-bold text-base sm:text-lg leading-tight mb-2 group-hover:text-primary-red transition-colors duration-300">
                        {decodeHtmlEntities(post.title.rendered)}
                      </h4>
                      <div className="flex items-center gap-2 text-xs font-sans uppercase tracking-wide">
                        <span className="text-primary-red font-bold">
                          {getAuthorName(post).toUpperCase()}
                        </span>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
        </FadeInSection>

        {/* Editor's Choice Section */}
        <FadeInSection delay={0.3}>
          <ExclusivesSliderFinal posts={exclusivesArticles} />
        </FadeInSection>

        {/* Opinion & Analysis Section */}
        <FadeInSection delay={0.1}>
          <div className="bg-white py-12 sm:py-16 lg:py-20">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header - Using SectionHeader component */}
            <SectionHeader title="Opinion & Analysis" ctaHref="/category/opinion" ctaText="See All" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {opinionArticles.map((post) => {
                const imageUrl = getFeaturedImageUrl(post);
                const author = getAuthorName(post);
                const date = formatDate(post.date);

                return (
                  <article key={post.id} className="group">
                    <Link href={`/${post.slug}`}>
                      {imageUrl && (
                        <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-200 mb-4">
                          <Image
                            src={imageUrl}
                            alt={decodeHtmlEntities(post.title.rendered)}
                            fill
                            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
                          />
                        </div>
                      )}

                      <div className="text-primary-red font-sans text-xs font-bold uppercase tracking-widest mb-2">
                        OPINION
                      </div>

                      <h3 className="font-display font-bold text-xl sm:text-2xl leading-tight mb-3 group-hover:text-primary-red transition-colors duration-300">
                        {decodeHtmlEntities(post.title.rendered)}
                      </h3>

                      <div className="flex items-center gap-2 text-xs font-sans uppercase tracking-wide">
                        <span className="text-primary-red font-bold">{author.toUpperCase()}</span>
                        <span className="text-gray-400">—</span>
                        <span className="text-gray-500">{date}</span>
                      </div>
                    </Link>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
        </FadeInSection>

        {/* Audio Section (Podcasts, LN Radio) */}
        <FadeInSection delay={0.2}>
          <div className="bg-bg-offwhite py-12 sm:py-16 lg:py-20 relative overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <SectionHeader title="Audio" ctaHref="/category/audio" ctaText="Listen to more podcasts" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
              {audioPosts.map((post) => (
                <article key={post.id} className="group text-center">
                  <Link href={`/${post.slug}`}>
                    {post._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
                      <div className="relative w-full aspect-[580/436] bg-gray-200 mb-4 overflow-hidden">
                        <Image
                          src={post._embedded['wp:featuredmedia'][0].source_url}
                          alt={decodeHtmlEntities(post.title.rendered)}
                          fill
                          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 400px"
                        />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/40 transition-colors duration-300">
                          <div className="w-16 h-16 bg-primary-red rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 relative">
                            <svg
                              className="w-8 h-8 text-white absolute group-hover:opacity-0 transition-opacity duration-300"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                              <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                            </svg>
                            <svg
                              className="w-8 h-8 text-white absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 audio-wave"
                              viewBox="0 0 32 32"
                              fill="currentColor"
                            >
                              <rect className="audio-bar-1" x="6" y="12" width="3" height="8" rx="1.5"/>
                              <rect className="audio-bar-2" x="11" y="8" width="3" height="16" rx="1.5"/>
                              <rect className="audio-bar-3" x="16" y="4" width="3" height="24" rx="1.5"/>
                              <rect className="audio-bar-4" x="21" y="8" width="3" height="16" rx="1.5"/>
                              <rect className="audio-bar-5" x="26" y="12" width="3" height="8" rx="1.5"/>
                            </svg>
                          </div>
                        </div>
                      </div>
                    )}
                    <h3 className="font-display font-black text-xl sm:text-2xl md:text-3xl leading-[1.2] mb-3 group-hover:text-primary-red transition-colors duration-300">
                      {decodeHtmlEntities(post.title.rendered)}
                    </h3>
                    <div className="flex items-center justify-center gap-2 text-xs font-sans uppercase tracking-wide">
                      <span className="text-primary-red font-bold">{getAuthorName(post).toUpperCase()}</span>
                      <span className="text-black">—</span>
                      <span className="text-gray-600">{formatDate(post.date)}</span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
            <div className="lg:hidden">
              <SectionViewMore href="/category/audio" actionText="Listen to more podcasts" />
            </div>
          </div>
        </div>
        </FadeInSection>

        {/* Donate Section - Fixed height container with contained video */}
        <FadeInSection delay={0.1}>
          <div className="bg-black relative overflow-hidden h-[450px]">
          {/* Video Background - Strictly contained within section bounds */}
          <div className="absolute inset-0 overflow-hidden">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-40"
              style={{ maxHeight: '450px' }}
            >
              <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20video-FU26yq0MK1y0rKSt7TYfo68XneAQ14.mp4" type="video/mp4" />
            </video>
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-black/60" />
          </div>

          {/* Spotlight Effect */}
          <Spotlight />

          {/* Content - centered vertically and horizontally */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
              <span className="inline-block font-sans font-bold text-xs uppercase text-primary-red tracking-widest mb-4">
                Support Independent Journalism
              </span>
              <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl mb-4 uppercase text-white leading-tight">
                Defend Free Speech
              </h2>
              <p className="font-serif text-base sm:text-lg text-gray-300 mb-6 leading-relaxed max-w-[600px] mx-auto">
                Your support keeps Liberty Nation independent and fearless in defending truth and the Constitution.
              </p>
              <Link href="/donate" className="inline-block bg-primary-red text-white px-8 py-3 font-sans font-bold text-sm uppercase hover:bg-white hover:text-primary-red transition-all duration-300">
                Donate Now
              </Link>
            </div>
          </div>
        </div>
        </FadeInSection>

        {/* More Stories Section */}
        <FadeInSection delay={0.2}>
          <MoreSection posts={moreArticles} title="MORE" />
        </FadeInSection>

        {/* Final CTA Banner */}
        <div className="bg-primary-red text-white py-12 sm:py-16 lg:py-20 mt-8 sm:mt-12 lg:mt-16 relative overflow-hidden">
          {/* Subtle dot pattern background */}
          <div className="absolute inset-0 opacity-[0.15]" style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }} />

          <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="font-sans font-black text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-5 lg:mb-6 uppercase leading-tight tracking-tight">
              Support Fearless Journalism
            </h2>
            <p className="font-serif text-white text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 leading-relaxed">
              Join <em>Liberty Nation</em> today for unlimited access to independent news and commentary
            </p>
            <button className="bg-white text-primary-red px-10 py-4 font-sans font-black text-base uppercase hover:bg-gray-100 transition-all duration-300 shadow-xl hover:scale-105">
              SUBSCRIBE NOW
            </button>
          </div>
        </div>
      </main>

      {/* Category Buttons Section - Bottom of page */}
      <CategoryButtons />

      <Footer />
    </>
  );
}
