'use client';

import { useState } from 'react';
import { motion } from 'motion/react';

export default function CinematicDailyBriefing() {
  const [email, setEmail] = useState('');

  const textLines = [
    { text: "Hey, great job.", delay: 0.3 },
    { text: "You found the secret sign up for our Daily Briefing", delay: 1.2 },
    { text: "If you already found this or are signed up...", delay: 2.4 },
    { text: "pretend this isn't shown to everyone and act natural", delay: 3.5 },
    { text: "and continue your navigation to the left so you don't look suspicious.", delay: 4.7 },
    { text: "Otherwise, you're subscriber #1!!", delay: 6.2 },
    { text: "Sign up below to receive Liberty Nation's Daily Briefing—", delay: 7.4 },
    { text: "your morning dose of liberty, news, and analysis delivered fresh to your inbox.", delay: 8.6 },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log('Newsletter signup:', email);
  };

  return (
    <div className="bg-black py-32 relative overflow-hidden">
      <div className="max-w-[900px] mx-auto px-8">
        <div className="text-center space-y-6">
          {textLines.map((line, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: line.delay,
                ease: [0.25, 0.4, 0.25, 1],
              }}
              className="font-display font-black text-2xl md:text-3xl text-white leading-relaxed"
            >
              {line.text}
            </motion.p>
          ))}

          {/* Email Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: 10,
              ease: [0.25, 0.4, 0.25, 1],
            }}
            className="pt-12"
          >
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 max-w-[600px] mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email Address"
                required
                className="flex-1 px-6 py-4 bg-white text-black font-sans text-lg border-2 border-white focus:border-primary-red outline-none transition"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-primary-red text-white font-sans font-bold text-lg uppercase hover:bg-[#c41e2a] transition whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 11,
              }}
              className="mt-6 font-sans text-sm text-gray-400"
            >
              Join thousands of subscribers who start their day informed. Unsubscribe anytime.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
