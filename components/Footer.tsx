'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-primary-black text-white">
      {/* Newsletter Signup Section */}
      <div className="border-b border-gray-800 relative overflow-hidden">
        {/* Subtle dot pattern background */}
        <div className="absolute inset-0 opacity-[0.08]" style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }} />

        <div className="max-w-[1400px] mx-auto px-8 py-16 relative z-10">
          <div className="max-w-[700px] mx-auto text-center">
            <h3 className="font-sans font-black text-white text-4xl md:text-5xl uppercase mb-4 leading-tight tracking-tight">
              Get the latest news and analysis delivered to your inbox
            </h3>
            <form className="flex flex-col sm:flex-row gap-3 mt-8">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 bg-white/10 border-2 border-gray-700 text-white placeholder-gray-500 font-sans text-base focus:outline-none focus:border-primary-red transition-all duration-300"
                required
              />
              <button
                type="submit"
                className="bg-primary-red text-white px-10 py-4 font-sans font-black text-base uppercase hover:bg-[#e02835] transition-all duration-300 whitespace-nowrap shadow-lg hover:scale-105"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Navigation */}
      <div className="border-b border-gray-800">
        <div className="max-w-[1400px] mx-auto px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {/* Column 1: Liberty Nation News */}
            <div>
              <h4 className="font-sans font-black text-xs uppercase mb-4 tracking-wider">Liberty Nation News</h4>
              <nav className="space-y-2">
                <Link href="/about-us" className="block font-sans text-sm text-gray-400 hover:text-white transition">
                  About Us
                </Link>
                <Link href="/authors" className="block font-sans text-sm text-gray-400 hover:text-white transition">
                  Our Authors
                </Link>
                <Link href="/contact-us" className="block font-sans text-sm text-gray-400 hover:text-white transition">
                  Contact Us
                </Link>
                <Link href="/submissions" className="block font-sans text-sm text-gray-400 hover:text-white transition">
                  Submissions
                </Link>
                <Link href="/republishing-guidelines" className="block font-sans text-sm text-gray-400 hover:text-white transition">
                  Republishing Guidelines
                </Link>
              </nav>
            </div>

            {/* Column 2: Topics */}
            <div>
              <h4 className="font-sans font-black text-xs uppercase mb-4 tracking-wider">Topics</h4>
              <nav className="space-y-2">
                <Link href="/politics" className="block font-sans text-sm text-gray-400 hover:text-white transition">
                  Politics
                </Link>
                <Link href="/business" className="block font-sans text-sm text-gray-400 hover:text-white transition">
                  Business
                </Link>
                <Link href="/culture" className="block font-sans text-sm text-gray-400 hover:text-white transition">
                  Culture
                </Link>
                <Link href="/economy" className="block font-sans text-sm text-gray-400 hover:text-white transition">
                  Economy
                </Link>
                <Link href="/education" className="block font-sans text-sm text-gray-400 hover:text-white transition">
                  Education
                </Link>
                <Link href="/international" className="block font-sans text-sm text-gray-400 hover:text-white transition">
                  International
                </Link>
                <Link href="/law" className="block font-sans text-sm text-gray-400 hover:text-white transition">
                  Law
                </Link>
                <Link href="/ln-genz" className="block font-sans text-sm text-gray-400 hover:text-white transition">
                  LN GenZ
                </Link>
              </nav>
            </div>

            {/* Column 3: Features */}
            <div>
              <h4 className="font-sans font-black text-xs uppercase mb-4 tracking-wider">Features</h4>
              <nav className="space-y-2">
                <Link href="/lntv" className="block font-sans text-sm text-gray-400 hover:text-white transition">
                  Liberty Nation TV
                </Link>
                <Link href="/podcasts" className="block font-sans text-sm text-gray-400 hover:text-white transition">
                  Podcasts
                </Link>
                <Link href="/newsletters" className="block font-sans text-sm text-gray-400 hover:text-white transition">
                  Newsletters
                </Link>
                <Link href="/subscribe-now" className="block font-sans text-sm text-gray-400 hover:text-white transition">
                  Subscribe Now!
                </Link>
                <Link href="/donate" className="block font-sans text-sm text-gray-400 hover:text-white transition">
                  Donate
                </Link>
              </nav>
            </div>

            {/* Column 4: Legal */}
            <div>
              <h4 className="font-sans font-black text-xs uppercase mb-4 tracking-wider">Legal</h4>
              <nav className="space-y-2">
                <Link href="/privacy-policy" className="block font-sans text-sm text-gray-400 hover:text-white transition">
                  Privacy Policy
                </Link>
                <Link href="/terms-and-conditions" className="block font-sans text-sm text-gray-400 hover:text-white transition">
                  Terms and Conditions
                </Link>
                <Link href="/login" className="block font-sans text-sm text-gray-400 hover:text-white transition">
                  Login
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Legal Links Bar */}
      <div className="border-b border-gray-800">
        <div className="max-w-[1400px] mx-auto px-8 py-4">
          <div className="flex flex-wrap gap-6 justify-center text-xs">
            <Link href="/privacy-policy" className="font-sans text-gray-500 hover:text-white transition">
              Privacy Policy
            </Link>
            <span className="text-gray-700">|</span>
            <Link href="/terms" className="font-sans text-gray-500 hover:text-white transition">
              Terms of Service
            </Link>
            <span className="text-gray-700">|</span>
            <Link href="/editorial-guidelines" className="font-sans text-gray-500 hover:text-white transition">
              Editorial Guidelines
            </Link>
            <span className="text-gray-700">|</span>
            <Link href="/corrections" className="font-sans text-gray-500 hover:text-white transition">
              Corrections
            </Link>
          </div>
        </div>
      </div>

      {/* Copyright and Social Media Bar */}
      <div className="py-6">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="font-sans text-xs text-gray-500">
              © {new Date().getFullYear()} A Project of One Generation Away | Designed & Managed by KMAAC
            </p>

            {/* Social Media Icons */}
            <div className="flex gap-4">
              <a
                href="https://twitter.com/libertynation"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-primary-red transition"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href="https://facebook.com/libertynation"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-primary-red transition"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 3.667h-3.533v7.98H9.101z"/>
                </svg>
              </a>
              <a
                href="https://youtube.com/@libertynation"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-primary-red transition"
                aria-label="YouTube"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a
                href="https://instagram.com/libertynation"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-primary-red transition"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
