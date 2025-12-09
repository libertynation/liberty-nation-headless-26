import Link from 'next/link';
import Image from 'next/image';
import { WordPressPost, getFeaturedImageUrl, getAuthorName, formatDate, decodeHtmlEntities, getExcerpt } from '@/lib/wordpress';

interface DailyExclusivesProps {
  posts: WordPressPost[];
}

export default function DailyExclusives({ posts }: DailyExclusivesProps) {
  if (!posts || posts.length === 0) return null;

  const featuredPost = posts[0];
  const supportingPosts = posts.slice(1, 5); // Next 4 posts

  return (
    <div className="bg-white py-12 sm:py-16 lg:py-20 border-t-2 border-b-2 border-black">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - The Free Press Style */}
        <div className="mb-10 sm:mb-12">
          <div className="flex items-center justify-between border-b-2 border-black pb-3">
            <h2 className="font-sans font-black text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight">
              Daily Exclusives
            </h2>
            <Link
              href="/category/liberty-nation-exclusives"
              className="hidden lg:inline-flex items-center gap-2 text-black font-sans font-bold text-sm uppercase tracking-wide hover:text-primary-red transition-colors duration-300"
            >
              <span>See All</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Magazine Layout: Large Featured Left + Grid Right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Featured Article - Left Side */}
          <article className="group">
            <Link href={`/${featuredPost.slug}`}>
              {getFeaturedImageUrl(featuredPost) && (
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-200 shadow-xl">
                  <Image
                    src={getFeaturedImageUrl(featuredPost)!}
                    alt={decodeHtmlEntities(featuredPost.title.rendered)}
                    fill
                    className="object-cover transition-all duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                </div>
              )}

              <h3 className="font-display font-black text-3xl sm:text-4xl md:text-5xl leading-[1.1] mt-3 mb-4 group-hover:text-primary-red transition-colors duration-300">
                {decodeHtmlEntities(featuredPost.title.rendered)}
              </h3>

              {getExcerpt(featuredPost) && (
                <p className="font-serif text-lg leading-[1.6] text-text-dark mb-4">
                  {getExcerpt(featuredPost).substring(0, 180)}...
                </p>
              )}

              {/* Author and Date - The Free Press Red Style */}
              <div className="flex items-center gap-3 text-sm font-sans uppercase tracking-wide">
                <span className="text-primary-red font-bold">
                  {getAuthorName(featuredPost).toUpperCase()}
                </span>
                <span className="text-black">—</span>
                <span className="text-gray-600">{formatDate(featuredPost.date)}</span>
              </div>
            </Link>
          </article>

          {/* Supporting Articles - Right Side Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {supportingPosts.map((post) => {
              const imageUrl = getFeaturedImageUrl(post);
              const author = getAuthorName(post);
              const date = formatDate(post.date);

              return (
                <article key={post.id} className="group">
                  <Link href={`/${post.slug}`}>
                    {imageUrl && (
                      <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-200 shadow-md">
                        <Image
                          src={imageUrl}
                          alt={decodeHtmlEntities(post.title.rendered)}
                          fill
                          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                        />
                      </div>
                    )}

                    <h4 className="font-display font-black text-xl sm:text-2xl leading-[1.2] mt-3 mb-3 group-hover:text-primary-red transition-colors duration-300">
                      {decodeHtmlEntities(post.title.rendered)}
                    </h4>

                    {/* Author and Date - Red Style */}
                    <div className="flex items-center gap-2 text-xs font-sans uppercase tracking-wide">
                      <span className="text-primary-red font-bold">{author.toUpperCase()}</span>
                      <span className="text-black">—</span>
                      <span className="text-gray-600">{date}</span>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        </div>

        {/* Mobile See All Button */}
        <div className="lg:hidden mt-8 text-center">
          <Link
            href="/category/liberty-nation-exclusives"
            className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white font-sans font-bold text-sm uppercase tracking-wide hover:bg-primary-red transition-all duration-300"
          >
            <span>See All Exclusives</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
