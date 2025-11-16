import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'LNTV | Liberty Nation',
  description: 'Watch Liberty Nation TV - original video content covering politics, economy, and current events from a libertarian perspective.',
};

export default function LNTVPage() {
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
                Liberty Nation TV
              </h1>
              <p className="font-sans text-xl md:text-2xl text-gray-300 leading-relaxed">
                Original video content covering politics, economics, and current events from a libertarian perspective.
              </p>
            </div>
          </div>
        </section>

        {/* Coming Soon Message */}
        <section className="py-20">
          <div className="max-w-[900px] mx-auto px-8 text-center">
            <div className="bg-primary-red text-white p-12 mb-8">
              <h2 className="font-serif text-4xl mb-4">
                Video Content Coming Soon
              </h2>
              <p className="font-sans text-lg leading-relaxed">
                We're building an enhanced video experience. In the meantime, watch our latest videos on the main Liberty Nation site.
              </p>
            </div>

            <a
              href="https://www.libertynation.com/lntv/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-primary-black text-white px-8 py-4 font-sans font-bold text-sm uppercase hover:bg-gray-800 transition"
            >
              Watch on Liberty Nation
            </a>
          </div>
        </section>

        {/* Featured Programs */}
        <section className="bg-gray-50 py-20">
          <div className="max-w-[1200px] mx-auto px-8">
            <h2 className="font-serif text-4xl text-primary-black mb-12 text-center">
              Popular Programs
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 border-2 border-gray-200">
                <h3 className="font-serif text-2xl text-primary-black mb-3">
                  The Conservative Five
                </h3>
                <p className="font-sans text-gray-600 leading-relaxed mb-4">
                  Daily analysis of the top conservative stories and political developments.
                </p>
              </div>

              <div className="bg-white p-8 border-2 border-gray-200">
                <h3 className="font-serif text-2xl text-primary-black mb-3">
                  Swamponomics
                </h3>
                <p className="font-sans text-gray-600 leading-relaxed mb-4">
                  Deep dives into economic policy, government spending, and fiscal responsibility.
                </p>
              </div>

              <div className="bg-white p-8 border-2 border-gray-200">
                <h3 className="font-serif text-2xl text-primary-black mb-3">
                  LN Radio Videocasts
                </h3>
                <p className="font-sans text-gray-600 leading-relaxed mb-4">
                  Video versions of our popular radio shows and exclusive segments.
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
