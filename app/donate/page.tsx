'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function DonatePage() {
  const [amount, setAmount] = useState('50');
  const [customAmount, setCustomAmount] = useState('');
  const [frequency, setFrequency] = useState<'once' | 'monthly'>('once');

  const presetAmounts = ['25', '50', '100', '250', '500'];

  const getImpactMessage = (amt: number) => {
    if (amt >= 500) return "Fund a month of investigative journalism";
    if (amt >= 250) return "Support a week of daily reporting";
    if (amt >= 100) return "Enable in-depth analysis pieces";
    if (amt >= 50) return "Help produce quality content";
    if (amt >= 25) return "Keep the lights on";
    return "Every dollar counts";
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero Section - High contrast with more padding for header */}
        <section className="bg-text-dark relative overflow-hidden">
          {/* Accent bar */}
          <div className="absolute top-0 left-0 w-2 h-full bg-primary-red" />

          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }} />

          <div className="max-w-[1200px] mx-auto px-8 pt-24 pb-20 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left: Message */}
              <div>
                <p className="font-sans text-xs font-bold uppercase tracking-[0.3em] text-primary-red mb-6">
                  Support Our Mission
                </p>
                <h1 className="font-display font-black text-5xl md:text-6xl lg:text-7xl leading-[1.05] mb-8 uppercase text-white">
                  Defend Truth.<br />Fund Freedom.
                </h1>
                <p className="font-serif text-xl text-gray-300 leading-[1.6] max-w-[500px]">
                  Your tax-deductible contribution powers independent journalism that holds power accountable and champions constitutional liberty.
                </p>
              </div>

              {/* Right: Donation Card */}
              <div className="bg-white text-gray-900 p-8 md:p-10 shadow-2xl">
                {/* Frequency Toggle */}
                <div className="flex gap-2 mb-8">
                  <button
                    onClick={() => setFrequency('once')}
                    className={`flex-1 py-4 font-sans font-bold text-sm uppercase tracking-wide transition-all duration-200 ${
                      frequency === 'once'
                        ? 'bg-text-dark text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    One-Time
                  </button>
                  <button
                    onClick={() => setFrequency('monthly')}
                    className={`flex-1 py-4 font-sans font-bold text-sm uppercase tracking-wide transition-all duration-200 ${
                      frequency === 'monthly'
                        ? 'bg-text-dark text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Monthly
                  </button>
                </div>

                {/* Amount Selection */}
                <div className="mb-6">
                  <div className="grid grid-cols-5 gap-2 mb-4">
                    {presetAmounts.map((preset) => (
                      <button
                        key={preset}
                        onClick={() => {
                          setAmount(preset);
                          setCustomAmount('');
                        }}
                        className={`py-4 font-sans font-bold text-lg transition-all duration-200 border-2 ${
                          amount === preset && !customAmount
                            ? 'border-primary-red bg-primary-red text-white'
                            : 'border-gray-200 text-gray-700 hover:border-gray-400'
                        }`}
                      >
                        ${preset}
                      </button>
                    ))}
                  </div>

                  {/* Custom Amount */}
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-sans font-bold text-2xl text-gray-400">
                      $
                    </span>
                    <input
                      type="number"
                      placeholder="Other amount"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                        setAmount(e.target.value);
                      }}
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 font-sans text-xl text-text-dark focus:outline-none focus:border-primary-red transition"
                      min="1"
                    />
                  </div>
                </div>

                {/* Impact Message */}
                {amount && Number(amount) > 0 && (
                  <div className="bg-gray-50 border-l-4 border-primary-red p-4 mb-6">
                    <p className="font-sans text-sm text-gray-600">
                      <span className="font-bold text-gray-900">
                        ${amount}{frequency === 'monthly' ? '/month' : ''}
                      </span>
                      {' '}— {getImpactMessage(Number(amount))}
                    </p>
                  </div>
                )}

                {/* Donate Button */}
                <button
                  disabled={!amount || Number(amount) <= 0}
                  className="w-full bg-primary-red text-white px-8 py-5 font-sans font-black text-lg uppercase tracking-wide hover:bg-red-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  <span className="flex items-center justify-center gap-3">
                    Donate ${amount || '0'} {frequency === 'monthly' ? 'Monthly' : 'Now'}
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </button>

                {/* Security Note */}
                <div className="flex items-center justify-center gap-2 mt-6 text-gray-500">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  <span className="font-sans text-xs uppercase tracking-wide">Secure & Encrypted</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom accent */}
          <div className="h-1 bg-primary-red" />
        </section>

        {/* Mission Statement - Replace fake stats */}
        <section className="py-16 md:py-20 bg-white border-b border-gray-200">
          <div className="max-w-[900px] mx-auto px-8 text-center">
            <h2 className="font-display font-black text-3xl md:text-4xl text-text-dark mb-6 uppercase">
              Why We Need Your Support
            </h2>
            <p className="font-serif text-xl text-gray-700 leading-[1.8] mb-8">
              In an era of media consolidation and corporate influence, Liberty Nation remains committed
              to delivering independent news and analysis. We don't answer to advertisers or special interests
              — we answer to you, our readers. Your donation directly funds investigative journalism,
              daily reporting, and the preservation of constitutional values.
            </p>
            <div className="inline-flex items-center gap-3 text-primary-red">
              <div className="w-12 h-[2px] bg-primary-red" />
              <span className="font-sans text-xs font-bold uppercase tracking-widest">Independent Since 2017</span>
              <div className="w-12 h-[2px] bg-primary-red" />
            </div>
          </div>
        </section>

        {/* Why Support Section */}
        <section className="py-20 md:py-24 bg-bg-offwhite">
          <div className="max-w-[1100px] mx-auto px-8">
            {/* Section Header */}
            <div className="flex items-center gap-4 mb-16">
              <div className="w-16 h-[3px] bg-primary-red" />
              <h2 className="font-sans text-sm font-bold uppercase tracking-[0.2em] text-gray-600">
                Where Your Money Goes
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              {/* Card 1 */}
              <div className="group">
                <div className="w-16 h-16 bg-text-dark text-white flex items-center justify-center mb-6 group-hover:bg-primary-red transition-colors duration-300">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-display font-bold text-2xl text-gray-900 mb-4">
                  Editorial Independence
                </h3>
                <p className="font-serif text-gray-600 leading-[1.7]">
                  No corporate sponsors. No political agenda. Just honest journalism that serves you, the reader.
                </p>
              </div>

              {/* Card 2 */}
              <div className="group">
                <div className="w-16 h-16 bg-text-dark text-white flex items-center justify-center mb-6 group-hover:bg-primary-red transition-colors duration-300">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <h3 className="font-display font-bold text-2xl text-gray-900 mb-4">
                  Quality Journalism
                </h3>
                <p className="font-serif text-gray-600 leading-[1.7]">
                  Rigorous fact-checking, experienced journalists, and in-depth reporting on issues that matter.
                </p>
              </div>

              {/* Card 3 */}
              <div className="group">
                <div className="w-16 h-16 bg-text-dark text-white flex items-center justify-center mb-6 group-hover:bg-primary-red transition-colors duration-300">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                  </svg>
                </div>
                <h3 className="font-display font-bold text-2xl text-gray-900 mb-4">
                  Constitutional Values
                </h3>
                <p className="font-serif text-gray-600 leading-[1.7]">
                  Championing liberty, free speech, and the principles that made America great.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Quote Section - Replace fake testimonials */}
        <section className="py-20 md:py-24 bg-text-dark">
          <div className="max-w-[900px] mx-auto px-8">
            <div className="text-center">
              <blockquote className="relative">
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-primary-red text-9xl font-serif leading-none opacity-20">"</div>
                <p className="font-serif text-2xl md:text-3xl lg:text-4xl leading-[1.5] mb-8 relative z-10 text-white">
                  The strength of a free press lies not in its independence from the government,
                  but in its independence from special interests that would corrupt the truth.
                </p>
                <cite className="font-sans text-sm uppercase tracking-widest text-gray-400 not-italic block">
                  — The Liberty Nation Mission
                </cite>
              </blockquote>
            </div>
          </div>
        </section>

        {/* Other Ways to Support */}
        <section className="py-16 bg-white">
          <div className="max-w-[900px] mx-auto px-8 text-center">
            <h3 className="font-display font-bold text-2xl text-gray-900 mb-6">
              Other Ways to Support Us
            </h3>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/subscribe"
                className="px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 font-sans font-bold text-sm uppercase tracking-wide hover:border-primary-red hover:text-primary-red transition-all duration-200"
              >
                Subscribe to Newsletter
              </Link>
              <a
                href="https://www.youtube.com/@LibertyNationNews"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 font-sans font-bold text-sm uppercase tracking-wide hover:border-primary-red hover:text-primary-red transition-all duration-200"
              >
                Subscribe on YouTube
              </a>
              <button className="px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 font-sans font-bold text-sm uppercase tracking-wide hover:border-primary-red hover:text-primary-red transition-all duration-200">
                Share Our Articles
              </button>
            </div>
          </div>
        </section>

        {/* Tax Info */}
        <section className="bg-bg-offwhite py-8 border-t border-gray-200">
          <div className="max-w-[1200px] mx-auto px-8">
            <p className="font-sans text-sm text-gray-500 text-center leading-relaxed">
              Liberty Nation is a project of One Generation Away, a 501(c)(3) non-profit organization.
              Your donation may be tax-deductible. Consult your tax advisor for details.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
