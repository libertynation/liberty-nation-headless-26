import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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
        <div className="bg-white border-b border-border-gray">
          <div className="max-w-[800px] mx-auto px-8 py-20 text-center">
            <h1 className="font-display font-bold text-5xl md:text-6xl mb-6 text-text-dark">
              About Liberty Nation
            </h1>
            <p className="font-serif text-xl text-text-gray leading-relaxed">
              Free thinking. Free speech. Independent journalism for the liberty-minded.
            </p>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="max-w-[800px] mx-auto px-8 py-16">
          <div className="bg-white border border-border-gray p-12">
            <h2 className="font-sans font-black text-2xl uppercase mb-6 text-text-dark">
              Our Mission
            </h2>
            <div className="font-serif text-lg text-text-dark leading-relaxed space-y-4">
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
        <div className="bg-white border-t border-b border-border-gray py-16">
          <div className="max-w-[800px] mx-auto px-8">
            <h2 className="font-sans font-black text-2xl uppercase mb-6 text-text-dark">
              Editorial Standards
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-sans font-bold text-lg mb-3 text-text-dark">Accuracy</h3>
                <p className="font-serif text-base text-text-gray leading-relaxed">
                  We are committed to factual reporting and transparent sourcing. All claims are verified
                  and supported by credible sources.
                </p>
              </div>
              <div>
                <h3 className="font-sans font-bold text-lg mb-3 text-text-dark">Independence</h3>
                <p className="font-serif text-base text-text-gray leading-relaxed">
                  Our editorial decisions are driven by newsworthiness and reader interest, not political
                  agenda or corporate influence.
                </p>
              </div>
              <div>
                <h3 className="font-sans font-bold text-lg mb-3 text-text-dark">Integrity</h3>
                <p className="font-serif text-base text-text-gray leading-relaxed">
                  We clearly distinguish between news reporting and opinion commentary. Our journalists
                  adhere to the highest ethical standards.
                </p>
              </div>
              <div>
                <h3 className="font-sans font-bold text-lg mb-3 text-text-dark">Transparency</h3>
                <p className="font-serif text-base text-text-gray leading-relaxed">
                  We are open about our editorial process and welcome feedback from our readers.
                  Corrections are made promptly and clearly noted.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="max-w-[1200px] mx-auto px-8 py-16">
          <h2 className="font-sans font-black text-2xl uppercase mb-10 text-center text-text-dark">
            What We Stand For
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border border-border-gray p-8 text-center">
              <div className="text-4xl mb-4">🗽</div>
              <h3 className="font-sans font-bold text-lg mb-3 text-text-dark">Individual Liberty</h3>
              <p className="font-serif text-base text-text-gray leading-relaxed">
                We believe in the fundamental rights of individuals to make their own choices and
                live free from government overreach.
              </p>
            </div>
            <div className="bg-white border border-border-gray p-8 text-center">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="font-sans font-bold text-lg mb-3 text-text-dark">Free Speech</h3>
              <p className="font-serif text-base text-text-gray leading-relaxed">
                We champion the First Amendment and defend the right to express unpopular opinions
                without fear of censorship.
              </p>
            </div>
            <div className="bg-white border border-border-gray p-8 text-center">
              <div className="text-4xl mb-4">📰</div>
              <h3 className="font-sans font-bold text-lg mb-3 text-text-dark">Independent Media</h3>
              <p className="font-serif text-base text-text-gray leading-relaxed">
                We operate free from corporate control and political party influence, answering only
                to our readers.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-primary-red text-white py-16 mt-16">
          <div className="max-w-[800px] mx-auto px-8 text-center">
            <h2 className="font-sans font-black text-3xl mb-4 uppercase">Join Our Community</h2>
            <p className="font-serif text-lg mb-6">
              Stay informed with independent news and commentary delivered daily to your inbox
            </p>
            <button className="bg-white text-primary-red px-8 py-3 font-sans font-bold text-sm uppercase hover:bg-gray-100 transition">
              Subscribe Now
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
