'use client';

import { motion } from 'motion/react';
import Link from 'next/link';

export default function SecretArea() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Full-Screen Video Background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-60"
        >
          <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20video-FU26yq0MK1y0rKSt7TYfo68XneAQ14.mp4" type="video/mp4" />
        </video>
        {/* Gradient overlay - lighter to let home peek through */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center px-8 py-16">
        {/* Two-column layout: Briefing centered in first column */}
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left Column: Daily Briefing CTA - Centered */}
          <div className="flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              className="bg-black/80 backdrop-blur-sm border border-white/20 p-12 shadow-2xl max-w-md w-full"
            >
              <h3 className="font-serif font-bold text-4xl text-white mb-4 leading-tight">
                The Daily Briefing
              </h3>
              <p className="font-serif text-lg text-gray-300 mb-8 leading-relaxed border-t border-white/20 pt-6">
                Wake up informed. Get the day's most important stories delivered to your inbox every morning.
              </p>
              <form className="space-y-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-5 py-3 bg-white/10 border border-white/30 font-sans text-base text-white placeholder:text-gray-400 focus:outline-none focus:border-white focus:bg-white/20 transition-all duration-200"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-primary-red text-white px-6 py-3 font-sans font-bold text-sm uppercase hover:bg-white hover:text-primary-red transition-all duration-300"
                >
                  Subscribe
                </button>
              </form>
              <p className="font-sans text-xs text-gray-400 text-center mt-6">
                Free • No spam • Unsubscribe anytime
              </p>
            </motion.div>
          </div>

          {/* Right Column: Empty for now */}
          <div></div>
        </div>
      </div>

      {/* COMMENTED OUT: Donate CTA */}
      {/* <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
        className="bg-gradient-to-br from-primary-red/20 to-black/90 backdrop-blur-md p-10 border-2 border-primary-red/50 shadow-2xl hover:border-primary-red transition-all duration-300"
      >
        <h3 className="font-display font-black text-5xl text-white uppercase tracking-tight mb-6 leading-tight">
          Support Liberty
        </h3>
        <p className="font-serif text-xl text-gray-200 mb-8 leading-relaxed">
          Your contribution keeps independent journalism alive. Help us defend free speech, expose the truth, and fight for constitutional liberty.
        </p>
        <Link href="/donate" className="block w-full py-5 px-8 bg-primary-red text-white text-center font-sans font-black text-lg uppercase hover:bg-white hover:text-primary-red transition-all duration-300 shadow-2xl hover:scale-105 mb-4">
          Make A Donation
        </Link>
        <p className="font-sans text-sm text-gray-300 text-center leading-relaxed">
          Tax-deductible • Secure • 100% goes to our mission
        </p>
      </motion.div> */}
    </div>
  );
}
