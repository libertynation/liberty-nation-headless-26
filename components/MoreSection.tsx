'use client';

import Link from 'next/link';
import Image from 'next/image';
import { WordPressPost, getFeaturedImageUrl, getAuthorName, formatDate, decodeHtmlEntities } from '@/lib/wordpress';
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
      <div className="relative max-w-[1400px] mx-auto px-8 pt-12 pb-20">
        {/* Large MORE label in white space to left */}
        <div className="mb-6">
          <h2 className="font-sans font-black text-7xl uppercase tracking-tight text-black">
            {title}
          </h2>
        </div>

        {/* Black divider line with slight padding from grid */}
        <div className="w-full h-1 bg-black mb-8"></div>

        {/* Articles Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {posts.map((post) => {
            const imageUrl = getFeaturedImageUrl(post);
            const author = getAuthorName(post);
            const date = formatDate(post.date);

            return (
              <article key={post.id} className="group">
                <Link href={`/${post.slug}`}>
                  {imageUrl && (
                    <div className="relative w-full aspect-[580/436] overflow-hidden bg-gray-200 mb-3">
                      <Image
                        src={imageUrl}
                        alt={post.title.rendered}
                        fill
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 300px"
                      />
                    </div>
                  )}

                  <h3 className="font-display font-extrabold text-[20px] leading-[1.2] mb-2 group-hover:text-primary-red transition-colors duration-300">
                    {decodeHtmlEntities(post.title.rendered)}
                  </h3>

                  <div className="flex items-center gap-2 text-[11px] font-sans uppercase tracking-wide">
                    <span className="text-primary-red font-bold">{author.toUpperCase()}</span>
                    <span className="text-black">—</span>
                    <span className="text-black">{date}</span>
                  </div>
                </Link>
              </article>
            );
          })}
        </motion.div>
      </div>

      {/* Full-height black background sliding in from right */}
      <motion.div
        className="absolute top-0 right-0 bottom-0 bg-black flex items-center justify-center"
        initial={{ width: 0 }}
        whileInView={{ width: 'calc(100% - 1400px + 30px)' }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
      >
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="px-8"
        >
          <h3 className="font-sans font-black text-6xl uppercase text-white leading-tight text-center">
            Read<br/>Watch<br/>Listen<br/>More
          </h3>
        </motion.div>
      </motion.div>
    </div>
  );
}
