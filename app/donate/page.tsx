'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InteriorPageHeader from '@/components/InteriorPageHeader';
import { spacing, typography, transitions } from '@/lib/design-tokens';

export default function DonatePage() {
  const [amount, setAmount] = useState('50');
  const [customAmount, setCustomAmount] = useState('');
  const [frequency, setFrequency] = useState<'once' | 'monthly'>('once');

  const presetAmounts = ['25', '50', '100', '250', '500'];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <InteriorPageHeader
        title="Support Independent Journalism"
        description="Your contribution helps us deliver independent, unbiased journalism that champions freedom and the American way of life."
        variant="black"
      />

      {/* Donation Form Section */}
      <section className={`${spacing.section.xl}`}>
        <div className="max-w-[900px] mx-auto px-8">
          {/* Impact Statement */}
          <div className="mb-16">
            <div className="relative mb-8">
              <div className="absolute inset-x-0 bottom-0 h-[3px] bg-black" />
              <h2 className="relative z-10 inline-block font-sans font-black text-3xl md:text-4xl lg:text-5xl uppercase tracking-tight pb-1">
                Make a Difference Today
              </h2>
            </div>
            <p className={`font-serif ${typography.body.lg} text-gray-700 leading-[1.8] max-w-[700px]`}>
              Every donation, no matter the size, helps us continue our mission of delivering truth without bias. Your support makes independent journalism possible.
            </p>
          </div>

          {/* Donation Card */}
          <div className="bg-white border-2 border-gray-200 p-8 md:p-12 shadow-lg">
            {/* Frequency Toggle */}
            <div className="flex gap-4 mb-8 justify-center">
              <button
                onClick={() => setFrequency('once')}
                className={`px-8 py-3 font-sans font-bold text-sm uppercase transition ${
                  frequency === 'once'
                    ? 'bg-primary-red text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                One-Time
              </button>
              <button
                onClick={() => setFrequency('monthly')}
                className={`px-8 py-3 font-sans font-bold text-sm uppercase transition ${
                  frequency === 'monthly'
                    ? 'bg-primary-red text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Monthly
              </button>
            </div>

            {/* Amount Selection */}
            <div className="mb-8">
              <h3 className="font-sans font-bold text-lg text-gray-900 mb-4 text-center">
                Select Amount
              </h3>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-4">
                {presetAmounts.map((preset) => (
                  <button
                    key={preset}
                    onClick={() => {
                      setAmount(preset);
                      setCustomAmount('');
                    }}
                    className={`py-4 font-sans font-bold text-lg transition border-2 ${
                      amount === preset && !customAmount
                        ? 'border-primary-red bg-primary-red text-white'
                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    ${preset}
                  </button>
                ))}
              </div>

              {/* Custom Amount */}
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-sans font-bold text-xl text-gray-500">
                  $
                </span>
                <input
                  type="number"
                  placeholder="Custom amount"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setAmount(e.target.value);
                  }}
                  className="w-full pl-10 pr-4 py-4 border-2 border-gray-300 font-sans text-lg focus:outline-none focus:border-primary-red transition"
                  min="1"
                />
              </div>
            </div>

            {/* Impact Message */}
            {amount && Number(amount) > 0 && (
              <div className="bg-gray-50 border border-gray-200 p-6 mb-8">
                <p className="font-sans text-gray-700 text-center">
                  {frequency === 'monthly' ? (
                    <>
                      Your ${amount}/month contribution provides{' '}
                      <span className="font-bold text-gray-900">
                        ${Number(amount) * 12} per year
                      </span>{' '}
                      to support independent journalism.
                    </>
                  ) : (
                    <>
                      Your ${amount} contribution helps fund{' '}
                      <span className="font-bold text-gray-900">
                        {Math.floor(Number(amount) / 5)} articles
                      </span>{' '}
                      of independent journalism.
                    </>
                  )}
                </p>
              </div>
            )}

            {/* Donate Button */}
            <button
              disabled={!amount || Number(amount) <= 0}
              className="w-full bg-primary-red text-white px-8 py-5 font-sans font-bold text-lg uppercase hover:bg-[#e02835] transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              Donate ${amount || '0'} {frequency === 'monthly' ? 'Monthly' : 'Now'}
            </button>

            {/* Security Note */}
            <p className="font-sans text-sm text-gray-500 text-center mt-6">
              <svg className="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              Secure payment processing. Your information is safe.
            </p>
          </div>

          {/* Alternative Support */}
          <div className="mt-12 text-center">
            <p className="font-sans text-gray-600 mb-4">
              Not ready to donate? You can still support us by:
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/subscribe"
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-sans font-bold text-sm uppercase hover:border-gray-400 transition"
              >
                Subscribe to Newsletter
              </Link>
              <button className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-sans font-bold text-sm uppercase hover:border-gray-400 transition">
                Share Our Articles
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Donate Section - Editorial Style */}
      <section className={`bg-bg-offwhite ${spacing.section.xl}`}>
        <div className="max-w-[900px] mx-auto px-8">
          <div className="relative mb-16">
            <div className="absolute inset-x-0 bottom-0 h-[3px] bg-black" />
            <h2 className="relative z-10 inline-block font-sans font-black text-3xl md:text-4xl lg:text-5xl uppercase tracking-tight pb-1">
              Why Your Support Matters
            </h2>
          </div>

          <div className="space-y-12">
            <div className="border-l-4 border-primary-red pl-8 py-2">
              <h3 className={`font-display font-bold ${typography.h2} text-gray-900 mb-4`}>
                Editorial Independence
              </h3>
              <p className={`font-serif ${typography.body.lg} text-gray-700 leading-[1.8]`}>
                Your donations allow us to remain independent from corporate interests and political pressure.
                We answer only to you, our readers, ensuring unbiased reporting on the issues that matter most to freedom-loving Americans.
              </p>
            </div>

            <div className="border-l-4 border-primary-red pl-8 py-2">
              <h3 className={`font-display font-bold ${typography.h2} text-gray-900 mb-4`}>
                Quality Journalism
              </h3>
              <p className={`font-serif ${typography.body.lg} text-gray-700 leading-[1.8]`}>
                We invest in experienced journalists, thorough research, and rigorous fact-checking.
                Every dollar supports investigative reporting that holds power accountable and brings truth to light.
              </p>
            </div>

            <div className="border-l-4 border-primary-red pl-8 py-2">
              <h3 className={`font-display font-bold ${typography.h2} text-gray-900 mb-4`}>
                Community Impact
              </h3>
              <p className={`font-serif ${typography.body.lg} text-gray-700 leading-[1.8]`}>
                Your support helps us reach more Americans with news that matters. Together, we're building
                an informed citizenry capable of defending constitutional liberty for generations to come.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className={`bg-white ${spacing.section.xl}`}>
        <div className="max-w-[900px] mx-auto px-8">
          <div className="relative mb-16">
            <div className="absolute inset-x-0 bottom-0 h-[3px] bg-black" />
            <h2 className="relative z-10 inline-block font-sans font-black text-3xl md:text-4xl lg:text-5xl uppercase tracking-tight pb-1">
              What Our Supporters Say
            </h2>
          </div>

          <div className="space-y-8">
            <blockquote className="border-l-4 border-primary-red pl-8 py-4">
              <p className={`font-serif ${typography.body.xl} text-gray-800 leading-[1.8] mb-4`}>
                "Liberty Nation provides the honest, unbiased reporting I can't find anywhere else. My monthly donation is an investment in truth."
              </p>
              <cite className="font-sans font-bold text-sm uppercase tracking-wide text-gray-600 not-italic">— Sarah M., Texas</cite>
            </blockquote>

            <blockquote className="border-l-4 border-primary-red pl-8 py-4">
              <p className={`font-serif ${typography.body.xl} text-gray-800 leading-[1.8] mb-4`}>
                "Supporting Liberty Nation means supporting real journalism. They're not afraid to ask tough questions and report the facts."
              </p>
              <cite className="font-sans font-bold text-sm uppercase tracking-wide text-gray-600 not-italic">— James R., Florida</cite>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Tax Info */}
      <section className="bg-gray-100 py-12">
        <div className="max-w-[1200px] mx-auto px-8">
          <p className="font-sans text-sm text-gray-600 text-center leading-relaxed">
            Liberty Nation is a project of One Generation Away, a 501(c)(3) non-profit organization.
            Your donation may be tax-deductible. Please consult your tax advisor.
          </p>
        </div>
      </section>
    </main>
    <Footer />
    </>
  );
}
