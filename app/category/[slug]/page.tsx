import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getCategory, getPostsByCategoryWithChildren, stripHtmlTags, getAuthorName, formatDate, decodeHtmlEntities, getFeaturedImageUrl } from '@/lib/wordpress';
import { generateCategoryMetadata } from '@/lib/seo';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
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

  // Check if this is LNTV or Podcasts category
  const isLNTV = slug === 'lntv' || category.id === 600;
  const isPodcast = slug === 'podcasts' || category.id === 216;
  const isMediaCategory = isLNTV || isPodcast;

  // First post for featured section (non-media categories only)
  const featuredPost = !isMediaCategory && posts.length > 0 ? posts[0] : null;
  const remainingPosts = featuredPost ? posts.slice(1) : posts;

  return (
    <>
      <Header />

      <main className="bg-bg-offwhite">
        {/* Category Header */}
        <div className="bg-white border-b-4 border-primary-red">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-[3px] bg-primary-red" />
              <span className="font-sans text-xs font-bold uppercase tracking-widest text-primary-red">Category</span>
            </div>
            <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-text-dark uppercase tracking-tight">
              {category.name}
            </h1>
            {category.description && (
              <p className="font-serif text-lg text-text-gray max-w-[700px] mt-3">
                {stripHtmlTags(category.description)}
              </p>
            )}
          </div>
        </div>

        {/* Content */}
        {posts.length > 0 ? (
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-16">
            {/* Featured Post (non-media categories) */}
            {featuredPost && (
              <article className="mb-12 pb-12 border-b-2 border-gray-200">
                <Link href={`/${featuredPost.slug}`} className="group block">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    {/* Image */}
                    {getFeaturedImageUrl(featuredPost) && (
                      <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-200">
                        <Image
                          src={getFeaturedImageUrl(featuredPost)!}
                          alt={decodeHtmlEntities(featuredPost.title.rendered)}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          priority
                        />
                        <div className="absolute top-4 left-4 px-3 py-1.5 bg-primary-red text-white font-sans text-xs font-bold uppercase tracking-wider">
                          Featured
                        </div>
                      </div>
                    )}

                    {/* Content */}
                    <div>
                      <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl leading-[1.1] mb-4 group-hover:text-primary-red transition-colors">
                        {decodeHtmlEntities(featuredPost.title.rendered)}
                      </h2>

                      {featuredPost.excerpt && (
                        <p className="font-serif text-lg text-gray-700 leading-relaxed mb-4 line-clamp-3">
                          {stripHtmlTags(featuredPost.excerpt.rendered)}
                        </p>
                      )}

                      <div className="flex items-center gap-3 text-sm font-sans">
                        <span className="text-primary-red font-bold uppercase tracking-wide">
                          {getAuthorName(featuredPost)}
                        </span>
                        <span className="w-1 h-1 bg-gray-400 rounded-full" />
                        <span className="text-gray-500 uppercase tracking-wide">
                          {formatDate(featuredPost.date)}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            )}

            {/* Articles Grid */}
            <div className={`grid grid-cols-1 ${isMediaCategory ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-3'} gap-8`}>
              {remainingPosts.map((post) => {
                const imageUrl = getFeaturedImageUrl(post);

                return (
                  <article key={post.id} className="group bg-white shadow-sm hover:shadow-lg transition-shadow duration-300">
                    <Link href={`/${post.slug}`} className="block">
                      {/* Image - Consistent 16:10 aspect ratio */}
                      {imageUrl && (
                        <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-200">
                          <Image
                            src={imageUrl}
                            alt={decodeHtmlEntities(post.title.rendered)}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                          {/* Media overlay for LNTV/Podcasts */}
                          {isMediaCategory && (
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                              <div className="w-14 h-14 bg-primary-red rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                                {isLNTV ? (
                                  <div className="w-0 h-0 border-l-[14px] border-l-white border-t-[9px] border-t-transparent border-b-[9px] border-b-transparent ml-1" />
                                ) : (
                                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                                    <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                                  </svg>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Content */}
                      <div className="p-5">
                        <h3 className="font-display font-bold text-xl leading-tight mb-3 group-hover:text-primary-red transition-colors">
                          {decodeHtmlEntities(post.title.rendered)}
                        </h3>

                        {!isMediaCategory && post.excerpt && (
                          <p className="font-serif text-sm text-gray-600 leading-relaxed mb-3 line-clamp-2">
                            {stripHtmlTags(post.excerpt.rendered).substring(0, 120)}...
                          </p>
                        )}

                        <div className="flex items-center gap-2 text-xs font-sans uppercase tracking-wide">
                          <span className="text-primary-red font-bold">{getAuthorName(post)}</span>
                          <span className="text-gray-400">—</span>
                          <span className="text-gray-500">{formatDate(post.date)}</span>
                        </div>
                      </div>
                    </Link>
                  </article>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  baseUrl={`/category/${slug}`}
                />
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="font-serif text-xl text-text-gray">
              No articles found in this category.
            </p>
            <Link href="/" className="inline-block mt-6 text-primary-red font-sans font-bold text-sm uppercase tracking-wide hover:underline">
              ← Back to Home
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
