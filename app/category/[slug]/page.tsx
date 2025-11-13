import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getCategory, getPostsByCategory, stripHtmlTags, getAuthorName, formatDate } from '@/lib/wordpress';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ArticleCard from '@/components/ArticleCard';

// ISR: Revalidate every 5 minutes
export const revalidate = 300;

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = await getCategory(slug);

  if (!category) {
    return {
      title: 'Category Not Found | Liberty Nation',
    };
  }

  return {
    title: `${category.name} | Liberty Nation`,
    description: category.description
      ? stripHtmlTags(category.description).substring(0, 160)
      : `Read the latest ${category.name.toLowerCase()} articles from Liberty Nation`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = await getCategory(slug);

  if (!category) {
    notFound();
  }

  const posts = await getPostsByCategory(category.id, { per_page: 30 });

  // Check if this is LNTV category (category ID 600 based on homepage)
  const isLNTV = slug === 'lntv' || category.id === 600;
  const isPodcast = slug === 'podcasts' || category.id === 216;

  return (
    <>
      <Header />

      <main className="bg-bg-offwhite">
        {/* Category Header - Enhanced Editorial Style */}
        <div className="relative bg-gradient-to-br from-white to-bg-gray border-b-4 border-primary-red py-20 md:py-24 overflow-hidden">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-primary-red opacity-[0.02] rounded-full -translate-x-32 -translate-y-32" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-red opacity-[0.02] rounded-full translate-x-48 translate-y-48" />

          <div className="relative max-w-[900px] mx-auto px-8 text-center">
            {/* Ornamental Top Divider */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-12 h-[2px] bg-primary-red" />
              <div className="w-2 h-2 bg-primary-red rotate-45" />
              <div className="w-2 h-2 bg-primary-red rotate-45" />
              <div className="w-2 h-2 bg-primary-red rotate-45" />
              <div className="w-12 h-[2px] bg-primary-red" />
            </div>

            {/* Category Name with Enhanced Typography */}
            <h1 className="font-display font-black text-6xl md:text-7xl lg:text-8xl mb-6 tracking-tighter text-text-dark uppercase relative">
              <span className="relative inline-block">
                {category.name}
                {/* Decorative Underline */}
                <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-primary-red" />
              </span>
            </h1>

            {/* Category Description with Enhanced Styling */}
            {category.description && (
              <div className="relative">
                <p className="font-serif text-[21px] leading-[1.8] text-text-dark mb-8 max-w-[700px] mx-auto font-light italic">
                  {stripHtmlTags(category.description)}
                </p>
              </div>
            )}

            {/* Article Count with Enhanced Badge Style */}
            <div className="inline-flex items-center gap-2 px-6 py-2 bg-text-dark rounded-full shadow-lg">
              <div className="w-2 h-2 bg-primary-red rounded-full animate-pulse" />
              <span className="font-sans text-xs font-bold uppercase tracking-widest text-white">
                {posts.length} {posts.length === 1 ? 'Article' : 'Articles'}
              </span>
            </div>

            {/* Ornamental Bottom Divider */}
            <div className="flex items-center justify-center gap-3 mt-8">
              <div className="w-12 h-[2px] bg-primary-red" />
              <div className="w-2 h-2 bg-primary-red rotate-45" />
              <div className="w-2 h-2 bg-primary-red rotate-45" />
              <div className="w-2 h-2 bg-primary-red rotate-45" />
              <div className="w-12 h-[2px] bg-primary-red" />
            </div>
          </div>
        </div>

        {/* Articles Grid - The Free Press Style */}
        {posts.length > 0 ? (
          <div className="max-w-[1400px] mx-auto px-8 py-16">
            {isLNTV ? (
              // LNTV Special Grid with Video Play Icons
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {posts.map((post) => {
                  const imageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;

                  return (
                    <article key={post.id} className="group">
                      <Link href={`/${post.slug}`}>
                        {imageUrl && (
                          <div className="relative w-full aspect-video bg-gray-200 mb-4 overflow-hidden">
                            <Image
                              src={imageUrl}
                              alt={post.title.rendered}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
                            />
                            {/* Video Play Icon Overlay */}
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition">
                              <div className="w-16 h-16 bg-primary-red rounded-full flex items-center justify-center">
                                <div className="w-0 h-0 border-l-[16px] border-l-white border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent ml-1" />
                              </div>
                            </div>
                          </div>
                        )}
                        <h3 className="font-serif font-bold text-[22px] leading-tight group-hover:text-primary-red transition">
                          {post.title.rendered}
                        </h3>
                      </Link>
                    </article>
                  );
                })}
              </div>
            ) : isPodcast ? (
              // Podcast Special Grid with Microphone Icons
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {posts.map((post) => {
                  const imageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;

                  return (
                    <article key={post.id} className="group">
                      <Link href={`/${post.slug}`}>
                        {imageUrl && (
                          <div className="relative w-full aspect-video bg-gray-200 mb-4 overflow-hidden">
                            <Image
                              src={imageUrl}
                              alt={post.title.rendered}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
                            />
                            {/* Podcast Microphone Icon Overlay */}
                            <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/30 transition">
                              <div className="w-16 h-16 bg-primary-red rounded-full flex items-center justify-center">
                                <svg
                                  className="w-8 h-8 text-white"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                                  <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                                </svg>
                              </div>
                            </div>
                          </div>
                        )}
                        <h3 className="font-serif font-bold text-[22px] leading-tight group-hover:text-primary-red transition">
                          {post.title.rendered}
                        </h3>
                      </Link>
                    </article>
                  );
                })}
              </div>
            ) : (
              // Enhanced Editorial Grid with Featured First Article
              <div>
                {/* Featured First Article - Hero Treatment */}
                {posts.length > 0 && (
                  <>
                    <article className="group mb-16 pb-16 border-b-2 border-border-dark">
                      <Link href={`/${posts[0].slug}`} className="block">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                          {/* Featured Image */}
                          {posts[0]._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
                            <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-200 shadow-2xl group-hover:shadow-primary-red/20 transition-all duration-500">
                              <Image
                                src={posts[0]._embedded['wp:featuredmedia'][0].source_url}
                                alt={posts[0].title.rendered}
                                fill
                                className="object-cover transition-all duration-700 ease-out group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, 50vw"
                                priority
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                              {/* Featured Badge */}
                              <div className="absolute top-6 left-6 px-4 py-2 bg-primary-red text-white font-sans text-xs font-bold uppercase tracking-widest shadow-lg">
                                Featured
                              </div>
                            </div>
                          )}

                          {/* Featured Content */}
                          <div>
                            {/* Category Badge */}
                            <div className="inline-block mb-4 px-3 py-1 border-2 border-primary-red text-primary-red font-sans text-xs font-bold uppercase tracking-widest">
                              {category.name}
                            </div>

                            <h2 className="font-display font-black text-5xl md:text-6xl leading-[1.05] mb-6 tracking-tight group-hover:text-primary-red transition-colors duration-300">
                              {posts[0].title.rendered}
                            </h2>

                            {posts[0].excerpt && (
                              <p className="font-serif text-[21px] leading-[1.7] text-text-dark mb-6 line-clamp-4">
                                {stripHtmlTags(posts[0].excerpt.rendered)}
                              </p>
                            )}

                            <div className="flex items-center gap-3 text-[14px] font-sans">
                              <span className="text-primary-red font-bold uppercase tracking-wide">
                                {getAuthorName(posts[0]).toUpperCase()}
                              </span>
                              <span className="w-1 h-1 bg-text-gray rounded-full" />
                              <span className="text-text-gray uppercase tracking-wide">
                                {formatDate(posts[0].date)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </article>

                    {/* Decorative Section Divider */}
                    <div className="flex items-center justify-center gap-4 mb-16">
                      <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-border-dark to-transparent" />
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary-red rotate-45" />
                        <div className="w-3 h-3 bg-primary-red rotate-45" />
                        <div className="w-2 h-2 bg-primary-red rotate-45" />
                      </div>
                      <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-border-dark to-transparent" />
                    </div>
                  </>
                )}

                {/* Remaining Articles Grid with Alternating Layouts */}
                <div className="space-y-16">
                  {posts.slice(1).map((post, index) => {
                    // Create section breaks every 6 articles
                    const showDivider = (index + 1) % 6 === 0 && index + 1 < posts.length - 1;
                    const isInFirstRow = index < 3;
                    const isInSecondRow = index >= 3 && index < 9;

                    return (
                      <div key={post.id}>
                        {/* Grid Container - First 3 posts */}
                        {index < 3 && index === 0 && (
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
                            {posts.slice(1, 4).map((p) => (
                              <article key={p.id} className="group relative">
                                <Link href={`/${p.slug}`} className="block">
                                  {/* Image with Enhanced Shadow */}
                                  {p._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
                                    <div className="relative w-full aspect-[3/2] overflow-hidden bg-gray-200 mb-4 shadow-lg group-hover:shadow-xl group-hover:shadow-primary-red/10 transition-all duration-500">
                                      <Image
                                        src={p._embedded['wp:featuredmedia'][0].source_url}
                                        alt={p.title.rendered}
                                        fill
                                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, 380px"
                                      />
                                      <div className="absolute inset-0 ring-1 ring-inset ring-black/10" />
                                    </div>
                                  )}

                                  <h3 className="font-display font-bold text-[28px] leading-tight mb-3 tracking-tight group-hover:text-primary-red transition-colors duration-300">
                                    {p.title.rendered}
                                  </h3>

                                  {p.excerpt && (
                                    <p className="font-serif text-[17px] leading-[1.6] text-text-dark mb-3 line-clamp-3">
                                      {stripHtmlTags(p.excerpt.rendered).substring(0, 120)}...
                                    </p>
                                  )}

                                  <div className="flex items-center gap-2 text-[12px] font-sans uppercase tracking-wide">
                                    <span className="text-primary-red font-bold">{getAuthorName(p).toUpperCase()}</span>
                                    <span className="text-text-gray">—</span>
                                    <span className="text-text-gray">{formatDate(p.date)}</span>
                                  </div>
                                </Link>
                                {/* Decorative Corner Accent */}
                                <div className="absolute -top-2 -left-2 w-8 h-8 border-l-2 border-t-2 border-primary-red opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              </article>
                            ))}
                          </div>
                        )}

                        {/* Two Column Grid - Posts 4-9 */}
                        {index >= 3 && index < 9 && index === 3 && (
                          <>
                            {/* Section Break with Typography */}
                            <div className="mb-16">
                              <div className="flex items-center gap-4 mb-12">
                                <div className="w-1 h-12 bg-primary-red" />
                                <h3 className="font-display font-bold text-2xl uppercase tracking-wide text-text-dark">
                                  More Stories
                                </h3>
                                <div className="flex-1 h-[2px] bg-gradient-to-r from-primary-red via-border-dark to-transparent" />
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                {posts.slice(4, 10).map((p) => (
                                  <article key={p.id} className="group bg-white p-6 shadow-md hover:shadow-xl hover:shadow-primary-red/5 transition-all duration-500 border-l-4 border-transparent hover:border-primary-red">
                                    <Link href={`/${p.slug}`}>
                                      {p._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
                                        <div className="relative w-full aspect-video overflow-hidden bg-gray-200 mb-4">
                                          <Image
                                            src={p._embedded['wp:featuredmedia'][0].source_url}
                                            alt={p.title.rendered}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            sizes="(max-width: 768px) 100vw, 480px"
                                          />
                                        </div>
                                      )}

                                      <h3 className="font-display font-bold text-[24px] leading-tight mb-3 group-hover:text-primary-red transition-colors duration-300">
                                        {p.title.rendered}
                                      </h3>

                                      {p.excerpt && (
                                        <p className="font-serif text-[16px] leading-[1.6] text-text-dark mb-3 line-clamp-2">
                                          {stripHtmlTags(p.excerpt.rendered).substring(0, 100)}...
                                        </p>
                                      )}

                                      <div className="flex items-center gap-2 text-[11px] font-sans uppercase tracking-widest">
                                        <span className="text-primary-red font-bold">{getAuthorName(p).toUpperCase()}</span>
                                        <span className="w-1 h-1 bg-text-gray rounded-full" />
                                        <span className="text-text-gray">{formatDate(p.date)}</span>
                                      </div>
                                    </Link>
                                  </article>
                                ))}
                              </div>
                            </div>
                          </>
                        )}

                        {/* Remaining Posts - Standard 3 Column Grid */}
                        {index >= 9 && index === 9 && posts.slice(10).length > 0 && (
                          <>
                            {/* Section Divider */}
                            <div className="flex items-center justify-center gap-4 mb-16">
                              <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-border-dark to-transparent" />
                              <div className="px-6 py-2 bg-text-dark text-white font-sans text-xs font-bold uppercase tracking-widest">
                                Archive
                              </div>
                              <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-border-dark to-transparent" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                              {posts.slice(10).map((p, idx) => {
                                const showBreak = (idx + 1) % 9 === 0 && idx + 1 < posts.slice(10).length;
                                return (
                                  <div key={p.id}>
                                    <ArticleCard post={p} variant="sidebar" />
                                    {showBreak && (
                                      <div className="col-span-full my-12 flex items-center justify-center gap-3">
                                        <div className="w-16 h-[2px] bg-primary-red" />
                                        <div className="w-2 h-2 bg-primary-red rotate-45" />
                                        <div className="w-16 h-[2px] bg-primary-red" />
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="font-serif text-xl text-text-gray">
              No articles found in this category.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
