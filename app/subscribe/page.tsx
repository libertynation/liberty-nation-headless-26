'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SubscribePage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // TODO: Implement actual subscription logic
    setTimeout(() => {
      setMessage('Successfully subscribed! Check your email for confirmation.');
      setLoading(false);
      setEmail('');
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-primary-black text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]" style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }} />

        <div className="max-w-[1200px] mx-auto px-8 relative z-10">
          <div className="max-w-[800px] mx-auto text-center">
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl mb-6">
              Subscribe to Liberty Nation
            </h1>
            <p className="font-sans text-xl md:text-2xl text-gray-300 leading-relaxed">
              Stay informed with independent journalism that champions freedom, liberty, and the American way of life.
            </p>
          </div>
        </div>
      </section>

      {/* Main Subscription Options */}
      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl text-primary-black mb-4">
              Choose Your Subscription
            </h2>
            <p className="font-sans text-lg text-gray-600 max-w-[600px] mx-auto">
              All subscriptions include full access to our articles, videos, and exclusive content.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Daily Briefing */}
            <div className="border-2 border-gray-200 p-8 hover:border-primary-red transition-all duration-300 hover:shadow-xl">
              <div className="mb-6">
                <svg className="w-16 h-16 text-primary-red mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-serif text-2xl text-primary-black mb-3 text-center">
                Daily Briefing
              </h3>
              <p className="font-sans text-sm text-gray-600 mb-6 text-center leading-relaxed">
                Get the day's most important news delivered to your inbox every morning. Stay informed without the noise.
              </p>
              <div className="text-center mb-6">
                <div className="font-serif text-4xl text-primary-black mb-2">FREE</div>
                <div className="font-sans text-sm text-gray-500">Daily delivery</div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2 font-sans text-sm text-gray-700">
                  <svg className="w-5 h-5 text-primary-red flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Daily curated headlines
                </li>
                <li className="flex items-start gap-2 font-sans text-sm text-gray-700">
                  <svg className="w-5 h-5 text-primary-red flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Breaking news alerts
                </li>
                <li className="flex items-start gap-2 font-sans text-sm text-gray-700">
                  <svg className="w-5 h-5 text-primary-red flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Unsubscribe anytime
                </li>
              </ul>
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 font-sans text-sm focus:outline-none focus:border-primary-red transition"
                  required
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary-red text-white px-6 py-3 font-sans font-bold text-sm uppercase hover:bg-[#e02835] transition disabled:opacity-50"
                >
                  {loading ? 'Subscribing...' : 'Subscribe Free'}
                </button>
              </form>
              {message && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 text-green-800 font-sans text-sm">
                  {message}
                </div>
              )}
            </div>

            {/* Weekly Digest */}
            <div className="border-2 border-gray-200 p-8 hover:border-primary-red transition-all duration-300 hover:shadow-xl">
              <div className="mb-6">
                <svg className="w-16 h-16 text-primary-red mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="font-serif text-2xl text-primary-black mb-3 text-center">
                Weekly Digest
              </h3>
              <p className="font-sans text-sm text-gray-600 mb-6 text-center leading-relaxed">
                A comprehensive weekly roundup of the most important stories, analysis, and commentary.
              </p>
              <div className="text-center mb-6">
                <div className="font-serif text-4xl text-primary-black mb-2">FREE</div>
                <div className="font-sans text-sm text-gray-500">Every Sunday</div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2 font-sans text-sm text-gray-700">
                  <svg className="w-5 h-5 text-primary-red flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Top stories recap
                </li>
                <li className="flex items-start gap-2 font-sans text-sm text-gray-700">
                  <svg className="w-5 h-5 text-primary-red flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Exclusive analysis
                </li>
                <li className="flex items-start gap-2 font-sans text-sm text-gray-700">
                  <svg className="w-5 h-5 text-primary-red flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Video highlights
                </li>
              </ul>
              <button className="w-full bg-gray-900 text-white px-6 py-3 font-sans font-bold text-sm uppercase hover:bg-gray-800 transition">
                Subscribe Free
              </button>
            </div>

            {/* Premium Membership */}
            <div className="border-2 border-primary-red p-8 relative hover:shadow-xl transition-all duration-300">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary-red text-white px-4 py-1 font-sans font-bold text-xs uppercase">
                Most Popular
              </div>
              <div className="mb-6">
                <svg className="w-16 h-16 text-primary-red mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="font-serif text-2xl text-primary-black mb-3 text-center">
                Premium Access
              </h3>
              <p className="font-sans text-sm text-gray-600 mb-6 text-center leading-relaxed">
                Full access to all content, ad-free experience, and exclusive member benefits.
              </p>
              <div className="text-center mb-6">
                <div className="font-serif text-4xl text-primary-black mb-2">$5/mo</div>
                <div className="font-sans text-sm text-gray-500">Billed monthly</div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2 font-sans text-sm text-gray-700">
                  <svg className="w-5 h-5 text-primary-red flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Everything in free tiers
                </li>
                <li className="flex items-start gap-2 font-sans text-sm text-gray-700">
                  <svg className="w-5 h-5 text-primary-red flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Ad-free reading experience
                </li>
                <li className="flex items-start gap-2 font-sans text-sm text-gray-700">
                  <svg className="w-5 h-5 text-primary-red flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Premium articles & research
                </li>
                <li className="flex items-start gap-2 font-sans text-sm text-gray-700">
                  <svg className="w-5 h-5 text-primary-red flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Early access to content
                </li>
                <li className="flex items-start gap-2 font-sans text-sm text-gray-700">
                  <svg className="w-5 h-5 text-primary-red flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Member-only discussions
                </li>
              </ul>
              <button className="w-full bg-primary-red text-white px-6 py-3 font-sans font-bold text-sm uppercase hover:bg-[#e02835] transition">
                Subscribe Now
              </button>
            </div>
          </div>

          {/* Support Message */}
          <div className="bg-gray-50 border-2 border-gray-200 p-8 md:p-12 text-center">
            <h3 className="font-serif text-3xl text-primary-black mb-4">
              Support Independent Journalism
            </h3>
            <p className="font-sans text-lg text-gray-600 mb-6 max-w-[700px] mx-auto leading-relaxed">
              Your subscription helps us continue delivering unbiased, independent news and analysis. Join thousands of readers who value truth and freedom.
            </p>
            <Link
              href="/donate"
              className="inline-block bg-gray-900 text-white px-8 py-4 font-sans font-bold text-sm uppercase hover:bg-gray-800 transition"
            >
              Make a One-Time Donation
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-[900px] mx-auto px-8">
          <h2 className="font-serif text-4xl text-primary-black mb-12 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div className="bg-white p-6 border border-gray-200">
              <h3 className="font-sans font-bold text-lg text-primary-black mb-2">
                Can I cancel anytime?
              </h3>
              <p className="font-sans text-gray-600 leading-relaxed">
                Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your billing period.
              </p>
            </div>

            <div className="bg-white p-6 border border-gray-200">
              <h3 className="font-sans font-bold text-lg text-primary-black mb-2">
                What payment methods do you accept?
              </h3>
              <p className="font-sans text-gray-600 leading-relaxed">
                We accept all major credit cards, PayPal, and other secure payment methods.
              </p>
            </div>

            <div className="bg-white p-6 border border-gray-200">
              <h3 className="font-sans font-bold text-lg text-primary-black mb-2">
                Is my information secure?
              </h3>
              <p className="font-sans text-gray-600 leading-relaxed">
                Absolutely. We use industry-standard encryption and never share your personal information with third parties.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
