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
    <div className="bg-white py-20 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-8">
        {/* Section Header */}
        <div className="flex items-center gap-6 mb-12">
          <div className="flex-1 border-t-2 border-black" />
          <h2 className="font-sans font-black text-5xl uppercase tracking-tight">LN Exclusives</h2>
        </div>

        {/* Main Layout: Numbers + Photo Left, 4 Articles Right */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-0">
          {/* Left: Numbers + Featured Image with Continuous Red Background */}
          <div className="relative flex items-start">
            {/* Numbers on left side with red background on active */}
            <div className="flex flex-col gap-1 mr-0">
              {displayPosts.map((_, index) => {
                const isActive = currentIndex === index;
                return (
                  <motion.div
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className="relative cursor-pointer py-6 px-6 flex items-center justify-center"
                    style={{ flex: 1 }}
                  >
                    {/* Red background that slides behind number */}
                    <motion.div
                      className="absolute inset-0 bg-primary-red"
                      initial={false}
                      animate={{
                        scaleX: isActive ? 1 : 0,
                      }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      style={{ transformOrigin: 'right' }}
                    />
                    {/* Number with mix-blend-mode for smooth color transition */}
                    <span
                      className="font-sans font-black text-5xl relative z-10"
                      style={{
                        mixBlendMode: 'difference',
                        color: '#ffffff',
                      }}
                    >
                      {index + 1}
                    </span>
                  </motion.div>
                );
              })}
            </div>

            {/* Featured Image with 30px red padding */}
            <div className="relative flex-1 bg-primary-red p-[30px]">
              {/* Animated Featured Image */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="relative w-full aspect-[580/436] overflow-hidden bg-gray-200"
                >
                  {getFeaturedImageUrl(displayPosts[currentIndex]) && (
                    <Image
                      src={getFeaturedImageUrl(displayPosts[currentIndex]) || ''}
                      alt={displayPosts[currentIndex].title.rendered}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      priority
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right: 4 Articles - Red background connects from image */}
          <div className="flex flex-col justify-between gap-1">
            {displayPosts.map((post, index) => {
              const isActive = currentIndex === index;

              return (
                <motion.article
                  key={post.id}
                  onClick={() => setCurrentIndex(index)}
                  className={`cursor-pointer transition-all duration-300 flex-1 flex items-center gap-4 p-6 ${
                    isActive ? 'bg-primary-red' : 'bg-white hover:bg-gray-50'
                  }`}
                  animate={{
                    scale: isActive ? 1.02 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Title and Meta */}
                  <div className="flex-1">
                    <Link href={`/${post.slug}`}>
                      <h3
                        className={`font-serif font-bold text-xl leading-tight mb-2 transition-colors duration-300 ${
                          isActive ? 'text-white' : 'text-black'
                        }`}
                      >
                        {decodeHtmlEntities(post.title.rendered)}
                      </h3>
                      <div className="flex items-center gap-2 text-xs font-sans uppercase">
                        <span
                          className={`font-semibold ${
                            isActive ? 'text-white' : 'text-gray-600'
                          }`}
                        >
                          {getAuthorName(post).toUpperCase()}
                        </span>
                        <span className={isActive ? 'text-white' : 'text-gray-400'}>
                          •
                        </span>
                        <span className={isActive ? 'text-white' : 'text-gray-600'}>
                          {formatDate(post.date)}
                        </span>
                      </div>
                    </Link>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>

        {/* Progress Indicators */}
        <div className="mt-8 flex gap-2">
          {displayPosts.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className="h-1.5 flex-1 bg-gray-300 rounded-full overflow-hidden"
            >
              <motion.div
                className="h-full bg-primary-red"
                initial={{ width: '0%' }}
                animate={{
                  width: currentIndex === index ? '100%' : '0%',
                }}
                transition={{
                  duration: currentIndex === index ? 6 : 0.3,
                  ease: 'linear',
                }}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
