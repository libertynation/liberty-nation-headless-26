'use client';

import { motion } from 'motion/react';

interface AnimatedSectionHeaderProps {
  title: string;
  subtitle?: string;
}

export default function AnimatedSectionHeader({ title, subtitle }: AnimatedSectionHeaderProps) {
  return (
    <div className="mb-12 relative">
      {/* Animated Top Border - Left to Right */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[3px] bg-primary-red"
        initial={{ scaleX: 0, transformOrigin: 'left' }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      />

      {/* Animated Bottom Border - Right to Left */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary-red"
        initial={{ scaleX: 0, transformOrigin: 'right' }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
      />

      {/* Content with fade in */}
      <motion.div
        className="py-6"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.6, ease: 'easeOut' }}
      >
        <h2 className="font-display font-bold text-4xl md:text-5xl text-text-dark uppercase tracking-tight mb-2">
          {title}
        </h2>
        {subtitle && (
          <p className="font-serif text-lg text-text-gray">
            {subtitle}
          </p>
        )}
      </motion.div>
    </div>
  );
}
