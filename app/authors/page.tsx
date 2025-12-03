import Image from 'next/image';
import Link from 'next/link';
import { getAllAuthors } from '@/lib/wordpress';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// ISR: Revalidate every 60 seconds for news site - fast updates critical
export const revalidate = 60;

export const metadata = {
  title: 'Our Authors | Liberty Nation',
  description: 'Meet the talented writers, journalists, and contributors who bring you independent news and analysis at Liberty Nation.',
};

export default async function AuthorsPage() {
  // Get all authors (guest authors + regular WP users)
  const allAuthors = await getAllAuthors();

  // Filter out authors without names and sort by post count (most prolific first), then by name
  const sortedAuthors = allAuthors
    .filter(a => a.name && a.name.trim())
    .sort((a, b) => {
      if (b.postCount !== a.postCount) {
        return b.postCount - a.postCount;
      }
      return (a.name || '').localeCompare(b.name || '');
    });

  // Separate featured authors (with bios) from others
  const featuredAuthors = sortedAuthors.filter(a => a.description && a.description.length > 50);
  const otherAuthors = sortedAuthors.filter(a => !a.description || a.description.length <= 50);

  return (
    <>
      <Header />

      <main className="bg-white">
        {/* Hero Header - Bold editorial style */}
        <section className="bg-black text-white relative overflow-hidden">
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '32px 32px'
          }} />

          <div className="max-w-[1200px] mx-auto px-8 py-20 md:py-28 relative z-10">
            <div className="max-w-[800px]">
              <p className="font-sans text-xs font-bold uppercase tracking-[0.3em] text-primary-red mb-6">
                The Team
              </p>
              <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl leading-[1.05] mb-8">
                Our Authors
              </h1>
              <p className="font-serif text-xl md:text-2xl text-white/80 leading-[1.6] max-w-[600px]">
                Meet the independent voices behind Liberty Nation. Fearless reporting, insightful commentary, constitutional principles.
              </p>
            </div>
          </div>

          {/* Red accent bar */}
          <div className="h-1 bg-primary-red" />
        </section>

        {/* Featured Authors Grid */}
        {featuredAuthors.length > 0 && (
          <section className="py-16 md:py-20 bg-bg-offwhite">
            <div className="max-w-[1400px] mx-auto px-8">
              {/* Section Header */}
              <div className="flex items-center gap-4 mb-12">
                <div className="w-12 h-[3px] bg-primary-red" />
                <h2 className="font-sans text-sm font-bold uppercase tracking-[0.2em] text-gray-600">
                  Featured Writers
                </h2>
              </div>

              {/* Authors Grid - Magazine style cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredAuthors.map((author) => (
                  <Link
                    key={author.id}
                    href={`/author/${author.slug}`}
                    className="group block"
                  >
                    <article className="bg-white h-full border-b-4 border-transparent hover:border-primary-red transition-all duration-300 shadow-sm hover:shadow-xl">
                      {/* Author Header */}
                      <div className="p-8 pb-6">
                        <div className="flex items-start gap-5">
                          {/* Avatar */}
                          {author.avatar ? (
                            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-100 flex-shrink-0 group-hover:border-primary-red/20 transition-colors duration-300">
                              <Image
                                src={author.avatar}
                                alt={author.name}
                                width={96}
                                height={96}
                                className="object-cover w-full h-full"
                              />
                            </div>
                          ) : (
                            <div className="w-24 h-24 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center text-white font-display font-bold text-3xl flex-shrink-0 group-hover:from-primary-red group-hover:to-red-700 transition-all duration-300">
                              {(author.name || 'A').charAt(0).toUpperCase()}
                            </div>
                          )}

                          {/* Name & Title */}
                          <div className="flex-1 min-w-0 pt-2">
                            <h3 className="font-display font-bold text-2xl text-gray-900 group-hover:text-primary-red transition-colors duration-300 leading-tight mb-2">
                              {author.name}
                            </h3>
                            {author.title && (
                              <p className="font-sans text-xs font-semibold uppercase tracking-wide text-primary-red">
                                {author.title}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Bio */}
                      <div className="px-8 pb-6">
                        <p className="font-serif text-[15px] leading-[1.7] text-gray-600 line-clamp-4">
                          {author.description}
                        </p>
                      </div>

                      {/* Footer */}
                      <div className="px-8 pb-8">
                        <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                          {author.postCount > 0 && (
                            <span className="font-sans text-xs text-gray-500 uppercase tracking-wide">
                              {author.postCount} {author.postCount === 1 ? 'Article' : 'Articles'}
                            </span>
                          )}
                          <span className="inline-flex items-center gap-2 text-primary-red font-sans text-sm font-semibold group-hover:gap-3 transition-all duration-300 ml-auto">
                            <span>Read Articles</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Other Contributors */}
        {otherAuthors.length > 0 && (
          <section className="py-16 md:py-20 bg-white border-t border-gray-200">
            <div className="max-w-[1400px] mx-auto px-8">
              {/* Section Header */}
              <div className="flex items-center gap-4 mb-12">
                <div className="w-12 h-[3px] bg-gray-400" />
                <h2 className="font-sans text-sm font-bold uppercase tracking-[0.2em] text-gray-600">
                  Contributors
                </h2>
              </div>

              {/* Compact Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {otherAuthors.map((author) => (
                  <Link
                    key={author.id}
                    href={`/author/${author.slug}`}
                    className="group block"
                  >
                    <div className="text-center p-4 hover:bg-gray-50 transition-colors duration-200 rounded-sm">
                      {/* Avatar */}
                      {author.avatar ? (
                        <div className="w-16 h-16 mx-auto rounded-full overflow-hidden border-2 border-gray-200 mb-3 group-hover:border-primary-red transition-colors duration-300">
                          <Image
                            src={author.avatar}
                            alt={author.name}
                            width={64}
                            height={64}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      ) : (
                        <div className="w-16 h-16 mx-auto bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-display font-bold text-xl mb-3 group-hover:bg-primary-red group-hover:text-white transition-all duration-300">
                          {(author.name || 'A').charAt(0).toUpperCase()}
                        </div>
                      )}
                      <h3 className="font-sans font-semibold text-sm text-gray-900 group-hover:text-primary-red transition-colors duration-200">
                        {author.name}
                      </h3>
                      {author.postCount > 0 && (
                        <p className="font-sans text-xs text-gray-500 mt-1">
                          {author.postCount} articles
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* No Authors Fallback */}
        {sortedAuthors.length === 0 && (
          <section className="py-20">
            <div className="max-w-[600px] mx-auto px-8 text-center">
              <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h2 className="font-display font-bold text-2xl text-gray-900 mb-4">
                Authors Coming Soon
              </h2>
              <p className="font-serif text-gray-600 leading-relaxed">
                We're working on bringing you our full roster of talented writers and contributors.
              </p>
            </div>
          </section>
        )}

        {/* Write for Us CTA */}
        <section className="bg-black text-white py-16 md:py-20">
          <div className="max-w-[900px] mx-auto px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="font-sans text-xs font-bold uppercase tracking-[0.3em] text-primary-red mb-4">
                  Join Our Team
                </p>
                <h2 className="font-display font-bold text-3xl md:text-4xl leading-tight mb-6">
                  Want to Write for Liberty Nation?
                </h2>
                <p className="font-serif text-lg text-white/80 leading-[1.7]">
                  We're always looking for talented writers who share our commitment to independent journalism and constitutional principles.
                </p>
              </div>
              <div className="md:text-right">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 bg-primary-red text-white px-8 py-4 font-sans font-bold text-sm uppercase tracking-wide hover:bg-white hover:text-primary-red transition-all duration-300 group"
                >
                  <span>Get in Touch</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
