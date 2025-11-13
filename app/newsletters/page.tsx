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

      <main className="bg-bg-offwhite">
        {/* Hero Section */}
        <div className="bg-white border-b border-border-gray">
          <div className="max-w-[800px] mx-auto px-8 py-20 text-center">
            <h1 className="font-display font-bold text-5xl md:text-6xl mb-6 text-text-dark">
              Newsletters
            </h1>
            <p className="font-serif text-xl text-text-gray leading-relaxed">
              Get independent news and commentary delivered straight to your inbox
            </p>
          </div>
        </div>

        {/* Main Newsletter Signup */}
        <div className="max-w-[700px] mx-auto px-8 py-16">
          <div className="bg-white border-2 border-primary-red p-12">
            <div className="text-center mb-8">
              <div className="inline-block bg-primary-red text-white px-4 py-1 font-sans text-xs font-bold uppercase mb-4">
                Daily Newsletter
              </div>
              <h2 className="font-display font-bold text-3xl mb-4 text-text-dark">
                Liberty Nation Daily
              </h2>
              <p className="font-serif text-lg text-text-gray leading-relaxed">
                Your essential daily briefing on politics, economics, culture, and current events
                from a liberty-minded perspective
              </p>
            </div>

            {subscribed ? (
              <div className="bg-green-50 border border-green-200 p-6 rounded text-center">
                <p className="font-sans text-green-800 font-semibold mb-2 text-xl">Welcome aboard!</p>
                <p className="font-serif text-base text-green-700">
                  Check your inbox to confirm your subscription
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block font-sans text-sm font-semibold uppercase mb-3 text-text-dark">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-5 py-4 border border-border-gray font-serif text-lg focus:outline-none focus:border-primary-red transition"
                    placeholder="your.email@example.com"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary-red text-white px-6 py-4 font-sans font-bold text-sm uppercase hover:bg-[#e02835] transition"
                >
                  Subscribe Now
                </button>
                <p className="font-sans text-xs text-text-gray text-center">
                  Free. Unsubscribe anytime. No spam, we promise.
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Newsletter Features */}
        <div className="bg-white border-t border-b border-border-gray py-16">
          <div className="max-w-[1000px] mx-auto px-8">
            <h2 className="font-sans font-black text-2xl uppercase mb-10 text-center text-text-dark">
              What You'll Get
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-5xl mb-4">📰</div>
                <h3 className="font-sans font-bold text-lg mb-3 text-text-dark">Breaking News</h3>
                <p className="font-serif text-base text-text-gray leading-relaxed">
                  Stay informed with the latest developments in politics, economics, and current events
                </p>
              </div>
              <div className="text-center">
                <div className="text-5xl mb-4">💡</div>
                <h3 className="font-sans font-bold text-lg mb-3 text-text-dark">Expert Analysis</h3>
                <p className="font-serif text-base text-text-gray leading-relaxed">
                  In-depth commentary and analysis from our team of journalists and thought leaders
                </p>
              </div>
              <div className="text-center">
                <div className="text-5xl mb-4">🎯</div>
                <h3 className="font-sans font-bold text-lg mb-3 text-text-dark">Curated Content</h3>
                <p className="font-serif text-base text-text-gray leading-relaxed">
                  Hand-picked stories and insights you won't find in mainstream media
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Details */}
        <div className="max-w-[1000px] mx-auto px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Frequency & Content */}
            <div className="bg-white border border-border-gray p-8">
              <h2 className="font-sans font-black text-xl uppercase mb-6 text-text-dark">
                Delivery Schedule
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="text-primary-red text-xl mt-1">✓</div>
                  <div>
                    <h3 className="font-sans font-bold text-base mb-1 text-text-dark">Daily Briefing</h3>
                    <p className="font-serif text-sm text-text-gray">
                      Every weekday morning at 7:00 AM EST
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-primary-red text-xl mt-1">✓</div>
                  <div>
                    <h3 className="font-sans font-bold text-base mb-1 text-text-dark">Weekend Edition</h3>
                    <p className="font-serif text-sm text-text-gray">
                      Saturday morning with the week's highlights
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-primary-red text-xl mt-1">✓</div>
                  <div>
                    <h3 className="font-sans font-bold text-base mb-1 text-text-dark">Breaking Alerts</h3>
                    <p className="font-serif text-sm text-text-gray">
                      Real-time updates on major developing stories
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Why Subscribe */}
            <div className="bg-white border border-border-gray p-8">
              <h2 className="font-sans font-black text-xl uppercase mb-6 text-text-dark">
                Why Subscribe?
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="text-primary-red text-xl mt-1">✓</div>
                  <div>
                    <h3 className="font-sans font-bold text-base mb-1 text-text-dark">No Bias, Just Facts</h3>
                    <p className="font-serif text-sm text-text-gray">
                      Independent journalism free from corporate influence
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-primary-red text-xl mt-1">✓</div>
                  <div>
                    <h3 className="font-sans font-bold text-base mb-1 text-text-dark">Save Time</h3>
                    <p className="font-serif text-sm text-text-gray">
                      Get the most important news in one convenient digest
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-primary-red text-xl mt-1">✓</div>
                  <div>
                    <h3 className="font-sans font-bold text-base mb-1 text-text-dark">Free Forever</h3>
                    <p className="font-serif text-sm text-text-gray">
                      No subscription fees, no paywalls, no credit card required
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="bg-white border-t border-b border-border-gray py-16">
          <div className="max-w-[1000px] mx-auto px-8">
            <h2 className="font-sans font-black text-2xl uppercase mb-10 text-center text-text-dark">
              What Readers Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="border-l-4 border-primary-red pl-6">
                <p className="font-serif text-base text-text-gray italic mb-4 leading-relaxed">
                  "Best news briefing I've found. No agenda, just the facts and thoughtful analysis."
                </p>
                <p className="font-sans text-sm font-bold text-text-dark">— David M., Texas</p>
              </div>
              <div className="border-l-4 border-primary-red pl-6">
                <p className="font-serif text-base text-text-gray italic mb-4 leading-relaxed">
                  "Finally, a news source that respects my intelligence and values my time."
                </p>
                <p className="font-sans text-sm font-bold text-text-dark">— Sarah K., Florida</p>
              </div>
              <div className="border-l-4 border-primary-red pl-6">
                <p className="font-serif text-base text-text-gray italic mb-4 leading-relaxed">
                  "I start every morning with Liberty Nation. It's become essential reading."
                </p>
                <p className="font-sans text-sm font-bold text-text-dark">— Michael R., Ohio</p>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="bg-primary-red text-white py-16 mt-16">
          <div className="max-w-[800px] mx-auto px-8 text-center">
            <h2 className="font-sans font-black text-3xl mb-4 uppercase">Join 100,000+ Readers</h2>
            <p className="font-serif text-lg mb-6">
              Subscribe today and never miss a story that matters
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-white text-primary-red px-8 py-3 font-sans font-bold text-sm uppercase hover:bg-gray-100 transition"
            >
              Subscribe Now
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
