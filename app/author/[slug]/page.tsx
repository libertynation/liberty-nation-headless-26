import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getAuthorBySlug, getPostsByAuthor, stripHtmlTags, formatDate, type WordPressAuthor } from '@/lib/wordpress';
import { generateAuthorMetadata } from '@/lib/seo';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ArticleCard from '@/components/ArticleCard';
import Pagination from '@/components/Pagination';

// ISR: Revalidate every 5 minutes
export const revalidate = 300;

interface AuthorPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ params, searchParams }: AuthorPageProps) {
  const { slug } = await params;
  const { page: pageParam } = await searchParams;
  const currentPage = pageParam ? parseInt(pageParam, 10) : 1;
  const author = await getAuthorBySlug(slug);

  if (!author) {
    return {
      title: 'Author Not Found | Liberty Nation',
      description: 'The author you are looking for could not be found.',
    };
  }

  return generateAuthorMetadata(author, currentPage);
}

export default async function AuthorPage({ params, searchParams }: AuthorPageProps) {
  const { slug } = await params;
  const { page: pageParam } = await searchParams;
  const currentPage = pageParam ? parseInt(pageParam, 10) : 1;

  const author = await getAuthorBySlug(slug);

  if (!author) {
    notFound();
  }

  const response = await getPostsByAuthor(author.id, { per_page: 24, page: currentPage });
  const posts = response.data;
  const totalPages = response.totalPages || 1;

  return (
    <>
      <Header />

      <main className="bg-bg-offwhite">
        {/* Author Header - Enhanced Editorial Style */}
        <div className="relative bg-gradient-to-br from-white to-bg-gray border-b-4 border-primary-red py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-primary-red opacity-[0.02] rounded-full -translate-x-32 -translate-y-32" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-red opacity-[0.02] rounded-full translate-x-48 translate-y-48" />

          <div className="relative max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Ornamental Top Divider */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-12 h-[2px] bg-primary-red" />
              <svg className="w-3 h-3 text-primary-red" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              <svg className="w-3 h-3 text-primary-red" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              <svg className="w-3 h-3 text-primary-red" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              <div className="w-12 h-[2px] bg-primary-red" />
            </div>

            {/* Author Avatar */}
            {author.avatar_urls?.['96'] ? (
              <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full overflow-hidden mx-auto mb-4 sm:mb-5 md:mb-6 ring-2 sm:ring-4 ring-primary-red ring-offset-2 sm:ring-offset-4 shadow-xl">
                <Image
                  src={author.avatar_urls['96']}
                  alt={author.name}
                  width={160}
                  height={160}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-primary-red rounded-full flex items-center justify-center text-white font-sans font-black text-4xl sm:text-5xl md:text-7xl mx-auto mb-4 sm:mb-5 md:mb-6 ring-2 sm:ring-4 ring-primary-red ring-offset-2 sm:ring-offset-4 shadow-xl">
                {author.name.charAt(0).toUpperCase()}
              </div>
            )}

            {/* Author Name with Enhanced Typography */}
            <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl mb-3 sm:mb-4 tracking-tighter text-text-dark relative">
              <span className="relative inline-block">
                {author.name}
                {/* Decorative Underline */}
                <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-primary-red" />
              </span>
            </h1>

            {/* Author Title/Role */}
            {author.acf?.title && (
              <div className="font-sans text-sm font-bold uppercase tracking-widest text-text-gray mb-8 mt-6">
                {author.acf.title}
              </div>
            )}

            {/* Author Bio with Enhanced Styling */}
            {author.description && (
              <div className="relative mb-6 sm:mb-8">
                <p className="font-serif text-[16px] sm:text-[18px] md:text-[21px] leading-[1.8] text-text-dark max-w-[700px] mx-auto font-light italic">
                  {author.description}
                </p>
              </div>
            )}

            {/* Social Links */}
            {(author.acf?.twitter || author.acf?.facebook || author.acf?.linkedin) && (
              <div className="flex items-center justify-center gap-5 mb-8">
                {author.acf?.twitter && (
                  <a
                    href={author.acf.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-text-dark text-white hover:bg-primary-red transition-all duration-300 shadow-md hover:shadow-lg hover:scale-110"
                    aria-label="Twitter"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                )}
                {author.acf?.facebook && (
                  <a
                    href={author.acf.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-text-dark text-white hover:bg-primary-red transition-all duration-300 shadow-md hover:shadow-lg hover:scale-110"
                    aria-label="Facebook"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 3.667h-3.533v7.98H9.101z"/>
                    </svg>
                  </a>
                )}
                {author.acf?.linkedin && (
                  <a
                    href={author.acf.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-text-dark text-white hover:bg-primary-red transition-all duration-300 shadow-md hover:shadow-lg hover:scale-110"
                    aria-label="LinkedIn"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                )}
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
              <svg className="w-3 h-3 text-primary-red" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              <svg className="w-3 h-3 text-primary-red" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              <svg className="w-3 h-3 text-primary-red" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              <div className="w-12 h-[2px] bg-primary-red" />
            </div>
          </div>
        </div>

        {/* Articles Grid - Enhanced Editorial Style */}
        {posts.length > 0 ? (
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-16">
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
                        {/* Author Badge */}
                        <div className="inline-block mb-4 px-3 py-1 border-2 border-primary-red text-primary-red font-sans text-xs font-bold uppercase tracking-widest">
                          {author.name}
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
                    <svg className="w-3 h-3 text-primary-red" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                    <svg className="w-4 h-4 text-primary-red" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                    <svg className="w-3 h-3 text-primary-red" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  </div>
                  <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-border-dark to-transparent" />
                </div>
              </>
            )}

            {/* Remaining Articles Grid with Enhanced Layouts */}
            {posts.length > 1 && (
              <div className="space-y-16">
                {/* First Row - Enhanced 3 Column Grid (Posts 2-4) */}
                {posts.length > 1 && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
                    {posts.slice(1, 4).map((post) => (
                      <article key={post.id} className="group relative">
                        <Link href={`/${post.slug}`} className="block">
                          {/* Image with Enhanced Shadow */}
                          {post._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
                            <div className="relative w-full aspect-[3/2] overflow-hidden bg-gray-200 mb-4 shadow-lg group-hover:shadow-xl group-hover:shadow-primary-red/10 transition-all duration-500">
                              <Image
                                src={post._embedded['wp:featuredmedia'][0].source_url}
                                alt={post.title.rendered}
                                fill
                                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, 380px"
                              />
                              <div className="absolute inset-0 ring-1 ring-inset ring-black/10" />
                            </div>
                          )}

                          <h3 className="font-display font-bold text-[28px] leading-tight mb-3 tracking-tight group-hover:text-primary-red transition-colors duration-300">
                            {post.title.rendered}
                          </h3>

                          {post.excerpt && (
                            <p className="font-serif text-[17px] leading-[1.6] text-text-dark mb-3 line-clamp-3">
                              {stripHtmlTags(post.excerpt.rendered).substring(0, 120)}...
                            </p>
                          )}

                          <div className="flex items-center gap-2 text-[12px] font-sans uppercase tracking-wide">
                            <span className="text-text-gray">{formatDate(post.date)}</span>
                          </div>
                        </Link>
                        {/* Decorative Corner Accent */}
                        <div className="absolute -top-2 -left-2 w-8 h-8 border-l-2 border-t-2 border-primary-red opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </article>
                    ))}
                  </div>
                )}

                {/* More Stories Section (Posts 5-10) */}
                {posts.length > 4 && (
                  <div className="mb-16">
                    <div className="flex items-center gap-4 mb-12">
                      <div className="w-1 h-12 bg-primary-red" />
                      <h3 className="font-display font-bold text-2xl uppercase tracking-wide text-text-dark">
                        More Stories
                      </h3>
                      <div className="flex-1 h-[2px] bg-gradient-to-r from-primary-red via-border-dark to-transparent" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      {posts.slice(4, 10).map((post) => (
                        <article key={post.id} className="group bg-white p-6 shadow-md hover:shadow-xl hover:shadow-primary-red/5 transition-all duration-500 border-l-4 border-transparent hover:border-primary-red">
                          <Link href={`/${post.slug}`}>
                            {post._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
                              <div className="relative w-full aspect-video overflow-hidden bg-gray-200 mb-4">
                                <Image
                                  src={post._embedded['wp:featuredmedia'][0].source_url}
                                  alt={post.title.rendered}
                                  fill
                                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                                  sizes="(max-width: 768px) 100vw, 480px"
                                />
                              </div>
                            )}

                            <h3 className="font-display font-bold text-[24px] leading-tight mb-3 group-hover:text-primary-red transition-colors duration-300">
                              {post.title.rendered}
                            </h3>

                            {post.excerpt && (
                              <p className="font-serif text-[16px] leading-[1.6] text-text-dark mb-3 line-clamp-2">
                                {stripHtmlTags(post.excerpt.rendered).substring(0, 100)}...
                              </p>
                            )}

                            <div className="flex items-center gap-2 text-[11px] font-sans uppercase tracking-widest">
                              <span className="text-text-gray">{formatDate(post.date)}</span>
                            </div>
                          </Link>
                        </article>
                      ))}
                    </div>
                  </div>
                )}

                {/* Archive Section (Posts 11+) */}
                {posts.length > 10 && (
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
                      {posts.slice(10).map((post, idx) => {
                        const showBreak = (idx + 1) % 9 === 0 && idx + 1 < posts.slice(10).length;
                        return (
                          <div key={post.id}>
                            <ArticleCard post={post} variant="sidebar" />
                            {showBreak && (
                              <div className="col-span-full my-12 flex items-center justify-center gap-3">
                                <div className="w-16 h-[2px] bg-primary-red" />
                                <svg className="w-3 h-3 text-primary-red" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                </svg>
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
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                baseUrl={`/author/${slug}`}
              />
            )}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="font-serif text-xl text-text-gray">
              No articles found by this author.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
