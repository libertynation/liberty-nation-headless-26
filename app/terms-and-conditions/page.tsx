import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { spacing } from '@/lib/design-tokens';

export const metadata: Metadata = {
  title: 'Terms and Conditions | Liberty Nation',
  description: 'Read the terms and conditions for using Liberty Nation website and services.',
};

export default function TermsAndConditionsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className={`bg-black text-white ${spacing.section.lg}`}>
          <div className="max-w-[1200px] mx-auto px-8">
            <h1 className="font-serif text-4xl md:text-5xl mb-4">
              Terms and Conditions
            </h1>
            <p className="font-sans text-lg text-gray-300">
              Please read these terms carefully before using our website
            </p>
          </div>
        </section>

        {/* Content */}
        <section className={spacing.section.xl}>
          <div className="max-w-[900px] mx-auto px-8">
            <div className="prose prose-lg max-w-none">
              <h2 className="font-serif text-3xl text-primary-black mb-6">Acceptance of Terms</h2>
              <p className="font-sans text-gray-700 leading-relaxed mb-6">
                By accessing and using the Liberty Nation website, you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our website.
              </p>

              <h2 className="font-serif text-3xl text-primary-black mb-6 mt-12">Use of Content</h2>
              <p className="font-sans text-gray-700 leading-relaxed mb-4">
                All content on Liberty Nation, including articles, videos, images, and other materials, is protected by copyright and other intellectual property laws. You may:
              </p>
              <ul className="font-sans text-gray-700 leading-relaxed mb-6 space-y-2">
                <li>Read and share our articles for personal, non-commercial use</li>
                <li>Link to our content from other websites</li>
                <li>Republish content according to our <a href="/republishing-guidelines" className="text-primary-red hover:underline">republishing guidelines</a></li>
              </ul>

              <p className="font-sans text-gray-700 leading-relaxed mb-6">
                You may not modify, reproduce, or distribute our content without permission, except as allowed by our republishing guidelines.
              </p>

              <h2 className="font-serif text-3xl text-primary-black mb-6 mt-12">User Conduct</h2>
              <p className="font-sans text-gray-700 leading-relaxed mb-4">
                When using our website, you agree not to:
              </p>
              <ul className="font-sans text-gray-700 leading-relaxed mb-6 space-y-2">
                <li>Violate any applicable laws or regulations</li>
                <li>Harass, abuse, or harm other users</li>
                <li>Submit false or misleading information</li>
                <li>Interfere with the website's security features</li>
                <li>Attempt to gain unauthorized access to our systems</li>
              </ul>

              <h2 className="font-serif text-3xl text-primary-black mb-6 mt-12">Disclaimer of Warranties</h2>
              <p className="font-sans text-gray-700 leading-relaxed mb-6">
                Our website and content are provided "as is" without warranties of any kind. We strive for accuracy but cannot guarantee that all information is complete, current, or error-free.
              </p>

              <h2 className="font-serif text-3xl text-primary-black mb-6 mt-12">Limitation of Liability</h2>
              <p className="font-sans text-gray-700 leading-relaxed mb-6">
                Liberty Nation shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the website.
              </p>

              <h2 className="font-serif text-3xl text-primary-black mb-6 mt-12">Third-Party Links</h2>
              <p className="font-sans text-gray-700 leading-relaxed mb-6">
                Our website may contain links to third-party websites. We are not responsible for the content, privacy policies, or practices of these external sites.
              </p>

              <h2 className="font-serif text-3xl text-primary-black mb-6 mt-12">Changes to Terms</h2>
              <p className="font-sans text-gray-700 leading-relaxed mb-6">
                We reserve the right to modify these terms at any time. Continued use of the website after changes constitutes acceptance of the modified terms.
              </p>

              <h2 className="font-serif text-3xl text-primary-black mb-6 mt-12">Governing Law</h2>
              <p className="font-sans text-gray-700 leading-relaxed mb-6">
                These terms shall be governed by and construed in accordance with the laws of the United States.
              </p>

              <h2 className="font-serif text-3xl text-primary-black mb-6 mt-12">Contact Information</h2>
              <p className="font-sans text-gray-700 leading-relaxed mb-6">
                If you have questions about these Terms and Conditions, please contact us through our <a href="/contact" className="text-primary-red hover:underline">contact page</a>.
              </p>

              <div className="bg-gray-100 border-l-4 border-primary-red p-6 mt-12">
                <p className="font-sans text-sm text-gray-700">
                  For the complete and legally binding version of our Terms and Conditions,{' '}
                  <a
                    href="https://www.libertynation.com/terms-and-conditions/"
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
