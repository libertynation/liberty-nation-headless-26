import { getPosts, getFeaturedImageUrl, getAuthorName, formatDate, decodeHtmlEntities, type WordPressPost } from '@/lib/wordpress';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';

export const revalidate = 60;

export const metadata = {
  title: 'Breaking News | Liberty Nation',
  description: 'The latest breaking news from Liberty Nation - stay informed on the stories that matter.',
};

export default async function BreakingNewsPage() {
  // Fetch latest posts as "breaking news"
  // Wrap in try-catch to handle SSL cert issues during Vercel builds
  let posts: WordPressPost[] = [];
  try {
    posts = await getPosts({ per_page: 20, orderby: 'date', order: 'desc' });
  } catch (error) {
    console.error('Error fetching breaking news posts:', error);
    // ISR will retry and update the page
  }

  return (
    <>
      <Header />

      <main className="bg-white min-h-screen">
        {/* Hero Header */}
        <section className="bg-primary-red text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }} />

          <div className="max-w-[1200px] mx-auto px-8 py-16 md:py-20 relative z-10">
            <div className="max-w-[800px]">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-3 h-3 bg-white rounded-full animate-pulse" />
                <span className="font-sans text-xs font-bold uppercase tracking-[0.3em] text-white/90">
                  Live Updates
                </span>
              </div>
              <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
                Breaking News
              </h1>
              <p className="font-serif text-xl text-white/80 leading-relaxed max-w-[600px]">
                The latest stories from Liberty Nation. Stay informed on politics, policy, and the issues that impact your freedom.
              </p>
            </div>
          </div>
        </section>

        {/* News Grid */}
        <section className="py-12 md:py-16">
          <div className="max-w-[1200px] mx-auto px-8">
            {posts.length > 0 ? (
              <div className="space-y-8">
                {posts.map((post, index) => {
                  const imageUrl = getFeaturedImageUrl(post);
                  const author = getAuthorName(post);
                  const date = formatDate(post.date);
                  const isFirst = index === 0;

                  return (
                    <article
                      key={post.id}
                      className={`border-b border-gray-200 pb-8 ${isFirst ? 'pb-12' : ''}`}
                    >
                      <Link href={`/${post.slug}`} className="group block">
                        <div className={`flex gap-6 ${isFirst ? 'flex-col md:flex-row' : ''}`}>
                          {imageUrl && (
                            <div className={`relative overflow-hidden bg-gray-200 flex-shrink-0 ${
                              isFirst ? 'w-full md:w-1/2 aspect-[16/10]' : 'w-48 h-32'
                            }`}>
                              <Image
                                src={imageUrl}
                                alt={decodeHtmlEntities(post.title.rendered)}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                sizes={isFirst ? "(max-width: 768px) 100vw, 50vw" : "192px"}
                              />
                            </div>
                          )}

                          <div className="flex-1">
                            {isFirst && (
                              <span className="inline-block font-sans text-xs font-bold uppercase tracking-wide text-primary-red mb-3">
                                Latest
                              </span>
                            )}
                            <h2 className={`font-display font-bold leading-tight mb-3 group-hover:text-primary-red transition-colors ${
                              isFirst ? 'text-2xl md:text-3xl' : 'text-xl'
                            }`}>
                              {decodeHtmlEntities(post.title.rendered)}
                            </h2>

                            <div className="flex items-center gap-3 text-sm font-sans">
                              <span className="text-primary-red font-semibold">{author}</span>
                              <span className="text-gray-400">|</span>
                              <span className="text-gray-500">{date}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="font-serif text-xl text-gray-500">No breaking news at the moment. Check back soon.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
