'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

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
      { threshold: 0.2, rootMargin: '-10% 0px -10% 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`relative mb-4 sm:mb-5 lg:mb-6 ${className}`}>
      {/* Divider aligned to bottom of text */}
      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-black" />

      {/* Title that slides left across the divider when in view (desktop only) */}
      <h2
        className={`relative z-10 inline-block font-sans font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl uppercase tracking-tight leading-tight whitespace-nowrap
          transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]
          pb-[2px]
          lg:will-change-transform
          ${inView ? 'lg:translate-x-0 lg:opacity-100' : 'lg:translate-x-[75%] lg:opacity-0'}`}
      >
        {title}
      </h2>

      {/* CTA fades in on the right using existing space; desktop only */}
      <div
        className={`hidden lg:block absolute bottom-0 right-0 z-10 transition-all duration-700 ease-out ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}
      >
        <Link
          href={ctaHref}
          className="group inline-flex items-center gap-3 px-6 py-3 border-2 border-black bg-white hover:bg-black transition-all duration-300"
        >
          <span className="font-sans font-bold text-xs uppercase tracking-widest text-black group-hover:text-white transition-colors duration-300">
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
      </div>
    </div>
  );
}
