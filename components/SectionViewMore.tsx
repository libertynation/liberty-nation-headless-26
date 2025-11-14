'use client';

import Link from 'next/link';
import { motion } from 'motion/react';

interface SectionViewMoreProps {
  href: string;
  actionText: string; // e.g., "View all articles", "Watch more videos", "Listen to more podcasts"
}

export default function SectionViewMore({ href, actionText }: SectionViewMoreProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      className="flex justify-center mt-12"
    >
      <Link
        href={href}
        className="group inline-flex items-center gap-3 px-8 py-4 border-2 border-black bg-white hover:bg-black transition-all duration-300"
      >
        <span className="font-sans font-bold text-sm uppercase tracking-widest text-black group-hover:text-white transition-colors duration-300">
          {actionText}
        </span>
        <svg
          className="w-5 h-5 text-black group-hover:text-white transition-all duration-300 group-hover:translate-x-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </Link>
    </motion.div>
  );
}
