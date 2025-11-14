'use client';

import { useState } from 'react';

export default function BriefingEmbed() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus('idle');

    // TODO: Implement actual subscription logic
    setTimeout(() => {
      setStatus('success');
      setMessage('Successfully subscribed! Check your email for confirmation.');
      setLoading(false);
      setEmail('');

      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 5000);
    }, 1500);
  };

  return (
    <div className="w-full max-w-[400px] mx-auto bg-white shadow-[0_2px_10px_rgba(0,0,0,0.1)]">
      {/* Header */}
      <div className="bg-[#040d1e] px-6 py-5 border-b-4 border-primary-red">
        <h3 className="font-serif text-white text-xl md:text-2xl text-center leading-tight">
          Your Daily Dose of Freedom
        </h3>
        <p className="font-sans text-gray-300 text-sm text-center mt-2">
          Liberty First Daily Briefing
        </p>
      </div>

      {/* Form */}
      <div className="p-6">
        {status === 'idle' && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border-2 border-[#e1e5e9] font-sans text-sm focus:outline-none focus:shadow-[0_0_0_2px_rgba(208,0,0,0.2)] transition"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#d00000] text-white px-6 py-3 font-sans font-bold text-sm uppercase hover:bg-[#b00000] transition disabled:opacity-50 disabled:cursor-not-allowed relative"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Subscribing...
                </span>
              ) : (
                'Subscribe Now'
              )}
            </button>
          </form>
        )}

        {status === 'success' && (
          <div className="bg-green-50 border-2 border-green-500 px-4 py-6 text-center">
            <svg className="w-12 h-12 text-green-500 mx-auto mb-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <p className="font-sans text-green-800 font-semibold text-sm">
              {message}
            </p>
          </div>
        )}

        {status === 'error' && (
          <div className="bg-red-50 border-2 border-red-500 px-4 py-6 text-center">
            <svg className="w-12 h-12 text-red-500 mx-auto mb-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <p className="font-sans text-red-800 font-semibold text-sm">
              {message}
            </p>
          </div>
        )}

        <p className="font-sans text-xs text-gray-500 text-center mt-4 leading-relaxed">
          Get the day's top stories delivered to your inbox every morning. Unsubscribe anytime.
        </p>
      </div>
    </div>
  );
}
