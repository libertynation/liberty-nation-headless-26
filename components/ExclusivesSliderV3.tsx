'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { WordPressPost, getFeaturedImageUrl, getAuthorName, formatDate, decodeHtmlEntities, getExcerpt } from '@/lib/wordpress';

interface ExclusivesSliderV3Props {
  posts: WordPressPost[];
}

export default function ExclusivesSliderV3({ posts }: ExclusivesSliderV3Props) {
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

  // Calculate vertical position for morphing background based on active index
  const getBackgroundPath = (index: number) => {
    // Each article is about 140px tall with 20px gap = 160px per item
    const itemHeight = 160;
    const startY = index * itemHeight;
    const centerY = startY + 70; // Middle of the item

    return {
      top: startY,
      height: 140,
      centerY,
    };
  };

  const activePath = getBackgroundPath(currentIndex);

  return (
    <div className="bg-black pt-16 pb-20 relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-8">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-12">
          <div className="bg-primary-red px-6 py-3">
            <span className="font-sans font-black text-white text-sm uppercase tracking-widest">
              LN Exclusives - Final Vision
            </span>
          </div>
          <div className="flex-1 h-0.5 bg-gradient-to-r from-primary-red to-transparent" />
        </div>

        {/* Main Container */}
        <div className="relative" style={{ minHeight: '680px' }}>
          {/* Morphing Red Background - SVG Path */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 5 }}
          >
            <defs>
              <filter id="gooey" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="20" result="blur" />
                <feColorMatrix
                  in="blur"
                  mode="matrix"
                  values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 35 -10"
                  result="goo"
                />
              </filter>
            </defs>

            <motion.path
              d={`
                M 0,${activePath.centerY - 60}
                L 140,${activePath.centerY - 60}
                Q 160,${activePath.centerY - 60} 160,${activePath.centerY - 40}
                L 160,${activePath.centerY - 300}
                L 520,${activePath.centerY - 300}
                L 520,${activePath.centerY + 300}
                L 160,${activePath.centerY + 300}
                L 160,${activePath.centerY + 40}
                Q 160,${activePath.centerY + 60} 140,${activePath.centerY + 60}
                L 0,${activePath.centerY + 60}
                Z
                M 520,${activePath.centerY - 60}
                L 1200,${activePath.centerY - 60}
                L 1200,${activePath.centerY + 60}
                L 520,${activePath.centerY + 60}
                Z
              `}
              fill="#DC2626"
              filter="url(#gooey)"
              initial={false}
              animate={{
                d: `
                  M 0,${activePath.centerY - 60}
                  L 140,${activePath.centerY - 60}
                  Q 160,${activePath.centerY - 60} 160,${activePath.centerY - 40}
                  L 160,${activePath.centerY - 300}
                  L 520,${activePath.centerY - 300}
                  L 520,${activePath.centerY + 300}
                  L 160,${activePath.centerY + 300}
                  L 160,${activePath.centerY + 40}
                  Q 160,${activePath.centerY + 60} 140,${activePath.centerY + 60}
                  L 0,${activePath.centerY + 60}
                  Z
                  M 520,${activePath.centerY - 60}
                  L 1200,${activePath.centerY - 60}
                  L 1200,${activePath.centerY + 60}
                  L 520,${activePath.centerY + 60}
                  Z
                `,
              }}
              transition={{
                type: 'spring',
                stiffness: 120,
                damping: 20,
                mass: 1.2,
              }}
              style={{
                filter: 'drop-shadow(0 25px 50px rgba(220, 38, 38, 0.6))',
              }}
            />
          </svg>

          {/* Three Column Layout: Numbers | Image | Articles */}
          <div className="relative grid grid-cols-[140px_360px_1fr] gap-8 items-start">
            {/* Left: Numbers Column */}
            <div className="relative z-10 flex flex-col gap-5 pt-8">
              {displayPosts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-full h-[140px] flex items-center justify-center transition-all duration-300 ${
                    currentIndex === index ? 'scale-110' : 'scale-100 hover:scale-105'
                  }`}
                >
                  <span
                    className={`font-sans font-black text-6xl transition-colors duration-300 ${
                      currentIndex === index ? 'text-white' : 'text-white/30 hover:text-white/50'
                    }`}
                  >
                    {index + 1}
                  </span>
                </button>
              ))}
            </div>

            {/* Center: Image that cross-fades */}
            <div className="relative z-10 pt-8" style={{ height: '680px' }}>
              <div className="sticky top-24">
                <div className="relative w-full aspect-[580/436] overflow-hidden shadow-2xl">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentIndex}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
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
                            sizes="360px"
                            priority
                          />
                        </Link>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Right: All 4 Articles Column */}
            <div className="relative z-10 flex flex-col gap-5 pt-8">
              {displayPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  className={`h-[140px] flex flex-col justify-center transition-all duration-300 px-6 ${
                    currentIndex === index ? 'scale-105' : 'scale-100'
                  }`}
                  animate={{
                    opacity: currentIndex === index ? 1 : 0.5,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Link href={`/${post.slug}`} className="group">
                    <h3
                      className={`font-display font-black text-2xl leading-tight mb-2 transition-colors duration-300 ${
                        currentIndex === index
                          ? 'text-white group-hover:text-amber-200'
                          : 'text-gray-400 group-hover:text-gray-300'
                      }`}
                    >
                      {decodeHtmlEntities(post.title.rendered)}
                    </h3>
                    <div className="flex items-center gap-2 text-xs font-sans uppercase">
                      <span
                        className={`font-bold transition-colors ${
                          currentIndex === index ? 'text-white' : 'text-gray-500'
                        }`}
                      >
                        {getAuthorName(post).toUpperCase()}
                      </span>
                      <span className={currentIndex === index ? 'text-gray-300' : 'text-gray-600'}>
                        —
                      </span>
                      <span className={currentIndex === index ? 'text-gray-300' : 'text-gray-600'}>
                        {formatDate(post.date)}
                      </span>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>

          {/* Progress Bars - Bottom */}
          <div className="absolute bottom-0 left-0 right-0 flex gap-3">
            {displayPosts.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className="h-1.5 flex-1 bg-white/20 rounded-full overflow-hidden hover:bg-white/30 transition-colors"
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
