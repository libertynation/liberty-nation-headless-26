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

  return (
    <>
      <Header />
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
              Support Liberty Nation
            </h1>
            <p className="font-sans text-xl md:text-2xl text-gray-300 leading-relaxed">
              Your contribution helps us deliver independent, unbiased journalism that champions freedom and the American way of life.
            </p>
          </div>
        </div>
      </section>

      {/* Donation Form Section */}
      <section className="py-20">
        <div className="max-w-[900px] mx-auto px-8">
          {/* Impact Statement */}
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl text-primary-black mb-4">
              Make a Difference Today
            </h2>
            <p className="font-sans text-lg text-gray-600 max-w-[700px] mx-auto leading-relaxed">
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
              <h3 className="font-sans font-bold text-lg text-primary-black mb-4 text-center">
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
                      <span className="font-bold text-primary-black">
                        ${Number(amount) * 12} per year
                      </span>{' '}
                      to support independent journalism.
                    </>
                  ) : (
                    <>
                      Your ${amount} contribution helps fund{' '}
                      <span className="font-bold text-primary-black">
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

      {/* Why Donate Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-[1200px] mx-auto px-8">
          <h2 className="font-serif text-4xl text-primary-black mb-12 text-center">
            Why Your Support Matters
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 border border-gray-200">
              <div className="mb-4">
                <svg className="w-12 h-12 text-primary-red mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-serif text-2xl text-primary-black mb-3 text-center">
                Editorial Independence
              </h3>
              <p className="font-sans text-gray-600 text-center leading-relaxed">
                Your donations allow us to remain independent from corporate interests and political pressure, ensuring unbiased reporting.
              </p>
            </div>

            <div className="bg-white p-8 border border-gray-200">
              <div className="mb-4">
                <svg className="w-12 h-12 text-primary-red mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-serif text-2xl text-primary-black mb-3 text-center">
                Quality Journalism
              </h3>
              <p className="font-sans text-gray-600 text-center leading-relaxed">
                We invest in experienced journalists, thorough research, and fact-checking to deliver the highest quality news and analysis.
              </p>
            </div>

            <div className="bg-white p-8 border border-gray-200">
              <div className="mb-4">
                <svg className="w-12 h-12 text-primary-red mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-serif text-2xl text-primary-black mb-3 text-center">
                Community Impact
              </h3>
              <p className="font-sans text-gray-600 text-center leading-relaxed">
                Your support helps us reach more Americans with news that matters, fostering an informed and engaged citizenry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-8">
          <h2 className="font-serif text-4xl text-primary-black mb-12 text-center">
            What Our Supporters Say
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-8 border-l-4 border-primary-red">
              <p className="font-sans text-gray-700 italic mb-4 leading-relaxed">
                "Liberty Nation provides the honest, unbiased reporting I can't find anywhere else. My monthly donation is an investment in truth."
              </p>
              <p className="font-sans font-bold text-primary-black">— Sarah M., Texas</p>
            </div>

            <div className="bg-gray-50 p-8 border-l-4 border-primary-red">
              <p className="font-sans text-gray-700 italic mb-4 leading-relaxed">
                "Supporting Liberty Nation means supporting real journalism. They're not afraid to ask tough questions and report the facts."
              </p>
              <p className="font-sans font-bold text-primary-black">— James R., Florida</p>
            </div>
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
