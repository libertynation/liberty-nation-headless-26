import { getPosts, getFeaturedImageUrl, getAuthorName, formatDate, getExcerpt, decodeHtmlEntities } from '@/lib/wordpress';
import Header from '@/components/Header';
import FeaturedArticle from '@/components/FeaturedArticle';
import ArticleCard from '@/components/ArticleCard';
import Footer from '@/components/Footer';
import BreakingHeadlines from '@/components/BreakingHeadlines';
import MoreSection from '@/components/MoreSection';
import SectionLabel from '@/components/SectionLabel';
import AnimatedSection from '@/components/AnimatedSection';
import { Spotlight } from '@/components/Spotlight';
import ExclusivesSlider from '@/components/ExclusivesSlider';
import ExclusivesSliderV2 from '@/components/ExclusivesSliderV2';
import ExclusivesSliderV3 from '@/components/ExclusivesSliderV3';
import ExclusivesSliderImproved from '@/components/ExclusivesSliderImproved';
import ExclusivesSliderFinal from '@/components/ExclusivesSliderFinal';
import CinematicDailyBriefing from '@/components/CinematicDailyBriefing';
import Image from 'next/image';
import Link from 'next/link';

// ISR: Revalidate every 5 minutes
export const revalidate = 300;

export default async function HomePage() {
  // Fetch latest posts from WordPress
  const posts = await getPosts({ per_page: 30 });

  // Fetch LNTV (video) posts - lntv category and children (category ID: 600)
  const lntvPosts = await getPosts({ per_page: 3, categories: '600', orderby: 'date', order: 'desc' });

  // Fetch Audio posts - all audio categories and their children (category ID: 3390 includes podcasts, ln-radio, etc.)
  const audioPosts = await getPosts({ per_page: 3, categories: '3390', orderby: 'date', order: 'desc' });

  // Fetch Culture posts - category ID: 444
  const cultureArticles = await getPosts({ per_page: 3, categories: '444', orderby: 'date', order: 'desc' });

  // Fetch Opinion posts - category ID: 11601, increased to 6 articles
  const opinionArticles = await getPosts({ per_page: 6, categories: '11601', orderby: 'date', order: 'desc' });

  // Fetch breaking headlines - using latest 5 posts for now
  const breakingPosts = await getPosts({ per_page: 5 });

  if (!posts || posts.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-xl font-serif text-text-gray">Loading articles...</p>
      </div>
    );
  }

  // Distribute posts across sections - TASK 2: Reduce sidebar from 3 to 2 posts
  const leftColumnPosts = posts.slice(0, 2);
  const featuredPost = posts[2] || posts[0];
  const rightColumnPosts = posts.slice(3, 5);

  const exclusivesArticles = posts.slice(8, 12);
  const moreArticles = posts.slice(15, 23);

  return (
    <>
      <Header />

      {/* Main Three-Column Layout */}
      <main className="bg-bg-offwhite">
        {/* Hero Section */}
        <div className="max-w-[1600px] mx-auto px-10 py-4">
          <div className="grid grid-cols-1 lg:grid-cols-[26%_48%_26%] gap-10 items-start">
            {/* Left Column */}
            <aside className="space-y-8">
              {leftColumnPosts.map((post) => (
                <ArticleCard key={post.id} post={post} variant="sidebar" />
              ))}
            </aside>

            {/* Center Featured - with padding to align */}
            <div className="pt-2">
              <FeaturedArticle post={featuredPost} />
            </div>

            {/* Right Column */}
            <aside className="space-y-8">
              {rightColumnPosts.map((post) => (
                <ArticleCard key={post.id} post={post} variant="sidebar" />
              ))}
            </aside>
          </div>
        </div>

        {/* Breaking Headlines Section - TASK 3 */}
        <div className="mt-16 mb-16">
          <BreakingHeadlines posts={breakingPosts} />
        </div>

        {/* Daily Briefing Signup Section */}
        <AnimatedSection bgColor="red" className="border-t border-b border-border-gray bg-bg-offwhite py-20 my-16">
          <div className="max-w-max mx-auto px-8">
            <div className="white-card bg-white px-12 py-10 rounded-sm shadow-lg text-center text-black transition-all duration-1000" style={{ transitionDelay: '3200ms' }}>
              <div className="inline-flex items-center gap-3 mb-4 bg-black/10 px-6 py-2 rounded-full text-black">
                <svg className="w-5 h-5 animate-pulse text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <span className="font-sans font-black text-sm uppercase tracking-widest text-black">
                  Daily Briefing
                </span>
              </div>

              <h2 className="font-display font-black text-4xl md:text-5xl mb-4 uppercase leading-tight text-black">
                Your Morning Dose of Liberty
              </h2>
              <p className="font-serif text-xl mb-8 max-w-[650px] mx-auto leading-relaxed text-black">
                Get the day's most important stories, analysis, and commentary delivered to your inbox every morning.
                No fluff. No propaganda. Just truth.
              </p>

              <form className="flex flex-col sm:flex-row gap-3 max-w-[600px] mx-auto mb-4 group">
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

        {/* LNTV (Videos) Section - FIRST major content section */}
        <div className="bg-bg-offwhite py-20 relative overflow-hidden">
          <SectionLabel sectionTitle="Liberty Nation TV" href="/category/lntv" actionText="Watch more" />
          <div className="max-w-[1400px] mx-auto px-8">
            {/* Section Header */}
            <div className="flex items-center gap-6 mb-6">
              <div className="flex-1 border-t-2 border-black" />
              <h2 className="font-sans font-black text-5xl uppercase tracking-tight">Liberty Nation TV</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {lntvPosts.map((post) => (
                <article key={post.id} className="group">
                  <Link href={`/${post.slug}`}>
                    {post._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
                      <div className="relative w-full aspect-[580/436] bg-gray-200 mb-4 overflow-hidden">
                        <Image
                          src={post._embedded['wp:featuredmedia'][0].source_url}
                          alt={post.title.rendered}
                          fill
                          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 400px"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/60 transition-colors duration-300">
                          <div className="w-16 h-16 bg-primary-red rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                            <div className="w-0 h-0 border-l-[16px] border-l-white border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent ml-1" />
                          </div>
                          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 ease-out">
                            <svg
                              className="w-8 h-8 text-white drop-shadow-lg"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
                            </svg>
                          </div>
                        </div>
                      </div>
                    )}
                    <h3 className="font-serif font-bold text-[20px] leading-tight group-hover:text-primary-red transition-colors duration-300 ease-out">
                      {post.title.rendered}
                    </h3>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>

        {/* Culture Section */}
        <div className="bg-white py-20 relative overflow-hidden">
          <SectionLabel sectionTitle="Culture" href="/category/culture-and-entertainment-news" />
          <div className="max-w-[1400px] mx-auto px-8">
            {/* Section Header */}
            <div className="flex items-center gap-6 mb-6">
              <div className="flex-1 border-t-2 border-black" />
              <h2 className="font-sans font-black text-5xl uppercase tracking-tight">Culture</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {cultureArticles.map((post) => (
                <ArticleCard key={post.id} post={post} variant="sidebar" />
              ))}
            </div>
          </div>
        </div>

        {/* LN Exclusives Section */}
        <ExclusivesSliderFinal posts={exclusivesArticles} />

        {/* Opinion & Analysis Section */}
        <div className="bg-bg-offwhite py-20 relative overflow-hidden">
          <SectionLabel sectionTitle="Opinion & Analysis" href="/category/opinion" />
          <div className="max-w-[1400px] mx-auto px-8">
            {/* Section Header */}
            <div className="flex items-center gap-6 mb-6">
              <div className="flex-1 border-t-2 border-black" />
              <h2 className="font-sans font-black text-5xl uppercase tracking-tight">Opinion & Analysis</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {opinionArticles.map((post) => (
                <article key={post.id} className="border-t-4 border-primary-red pt-4">
                  <Link href={`/${post.slug}`}>
                    <div className="text-primary-red font-sans text-[10px] font-bold uppercase tracking-widest mb-2">
                      OPINION
                    </div>
                    <h3 className="font-serif font-bold text-[24px] leading-tight mb-3 hover:text-primary-red transition">
                      {post.title.rendered}
                    </h3>
                    <div className="font-sans text-[11px] font-semibold uppercase tracking-wide text-text-gray">
                      {post._embedded?.author?.[0]?.name?.toUpperCase() || 'LIBERTY NATION'}
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>

        {/* Audio Section (Podcasts, LN Radio) */}
        <div className="bg-bg-offwhite py-20 relative overflow-hidden">
          <SectionLabel sectionTitle="Audio" href="/category/audio" actionText="Listen to more" />
          <div className="max-w-[1400px] mx-auto px-8">
            {/* Section Header */}
            <div className="flex items-center gap-6 mb-6">
              <div className="flex-1 border-t-2 border-black" />
              <h2 className="font-sans font-black text-5xl uppercase tracking-tight">Audio</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {audioPosts.map((post) => (
                <article key={post.id} className="group">
                  <Link href={`/${post.slug}`}>
                    {post._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
                      <div className="relative w-full aspect-[580/436] bg-gray-200 mb-4 overflow-hidden">
                        <Image
                          src={post._embedded['wp:featuredmedia'][0].source_url}
                          alt={post.title.rendered}
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
                    <h3 className="font-serif font-bold text-[20px] leading-tight group-hover:text-primary-red transition-colors duration-300 ease-out">
                      {post.title.rendered}
                    </h3>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>

        {/* Donate Section */}
        <div className="bg-gradient-to-br from-black via-gray-900 to-black py-20 my-16 relative overflow-hidden">
          {/* Video Background - Right aligned with gradient overlay */}
          <div className="absolute inset-0 overflow-hidden flex items-center justify-end">
            <div className="relative h-full w-auto">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="h-[110%] w-auto scale-110 opacity-70 mix-blend-overlay"
              >
                <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20video-FU26yq0MK1y0rKSt7TYfo68XneAQ14.mp4" type="video/mp4" />
              </video>
              {/* Gradient overlay - transparent center to left edge matching background */}
              <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900/80 to-transparent" />
            </div>
          </div>

          {/* Aceternity Spotlight Effect */}
          <Spotlight />

          {/* Original Subtle Red Glow Elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-primary-red opacity-10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-red opacity-10 rounded-full blur-3xl" />

          <div className="max-w-[900px] mx-auto px-8 text-center relative z-10">
            <div className="inline-block mb-4">
              <span className="font-sans font-black text-sm uppercase text-primary-red bg-primary-red/20 px-4 py-2 tracking-widest">
                SUPPORT INDEPENDENT JOURNALISM
              </span>
            </div>
            <h2 className="font-display font-black text-5xl md:text-6xl mb-6 uppercase text-white leading-tight">
              Defend Free Speech
            </h2>
            <p className="font-serif text-xl text-gray-300 mb-8 leading-relaxed max-w-[700px] mx-auto">
              In a world of censorship and propaganda, Liberty Nation stands for truth, freedom, and the Constitution.
              Your support keeps us independent and fearless.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/donate" className="bg-primary-red text-white px-10 py-4 font-sans font-black text-base uppercase hover:bg-[#e02835] transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105">
                Donate Now
              </Link>
            </div>
            <p className="font-sans text-sm text-gray-400 mt-6">
              Tax-deductible contributions support our mission to defend liberty and promote free thinking.
            </p>
          </div>
        </div>

        {/* More Stories Section */}
        <MoreSection posts={moreArticles} title="MORE" />

        {/* Final CTA Banner */}
        <div className="bg-primary-red text-white py-20 mt-16 relative overflow-hidden">
          {/* Subtle dot pattern background */}
          <div className="absolute inset-0 opacity-[0.15]" style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }} />

          <div className="max-w-[900px] mx-auto px-8 text-center relative z-10">
            <h2 className="font-sans font-black text-white text-5xl md:text-6xl mb-6 uppercase leading-tight tracking-tight">
              Support Fearless Journalism
            </h2>
            <p className="font-serif text-white text-xl md:text-2xl mb-8 leading-relaxed">
              Join <em>Liberty Nation</em> today for unlimited access to independent news and commentary
            </p>
            <button className="bg-white text-primary-red px-10 py-4 font-sans font-black text-base uppercase hover:bg-gray-100 transition-all duration-300 shadow-xl hover:scale-105">
              SUBSCRIBE NOW
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
