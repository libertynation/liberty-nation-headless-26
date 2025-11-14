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

      <main>
        {/* Hero Section - Black Background */}
        <div className="bg-black">
          <div className="max-w-[900px] mx-auto px-8 py-24 text-center">
            <h1 className="font-serif font-normal text-5xl md:text-6xl lg:text-7xl mb-6 text-white leading-tight">
              The Daily Briefing
            </h1>
            <p className="font-serif text-xl md:text-2xl text-gray-300 leading-relaxed max-w-[700px] mx-auto">
              Wake up informed with essential news and analysis delivered to your inbox every morning
            </p>
          </div>
        </div>

        {/* Main Newsletter Signup - Red Background */}
        <div className="bg-primary-red">
          <div className="max-w-[700px] mx-auto px-8 py-20">
            {subscribed ? (
              <div className="bg-black border-2 border-white p-8 text-center">
                <p className="font-serif text-white font-semibold mb-2 text-3xl">Welcome!</p>
                <p className="font-serif text-xl text-gray-300">
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
                  className="w-full px-6 py-5 bg-white border-2 border-white font-serif text-xl text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white transition"
                  placeholder="Enter your email"
                />
                <button
                  type="submit"
                  className="w-full bg-black text-white px-6 py-5 font-sans font-bold text-base uppercase hover:bg-white hover:text-black transition-all duration-300"
                >
                  Subscribe
                </button>
                <p className="font-sans text-sm text-white text-center">
                  Free • Unsubscribe anytime • No spam
                </p>
              </form>
            )}
          </div>
        </div>

        {/* What You Get - Black Background */}
        <div className="bg-black py-20">
          <div className="max-w-[1000px] mx-auto px-8">
            <h2 className="font-serif text-3xl md:text-4xl mb-16 text-center text-white">
              What's Included
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div>
                <h3 className="font-sans font-bold text-lg mb-4 text-white uppercase tracking-wider">Breaking News</h3>
                <p className="font-serif text-base text-gray-300 leading-relaxed">
                  The day's most important developments in politics, economics, and current events
                </p>
              </div>
              <div>
                <h3 className="font-sans font-bold text-lg mb-4 text-white uppercase tracking-wider">Expert Analysis</h3>
                <p className="font-serif text-base text-gray-300 leading-relaxed">
                  In-depth commentary from journalists who understand constitutional liberty
                </p>
              </div>
              <div>
                <h3 className="font-sans font-bold text-lg mb-4 text-white uppercase tracking-wider">Curated Stories</h3>
                <p className="font-serif text-base text-gray-300 leading-relaxed">
                  Essential insights you won't find in mainstream media
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Details - Red Background */}
        <div className="bg-primary-red py-20">
          <div className="max-w-[900px] mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              {/* Frequency */}
              <div>
                <h2 className="font-serif text-3xl mb-8 text-white">
                  Delivery
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-sans font-bold text-base mb-2 text-white">Every Weekday</h3>
                    <p className="font-serif text-base text-gray-200">
                      7:00 AM EST
                    </p>
                  </div>
                  <div>
                    <h3 className="font-sans font-bold text-base mb-2 text-white">Weekend Edition</h3>
                    <p className="font-serif text-base text-gray-200">
                      Saturday highlights
                    </p>
                  </div>
                </div>
              </div>

              {/* Why Subscribe */}
              <div>
                <h2 className="font-serif text-3xl mb-8 text-white">
                  Why Subscribe
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-sans font-bold text-base mb-2 text-white">Independent</h3>
                    <p className="font-serif text-base text-gray-200">
                      Free from corporate influence
                    </p>
                  </div>
                  <div>
                    <h3 className="font-sans font-bold text-base mb-2 text-white">Free Forever</h3>
                    <p className="font-serif text-base text-gray-200">
                      No subscription fees, no paywalls
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
