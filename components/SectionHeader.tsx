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
  const [dividerComplete, setDividerComplete] = useState(false);
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
    <div ref={ref} className={`relative mb-6 ${className}`}>
      {/* Title - tight to divider, minimal gap */}
      <motion.h2
        className="font-sans font-black text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight leading-none"
        initial={{ x: 60, opacity: 0 }}
        animate={inView ? { x: 0, opacity: 1 } : { x: 60, opacity: 0 }}
        transition={{
          duration: 0.85,
          ease: [0.22, 1, 0.36, 1]
        }}
      >
        {title}
      </motion.h2>

      {/* Divider + Button container */}
      <div className="relative mt-2">
        {/* The animated divider line */}
        <div className="relative h-[3px] bg-gray-200 overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 bg-black"
            initial={{ width: '0%' }}
            animate={inView ? { width: '100%' } : { width: '0%' }}
            transition={{
              duration: 1.5,
              ease: [0.4, 0, 0.1, 1], // Organic ease - accelerates smoothly, decelerates gently
              delay: 0.2
            }}
            onAnimationComplete={() => {
              if (inView) setDividerComplete(true);
            }}
          />
        </div>

        {/* Button - bottom edge sits flush on divider line, swings down like hanging sign */}
        <motion.div
          className="hidden lg:block absolute right-0 bottom-[3px]"
          style={{
            transformOrigin: 'center top',
            perspective: '600px',
          }}
          initial={{
            rotateX: -90,
            opacity: 0,
          }}
          animate={dividerComplete ? {
            rotateX: 0,
            opacity: 1,
          } : {
            rotateX: -90,
            opacity: 0,
          }}
          transition={{
            rotateX: {
              type: 'spring',
              stiffness: 80,   // Lower = slower swing
              damping: 8,      // Lower = more bounce/oscillation
              mass: 1.2,       // Higher = more momentum/inertia
            },
            opacity: {
              duration: 0.15,
              ease: 'easeOut'
            }
          }}
        >
          <Link
            href={ctaHref}
            className="group inline-flex items-center gap-3 px-7 py-3.5 border-b-[3px] border-l-2 border-r-2 border-t-2 border-black bg-white hover:bg-black transition-all duration-300"
          >
            <span className="font-sans font-bold text-sm uppercase tracking-wider text-black group-hover:text-white transition-colors duration-300">
              {ctaText}
            </span>
            <svg
              className="w-5 h-5 text-black group-hover:text-white transition-all duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
