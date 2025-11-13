import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <>
      <Header />
      <div className="min-h-[60vh] flex items-center justify-center px-4 bg-bg-offwhite">
        <div className="text-center max-w-2xl">
          <h1 className="font-display text-9xl font-black text-primary-red mb-4">404</h1>
          <h2 className="font-display text-3xl font-black uppercase mb-4">Page Not Found</h2>
          <p className="font-serif text-lg text-text-gray mb-8 leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
            It might have been removed, renamed, or is temporarily unavailable.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/"
              className="inline-block bg-primary-red text-white px-8 py-3 font-sans font-bold text-sm tracking-widest uppercase hover:bg-[#e02835] transition"
            >
              Back to Home
            </Link>
            <Link
              href="/search"
              className="inline-block bg-black text-white px-8 py-3 font-sans font-bold text-sm tracking-widest uppercase hover:bg-gray-800 transition"
            >
              Search
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
