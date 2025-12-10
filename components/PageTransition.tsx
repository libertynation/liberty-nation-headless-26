'use client';

import { motion, AnimatePresence } from 'motion/react';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
}

/**
 * Page transition wrapper that provides smooth fade transitions
 * Uses popLayout mode to prevent white flash by keeping old content visible
 * during the transition
 */
export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.15,
          ease: 'easeInOut',
        }}
        style={{
          position: 'relative',
          minHeight: '100vh',
          backgroundColor: '#161613', // Match text-dark to prevent white flash
        }}
      >
        <div style={{ backgroundColor: '#ffffff' }}>
          {children}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
