import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getAuthorBySlug, getPostsByAuthorSlug } from '@/lib/wordpress';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ArticleCard from '@/components/ArticleCard';
import AuthorPromoVideo from '@/components/AuthorPromoVideo';

// ISR: Revalidate every 60 seconds for news site - fast updates critical
export const revalidate = 60;

interface AuthorPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ params }: AuthorPageProps) {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug);

  if (!author) {
    return {
      title: 'Author Not Found | Liberty Nation',
      description: 'The author you are looking for could not be found.',
    };
  }

  return {
    title: `${author.name} | Liberty Nation`,
    description: author.description || `Articles by ${author.name} on Liberty Nation.`,
  };
}

export default async function AuthorPage({ params, searchParams }: AuthorPageProps) {
  const { slug } = await params;
  const { page: pageParam } = await searchParams;
  const currentPage = pageParam ? parseInt(pageParam, 10) : 1;

  // Get author data
  const author = await getAuthorBySlug(slug);

  if (!author) {
    notFound();
  }

  // Get author's posts with pagination using author slug
  const postsPerPage = 12;
  const postsResponse = await getPostsByAuthorSlug(slug, {
    per_page: postsPerPage,
    page: currentPage,
    _embed: true,
  });

  const posts = postsResponse.data;
  const totalPages = postsResponse.totalPages || 1;
  const totalPosts = postsResponse.totalItems || 0;

  // Get author avatar - try ACF photo first (most reliable), then avatar_urls
  const authorAvatar = author.acf?.photo?.url || author.acf?.photo || author.acf?.avatar || author.avatar_urls?.['96'] || author.avatar_urls?.['48'] || author.avatar_urls?.['24'] || null;

  // Get author designation/title - use correct ACF field name
  const authorTitle = author.acf?.author_designation || author.acf?.title || null;

  // Get author promo video URL - use correct ACF field name
  const authorPromoVideo = author.acf?.author_promo || author.acf?.promo_video || author.acf?.video || null;

  // Get author promo featured image - use correct ACF field name
  const authorPromoFeaturedImage = author.acf?.author_promo_featured_image?.url || author.acf?.author_promo_featured_image || null;

  // Get author bio/description
  const authorBio = author.description || author.acf?.bio || author.acf?.description || null;

  // Social media links
  const twitterUrl = author.acf?.twitter || null;
  const facebookUrl = author.acf?.facebook || null;
  const linkedinUrl = author.acf?.linkedin || null;

  // Debug log to see what ACF fields we're getting
  console.log('Author ACF data:', JSON.stringify(author.acf, null, 2));
  console.log('Author avatar:', authorAvatar);
  console.log('Author bio:', authorBio);

  return (
    <>
      <Header />

      <main className="bg-bg-offwhite">
        {/* Author Header Section */}
        <div className="bg-white border-b-4 border-primary-red py-16">
          <div className="max-w-[1200px] mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Left: Author Info */}
              <div className="lg:col-span-2">
                {/* Author Avatar & Name */}
                <div className="flex items-start gap-6 mb-6">
                  {authorAvatar ? (
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200 flex-shrink-0">
                      <Image
                        src={authorAvatar}
                        alt={author?.name || 'Author'}
                        width={128}
                        height={128}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ) : (
                    <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 font-display font-bold text-5xl border-4 border-gray-200 flex-shrink-0">
                      {(author?.name || 'A').charAt(0).toUpperCase()}
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <h1 className="font-display font-bold text-4xl md:text-5xl mb-2 tracking-tight text-text-dark">
                      {author?.name || 'Author'}
                    </h1>
                    {authorTitle && (
                      <p className="font-sans text-lg text-gray-600 mb-4">
                        {authorTitle}
                      </p>
                    )}
                    {/* Social Media Links */}
                    {(twitterUrl || facebookUrl || linkedinUrl) && (
                      <div className="flex items-center gap-4">
                        {twitterUrl && (
                          <a
                            href={twitterUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-primary-red transition"
                            aria-label="Twitter"
                          >
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                            </svg>
                          </a>
                        )}
                        {facebookUrl && (
                          <a
                            href={facebookUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-primary-red transition"
                            aria-label="Facebook"
                          >
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                          </a>
                        )}
                        {linkedinUrl && (
                          <a
                            href={linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-primary-red transition"
                            aria-label="LinkedIn"
                          >
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Author Bio */}
                {authorBio && (
                  <div className="prose prose-lg max-w-none font-serif">
                    <p className="text-[19px] leading-[1.7] text-gray-800">
                      {authorBio}
                    </p>
                  </div>
                )}

                {/* Article Count */}
                <div className="mt-6 pt-6 border-t border-gray-300">
                  <p className="font-sans text-sm text-gray-600 uppercase tracking-wide">
                    {totalPosts} {totalPosts === 1 ? 'Article' : 'Articles'} Published
                  </p>
                </div>
              </div>

              {/* Right: Promo Video or Newsletter Signup */}
              <div className="lg:col-span-1">
                {authorPromoVideo ? (
                  <AuthorPromoVideo
                    videoUrl={authorPromoVideo}
                    featuredImage={authorPromoFeaturedImage}
                    authorName={author?.name || 'Author'}
                  />
                ) : (
                  // Fallback: Newsletter signup if no promo video
                  <div className="bg-white border-2 border-gray-200 rounded-sm p-6 shadow-lg">
                    <div className="flex items-center gap-3 mb-4 bg-primary-red/10 px-4 py-2 rounded-full">
                      <svg className="w-5 h-5 text-primary-red" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                      </svg>
                      <span className="font-sans font-bold text-xs uppercase tracking-widest text-primary-red">
                        Follow {author?.name || 'Author'}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-2xl mb-3 text-text-dark">
                      Get Updates
                    </h3>
                    <p className="font-serif text-sm mb-4 text-gray-700 leading-relaxed">
                      Subscribe to receive the latest articles by {author?.name || 'this author'} delivered to your inbox.
                    </p>
                    <form className="space-y-3">
                      <input
                        type="email"
                        placeholder="Your email"
                        className="w-full px-4 py-3 border-2 border-gray-300 font-sans text-sm focus:outline-none focus:border-primary-red transition rounded-sm"
                        required
                      />
                      <button
                        type="submit"
                        className="w-full bg-primary-red text-white px-6 py-3 font-sans font-bold text-xs uppercase hover:bg-text-dark transition rounded-sm"
                      >
                        Subscribe
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Articles Section */}
        <div className="py-16">
          <div className="max-w-[1200px] mx-auto px-8">
            {/* Section Header */}
            <div className="mb-12">
              <h2 className="font-display font-bold text-3xl md:text-4xl mb-2 text-text-dark">
                Articles by {author?.name || 'Author'}
              </h2>
              <p className="font-sans text-gray-600">
                Page {currentPage} of {totalPages}
              </p>
            </div>

            {/* Articles Grid */}
            {posts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                  {posts.map((post) => (
                    <ArticleCard
                      key={post.id}
                      post={post}
                      variant="sidebar"
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-4">
                    {currentPage > 1 && (
                      <Link
                        href={`/author/${slug}?page=${currentPage - 1}`}
                        className="px-6 py-3 bg-white border-2 border-gray-300 text-text-dark font-sans font-bold text-sm uppercase hover:border-primary-red hover:text-primary-red transition rounded-sm"
                      >
                        ← Previous
                      </Link>
                    )}

                    <span className="font-sans text-gray-600">
                      Page {currentPage} of {totalPages}
                    </span>

                    {currentPage < totalPages && (
                      <Link
                        href={`/author/${slug}?page=${currentPage + 1}`}
                        className="px-6 py-3 bg-white border-2 border-gray-300 text-text-dark font-sans font-bold text-sm uppercase hover:border-primary-red hover:text-primary-red transition rounded-sm"
                      >
                        Next →
                      </Link>
                    )}
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <p className="font-sans text-xl text-text-gray">
                  No articles found for this author.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
