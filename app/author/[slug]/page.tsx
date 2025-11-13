import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getAuthorBySlug, getPostsByAuthor, stripHtmlTags, formatDate, type WordPressAuthor } from '@/lib/wordpress';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ArticleCard from '@/components/ArticleCard';

// ISR: Revalidate every 5 minutes
export const revalidate = 300;

interface AuthorPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: AuthorPageProps) {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug);

  if (!author) {
    return {
      title: 'Author Not Found | Liberty Nation',
    };
  }

  return {
    title: `${author.name} | Liberty Nation`,
    description: author.description || `Read articles by ${author.name} on Liberty Nation`,
  };
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug);

  if (!author) {
    notFound();
  }

  const posts = await getPostsByAuthor(author.id, { per_page: 30 });

  return (
    <>
      <Header />

      <main className="bg-bg-offwhite">
        {/* Author Header - The Free Press Style */}
        <div className="bg-white border-b border-border-gray py-16">
          <div className="max-w-[900px] mx-auto px-8 text-center">
            {/* Author Avatar */}
            {author.avatar_urls?.['96'] ? (
              <div className="w-36 h-36 rounded-full overflow-hidden mx-auto mb-6">
                <Image
                  src={author.avatar_urls['96']}
                  alt={author.name}
                  width={144}
                  height={144}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-36 h-36 bg-primary-red rounded-full flex items-center justify-center text-white font-sans font-black text-6xl mx-auto mb-6">
                {author.name.charAt(0).toUpperCase()}
              </div>
            )}

            {/* Author Name */}
            <h1 className="font-serif font-bold text-5xl md:text-6xl mb-4 tracking-tight text-text-dark">
              {author.name}
            </h1>

            {/* Author Title/Role */}
            {author.acf?.title && (
              <div className="font-sans text-sm font-semibold uppercase tracking-widest text-text-gray mb-6">
                {author.acf.title}
              </div>
            )}

            {/* Author Bio */}
            {author.description && (
              <p className="font-serif text-[19px] leading-[1.7] text-text-dark mb-6 max-w-[700px] mx-auto">
                {author.description}
              </p>
            )}

            {/* Social Links */}
            {(author.acf?.twitter || author.acf?.facebook || author.acf?.linkedin) && (
              <div className="flex items-center justify-center gap-4 mb-6">
                {author.acf?.twitter && (
                  <a
                    href={author.acf.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-gray hover:text-primary-red transition"
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
                    className="text-text-gray hover:text-primary-red transition"
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
                    className="text-text-gray hover:text-primary-red transition"
                    aria-label="LinkedIn"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                )}
              </div>
            )}

            {/* Article Count */}
            <div className="font-sans text-xs font-semibold uppercase tracking-widest text-text-gray">
              {posts.length} {posts.length === 1 ? 'Article' : 'Articles'}
            </div>
          </div>
        </div>

        {/* Articles Grid - The Free Press Style */}
        {posts.length > 0 ? (
          <div className="max-w-[1400px] mx-auto px-8 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {posts.map((post) => (
                <ArticleCard key={post.id} post={post} variant="sidebar" />
              ))}
            </div>
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
