'use client';

import { useState } from 'react';
import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function NewslettersPage() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Newsletter subscription logic will be implemented later
    console.log('Newsletter subscription:', email);
    setSubscribed(true);

    // Reset after 3 seconds
    setTimeout(() => {
      setSubscribed(false);
      setEmail('');
    }, 3000);
  };

  return (
    <>
      <Header />

      <main className="bg-white">
        {/* Hero Section - Clean White */}
        <div className="bg-white border-b-2 border-black">
          <div className="max-w-[900px] mx-auto px-8 py-16 md:py-20 lg:py-24 text-center">
            <h1 className="font-display font-normal text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-6 text-black leading-[1.05]">
              The Daily Briefing
            </h1>
            <p className="font-serif text-lg md:text-xl lg:text-2xl text-gray-700 leading-relaxed max-w-[700px] mx-auto">
              Wake up informed with essential news and analysis delivered to your inbox every morning
            </p>
          </div>
        </div>

        {/* Main Newsletter Signup - Off-White Background */}
        <div className="bg-bg-offwhite py-16 md:py-20">
          <div className="max-w-[700px] mx-auto px-8">
            {subscribed ? (
              <div className="bg-white border-2 border-primary-red p-8 text-center shadow-md">
                <p className="font-display text-black font-semibold mb-2 text-2xl md:text-3xl">Welcome!</p>
                <p className="font-serif text-lg md:text-xl text-gray-700">
                  Check your inbox to confirm your subscription
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <input
                  type="email"
                  id="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-6 py-4 md:py-5 bg-white border-2 border-gray-300 font-serif text-lg md:text-xl text-black placeholder:text-gray-500 focus:outline-none focus:border-primary-red focus:ring-2 focus:ring-primary-red/20 transition-all duration-300"
                  placeholder="Enter your email address"
                />
                <button
                  type="submit"
                  className="w-full bg-primary-red text-white px-6 py-4 md:py-5 font-sans font-bold text-sm md:text-base uppercase tracking-wider hover:bg-black transition-colors duration-300 shadow-md hover:shadow-lg"
                >
                  Subscribe to Newsletter
                </button>
                <p className="font-sans text-sm text-gray-600 text-center">
                  Free • Unsubscribe anytime • No spam
                </p>
              </form>
            )}
          </div>
        </div>

        {/* What You Get - White Background with Border */}
        <div className="bg-white py-16 md:py-20 border-t-2 border-black">
          <div className="max-w-[1100px] mx-auto px-8">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl mb-12 md:mb-16 text-center text-black">
              What's Included
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
              <div className="text-center md:text-left">
                <div className="inline-block mb-4">
                  <div className="w-12 h-12 flex items-center justify-center border-2 border-primary-red">
                    <svg className="w-6 h-6 text-primary-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
                <h3 className="font-sans font-bold text-base md:text-lg mb-3 text-black uppercase tracking-wider">Breaking News</h3>
                <p className="font-serif text-base md:text-lg text-gray-700 leading-relaxed">
                  The day's most important developments in politics, economics, and current events
                </p>
              </div>
              <div className="text-center md:text-left">
                <div className="inline-block mb-4">
                  <div className="w-12 h-12 flex items-center justify-center border-2 border-primary-red">
                    <svg className="w-6 h-6 text-primary-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                </div>
                <h3 className="font-sans font-bold text-base md:text-lg mb-3 text-black uppercase tracking-wider">Expert Analysis</h3>
                <p className="font-serif text-base md:text-lg text-gray-700 leading-relaxed">
                  In-depth commentary from journalists who understand constitutional liberty
                </p>
              </div>
              <div className="text-center md:text-left">
                <div className="inline-block mb-4">
                  <div className="w-12 h-12 flex items-center justify-center border-2 border-primary-red">
                    <svg className="w-6 h-6 text-primary-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                </div>
                <h3 className="font-sans font-bold text-base md:text-lg mb-3 text-black uppercase tracking-wider">Curated Stories</h3>
                <p className="font-serif text-base md:text-lg text-gray-700 leading-relaxed">
                  Essential insights you won't find in mainstream media
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Details - Off-White Background */}
        <div className="bg-bg-offwhite py-16 md:py-20 border-t-2 border-gray-300">
          <div className="max-w-[1000px] mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
              {/* Frequency */}
              <div>
                <h2 className="font-display text-2xl md:text-3xl lg:text-4xl mb-6 md:mb-8 text-black pb-4 border-b-2 border-primary-red">
                  Delivery
                </h2>
                <div className="space-y-6">
                  <div className="bg-white p-6 border-l-4 border-primary-red shadow-sm">
                    <h3 className="font-sans font-bold text-base md:text-lg mb-2 text-black">Every Weekday</h3>
                    <p className="font-serif text-base md:text-lg text-gray-700">
                      7:00 AM EST
                    </p>
                  </div>
                  <div className="bg-white p-6 border-l-4 border-primary-red shadow-sm">
                    <h3 className="font-sans font-bold text-base md:text-lg mb-2 text-black">Weekend Edition</h3>
                    <p className="font-serif text-base md:text-lg text-gray-700">
                      Saturday highlights
                    </p>
                  </div>
                </div>
              </div>

              {/* Why Subscribe */}
              <div>
                <h2 className="font-display text-2xl md:text-3xl lg:text-4xl mb-6 md:mb-8 text-black pb-4 border-b-2 border-primary-red">
                  Why Subscribe
                </h2>
                <div className="space-y-6">
                  <div className="bg-white p-6 border-l-4 border-primary-red shadow-sm">
                    <h3 className="font-sans font-bold text-base md:text-lg mb-2 text-black">Independent</h3>
                    <p className="font-serif text-base md:text-lg text-gray-700">
                      Free from corporate influence
                    </p>
                  </div>
                  <div className="bg-white p-6 border-l-4 border-primary-red shadow-sm">
                    <h3 className="font-sans font-bold text-base md:text-lg mb-2 text-black">Free Forever</h3>
                    <p className="font-serif text-base md:text-lg text-gray-700">
                      No subscription fees, no paywalls
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA Section - White Background */}
        <div className="bg-white py-12 md:py-16 border-t-2 border-black">
          <div className="max-w-[800px] mx-auto px-8 text-center">
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl mb-4 text-black">
              Join Thousands of Informed Readers
            </h2>
            <p className="font-serif text-base md:text-lg text-gray-700 mb-8">
              Start your morning with news that matters
            </p>
            <a
              href="#email"
              className="inline-block bg-primary-red text-white px-8 py-4 font-sans font-bold text-sm md:text-base uppercase tracking-wider hover:bg-black transition-colors duration-300 shadow-md hover:shadow-lg"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('email')?.scrollIntoView({ behavior: 'smooth' });
                document.getElementById('email')?.focus();
              }}
            >
              Subscribe Now
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
