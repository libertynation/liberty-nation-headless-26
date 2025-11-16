import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Republishing Guidelines | Liberty Nation',
  description: 'Learn how to republish Liberty Nation content on your website or publication.',
};

export default function RepublishingGuidelinesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-primary-black text-white py-16">
          <div className="max-w-[1200px] mx-auto px-8">
            <h1 className="font-serif text-4xl md:text-5xl mb-4">
              Republishing Guidelines
            </h1>
            <p className="font-sans text-lg text-gray-300">
              How to share Liberty Nation content on your site
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="max-w-[900px] mx-auto px-8">
            <div className="bg-primary-red text-white p-8 mb-12">
              <h2 className="font-serif text-3xl mb-4">Share Our Content</h2>
              <p className="font-sans text-lg leading-relaxed">
                Liberty Nation encourages the free sharing of ideas. We welcome you to republish our articles on your website or publication, subject to the guidelines below.
              </p>
            </div>

            <div className="prose prose-lg max-w-none">
              <h2 className="font-serif text-3xl text-primary-black mb-6">What You May Republish</h2>
              <p className="font-sans text-gray-700 leading-relaxed mb-4">
                You may republish:
              </p>
              <ul className="font-sans text-gray-700 leading-relaxed mb-8 space-y-2">
                <li>Full-length articles (not excerpts)</li>
                <li>Original reporting and analysis</li>
                <li>Opinion pieces and commentary</li>
              </ul>

              <h2 className="font-serif text-3xl text-primary-black mb-6 mt-12">Requirements for Republishing</h2>

              <div className="bg-gray-50 border-2 border-gray-200 p-6 mb-6">
                <h3 className="font-sans font-bold text-xl text-primary-black mb-3">1. Attribution</h3>
                <p className="font-sans text-gray-700 leading-relaxed mb-3">
                  You must clearly credit Liberty Nation and the original author. Include this attribution at the top of the article:
                </p>
                <div className="bg-white p-4 border-l-4 border-primary-red font-mono text-sm">
                  Originally published at Liberty Nation by [Author Name]
                </div>
              </div>

              <div className="bg-gray-50 border-2 border-gray-200 p-6 mb-6">
                <h3 className="font-sans font-bold text-xl text-primary-black mb-3">2. Link Back</h3>
                <p className="font-sans text-gray-700 leading-relaxed">
                  Include a prominent link back to the original article on libertynation.com. The link should be visible at both the top and bottom of the republished article.
                </p>
              </div>

              <div className="bg-gray-50 border-2 border-gray-200 p-6 mb-6">
                <h3 className="font-sans font-bold text-xl text-primary-black mb-3">3. No Modifications</h3>
                <p className="font-sans text-gray-700 leading-relaxed">
                  Publish the full article without edits, except for minor formatting adjustments necessary for your platform. Do not change headlines, add or remove paragraphs, or modify the author's intended meaning.
                </p>
              </div>

              <div className="bg-gray-50 border-2 border-gray-200 p-6 mb-6">
                <h3 className="font-sans font-bold text-xl text-primary-black mb-3">4. Timing</h3>
                <p className="font-sans text-gray-700 leading-relaxed">
                  Wait at least 48 hours after the original publication date before republishing.
                </p>
              </div>

              <div className="bg-gray-50 border-2 border-gray-200 p-6 mb-8">
                <h3 className="font-sans font-bold text-xl text-primary-black mb-3">5. No Commercial Use</h3>
                <p className="font-sans text-gray-700 leading-relaxed">
                  Republishing is permitted for non-commercial purposes only. Contact us for commercial licensing arrangements.
                </p>
              </div>

              <h2 className="font-serif text-3xl text-primary-black mb-6 mt-12">What You May NOT Republish</h2>
              <ul className="font-sans text-gray-700 leading-relaxed mb-8 space-y-2">
                <li>Photographs, videos, or graphics (without separate permission)</li>
                <li>Content marked "All Rights Reserved"</li>
                <li>Partial articles or excerpts</li>
                <li>Modified or edited versions of our content</li>
              </ul>

              <h2 className="font-serif text-3xl text-primary-black mb-6 mt-12">Sample Attribution</h2>
              <div className="bg-gray-50 p-6 border-2 border-gray-200 mb-8">
                <p className="font-sans text-sm text-gray-600 mb-2">Proper attribution example:</p>
                <div className="bg-white p-4 border-l-4 border-primary-red">
                  <p className="font-sans text-gray-700 italic mb-2">
                    Originally published at <a href="https://libertynation.com" className="text-primary-red hover:underline">Liberty Nation</a> by John Smith
                  </p>
                  <p className="font-sans text-gray-700">
                    [Article content here...]
                  </p>
                  <p className="font-sans text-sm text-gray-600 mt-4">
                    Read the original article at <a href="#" className="text-primary-red hover:underline">libertynation.com/article-slug</a>
                  </p>
                </div>
              </div>

              <h2 className="font-serif text-3xl text-primary-black mb-6 mt-12">Questions?</h2>
              <p className="font-sans text-gray-700 leading-relaxed mb-6">
                If you have questions about republishing our content or need permission for uses not covered by these guidelines, please <a href="/contact" className="text-primary-red hover:underline">contact us</a>.
              </p>

              <div className="bg-gray-100 border-l-4 border-primary-red p-6 mt-12">
                <p className="font-sans text-sm text-gray-700">
                  For the complete republishing guidelines and special permissions,{' '}
                  <a
                    href="https://www.libertynation.com/republishing-guidelines/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-red font-bold hover:underline"
                  >
                    visit our main site
                  </a>.
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
