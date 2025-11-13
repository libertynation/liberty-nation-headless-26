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
        {/* Gradient overlay for better blending - transparent at top, darker at bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/80 to-black/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-8 py-16">
        {/* Enhanced Forms */}
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left: Donate CTA */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
            className="bg-gradient-to-br from-primary-red/20 to-black/90 backdrop-blur-md p-10 rounded-lg border-2 border-primary-red/50 shadow-2xl hover:border-primary-red transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary-red rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 3.22l-.61-.6a5.5 5.5 0 0 0-7.78 7.77L10 18.78l8.39-8.4a5.5 5.5 0 0 0-7.78-7.77l-.61.61z"/>
                </svg>
              </div>
              <h3 className="font-display font-black text-4xl text-white uppercase tracking-tight">
                Support Liberty
              </h3>
            </div>
            <p className="font-serif text-xl text-gray-200 mb-8 leading-relaxed">
              Your contribution keeps independent journalism alive. Help us defend free speech, expose the truth, and fight for constitutional liberty.
            </p>
            <Link href="/donate" className="block w-full py-5 px-8 bg-primary-red text-white text-center font-sans font-black text-lg uppercase hover:bg-white hover:text-primary-red transition-all duration-300 shadow-2xl hover:shadow-primary-red/50 hover:scale-105 rounded-lg mb-4">
              Make A Donation
            </Link>
            <p className="font-sans text-sm text-gray-300 text-center leading-relaxed">
              Tax-deductible • Secure • 100% goes to our mission
            </p>
          </motion.div>

          {/* Right: Daily Briefing CTA */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
            className="bg-gradient-to-br from-white/10 to-black/90 backdrop-blur-md p-10 rounded-lg border-2 border-white/30 shadow-2xl hover:border-white/60 transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
              </div>
              <h3 className="font-display font-black text-4xl text-white uppercase tracking-tight">
                Daily Briefing
              </h3>
            </div>
            <p className="font-serif text-xl text-gray-200 mb-8 leading-relaxed">
              Wake up informed. Get the day's most important stories, analysis, and truth bombs delivered to your inbox every morning.
            </p>
            <form className="space-y-4">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-6 py-5 bg-white/10 border-2 border-white/40 font-sans text-lg text-white placeholder:text-gray-300 focus:outline-none focus:border-white focus:bg-white/20 transition-all duration-300 rounded-lg"
                required
              />
              <button
                type="submit"
                className="w-full bg-white text-black px-8 py-5 font-sans font-black text-lg uppercase hover:bg-primary-red hover:text-white transition-all duration-300 shadow-2xl hover:shadow-white/50 hover:scale-105 rounded-lg"
              >
                Subscribe Free
              </button>
            </form>
            <div className="flex items-center justify-center gap-6 text-sm text-gray-200 mt-6">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-sans font-bold">Free Forever</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-sans font-bold">No Spam</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
