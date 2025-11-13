'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { WordPressPost, getFeaturedImageUrl, getAuthorName, formatDate, decodeHtmlEntities, getExcerpt } from '@/lib/wordpress';

interface ExclusivesSliderV2Props {
  posts: WordPressPost[];
}

export default function ExclusivesSliderV2({ posts }: ExclusivesSliderV2Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const displayPosts = posts.slice(0, 4);
  const currentPost = displayPosts[currentIndex];

  // Auto-advance every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % displayPosts.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [displayPosts.length]);

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  if (!displayPosts || displayPosts.length === 0) return null;

  // Alternate sides: even = content on right, odd = content on left
  const contentOnRight = currentIndex % 2 === 0;

  return (
    <div className="bg-black pt-16 pb-20 relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-8">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-12">
          <div className="bg-primary-red px-6 py-3">
            <span className="font-sans font-black text-white text-sm uppercase tracking-widest">
              LN Exclusives - Original Vision
            </span>
          </div>
          <div className="flex-1 h-0.5 bg-gradient-to-r from-primary-red to-transparent" />
        </div>

        {/* Slider Container */}
        <div className="relative h-[650px]">
          {/* Morphing Red Background - extends to numbers */}
          <motion.div
            className="absolute inset-y-0 bg-primary-red z-0"
            initial={false}
            animate={{
              left: contentOnRight ? '0%' : '40%',
              right: contentOnRight ? '40%' : '0%',
            }}
            transition={{
              type: 'spring',
              stiffness: 180,
              damping: 25,
              mass: 1,
            }}
            style={{
              boxShadow: '0 25px 70px rgba(220, 38, 38, 0.5)',
            }}
          />

          <div className="relative h-full flex items-center">
            {/* Numbered Navigation - Always on Left */}
            <div className="relative z-20 flex flex-col gap-6 mr-12">
              {displayPosts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className="relative w-20 h-20 flex items-center justify-center group transition-transform hover:scale-110"
                >
                  {/* Number */}
                  <span
                    className={`relative z-10 font-sans font-black text-5xl transition-colors duration-300 ${
                      currentIndex === index ? 'text-white' : 'text-white/40 group-hover:text-white/70'
                    }`}
                  >
                    {index + 1}
                  </span>
                  {/* Active indicator dot */}
                  {currentIndex === index && (
                    <motion.div
                      layoutId="activeDot"
                      className="absolute -right-4 w-3 h-3 bg-white rounded-full"
                      transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 h-full relative">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0"
                >
                  <div className={`h-full flex items-center gap-0 ${contentOnRight ? 'flex-row' : 'flex-row-reverse'}`}>
                    {/* Image Container */}
                    <motion.div
                      className="relative z-10 w-[55%] h-[500px]"
                      initial={{
                        x: contentOnRight ? -50 : 50,
                        opacity: 0,
                        rotateY: contentOnRight ? -15 : 15
                      }}
                      animate={{
                        x: 0,
                        opacity: 1,
                        rotateY: 0
                      }}
                      exit={{
                        x: contentOnRight ? 50 : -50,
                        opacity: 0,
                        rotateY: contentOnRight ? 15 : -15
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 200,
                        damping: 25,
                      }}
                      style={{
                        transformStyle: 'preserve-3d',
                        perspective: '1000px',
                      }}
                    >
                      {getFeaturedImageUrl(currentPost) && (
                        <Link href={`/${currentPost.slug}`}>
                          <div className="relative w-full h-full overflow-hidden shadow-2xl">
                            <Image
                              src={getFeaturedImageUrl(currentPost) || ''}
                              alt={currentPost.title.rendered}
                              fill
                              className="object-cover"
                              sizes="(max-width: 1024px) 100vw, 55vw"
                              priority
                            />
                          </div>
                        </Link>
                      )}
                    </motion.div>

                    {/* Content Container */}
                    <motion.div
                      className="relative z-10 w-[45%] flex items-center"
                      initial={{
                        x: contentOnRight ? 50 : -50,
                        opacity: 0
                      }}
                      animate={{
                        x: 0,
                        opacity: 1
                      }}
                      exit={{
                        x: contentOnRight ? -50 : 50,
                        opacity: 0
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 200,
                        damping: 25,
                        delay: 0.1,
                      }}
                    >
                      <Link href={`/${currentPost.slug}`} className="group w-full">
                        <div className={`${contentOnRight ? 'pl-16 pr-8' : 'pr-16 pl-8'}`}>
                          {/* Title */}
                          <motion.h2
                            className="font-display font-black text-5xl leading-[1.05] mb-6 text-white group-hover:text-amber-200 transition-colors"
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.4 }}
                          >
                            {decodeHtmlEntities(currentPost.title.rendered)}
                          </motion.h2>

                          {/* Excerpt */}
                          <motion.p
                            className="font-serif text-xl text-gray-100 mb-6 leading-relaxed"
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.4 }}
                          >
                            {getExcerpt(currentPost).substring(0, 180)}...
                          </motion.p>

                          {/* Meta */}
                          <motion.div
                            className="flex items-center gap-3 text-sm font-sans uppercase"
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.4 }}
                          >
                            <span className="text-white font-bold bg-black/40 px-4 py-2 rounded backdrop-blur-sm">
                              {getAuthorName(currentPost).toUpperCase()}
                            </span>
                            <span className="text-gray-300">—</span>
                            <span className="text-gray-300">{formatDate(currentPost.date)}</span>
                          </motion.div>
                        </div>
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Progress Bars - Bottom */}
          <div className="absolute bottom-0 left-32 right-0 flex gap-3">
            {displayPosts.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className="h-1.5 flex-1 bg-white/20 rounded-full overflow-hidden hover:bg-white/30 transition-colors"
              >
                <motion.div
                  className="h-full bg-white"
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
