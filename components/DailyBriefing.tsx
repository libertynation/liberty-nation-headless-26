'use client';

import { useState } from 'react';

export default function DailyBriefing() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for subscribing to the Liberty Nation Daily Briefing!');
    setEmail('');
  };

  return (
    <div className="bg-white border-2 border-primary-red rounded-lg p-8 text-center">
      <h3 className="font-heading text-2xl font-black uppercase mb-2 flex items-center justify-center gap-2">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="4" width="20" height="16" rx="2"></rect>
          <path d="m22 7-10 5L2 7"></path>
        </svg>
        Daily Briefing
      </h3>
      <p className="font-body text-base text-text-gray mb-6">
        Get the day&apos;s top stories delivered to your inbox
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="flex-1 px-3 py-3 border-2 border-border-gray rounded font-heading text-sm focus:outline-none focus:border-primary-red transition"
        />
        <button
          type="submit"
          className="bg-primary-red text-white px-6 py-3 rounded font-heading font-bold text-sm hover:bg-red-700 transition"
        >
          Subscribe Now
        </button>
      </form>
      <p className="font-heading text-xs text-text-gray font-semibold tracking-wide">
        Free thinking. Free speech. Delivered daily.
      </p>
    </div>
  );
}
