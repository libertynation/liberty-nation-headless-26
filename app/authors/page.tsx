import Image from 'next/image';
import Link from 'next/link';
import { getAuthors } from '@/lib/wordpress';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// ISR: Revalidate every 60 seconds for news site - fast updates critical
export const revalidate = 60;

export const metadata = {
  title: 'Our Authors | Liberty Nation',
  description: 'Meet the talented writers, journalists, and contributors who bring you independent news and analysis at Liberty Nation.',
};

export default async function AuthorsPage() {
  // Get all authors - fetch a large number to show all
  const authors = await getAuthors({ per_page: 100 });

  // Filter out authors with no posts (if needed)
  // and sort by name
  const activeAuthors = authors
    .filter(author => author.description) // Only show authors with bios
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <Header />

      <main className="bg-bg-offwhite">
        {/* Page Header */}
        <div className="bg-white border-b-4 border-primary-red py-16">
          <div className="max-w-[1200px] mx-auto px-8 text-center">
            <h1 className="font-display font-bold text-5xl md:text-6xl mb-6 tracking-tight text-text-dark">
              Our Authors
            </h1>
            <p className="font-serif text-xl leading-[1.7] text-gray-700 max-w-[700px] mx-auto">
              Meet the independent voices behind Liberty Nation. Our diverse team of writers, journalists, and analysts deliver fearless reporting and insightful commentary.
            </p>
          </div>
        </div>

        {/* Authors Grid */}
        <div className="py-16">
          <div className="max-w-[1200px] mx-auto px-8">
            {activeAuthors.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {activeAuthors.map((author) => {
                  const authorAvatar = author.avatar_urls?.['96'] || author.avatar_urls?.['48'] || author.avatar_urls?.['24'] || null;
                  const authorTitle = author.acf?.title || null;

                  return (
                    <Link
                      key={author.id}
                      href={`/author/${author.slug}`}
                      className="group"
                    >
                      <div className="bg-white border-2 border-gray-200 rounded-sm p-6 hover:border-primary-red transition-all duration-300 hover:shadow-lg h-full">
                        {/* Author Avatar */}
                        <div className="flex items-start gap-4 mb-4">
                          {authorAvatar ? (
                            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-300 flex-shrink-0">
                              <Image
                                src={authorAvatar}
                                alt={author.name}
                                width={80}
                                height={80}
                                className="object-cover w-full h-full"
                              />
                            </div>
                          ) : (
                            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 font-display font-bold text-3xl border-2 border-gray-300 flex-shrink-0">
                              {author.name.charAt(0).toUpperCase()}
                            </div>
                          )}

                          <div className="flex-1 min-w-0">
                            <h2 className="font-display font-bold text-xl mb-1 text-text-dark group-hover:text-primary-red transition-colors duration-300">
                              {author.name}
                            </h2>
                            {authorTitle && (
                              <p className="font-sans text-xs uppercase tracking-wide text-gray-600">
                                {authorTitle}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Author Bio */}
                        {author.description && (
                          <p className="font-serif text-sm leading-relaxed text-gray-700 line-clamp-3">
                            {author.description}
                          </p>
                        )}

                        {/* Read More Link */}
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <span className="inline-flex items-center gap-2 text-primary-red font-sans text-sm font-semibold group-hover:gap-3 transition-all duration-300">
                            <span>View Articles</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="font-sans text-xl text-text-gray">
                  No authors found.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-white py-16 border-t border-gray-200">
          <div className="max-w-[800px] mx-auto px-8 text-center">
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4 text-text-dark">
              Want to Write for Liberty Nation?
            </h2>
            <p className="font-serif text-lg leading-relaxed text-gray-700 mb-8">
              We're always looking for talented writers who share our commitment to independent journalism and constitutional principles.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-primary-red text-white px-8 py-4 font-sans font-bold text-sm uppercase hover:bg-text-dark transition rounded-sm"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
