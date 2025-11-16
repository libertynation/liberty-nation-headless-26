import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy | Liberty Nation',
  description: 'Read our privacy policy to understand how Liberty Nation collects, uses, and protects your personal information.',
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-primary-black text-white py-16">
          <div className="max-w-[1200px] mx-auto px-8">
            <h1 className="font-serif text-4xl md:text-5xl mb-4">
              Privacy Policy
            </h1>
            <p className="font-sans text-lg text-gray-300">
              Last updated: February 19, 2021
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="max-w-[900px] mx-auto px-8">
            <div className="prose prose-lg max-w-none">
              <h2 className="font-serif text-3xl text-primary-black mb-6">Overview</h2>
              <p className="font-sans text-gray-700 leading-relaxed mb-6">
                Liberty Nation respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website.
              </p>

              <h2 className="font-serif text-3xl text-primary-black mb-6 mt-12">Data Collection & Use</h2>
              <p className="font-sans text-gray-700 leading-relaxed mb-4">
                We process only minimal user data, only as much as is absolutely necessary to maintain our services. Personal information collected includes:
              </p>
              <ul className="font-sans text-gray-700 leading-relaxed mb-6 space-y-2">
                <li>Contact details (email address) when you subscribe to our newsletter</li>
                <li>Account credentials if you create an account</li>
                <li>Usage data to improve our services</li>
              </ul>

              <h2 className="font-serif text-3xl text-primary-black mb-6 mt-12">Your Rights</h2>
              <p className="font-sans text-gray-700 leading-relaxed mb-4">
                You have the right to:
              </p>
              <ul className="font-sans text-gray-700 leading-relaxed mb-6 space-y-2">
                <li>Access your personal data</li>
                <li>Request corrections to your data</li>
                <li>Request erasure of your data</li>
                <li>Withdraw consent at any time</li>
                <li>Object to data processing</li>
              </ul>

              <h2 className="font-serif text-3xl text-primary-black mb-6 mt-12">Data Protection</h2>
              <p className="font-sans text-gray-700 leading-relaxed mb-6">
                We maintain reasonable administrative, technical, and physical safeguards to protect your personal information. However, please note that no internet transmission is completely secure.
              </p>

              <h2 className="font-serif text-3xl text-primary-black mb-6 mt-12">Cookies</h2>
              <p className="font-sans text-gray-700 leading-relaxed mb-6">
                We use cookies to personalize your experience and analyze site traffic. You can control cookie settings through your browser preferences.
              </p>

              <h2 className="font-serif text-3xl text-primary-black mb-6 mt-12">Third-Party Sharing</h2>
              <p className="font-sans text-gray-700 leading-relaxed mb-6">
                We may share information with trusted service providers who assist us in operating our website and conducting our business. We do not sell your personal information to third parties.
              </p>

              <h2 className="font-serif text-3xl text-primary-black mb-6 mt-12">Children's Privacy</h2>
              <p className="font-sans text-gray-700 leading-relaxed mb-6">
                Our website does not knowingly collect information from children under 13 years of age.
              </p>

              <h2 className="font-serif text-3xl text-primary-black mb-6 mt-12">Contact Us</h2>
              <p className="font-sans text-gray-700 leading-relaxed mb-6">
                If you have questions about this Privacy Policy, please contact us through our <a href="/contact" className="text-primary-red hover:underline">contact page</a>.
              </p>

              <div className="bg-gray-100 border-l-4 border-primary-red p-6 mt-12">
                <p className="font-sans text-sm text-gray-700">
                  For the complete and legally binding version of our Privacy Policy,{' '}
                  <a
                    href="https://www.libertynation.com/privacy-policy/"
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
