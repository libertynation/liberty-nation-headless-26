'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Spotlight } from './Spotlight';

export default function DonateSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Boomerang Loop Logic
    const handleTimeUpdate = () => {
      // If we're near the end and playing forward, reverse
      if (video.currentTime >= video.duration - 0.5 && video.playbackRate > 0) {
        video.playbackRate = -1;
      }
      // If we're near the start and playing backward, go forward
      else if (video.currentTime <= 0.5 && video.playbackRate < 0) {
        video.playbackRate = 1;
      }
    };

    // Ensure we start playing
    video.play().catch(e => console.log('Autoplay prevented:', e));

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  return (
    <div className="bg-black relative w-full h-auto overflow-hidden">
      {/* Video Background - Relative to define container height */}
      <div className="relative w-full h-auto">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          // Removed 'loop' attribute to handle boomerang manually
          className="w-full h-auto object-cover opacity-40 block"
        >
          <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20video-FU26yq0MK1y0rKSt7TYfo68XneAQ14.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/60 pointer-events-none" />
      </div>

      {/* Spotlight Effect - Positioned absolutely over the container */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Spotlight />
      </div>

      {/* Content - Absolute center overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-block font-sans font-bold text-xs uppercase text-primary-red tracking-widest mb-4">
            Support Independent Journalism
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl mb-4 uppercase text-white leading-tight">
            Defend Free Speech
          </h2>
          <p className="font-serif text-base sm:text-lg text-gray-300 mb-6 leading-relaxed max-w-[600px] mx-auto">
            Your support keeps Liberty Nation independent and fearless in defending truth and the Constitution.
          </p>
          <Link href="/donate" className="inline-block bg-primary-red text-white px-8 py-3 font-sans font-bold text-sm uppercase hover:bg-white hover:text-primary-red transition-all duration-300">
            Donate Now
          </Link>
        </div>
      </div>
    </div>
  );
}

