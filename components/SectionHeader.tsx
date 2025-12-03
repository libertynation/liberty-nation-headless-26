'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

interface SectionHeaderProps {
  title: string;
  ctaHref: string;
  ctaText: string;
  className?: string;
}

export default function SectionHeader({ title, ctaHref, ctaText, className = '' }: SectionHeaderProps) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.3, rootMargin: '0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`relative mb-8 ${className}`}>
      {/* Container for title and button on same baseline */}
      <div className="flex items-end justify-between">
        {/* Title with slide animation */}
        <motion.h2
          className="font-sans font-black text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight leading-none pb-3"
          initial={{ x: 100, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94] // Organic ease-out
          }}
        >
          {title}
        </motion.h2>

        {/* Button with flip-down animation - appears after title */}
        <motion.div
          className="hidden lg:block pb-3"
          initial={{ rotateX: -90, opacity: 0 }}
          animate={inView ? { rotateX: 0, opacity: 1 } : { rotateX: -90, opacity: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.5, // Starts after title animation
            ease: [0.34, 1.56, 0.64, 1] // Spring-like bounce
          }}
          style={{ transformOrigin: 'top center', perspective: 1000 }}
        >
          <Link
            href={ctaHref}
            className="group inline-flex items-center gap-2 px-5 py-2 border-2 border-black bg-white hover:bg-black transition-all duration-300"
          >
            <span className="font-sans font-bold text-xs uppercase tracking-widest text-black group-hover:text-white transition-colors duration-300">
              {ctaText}
            </span>
            <svg
              className="w-4 h-4 text-black group-hover:text-white transition-all duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>

      {/* HR that slides across when in view */}
      <div className="relative h-[2px] bg-gray-200 overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 bg-black"
          initial={{ width: '0%' }}
          animate={inView ? { width: '100%' } : { width: '0%' }}
          transition={{
            duration: 1.2,
            ease: [0.25, 0.46, 0.45, 0.94], // Slow organic slide
            delay: 0.1
          }}
        />
      </div>
    </div>
  );
}
