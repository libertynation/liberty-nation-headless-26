'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { spacing, typography, transitions } from '@/lib/design-tokens';

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
    <>
      <Header />
      <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className={`bg-black text-white ${spacing.section.xl} relative overflow-hidden`}>
        <div className="max-w-[900px] mx-auto px-8 relative z-10">
          <div className="text-center">
            <h1 className={`font-serif font-bold ${typography.display.hero} mb-8 leading-[1.05]`}>
              Subscribe to Liberty Nation
            </h1>
            <p className={`font-serif ${typography.body.xl} text-gray-300 leading-[1.7] max-w-[700px] mx-auto`}>
              Stay informed with independent journalism that champions freedom, liberty, and the American way of life.
            </p>
          </div>
        </div>
      </section>

      {/* Main Subscription Options */}
      <section className={`${spacing.section.xl}`}>
        <div className="max-w-[900px] mx-auto px-8">
          <div className="relative mb-16">
            <div className="absolute inset-x-0 bottom-0 h-[3px] bg-black" />
            <h2 className="relative z-10 inline-block font-sans font-black text-3xl md:text-4xl lg:text-5xl uppercase tracking-tight pb-1">
              Newsletter Options
            </h2>
          </div>

          <div className="space-y-12 mb-16">
            {/* Daily Briefing */}
            <div className="border-l-4 border-primary-red pl-8 py-2">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-baseline gap-3 mb-3">
                    <h3 className={`font-serif font-bold ${typography.h2} text-text-dark`}>
                      Daily Briefing
                    </h3>
                    <span className="font-sans font-bold text-sm uppercase tracking-wide text-primary-red">
                      Free
                    </span>
                  </div>
                  <p className={`font-serif ${typography.body.lg} text-gray-700 leading-[1.8] mb-4`}>
                    Get the day's most important news delivered to your inbox every morning. Stay informed without the noise.
                  </p>
                  <p className="font-sans text-sm text-gray-600 mb-4">
                    Daily curated headlines • Breaking news alerts • Unsubscribe anytime
                  </p>
                </div>
                <div className="md:w-80 flex-shrink-0">
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
              </div>
            </div>

            {/* Weekly Digest */}
            <div className="border-l-4 border-primary-red pl-8 py-2">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-baseline gap-3 mb-3">
                    <h3 className={`font-serif font-bold ${typography.h2} text-text-dark`}>
                      Weekly Digest
                    </h3>
                    <span className="font-sans font-bold text-sm uppercase tracking-wide text-primary-red">
                      Free
                    </span>
                  </div>
                  <p className={`font-serif ${typography.body.lg} text-gray-700 leading-[1.8] mb-4`}>
                    A comprehensive weekly roundup of the most important stories, analysis, and commentary delivered every Sunday.
                  </p>
                  <p className="font-sans text-sm text-gray-600 mb-4">
                    Top stories recap • Exclusive analysis • Video highlights
                  </p>
                </div>
                <div className="md:w-80 flex-shrink-0">
                  <button className="w-full bg-gray-900 text-white px-6 py-3 font-sans font-bold text-sm uppercase hover:bg-gray-800 transition">
                    Subscribe Free
                  </button>
                </div>
              </div>
            </div>

            {/* Premium Membership */}
            <div className="border-l-4 border-primary-red pl-8 py-2 bg-bg-offwhite -ml-8 pl-12 pr-8 py-6">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-baseline gap-3 mb-3">
                    <h3 className={`font-serif font-bold ${typography.h2} text-text-dark`}>
                      Premium Access
                    </h3>
                    <span className="font-sans font-bold text-sm uppercase tracking-wide text-primary-red">
                      Most Popular
                    </span>
                  </div>
                  <p className={`font-serif ${typography.body.lg} text-gray-700 leading-[1.8] mb-4`}>
                    Full access to all content, ad-free experience, and exclusive member benefits.
                  </p>
                  <p className="font-sans text-sm text-gray-600 mb-4">
                    Everything in free tiers • Ad-free reading • Premium articles & research • Early access to content • Member-only discussions
                  </p>
                  <div className="font-serif text-4xl text-primary-black">
                    $5<span className="text-xl text-gray-600">/month</span>
                  </div>
                </div>
                <div className="md:w-80 flex-shrink-0">
                  <button className="w-full bg-primary-red text-white px-6 py-3 font-sans font-bold text-sm uppercase hover:bg-[#e02835] transition">
                    Subscribe Now
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Support Message */}
          <div className="border-l-4 border-primary-red pl-8 py-6 bg-bg-offwhite -ml-8 pl-12 pr-8">
            <h3 className={`font-serif font-bold ${typography.h2} text-text-dark mb-4`}>
              Support Independent Journalism
            </h3>
            <p className={`font-serif ${typography.body.lg} text-gray-700 leading-[1.8] mb-6 max-w-[700px]`}>
              Your subscription helps us continue delivering unbiased, independent news and analysis. Join thousands of readers who value truth and freedom.
            </p>
            <Link
              href="/donate"
              className="inline-block bg-primary-red text-white px-8 py-4 font-sans font-bold text-sm uppercase hover:bg-[#e02835] transition"
            >
              Make a One-Time Donation
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={`bg-bg-offwhite ${spacing.section.xl}`}>
        <div className="max-w-[900px] mx-auto px-8">
          <div className="relative mb-16">
            <div className="absolute inset-x-0 bottom-0 h-[3px] bg-black" />
            <h2 className="relative z-10 inline-block font-sans font-black text-3xl md:text-4xl lg:text-5xl uppercase tracking-tight pb-1">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-8">
            <div className="border-l-4 border-primary-red pl-8 py-2">
              <h3 className={`font-serif font-bold ${typography.h2} text-text-dark mb-3`}>
                Can I cancel anytime?
              </h3>
              <p className={`font-serif ${typography.body.lg} text-gray-700 leading-[1.8]`}>
                Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your billing period.
              </p>
            </div>

            <div className="border-l-4 border-primary-red pl-8 py-2">
              <h3 className={`font-serif font-bold ${typography.h2} text-text-dark mb-3`}>
                What payment methods do you accept?
              </h3>
              <p className={`font-serif ${typography.body.lg} text-gray-700 leading-[1.8]`}>
                We accept all major credit cards, PayPal, and other secure payment methods.
              </p>
            </div>

            <div className="border-l-4 border-primary-red pl-8 py-2">
              <h3 className={`font-serif font-bold ${typography.h2} text-text-dark mb-3`}>
                Is my information secure?
              </h3>
              <p className={`font-serif ${typography.body.lg} text-gray-700 leading-[1.8]`}>
                Absolutely. We use industry-standard encryption and never share your personal information with third parties.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
    <Footer />
    </>
  );
}
