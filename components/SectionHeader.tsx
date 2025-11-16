'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { typography, transitions, spacing, borders } from '@/lib/design-tokens';

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
    <div ref={ref} className={`relative ${spacing.mb.lg} ${className}`}>
      {/* Divider aligned to bottom of text */}
      <div className={`absolute inset-x-0 bottom-0 h-[2px] ${borders.color.dark}`} />

      {/* Title that slides left across the divider when in view (desktop only) */}
      <h2
        className={`relative z-10 inline-block font-sans font-black ${typography.display.lg} uppercase tracking-tight leading-tight whitespace-nowrap
          ${transitions.slowest} ease-[cubic-bezier(0.16,1,0.3,1)]
          pb-[2px]
          lg:will-change-transform
          ${inView ? 'lg:translate-x-0 lg:opacity-100' : 'lg:translate-x-[75%] lg:opacity-0'}`}
      >
        {title}
      </h2>

      {/* CTA fades in on the right using existing space; desktop only */}
      <div
        className={`hidden lg:block absolute bottom-0 right-0 z-10 ${transitions.slowest} ease-out ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}
      >
        <Link
          href={ctaHref}
          className={`group inline-flex items-center gap-3 px-6 py-3 ${borders.medium} ${borders.color.dark} bg-white hover:bg-black ${transitions.all}`}
        >
          <span className={`font-sans font-bold text-xs uppercase tracking-widest text-black group-hover:text-white ${transitions.color}`}>
            {ctaText}
          </span>
          <svg
            className={`w-5 h-5 text-black group-hover:text-white ${transitions.all} group-hover:translate-x-1`}
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
