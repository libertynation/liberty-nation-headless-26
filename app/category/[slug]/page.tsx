import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getCategory, getPostsByCategoryWithChildren, stripHtmlTags, getAuthorName, formatDate } from '@/lib/wordpress';
import { generateCategoryMetadata } from '@/lib/seo';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ArticleCard from '@/components/ArticleCard';
import Pagination from '@/components/Pagination';

// ISR: Revalidate every 60 seconds for news site - fast updates critical
export const revalidate = 60;

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ params, searchParams }: CategoryPageProps) {
  const { slug } = await params;
  const { page: pageParam } = await searchParams;
  const currentPage = pageParam ? parseInt(pageParam, 10) : 1;
  const category = await getCategory(slug);

  if (!category) {
    return {
      title: 'Category Not Found | Liberty Nation',
      description: 'The category you are looking for could not be found.',
    };
  }

  return generateCategoryMetadata(category, currentPage);
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { slug } = await params;
  const { page: pageParam } = await searchParams;
  const currentPage = pageParam ? parseInt(pageParam, 10) : 1;

  const category = await getCategory(slug);

  if (!category) {
    notFound();
  }

  const response = await getPostsByCategoryWithChildren(category.id, { per_page: 24, page: currentPage });
  const posts = response.data;
  const totalPages = response.totalPages || 1;

  // Check if this is LNTV category (category ID 600 based on homepage)
  const isLNTV = slug === 'lntv' || category.id === 600;
  const isPodcast = slug === 'podcasts' || category.id === 216;

  return (
    <>
      <Header />

      <main className="bg-bg-offwhite">
        {/* Category Header - Simple */}
        <div className="bg-white border-b border-gray-200 py-8 sm:py-10 lg:py-12">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-text-dark uppercase mb-2">
              {category.name}
            </h1>

            {category.description && (
              <p className="font-serif text-base sm:text-lg text-text-gray max-w-[800px]">
                {stripHtmlTags(category.description)}
              </p>
            )}
          </div>
        </div>

        {/* Articles Grid - The Free Press Style */}
        {posts.length > 0 ? (
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-16">
            {isLNTV ? (
              // LNTV Special Grid with Video Play Icons
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
                {posts.map((post) => {
                  const imageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;

                  return (
                    <article key={post.id} className="group text-center">
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
                        <h3 className="font-display font-black text-[22px] leading-[1.2] group-hover:text-primary-red transition-colors duration-300">
                          {post.title.rendered}
                        </h3>
                      </Link>
                    </article>
                  );
                })}
              </div>
            ) : isPodcast ? (
              // Podcast Special Grid with Microphone Icons
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
                {posts.map((post) => {
                  const imageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;

                  return (
                    <article key={post.id} className="group text-center">
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
                        <h3 className="font-display font-black text-[22px] leading-[1.2] group-hover:text-primary-red transition-colors duration-300">
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
                    <article className="group mb-10 sm:mb-12 lg:mb-16 pb-10 sm:pb-12 lg:pb-16 border-b-2 border-border-dark">
                      <Link href={`/${posts[0].slug}`} className="block">
                        <div className="grid md:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
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

                            <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-4 sm:mb-5 lg:mb-6 tracking-tight group-hover:text-primary-red transition-colors duration-300">
                              {posts[0].title.rendered}
                            </h2>

                            {posts[0].excerpt && (
                              <p className="font-serif text-[17px] sm:text-[19px] md:text-[21px] leading-[1.7] text-text-dark mb-4 sm:mb-5 lg:mb-6 line-clamp-4">
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

                                  <h3 className="font-display font-black text-[28px] leading-[1.2] mb-3 tracking-tight group-hover:text-primary-red transition-colors duration-300">
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
                              </article>
                            ))}
                          </div>
                        )}

                        {/* Two Column Grid - Posts 4-9 */}
                        {index >= 3 && index < 9 && index === 3 && (
                          <>
                            {/* Section Break */}
                            <div className="mb-16">

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

                                      <h3 className="font-display font-black text-[24px] leading-[1.2] mb-3 group-hover:text-primary-red transition-colors duration-300">
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
                            {/* Archive Section */}
                            <div className="mb-8">
                              <h2 className="font-sans font-bold text-xl uppercase tracking-wide text-text-dark">
                                Archive
                              </h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                              {posts.slice(10).map((p) => (
                                <ArticleCard key={p.id} post={p} variant="sidebar" />
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                baseUrl={`/category/${slug}`}
              />
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
