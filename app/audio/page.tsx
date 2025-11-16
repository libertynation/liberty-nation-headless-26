import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'LN Radio | Liberty Nation',
  description: 'Listen to Liberty Nation Radio - podcasts and audio content covering politics, liberty, and American values.',
};

export default function AudioPage() {
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
            <div className="max-w-[900px] mx-auto text-center">
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl mb-6">
                Liberty Nation Radio
              </h1>
              <p className="font-sans text-xl md:text-2xl text-gray-300 leading-relaxed">
                Podcasts and audio content covering politics, liberty, and American values.
              </p>
            </div>
          </div>
        </section>

        {/* Coming Soon Message */}
        <section className="py-20">
          <div className="max-w-[900px] mx-auto px-8 text-center">
            <div className="bg-primary-red text-white p-12 mb-8">
              <h2 className="font-serif text-4xl mb-4">
                Audio Content Coming Soon
              </h2>
              <p className="font-sans text-lg leading-relaxed">
                We're building an enhanced audio experience. In the meantime, listen to our latest podcasts on the main Liberty Nation site.
              </p>
            </div>

            <a
              href="https://www.libertynation.com/audio/ln-radio/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-primary-black text-white px-8 py-4 font-sans font-bold text-sm uppercase hover:bg-gray-800 transition"
            >
              Listen on Liberty Nation
            </a>
          </div>
        </section>

        {/* Features */}
        <section className="bg-gray-50 py-20">
          <div className="max-w-[1200px] mx-auto px-8">
            <h2 className="font-serif text-4xl text-primary-black mb-12 text-center">
              What to Expect
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 border-2 border-gray-200 text-center">
                <div className="mb-4">
                  <svg className="w-16 h-16 text-primary-red mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl text-primary-black mb-3">
                  Daily Shows
                </h3>
                <p className="font-sans text-gray-600 leading-relaxed">
                  Regular podcasts covering the day's most important news and analysis.
                </p>
              </div>

              <div className="bg-white p-8 border-2 border-gray-200 text-center">
                <div className="mb-4">
                  <svg className="w-16 h-16 text-primary-red mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl text-primary-black mb-3">
                  Expert Guests
                </h3>
                <p className="font-sans text-gray-600 leading-relaxed">
                  Interviews with leading voices in politics, economics, and culture.
                </p>
              </div>

              <div className="bg-white p-8 border-2 border-gray-200 text-center">
                <div className="mb-4">
                  <svg className="w-16 h-16 text-primary-red mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl text-primary-black mb-3">
                  Breaking Updates
                </h3>
                <p className="font-sans text-gray-600 leading-relaxed">
                  Special episodes for major breaking news and developing stories.
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
