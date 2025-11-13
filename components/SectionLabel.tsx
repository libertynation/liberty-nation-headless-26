'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

interface SectionLabelProps {
  sectionTitle: string;
  href: string;
  actionText?: string; // e.g., "Read more", "Listen to more", "Watch more"
}

export default function SectionLabel({ sectionTitle, href, actionText = "Read more" }: SectionLabelProps) {
  const [isVisible, setIsVisible] = useState(false);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Trigger when element is near center of viewport
        if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
          setIsVisible(true);
        }
      },
      {
        threshold: [0.3, 0.5, 0.7],
        rootMargin: '-20% 0px -20% 0px', // Trigger when near center
      }
    );

    if (labelRef.current) {
      observer.observe(labelRef.current);
    }

    return () => {
      if (labelRef.current) {
        observer.unobserve(labelRef.current);
      }
    };
  }, []);

  return (
    <div ref={labelRef} className="absolute right-16 top-1/2 -translate-y-1/2 z-10">
      <Link
        href={href}
        className={`block transition-all duration-1000 ease-out ${
          isVisible
            ? 'translate-y-0 opacity-100'
            : '-translate-y-[200%] opacity-0'
        }`}
      >
        <div
          className="relative bg-gradient-to-br from-amber-50 to-amber-100 border-2 border-gray-400 shadow-lg px-6 py-4 min-w-[200px]"
          style={{
            transform: 'rotate(-3deg)',
            backgroundImage: `
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                rgba(0,0,0,0.03) 2px,
                rgba(0,0,0,0.03) 4px
              ),
              repeating-linear-gradient(
                90deg,
                transparent,
                transparent 2px,
                rgba(0,0,0,0.03) 2px,
                rgba(0,0,0,0.03) 4px
              )
            `,
            filter: 'drop-shadow(4px 4px 8px rgba(0,0,0,0.2))',
          }}
        >
          {/* Newspaper texture overlay */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100\' height=\'100\' filter=\'url(%23noise)\' opacity=\'0.3\' /%3E%3C/svg%3E")',
            }}
          />

          {/* Aged paper edge effect */}
          <div className="absolute -top-1 -left-1 w-3 h-3 bg-amber-100 transform rotate-45 opacity-50" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-100 transform rotate-45 opacity-50" />
          <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-amber-100 transform rotate-45 opacity-50" />
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-amber-100 transform rotate-45 opacity-50" />

          <div className="relative">
            <div className="font-serif text-xs italic text-gray-600 mb-1 tracking-wide">
              {actionText} from
            </div>
            <div
              className="font-display font-black text-xl uppercase tracking-tight text-gray-900 leading-tight"
              style={{
                textShadow: '1px 1px 0px rgba(0,0,0,0.1)',
              }}
            >
              {sectionTitle}
            </div>

            {/* Small decorative arrow */}
            <div className="absolute -right-3 top-1/2 -translate-y-1/2">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="text-primary-red"
              >
                <path
                  d="M6 3L11 8L6 13"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
