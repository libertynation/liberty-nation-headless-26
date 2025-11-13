'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { WordPressPost, getFeaturedImageUrl, getAuthorName, formatDate, decodeHtmlEntities, getExcerpt } from '@/lib/wordpress';

interface ExclusivesSliderImprovedProps {
  posts: WordPressPost[];
}

export default function ExclusivesSliderImproved({ posts }: ExclusivesSliderImprovedProps) {
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

  // Calculate positions for morphing background
  // Each article row is approximately 160px tall with gaps
  const articleHeight = 160;
  const numberY = 40 + (currentIndex * articleHeight); // Numbers start at y=40
  const titleY = 40 + (currentIndex * articleHeight); // Titles align with numbers

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white pt-16 pb-20 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-8">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-12">
          <div className="bg-primary-red px-6 py-3">
            <span className="font-sans font-black text-white text-sm uppercase tracking-widest">
              LN Exclusives
            </span>
          </div>
          <div className="flex-1 h-0.5 bg-gradient-to-r from-primary-red to-transparent" />
        </div>

        {/* Main Container */}
        <div className="relative" style={{ minHeight: '700px' }}>
          {/* Morphing Red Background - Wraps from number → image → title */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 1400 700"
            preserveAspectRatio="none"
            style={{ zIndex: 1 }}
          >
            <defs>
              <filter id="gooeyWrap" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="18" result="blur" />
                <feColorMatrix
                  in="blur"
                  mode="matrix"
                  values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -10"
                  result="goo"
                />
              </filter>
            </defs>

            <g filter="url(#gooeyWrap)">
              {/* Number box */}
              <motion.rect
                x="0"
                width="120"
                height="120"
                fill="#DC2626"
                initial={false}
                animate={{ y: numberY }}
                transition={{
                  type: 'spring',
                  stiffness: 140,
                  damping: 22,
                  mass: 1.2,
                }}
              />

              {/* Connecting bridge 1: number to image */}
              <motion.rect
                width="30"
                height="40"
                fill="#DC2626"
                initial={false}
                animate={{
                  x: 120,
                  y: numberY + 40
                }}
                transition={{
                  type: 'spring',
                  stiffness: 140,
                  damping: 22,
                  mass: 1.2,
                }}
              />

              {/* Image box */}
              <motion.rect
                x="140"
                width="400"
                height="120"
                fill="#DC2626"
                initial={false}
                animate={{ y: numberY }}
                transition={{
                  type: 'spring',
                  stiffness: 140,
                  damping: 22,
                  mass: 1.2,
                }}
              />

              {/* Connecting bridge 2: image to title */}
              <motion.rect
                width="350"
                height="40"
                fill="#DC2626"
                initial={false}
                animate={{
                  x: 540,
                  y: numberY + 40
                }}
                transition={{
                  type: 'spring',
                  stiffness: 140,
                  damping: 22,
                  mass: 1.2,
                }}
              />

              {/* Title box */}
              <motion.rect
                x="880"
                width="520"
                height="120"
                fill="#DC2626"
                initial={false}
                animate={{ y: numberY }}
                transition={{
                  type: 'spring',
                  stiffness: 140,
                  damping: 22,
                  mass: 1.2,
                }}
              />
            </g>
          </svg>

          {/* Grid Layout: Numbers | Image | Titles */}
          <div className="grid grid-cols-[120px_400px_1fr] gap-8 items-start relative">
            {/* Left Column: Numbers 1-4 */}
            <div className="relative z-10 flex flex-col gap-10 pt-8">
              {displayPosts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className="w-full h-[120px] flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <span
                    className={`font-sans font-black text-6xl transition-colors duration-300 ${
                      currentIndex === index ? 'text-white' : 'text-gray-400'
                    }`}
                  >
                    {index + 1}
                  </span>
                </button>
              ))}
            </div>

            {/* Center Column: Featured Image (stationary, only content cross-fades) */}
            <div className="relative z-10 pt-8">
              <div className="sticky top-24">
                <div className="relative w-full aspect-[580/436] overflow-hidden shadow-2xl bg-gray-200">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6, ease: 'easeInOut' }}
                      className="absolute inset-0"
                    >
                      {getFeaturedImageUrl(displayPosts[currentIndex]) && (
                        <Link href={`/${displayPosts[currentIndex].slug}`}>
                          <Image
                            src={getFeaturedImageUrl(displayPosts[currentIndex]) || ''}
                            alt={displayPosts[currentIndex].title.rendered}
                            fill
                            className="object-cover"
                            sizes="400px"
                            priority
                          />
                        </Link>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Right Column: All 4 Article Titles */}
            <div className="relative z-10 flex flex-col gap-10 pt-8">
              {displayPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  className="h-[120px] flex flex-col justify-center px-6 transition-all duration-300"
                  animate={{
                    opacity: currentIndex === index ? 1 : 0.5,
                    scale: currentIndex === index ? 1.02 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Link href={`/${post.slug}`} className="group">
                    <h3
                      className={`font-display font-black text-2xl leading-tight mb-2 transition-colors duration-300 ${
                        currentIndex === index
                          ? 'text-white group-hover:text-amber-200'
                          : 'text-gray-700 group-hover:text-primary-red'
                      }`}
                    >
                      {decodeHtmlEntities(post.title.rendered)}
                    </h3>
                    <div className="flex items-center gap-2 text-xs font-sans uppercase">
                      <span
                        className={`font-bold transition-colors ${
                          currentIndex === index ? 'text-white' : 'text-gray-600'
                        }`}
                      >
                        {getAuthorName(post).toUpperCase()}
                      </span>
                      <span className={currentIndex === index ? 'text-gray-300' : 'text-gray-500'}>
                        —
                      </span>
                      <span className={currentIndex === index ? 'text-gray-300' : 'text-gray-500'}>
                        {formatDate(post.date)}
                      </span>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>

          {/* Progress Indicators - Bottom */}
          <div className="absolute bottom-0 left-0 right-0 flex gap-3">
            {displayPosts.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className="h-1.5 flex-1 bg-gray-300 rounded-full overflow-hidden hover:bg-gray-400 transition-colors"
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
    </div>
  );
}
