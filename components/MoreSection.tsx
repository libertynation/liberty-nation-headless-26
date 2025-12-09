'use client';

import Link from 'next/link';
import Image from 'next/image';
import { WordPressPost, getFeaturedImageUrl, getAuthorName, formatDate, decodeHtmlEntities, getAuthorAvatar, getAuthorSlug } from '@/lib/wordpress';
import { motion } from 'motion/react';

interface MoreSectionProps {
  posts: WordPressPost[];
  title?: string;
}

export default function MoreSection({ posts, title = "MORE" }: MoreSectionProps) {
  if (!posts || posts.length === 0) return null;

  return (
    <div className="bg-white relative overflow-hidden">
      {/* Container with padding */}
      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 lg:pt-12 pb-12 sm:pb-16 lg:pb-20">
        {/* Large MORE label in white space to left */}
        <div className="mb-4 sm:mb-5 lg:mb-6">
          <h2 className="font-sans font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase tracking-tight text-black">
            {title}
          </h2>
        </div>

        {/* Black divider line with slight padding from grid */}
        <div className="w-full h-1 bg-black mb-6 sm:mb-7 lg:mb-8"></div>

        {/* Articles Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 lg:gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {posts.map((post) => {
            const imageUrl = getFeaturedImageUrl(post);
            const author = getAuthorName(post);
            const authorSlug = getAuthorSlug(post);
            const authorAvatar = getAuthorAvatar(post);
            const date = formatDate(post.date);

            return (
              <article key={post.id} className="group text-center">
                <Link href={`/${post.slug}`}>
                  {imageUrl && (
                    <div className="relative w-full aspect-[580/436] overflow-hidden bg-gray-200">
                      <Image
                        src={imageUrl}
                        alt={post.title.rendered}
                        fill
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 300px"
                      />
                    </div>
                  )}

                  <h3 className="font-display font-black text-xl sm:text-2xl md:text-3xl leading-[1.2] mt-3 mb-3 group-hover:text-primary-red transition-colors duration-300">
                    {decodeHtmlEntities(post.title.rendered)}
                  </h3>

                  <div className="flex items-center justify-center gap-2 text-xs font-sans uppercase tracking-wide">
                    {authorSlug && (
                      <Link href={`/author/${authorSlug}`} className="flex items-center gap-2 hover:opacity-80 transition" onClick={(e) => e.stopPropagation()}>
                        {authorAvatar ? (
                          <div className="w-5 h-5 rounded-full overflow-hidden">
                            <Image
                              src={authorAvatar}
                              alt={author}
                              width={20}
                              height={20}
                              className="object-cover w-full h-full"
                            />
                          </div>
                        ) : (
                          <div className="w-5 h-5 bg-primary-red rounded-full flex items-center justify-center text-white font-bold text-[9px]">
                            {author.charAt(0)}
                          </div>
                        )}
                        <span className="text-primary-red font-bold hover:underline">{author.toUpperCase()}</span>
                      </Link>
                    )}
                    {!authorSlug && (
                      <span className="text-primary-red font-bold">{author.toUpperCase()}</span>
                    )}
                    <span className="text-black">—</span>
                    <span className="text-black">{date}</span>
                  </div>
                </Link>
              </article>
            );
          })}
        </motion.div>

        {/* View All Button */}
        <div className="mt-12 text-center">
          <Link
            href="/articles"
            className="inline-flex items-center gap-3 px-8 py-4 bg-primary-red text-white font-sans font-bold text-sm uppercase tracking-wide hover:bg-black transition-all duration-300 group"
          >
            <span>View All Articles</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
