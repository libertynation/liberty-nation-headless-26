'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function SubscribePage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // TODO: Implement actual subscription logic
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
      setEmail('');
    }, 1500);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-text-dark text-white relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }} />

          <div className="max-w-[1200px] mx-auto px-8 pt-24 pb-20 relative z-10">
            <div className="max-w-[800px] mx-auto text-center">
              <p className="font-sans text-xs font-bold uppercase tracking-[0.3em] text-primary-red mb-6">
                Stay Connected
              </p>
              <h1 className="font-display font-black text-5xl md:text-6xl lg:text-7xl leading-[1.05] mb-6 uppercase">
                Subscribe to Liberty Nation
              </h1>
              <p className="font-serif text-xl md:text-2xl text-white/70 leading-[1.6]">
                Choose how you want to stay informed with independent journalism
              </p>
            </div>
          </div>

          {/* Bottom accent */}
          <div className="h-1 bg-primary-red" />
        </section>

        {/* Daily Briefing - Primary CTA */}
        <section className="py-16 md:py-20 bg-primary-red text-white">
          <div className="max-w-[800px] mx-auto px-8">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-3 mb-6 bg-white/20 px-5 py-2 rounded-full">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <span className="font-sans font-bold text-sm uppercase tracking-widest">
                  Daily Briefing
                </span>
              </div>

              <h2 className="font-display font-black text-4xl md:text-5xl mb-4 uppercase">
                Your Morning Dose of Liberty
              </h2>
              <p className="font-serif text-lg md:text-xl text-white/80 max-w-[600px] mx-auto">
                Get the day's most important stories delivered to your inbox every morning. No fluff. No propaganda. Just truth.
              </p>
            </div>

            {submitted ? (
              <div className="bg-white text-text-dark p-8 text-center">
                <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-display font-bold text-2xl mb-2">You're Subscribed!</h3>
                <p className="font-serif text-gray-600">
                  Check your inbox for a confirmation email. Welcome to the Liberty Nation community!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-6 py-4 font-sans text-lg text-text-dark focus:outline-none focus:ring-4 focus:ring-white/30"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-text-dark text-white px-8 py-4 font-sans font-black text-sm uppercase tracking-wider hover:bg-black transition-colors duration-200 disabled:opacity-50 whitespace-nowrap"
                >
                  {loading ? 'Subscribing...' : 'Get The Briefing'}
                </button>
              </form>
            )}

            <div className="flex items-center justify-center gap-6 mt-6 text-sm text-white/70">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-sans font-semibold">Free Forever</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-sans font-semibold">No Spam</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-sans font-semibold">Unsubscribe Anytime</span>
              </div>
            </div>
          </div>
        </section>

        {/* Platform Cards Section */}
        <section className="py-16 md:py-24 bg-bg-offwhite">
          <div className="max-w-[1200px] mx-auto px-8">
            <div className="text-center mb-12">
              <p className="font-sans text-xs font-bold uppercase tracking-[0.3em] text-primary-red mb-4">
                More Ways to Connect
              </p>
              <h2 className="font-display font-black text-3xl md:text-4xl text-text-dark uppercase">
                Follow Liberty Nation Everywhere
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* YouTube Card */}
              <a
                href="https://www.youtube.com/@LibertyNationNews"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white border-2 border-gray-200 hover:border-[#FF0000] transition-all duration-300 p-8 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF0000]/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-[#FF0000] flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </div>
                  <h3 className="font-display font-bold text-xl text-text-dark mb-2 group-hover:text-[#FF0000] transition-colors">
                    YouTube
                  </h3>
                  <p className="font-serif text-gray-600 text-sm leading-relaxed mb-4">
                    Watch Liberty Nation TV, The Conservative Five, and exclusive video content.
                  </p>
                  <span className="font-sans text-xs font-bold uppercase tracking-wide text-[#FF0000]">
                    Subscribe Now →
                  </span>
                </div>
              </a>

              {/* iOS App Card */}
              <a
                href="https://apps.apple.com/us/app/liberty-nation/id1244536946"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white border-2 border-gray-200 hover:border-black transition-all duration-300 p-8 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-black/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-black flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                    </svg>
                  </div>
                  <h3 className="font-display font-bold text-xl text-text-dark mb-2 group-hover:text-black transition-colors">
                    iOS App
                  </h3>
                  <p className="font-serif text-gray-600 text-sm leading-relaxed mb-4">
                    Download our app for iPhone and iPad. Get news alerts and read on the go.
                  </p>
                  <span className="font-sans text-xs font-bold uppercase tracking-wide text-black">
                    Download Free →
                  </span>
                </div>
              </a>

              {/* Android App Card */}
              <a
                href="https://play.google.com/store/apps/details?id=com.libertynation"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white border-2 border-gray-200 hover:border-[#3DDC84] transition-all duration-300 p-8 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#3DDC84]/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-[#3DDC84] flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z"/>
                    </svg>
                  </div>
                  <h3 className="font-display font-bold text-xl text-text-dark mb-2 group-hover:text-[#3DDC84] transition-colors">
                    Android App
                  </h3>
                  <p className="font-serif text-gray-600 text-sm leading-relaxed mb-4">
                    Get the Liberty Nation app on Google Play for Android devices.
                  </p>
                  <span className="font-sans text-xs font-bold uppercase tracking-wide text-[#3DDC84]">
                    Get It Free →
                  </span>
                </div>
              </a>

              {/* Podcasts Card */}
              <a
                href="/category/podcasts"
                className="group bg-white border-2 border-gray-200 hover:border-primary-red transition-all duration-300 p-8 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-red/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-primary-red flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                      <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                    </svg>
                  </div>
                  <h3 className="font-display font-bold text-xl text-text-dark mb-2 group-hover:text-primary-red transition-colors">
                    Podcasts
                  </h3>
                  <p className="font-serif text-gray-600 text-sm leading-relaxed mb-4">
                    Listen to Liberty Nation Radio and our audio commentary on your favorite platform.
                  </p>
                  <span className="font-sans text-xs font-bold uppercase tracking-wide text-primary-red">
                    Listen Now →
                  </span>
                </div>
              </a>

              {/* LNTV Card */}
              <a
                href="/category/lntv"
                className="group bg-white border-2 border-gray-200 hover:border-[#0f172a] transition-all duration-300 p-8 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#0f172a]/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-[#0f172a] flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 14H3V5h18v12zM10 8l6 4-6 4V8z"/>
                    </svg>
                  </div>
                  <h3 className="font-display font-bold text-xl text-text-dark mb-2 group-hover:text-[#0f172a] transition-colors">
                    Liberty Nation TV
                  </h3>
                  <p className="font-serif text-gray-600 text-sm leading-relaxed mb-4">
                    Watch video commentary and analysis on the issues that matter most.
                  </p>
                  <span className="font-sans text-xs font-bold uppercase tracking-wide text-[#0f172a]">
                    Watch Videos →
                  </span>
                </div>
              </a>

              {/* Liberty Vault Card */}
              <a
                href="https://www.libertynation.com/liberty-vault/"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white border-2 border-gray-200 hover:border-amber-600 transition-all duration-300 p-8 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-600/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-amber-600 flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="font-display font-bold text-xl text-text-dark mb-2 group-hover:text-amber-600 transition-colors">
                    Liberty Vault
                  </h3>
                  <p className="font-serif text-gray-600 text-sm leading-relaxed mb-4">
                    Access founding documents, Supreme Court cases, and historical speeches.
                  </p>
                  <span className="font-sans text-xs font-bold uppercase tracking-wide text-amber-600">
                    Explore Archive →
                  </span>
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* Social Media Section */}
        <section className="py-16 bg-text-dark text-white">
          <div className="max-w-[800px] mx-auto px-8 text-center">
            <h3 className="font-display font-bold text-2xl mb-8">
              Follow Us on Social Media
            </h3>
            <div className="flex justify-center gap-6">
              <a
                href="https://x.com/LibertyNation"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="X (Twitter)"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href="https://www.facebook.com/LibertyNationNews"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/libertynation"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://truthsocial.com/@LibertyNation"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Truth Social"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
              </a>
              <a
                href="https://gettr.com/user/libertynation"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Gettr"
              >
                <span className="font-bold text-sm">G</span>
              </a>
            </div>
          </div>
        </section>

        {/* Support CTA */}
        <section className="py-16 bg-bg-offwhite border-t border-gray-200">
          <div className="max-w-[800px] mx-auto px-8 text-center">
            <h3 className="font-display font-bold text-2xl text-text-dark mb-4">
              Support Independent Journalism
            </h3>
            <p className="font-serif text-gray-600 mb-8">
              Your contribution helps us continue delivering truth without corporate influence.
            </p>
            <Link
              href="/donate"
              className="inline-flex items-center gap-3 bg-primary-red text-white px-8 py-4 font-sans font-bold text-sm uppercase tracking-wide hover:bg-red-700 transition group"
            >
              <span>Make a Donation</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
