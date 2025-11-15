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

      {/* Content - Integrated with canvas */}
      <div className="relative z-10 h-full flex items-center px-12 lg:px-20 py-16">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left Column: Daily Briefing - Full canvas integration */}
          <div className="space-y-8 max-w-2xl">
            {/* Heading - animate first */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-black text-6xl md:text-7xl xl:text-8xl text-white uppercase tracking-tight leading-[0.9]"
            >
              The Daily
              <br />
              Briefing
            </motion.h2>

            {/* Subtitle - animate second */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-2xl md:text-3xl text-gray-200 leading-relaxed max-w-xl"
            >
              Your morning advantage. Critical news, fearless analysis, and the truth mainstream media won't tell you—delivered before your first coffee.
            </motion.p>

            {/* Email Input - animate third */}
            <motion.form
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-4"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-8 py-5 bg-transparent border-2 border-white/40 font-sans text-xl text-white placeholder:text-gray-400 focus:outline-none focus:border-white focus:bg-white/5 transition-all duration-300 backdrop-blur-sm"
                required
              />

              {/* Submit Button - animate fourth */}
              <motion.button
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
                type="submit"
                className="w-full bg-primary-red text-white px-8 py-5 font-sans font-black text-lg uppercase hover:bg-white hover:text-primary-red transition-all duration-300 shadow-2xl hover:shadow-primary-red/50"
              >
                Get the Briefing
              </motion.button>
            </motion.form>

            {/* Fine print - animate last */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
              className="font-sans text-sm text-gray-400"
            >
              Free • No spam • Unsubscribe anytime
            </motion.p>
          </div>

          {/* Right Column: Empty space for video to show through */}
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
