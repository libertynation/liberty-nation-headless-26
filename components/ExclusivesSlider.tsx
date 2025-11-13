'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { WordPressPost, getFeaturedImageUrl, getAuthorName, formatDate, decodeHtmlEntities, getExcerpt } from '@/lib/wordpress';

interface ExclusivesSliderProps {
  posts: WordPressPost[];
}

export default function ExclusivesSlider({ posts }: ExclusivesSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const displayPosts = posts.slice(0, 4);
  const currentPost = displayPosts[currentIndex];

  // Auto-advance every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % displayPosts.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [displayPosts.length]);

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  if (!displayPosts || displayPosts.length === 0) return null;

  const isEven = currentIndex % 2 === 0;

  return (
    <div className="bg-black pt-16 pb-20 relative overflow-hidden">
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

        {/* Slider Container */}
        <div className="relative h-[600px]">
          {/* Numbered Navigation - Left Side */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-4">
            {displayPosts.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className="relative w-16 h-16 flex items-center justify-center group"
              >
                {/* Red background for active */}
                <motion.div
                  className="absolute inset-0 bg-primary-red"
                  initial={false}
                  animate={{
                    opacity: currentIndex === index ? 1 : 0,
                    scale: currentIndex === index ? 1 : 0.8,
                  }}
                  transition={{ duration: 0.3 }}
                />
                {/* Number */}
                <span
                  className={`relative z-10 font-sans font-black text-3xl transition-colors duration-300 ${
                    currentIndex === index ? 'text-white' : 'text-black group-hover:text-primary-red'
                  }`}
                >
                  {index + 1}
                </span>
              </button>
            ))}
          </div>

          {/* Main Content Area */}
          <div className="ml-24 h-full relative">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <div className={`h-full flex items-center ${isEven ? 'flex-row' : 'flex-row-reverse'} gap-12`}>
                  {/* Morphing Red Background */}
                  <motion.div
                    layoutId="redBackground"
                    className="absolute inset-y-0 bg-primary-red z-0"
                    initial={false}
                    animate={{
                      left: isEven ? '0%' : '55%',
                      right: isEven ? '55%' : '0%',
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 200,
                      damping: 30,
                      mass: 0.8,
                    }}
                    style={{
                      boxShadow: '0 20px 60px rgba(220, 38, 38, 0.4)',
                    }}
                  />

                  {/* Image Side */}
                  <motion.div
                    className="relative z-10 flex-1"
                    initial={{ x: direction * 100, opacity: 0, scale: 0.9 }}
                    animate={{ x: 0, opacity: 1, scale: 1 }}
                    exit={{ x: -direction * 100, opacity: 0, scale: 0.9 }}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 30,
                    }}
                  >
                    {getFeaturedImageUrl(currentPost) && (
                      <Link href={`/${currentPost.slug}`}>
                        <div className="relative w-full aspect-[580/436] overflow-hidden bg-gray-900 shadow-2xl">
                          <Image
                            src={getFeaturedImageUrl(currentPost) || ''}
                            alt={currentPost.title.rendered}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            priority
                          />
                        </div>
                      </Link>
                    )}
                  </motion.div>

                  {/* Content Side */}
                  <motion.div
                    className="relative z-10 flex-1 flex flex-col justify-center"
                    initial={{ x: direction * 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -direction * 100, opacity: 0 }}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 30,
                      delay: 0.1,
                    }}
                  >
                    <Link href={`/${currentPost.slug}`} className="group">
                      <motion.div
                        className={`${isEven ? 'pr-8' : 'pl-8'}`}
                        initial={{ y: 20 }}
                        animate={{ y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <h2 className="font-display font-black text-5xl leading-[1.1] mb-6 text-white group-hover:text-amber-200 transition-colors">
                          {decodeHtmlEntities(currentPost.title.rendered)}
                        </h2>
                        <p className="font-serif text-xl text-gray-100 mb-6 leading-relaxed">
                          {getExcerpt(currentPost).substring(0, 200)}...
                        </p>
                        <div className="flex items-center gap-3 text-sm font-sans uppercase">
                          <span className="text-white font-bold bg-black/30 px-3 py-1 rounded">
                            {getAuthorName(currentPost).toUpperCase()}
                          </span>
                          <span className="text-gray-300">—</span>
                          <span className="text-gray-300">{formatDate(currentPost.date)}</span>
                        </div>
                      </motion.div>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress Indicators - Bottom */}
          <div className="absolute bottom-0 left-24 right-0 flex gap-2">
            {displayPosts.map((_, index) => (
              <motion.div
                key={index}
                className="h-1 flex-1 bg-gray-300 rounded-full overflow-hidden"
                onClick={() => goToSlide(index)}
              >
                <motion.div
                  className="h-full bg-primary-red"
                  initial={{ width: '0%' }}
                  animate={{
                    width: currentIndex === index ? '100%' : '0%',
                  }}
                  transition={{
                    duration: currentIndex === index ? 5 : 0.3,
                    ease: 'linear',
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
