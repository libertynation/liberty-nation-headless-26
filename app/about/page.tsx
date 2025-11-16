import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { spacing, typography, transitions } from '@/lib/design-tokens';

export const metadata: Metadata = {
  title: 'About Us - Liberty Nation',
  description: 'Learn about Liberty Nation\'s commitment to free thinking, free speech, and independent journalism.',
};

export default function AboutPage() {
  return (
    <>
      <Header />

      <main className="bg-bg-offwhite">
        {/* Hero Section */}
        <div className={`bg-black text-white ${spacing.section.xl}`}>
          <div className="max-w-[900px] mx-auto px-8 text-center">
            <h1 className={`font-serif font-bold ${typography.display.hero} mb-8 leading-[1.05]`}>
              About Liberty Nation
            </h1>
            <p className={`font-serif ${typography.body.xl} text-gray-300 leading-[1.7] max-w-[700px] mx-auto`}>
              Free thinking. Free speech. Independent journalism for the liberty-minded.
            </p>
          </div>
        </div>

        {/* Mission Statement */}
        <div className={`max-w-[900px] mx-auto px-8 ${spacing.section.xl}`}>
          <div className="border-l-4 border-primary-red pl-8 py-2">
            <h2 className={`font-serif font-bold ${typography.h2} text-text-dark mb-6`}>
              Our Mission
            </h2>
            <div className={`font-serif ${typography.body.lg} text-gray-700 leading-[1.8] space-y-6`}>
              <p>
                Liberty Nation was founded on the principle that Americans deserve news and commentary
                free from the constraints of political correctness and mainstream media bias. We believe
                in the fundamental values of individual liberty, free markets, and limited government.
              </p>
              <p>
                Our team of journalists, analysts, and commentators brings you in-depth coverage of politics,
                economics, culture, and current events from a perspective that champions personal freedom and
                constitutional principles.
              </p>
              <p>
                We are committed to rigorous reporting, thoughtful analysis, and fearless commentary. Whether
                you're looking for breaking news, investigative journalism, or insightful opinion pieces,
                Liberty Nation delivers content that respects your intelligence and values your freedom.
              </p>
            </div>
          </div>
        </div>

        {/* Editorial Standards */}
        <div className={`bg-bg-offwhite ${spacing.section.xl}`}>
          <div className="max-w-[900px] mx-auto px-8">
            <div className="relative mb-16">
              <div className="absolute inset-x-0 bottom-0 h-[3px] bg-black" />
              <h2 className="relative z-10 inline-block font-sans font-black text-3xl md:text-4xl lg:text-5xl uppercase tracking-tight pb-1">
                Editorial Standards
              </h2>
            </div>
            <div className="space-y-8">
              <div className="border-l-4 border-primary-red pl-8 py-2">
                <h3 className={`font-serif font-bold ${typography.h2} text-text-dark mb-3`}>Accuracy</h3>
                <p className={`font-serif ${typography.body.lg} text-gray-700 leading-[1.8]`}>
                  We are committed to factual reporting and transparent sourcing. All claims are verified
                  and supported by credible sources.
                </p>
              </div>
              <div className="border-l-4 border-primary-red pl-8 py-2">
                <h3 className={`font-serif font-bold ${typography.h2} text-text-dark mb-3`}>Independence</h3>
                <p className={`font-serif ${typography.body.lg} text-gray-700 leading-[1.8]`}>
                  Our editorial decisions are driven by newsworthiness and reader interest, not political
                  agenda or corporate influence.
                </p>
              </div>
              <div className="border-l-4 border-primary-red pl-8 py-2">
                <h3 className={`font-serif font-bold ${typography.h2} text-text-dark mb-3`}>Integrity</h3>
                <p className={`font-serif ${typography.body.lg} text-gray-700 leading-[1.8]`}>
                  We clearly distinguish between news reporting and opinion commentary. Our journalists
                  adhere to the highest ethical standards.
                </p>
              </div>
              <div className="border-l-4 border-primary-red pl-8 py-2">
                <h3 className={`font-serif font-bold ${typography.h2} text-text-dark mb-3`}>Transparency</h3>
                <p className={`font-serif ${typography.body.lg} text-gray-700 leading-[1.8]`}>
                  We are open about our editorial process and welcome feedback from our readers.
                  Corrections are made promptly and clearly noted.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className={`max-w-[900px] mx-auto px-8 ${spacing.section.xl}`}>
          <div className="relative mb-16">
            <div className="absolute inset-x-0 bottom-0 h-[3px] bg-black" />
            <h2 className="relative z-10 inline-block font-sans font-black text-3xl md:text-4xl lg:text-5xl uppercase tracking-tight pb-1">
              What We Stand For
            </h2>
          </div>
          <div className="space-y-8">
            <div className="border-l-4 border-primary-red pl-8 py-2">
              <h3 className={`font-serif font-bold ${typography.h2} text-text-dark mb-3`}>Individual Liberty</h3>
              <p className={`font-serif ${typography.body.lg} text-gray-700 leading-[1.8]`}>
                We believe in the fundamental rights of individuals to make their own choices and
                live free from government overreach.
              </p>
            </div>
            <div className="border-l-4 border-primary-red pl-8 py-2">
              <h3 className={`font-serif font-bold ${typography.h2} text-text-dark mb-3`}>Free Speech</h3>
              <p className={`font-serif ${typography.body.lg} text-gray-700 leading-[1.8]`}>
                We champion the First Amendment and defend the right to express unpopular opinions
                without fear of censorship.
              </p>
            </div>
            <div className="border-l-4 border-primary-red pl-8 py-2">
              <h3 className={`font-serif font-bold ${typography.h2} text-text-dark mb-3`}>Independent Media</h3>
              <p className={`font-serif ${typography.body.lg} text-gray-700 leading-[1.8]`}>
                We operate free from corporate control and political party influence, answering only
                to our readers.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className={`bg-primary-red text-white ${spacing.section.xl}`}>
          <div className="max-w-[900px] mx-auto px-8 text-center">
            <h2 className={`font-serif font-bold ${typography.h2} mb-6 text-white`}>Join Our Community</h2>
            <p className={`font-serif ${typography.body.lg} mb-8 text-white leading-[1.8]`}>
              Stay informed with independent news and commentary delivered daily to your inbox
            </p>
            <button className="bg-white text-primary-red px-8 py-4 font-sans font-bold text-sm uppercase hover:bg-gray-100 transition">
              Subscribe Now
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
