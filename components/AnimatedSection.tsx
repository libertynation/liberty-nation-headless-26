'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';

interface AnimatedSectionProps {
  children: ReactNode;
  bgColor?: 'red' | 'black';
  className?: string;
  threshold?: number;
}

export default function AnimatedSection({
  children,
  bgColor = 'red',
  className = '',
  threshold = 0.2
}: AnimatedSectionProps) {
  const [animate, setAnimate] = useState(false);
  const [changeTextColor, setChangeTextColor] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Start entire animation sequence after brief delay
          setTimeout(() => setAnimate(true), 800);
        }
      },
      {
        threshold,
        rootMargin: '0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [threshold]);

  // Trigger text color change 3200ms after animation starts
  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => {
        setChangeTextColor(true);
      }, 3200);

      return () => clearTimeout(timer);
    }
  }, [animate]);

  const bgColorHex = bgColor === 'red' ? '#FF3B47' : '#000000';

  // Generate stars - start scattered, then gravitate to canton
  const stars = Array.from({ length: 150 }, (_, i) => {
    const startLeft = Math.random() * 100;
    const startTop = Math.random() * 100;

    // Final position in canton (top-left 22% x 45%)
    const endLeft = Math.random() * 22;
    const endTop = Math.random() * 45;

    // Decide which stars move to canton (at least 50)
    const shouldMoveToCanton = i < 80; // More than 50 will move

    return {
      startLeft: `${startLeft}%`,
      startTop: `${startTop}%`,
      endLeft: `${shouldMoveToCanton ? endLeft : startLeft}%`,
      endTop: `${shouldMoveToCanton ? endTop : startTop}%`,
      size: Math.random() * 2 + 1.5,
      opacity: Math.random() * 0.4 + 0.4,
      twinkleDelay: Math.random() * 4000,
      twinkleDuration: Math.random() * 3000 + 2000,
      moveDelay: Math.random() * 1000,
      shouldMoveToCanton
    };
  });

  // Define alternating red and white stripes (13 total)
  const stripes = [
    { color: '#DC2626', top: '0%', height: '7.69%', duration: 2000, delay: 400 },
    { color: '#ffffff', top: '7.69%', height: '7.69%', duration: 2200, delay: 500 },
    { color: '#DC2626', top: '15.38%', height: '7.69%', duration: 1800, delay: 600 },
    { color: '#ffffff', top: '23.07%', height: '7.69%', duration: 2400, delay: 450 },
    { color: '#DC2626', top: '30.76%', height: '7.69%', duration: 2100, delay: 550 },
    { color: '#ffffff', top: '38.45%', height: '7.69%', duration: 1900, delay: 650 },
    { color: '#DC2626', top: '46.14%', height: '7.69%', duration: 2300, delay: 480 },
    { color: '#ffffff', top: '53.83%', height: '7.69%', duration: 2000, delay: 580 },
    { color: '#DC2626', top: '61.52%', height: '7.69%', duration: 2200, delay: 520 },
    { color: '#ffffff', top: '69.21%', height: '7.69%', duration: 1950, delay: 620 },
    { color: '#DC2626', top: '76.9%', height: '7.69%', duration: 2100, delay: 490 },
    { color: '#ffffff', top: '84.59%', height: '7.69%', duration: 2250, delay: 560 },
    { color: '#DC2626', top: '92.28%', height: '7.72%', duration: 2050, delay: 600 },
  ];

  return (
    <div
      ref={sectionRef}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Blue background with twinkling stars across entire section */}
      <div
        className="absolute inset-0 transition-opacity ease-out"
        style={{
          backgroundColor: '#1e3a8a',
          opacity: animate ? 1 : 0,
          transitionDuration: '1000ms',
          zIndex: 1,
        }}
      >
        {/* Twinkling stars with gravitation to canton */}
        {stars.map((star, index) => (
          <div
            key={index}
            className="absolute rounded-full transition-all ease-out"
            style={{
              left: animate ? star.endLeft : star.startLeft,
              top: animate ? star.endTop : star.startTop,
              width: `${star.size}px`,
              height: `${star.size}px`,
              background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0.8) 40%, rgba(255,255,255,0) 100%)',
              opacity: animate ? star.opacity : 0,
              animation: animate ? `twinklePulse ${star.twinkleDuration}ms ease-in-out ${star.twinkleDelay}ms infinite` : 'none',
              boxShadow: '0 0 4px rgba(255,255,255,0.8), 0 0 8px rgba(255,255,255,0.4)',
              filter: 'blur(0.5px)',
              transitionDuration: '2000ms',
              transitionDelay: `${star.moveDelay}ms`,
            }}
          />
        ))}
      </div>

      {/* Alternating red and white stripes - slide in smoothly from left */}
      {stripes.map((stripe, index) => {
        const isInCantonVertically = parseFloat(stripe.top) < 45;

        return (
          <div
            key={index}
            className="absolute transform origin-left transition-all ease-out"
            style={{
              top: stripe.top,
              height: stripe.height,
              left: isInCantonVertically && animate ? '22%' : '0%',
              right: '0',
              backgroundColor: stripe.color,
              transform: animate ? 'scaleX(1)' : 'scaleX(0)',
              transitionDuration: `${stripe.duration}ms`,
              transitionDelay: `${stripe.delay}ms`,
              transformOrigin: 'left',
              zIndex: 10,
            }}
          />
        );
      })}

      {/* Final full red background overlay - reduced delay */}
      <div
        className="absolute inset-0 transition-opacity ease-in-out"
        style={{
          backgroundColor: bgColorHex,
          opacity: animate ? 1 : 0,
          transitionDuration: '1500ms',
          transitionDelay: '3200ms', // Reduced from 5000ms
          zIndex: 20,
        }}
      />

      {/* Content wrapper - text color transition only */}
      <div
        className={`relative ${animate ? 'animated-section-active' : ''}`}
        style={{
          zIndex: 30,
        }}
      >
        {/* Text transitions from black to white */}
        <div
          className="transition-colors duration-1000"
          style={{
            transitionDelay: '3200ms',
          }}
        >
          <div className={changeTextColor ? '[&_*]:!text-white [&_.white-card]:!bg-transparent [&_.white-card]:!shadow-none' : ''}>
            {children}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes twinklePulse {
          0%, 100% {
            opacity: 0.2;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
      `}</style>
    </div>
  );
}
