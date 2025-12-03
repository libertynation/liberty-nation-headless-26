'use client';

import { useState } from 'react';
import Image from 'next/image';

interface AuthorPromoVideoProps {
  videoUrl: string;
  featuredImage?: string | null;
  authorName: string;
}

// Extract YouTube video ID from various URL formats
function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\s?]+)/,
    /^([a-zA-Z0-9_-]{11})$/, // Just the ID
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

export default function AuthorPromoVideo({ videoUrl, featuredImage, authorName }: AuthorPromoVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const videoId = extractYouTubeId(videoUrl);

  if (!videoId) {
    return null;
  }

  // Use provided featured image, or fall back to YouTube thumbnail
  const thumbnailUrl = featuredImage || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <div className="bg-black rounded-sm overflow-hidden shadow-xl">
      <div className="relative w-full aspect-video">
        {isPlaying ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title={`${authorName} - Author Promo`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        ) : (
          <button
            onClick={() => setIsPlaying(true)}
            className="absolute inset-0 w-full h-full group cursor-pointer"
            aria-label={`Play ${authorName} promo video`}
          >
            {/* Thumbnail */}
            <Image
              src={thumbnailUrl}
              alt={`${authorName} promo video thumbnail`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 400px"
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300" />

            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-primary-red rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-xl">
                <div className="w-0 h-0 border-l-[18px] border-l-white border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent ml-1" />
              </div>
            </div>

            {/* Watch label */}
            <div className="absolute bottom-4 left-4 right-4">
              <span className="inline-flex items-center gap-2 bg-black/70 text-white px-3 py-1.5 font-sans text-xs uppercase tracking-wider">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
                </svg>
                Watch Introduction
              </span>
            </div>
          </button>
        )}
      </div>
    </div>
  );
}
