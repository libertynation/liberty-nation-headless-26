'use client';

import Link from 'next/link';
import { WordPressPost } from '@/lib/types';
import { decodeHtmlEntities } from '@/lib/utils';
import { motion } from 'motion/react';
import { spacing, typography, transitions } from '@/lib/design-tokens';

interface BreakingHeadlinesProps {
  posts: WordPressPost[];
}

export default function BreakingHeadlines({ posts }: BreakingHeadlinesProps) {
  if (!posts || posts.length === 0) return null;

  // Take only first 5 posts for the 5-column layout
  const displayPosts = posts.slice(0, 5);

  return (
    <div className="bg-bg-offwhite relative">
      {/* Top border - animates in from left */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px] bg-black"
        initial={{ scaleX: 0, transformOrigin: 'left' }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      />

      {/* Bottom border - animates in from right after top */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-black"
        initial={{ scaleX: 0, transformOrigin: 'right' }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
      />

      <div className={`max-w-[1600px] mx-auto ${spacing.container.default} py-6`}>
        <div className="flex items-center gap-6">
          {/* Breaking Label - fades in after borders */}
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 1.2, ease: 'easeOut' }}
          >
            <span className="font-sans font-black text-xl uppercase text-white bg-primary-red px-6 py-4 inline-block tracking-tight">
              BREAKING
            </span>
          </motion.div>

          {/* 5 Column Grid - Equal width columns, vertically centered */}
          <motion.div
            className="grid grid-cols-5 gap-6 flex-1 items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 1.4, ease: 'easeOut' }}
          >
            {displayPosts.map((post) => (
              <Link
                key={post.id}
                href={`/${post.slug}`}
                className="text-center group"
              >
                <p className={`font-display text-lg font-black text-gray-900 group-hover:text-primary-red ${transitions.fast} leading-tight line-clamp-3 mb-0`}>
                  {decodeHtmlEntities(post.title.rendered)}
                </p>
              </Link>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
