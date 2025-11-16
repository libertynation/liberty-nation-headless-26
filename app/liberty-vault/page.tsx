import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Liberty Vault | Liberty Nation',
  description: 'Explore founding documents, Supreme Court decisions, Federalist Papers, and historical speeches that shaped American liberty.',
};

export default function LibertyVaultPage() {
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
                The Liberty Vault
              </h1>
              <p className="font-sans text-xl md:text-2xl text-gray-300 leading-relaxed">
                Explore the founding documents, Supreme Court decisions, and historical writings that shaped American liberty.
              </p>
            </div>
          </div>
        </section>

        {/* Coming Soon Message */}
        <section className="py-20">
          <div className="max-w-[900px] mx-auto px-8 text-center">
            <div className="bg-primary-red text-white p-12 mb-8">
              <h2 className="font-serif text-4xl mb-4">
                Document Library Coming Soon
              </h2>
              <p className="font-sans text-lg leading-relaxed">
                We're building an enhanced experience for exploring America's foundational documents. In the meantime, access the Liberty Vault on the main site.
              </p>
            </div>

            <a
              href="https://www.libertynation.com/liberty-vault/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-primary-black text-white px-8 py-4 font-sans font-bold text-sm uppercase hover:bg-gray-800 transition"
            >
              Visit Liberty Vault
            </a>
          </div>
        </section>

        {/* Collections */}
        <section className="bg-gray-50 py-20">
          <div className="max-w-[1200px] mx-auto px-8">
            <h2 className="font-serif text-4xl text-primary-black mb-12 text-center">
              Featured Collections
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 border-2 border-gray-200">
                <h3 className="font-serif text-2xl text-primary-black mb-4">
                  Founding Documents
                </h3>
                <p className="font-sans text-gray-600 leading-relaxed mb-4">
                  Read the Declaration of Independence, Constitution, Bill of Rights, and other documents that established our republic.
                </p>
                <ul className="space-y-2 font-sans text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-primary-red flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Declaration of Independence
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-primary-red flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    U.S. Constitution
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-primary-red flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Bill of Rights & Amendments
                  </li>
                </ul>
              </div>

              <div className="bg-white p-8 border-2 border-gray-200">
                <h3 className="font-serif text-2xl text-primary-black mb-4">
                  Federalist Papers
                </h3>
                <p className="font-sans text-gray-600 leading-relaxed mb-4">
                  Explore the essays that explained and defended the Constitution during the ratification debates.
                </p>
                <ul className="space-y-2 font-sans text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-primary-red flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    All 85 Federalist Papers
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-primary-red flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Writings by Hamilton, Madison, & Jay
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-primary-red flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Historical context & analysis
                  </li>
                </ul>
              </div>

              <div className="bg-white p-8 border-2 border-gray-200">
                <h3 className="font-serif text-2xl text-primary-black mb-4">
                  Supreme Court Decisions
                </h3>
                <p className="font-sans text-gray-600 leading-relaxed mb-4">
                  Landmark Supreme Court cases that interpreted the Constitution and shaped American law.
                </p>
                <ul className="space-y-2 font-sans text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-primary-red flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Landmark constitutional cases
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-primary-red flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Full opinions & dissents
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-primary-red flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Historical significance explained
                  </li>
                </ul>
              </div>

              <div className="bg-white p-8 border-2 border-gray-200">
                <h3 className="font-serif text-2xl text-primary-black mb-4">
                  Historic Speeches
                </h3>
                <p className="font-sans text-gray-600 leading-relaxed mb-4">
                  Read powerful speeches that inspired Americans and defended liberty throughout our history.
                </p>
                <ul className="space-y-2 font-sans text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-primary-red flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Presidential addresses
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-primary-red flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Founding era orations
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-primary-red flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Civil rights milestones
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
