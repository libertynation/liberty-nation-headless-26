'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface SearchResult {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  slug: string;
  date: string;
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url: string }>;
    author?: Array<{ name: string }>;
  };
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  const [searchQuery, setSearchQuery] = useState(query);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (query) {
      performSearch(query);
    }
  }, [query]);

  const performSearch = async (q: string) => {
    if (!q.trim()) return;

    setLoading(true);
    setSearched(true);

    try {
      const response = await fetch(
        `https://www.libertynation.com/wp-json/wp/v2/posts?search=${encodeURIComponent(q)}&_embed=true&per_page=20`
      );
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.history.pushState({}, '', `/search?q=${encodeURIComponent(searchQuery)}`);
      performSearch(searchQuery);
    }
  };

  const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>/g, '').substring(0, 200);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: '2-digit'
    });
  };

  return (
    <>
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Search Header */}
        <div className="mb-12">
          <h1 className="font-headline text-5xl md:text-6xl font-black uppercase mb-8 tracking-tight">
            Search
          </h1>

          {/* Search Form */}
          <form onSubmit={handleSubmit} className="max-w-2xl">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Liberty Nation..."
                className="w-full px-5 py-4 pr-12 border-2 border-border-gray rounded-lg font-sans text-lg focus:outline-none focus:border-primary-red transition"
                autoFocus
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-primary-black hover:text-primary-red transition"
                aria-label="Search"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </form>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-border-gray border-t-primary-red"></div>
            <p className="mt-4 font-sans text-text-gray">Searching...</p>
          </div>
        )}

        {/* Results */}
        {!loading && searched && (
          <>
            {results.length > 0 ? (
              <>
                <div className="mb-8">
                  <p className="font-sans text-text-gray">
                    Found {results.length} {results.length === 1 ? 'result' : 'results'} for &ldquo;<span className="font-semibold text-primary-black">{query}</span>&rdquo;
                  </p>
                </div>

                <div className="space-y-8">
                  {results.map((post) => {
                    const imageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
                    const author = post._embedded?.author?.[0]?.name || 'Liberty Nation';

                    return (
                      <article key={post.id} className="border-b border-border-gray pb-8">
                        <Link href={`/${post.slug}`} className="block group">
                          <div className="flex gap-6">
                            {imageUrl && (
                              <div className="w-48 h-32 flex-shrink-0 relative rounded overflow-hidden">
                                <Image
                                  src={imageUrl}
                                  alt={post.title.rendered}
                                  fill
                                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                                  sizes="192px"
                                />
                              </div>
                            )}

                            <div className="flex-1">
                              <h2 className="font-serif text-2xl font-bold mb-2 group-hover:text-primary-red transition">
                                {post.title.rendered}
                              </h2>

                              <p className="font-serif text-text-gray mb-3 leading-relaxed">
                                {stripHtml(post.excerpt.rendered)}...
                              </p>

                              <div className="flex items-center gap-3 text-sm font-sans text-text-gray">
                                <span className="text-primary-red font-semibold">{author}</span>
                                <span>•</span>
                                <span>{formatDate(post.date)}</span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </article>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <p className="font-sans text-xl text-text-gray mb-4">
                  No results found for &ldquo;<span className="font-semibold text-primary-black">{query}</span>&rdquo;
                </p>
                <p className="font-sans text-text-gray">
                  Try searching for something else or check your spelling.
                </p>
              </div>
            )}
          </>
        )}

        {/* Initial State */}
        {!searched && !loading && (
          <div className="text-center py-12">
            <svg className="w-16 h-16 mx-auto text-border-gray mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p className="font-sans text-text-gray">
              Enter a search term to find articles
            </p>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
