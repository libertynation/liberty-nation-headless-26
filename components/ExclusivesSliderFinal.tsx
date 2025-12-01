'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { WordPressPost, getFeaturedImageUrl, getAuthorName, formatDate, decodeHtmlEntities } from '@/lib/wordpress';

interface ExclusivesSliderFinalProps {
  posts: WordPressPost[];
}

export default function ExclusivesSliderFinal({ posts }: ExclusivesSliderFinalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const displayPosts = posts.slice(0, 4);

  // Auto-advance every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayPosts.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [displayPosts.length]);

  if (!displayPosts || displayPosts.length === 0) return null;

  return (
    <div className="bg-bg-offwhite py-12 sm:py-16 lg:py-20">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-8">
          <h2 className="font-sans font-black text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight">Editor's Choice</h2>
        </div>
        <div className="h-[2px] bg-black mb-10" />

        {/* Main Layout: Image Left, Articles Right - Image fills height */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Left: Featured Image with red border - stretch to match right */}
          <div className="relative bg-primary-red p-4 lg:p-6 flex">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="relative w-full h-full min-h-[300px] lg:min-h-0 overflow-hidden bg-gray-200"
              >
                {getFeaturedImageUrl(displayPosts[currentIndex]) && (
                  <Image
                    src={getFeaturedImageUrl(displayPosts[currentIndex]) || ''}
                    alt={displayPosts[currentIndex].title.rendered}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: 4 Articles stacked - tighter spacing */}
          <div className="flex flex-col">
            {displayPosts.map((post, index) => {
              const isActive = currentIndex === index;

              return (
                <div
                  key={post.id}
                  onClick={() => setCurrentIndex(index)}
                  className="cursor-pointer relative flex-1 flex items-center overflow-hidden border-b border-gray-200 last:border-b-0"
                >
                  {/* Red background that morphs down smoothly */}
                  <motion.div
                    className="absolute inset-0 bg-primary-red"
                    initial={false}
                    animate={{ scaleY: isActive ? 1 : 0 }}
                    transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                    style={{ transformOrigin: 'top' }}
                  />

                  {/* Content */}
                  <div className="relative z-10 px-4 lg:px-6 py-4 w-full">
                    <Link href={`/${post.slug}`}>
                      <motion.h3
                        className="font-display font-bold text-lg lg:text-xl leading-tight mb-1"
                        animate={{ color: isActive ? '#ffffff' : '#000000' }}
                        transition={{ duration: 0.6 }}
                      >
                        {decodeHtmlEntities(post.title.rendered)}
                      </motion.h3>
                      <div className="flex items-center gap-2 text-xs font-sans uppercase tracking-wide">
                        <motion.span
                          className="font-bold"
                          animate={{ color: isActive ? '#ffffff' : '#dc2626' }}
                          transition={{ duration: 0.6 }}
                        >
                          {getAuthorName(post).toUpperCase()}
                        </motion.span>
                        <motion.span
                          animate={{ color: isActive ? 'rgba(255,255,255,0.6)' : '#9CA3AF' }}
                          transition={{ duration: 0.6 }}
                        >
                          —
                        </motion.span>
                        <motion.span
                          animate={{ color: isActive ? 'rgba(255,255,255,0.8)' : '#6B7280' }}
                          transition={{ duration: 0.6 }}
                        >
                          {formatDate(post.date)}
                        </motion.span>
                      </div>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Progress Indicators */}
        <div className="mt-6 flex gap-2">
          {displayPosts.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className="h-1 flex-1 bg-gray-300 overflow-hidden"
            >
              <motion.div
                className="h-full bg-primary-red"
                initial={{ width: '0%' }}
                animate={{ width: currentIndex === index ? '100%' : '0%' }}
                transition={{ duration: currentIndex === index ? 6 : 0.3, ease: 'linear' }}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
