'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SecretArea from './SecretArea';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [searchMode, setSearchMode] = useState<'search' | 'author'>('search');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          // Hysteresis: switch to scrolled at 80px, switch back at 40px
          // This prevents jittery behavior at the threshold
          if (scrollY > 80) {
            setIsScrolled(true);
          } else if (scrollY < 40) {
            setIsScrolled(false);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Disable body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <>
      {/* Menu Overlay with Secret Area */}
      <div
        className={`fixed inset-0 z-[2000] transition-all duration-500 ease-out ${
          menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        {/* Left side overlay - clickable to close */}
        <div
          className="absolute inset-0 bg-black/85"
          onClick={() => setMenuOpen(false)}
        />

        {/* Right side - Secret Area (starts after sidebar) */}
        <div className="absolute top-0 left-[85vw] sm:left-[420px] right-0 bottom-0">
          <SecretArea />
        </div>
      </div>

      {/* Slide-out Menu */}
      <div
        className={`fixed top-0 left-0 w-[85vw] sm:w-[420px] max-w-[420px] h-full bg-black z-[2001] overflow-y-auto transition-all duration-500 ease-out shadow-xl flex flex-col ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header at Top */}
        <div className="p-6 pb-8 border-b border-white/10">
          <div className="pr-12">
            <Link href="/" onClick={() => setMenuOpen(false)} className="block">
              <div className="relative w-full h-[60px]">
                <Image
                  src="/white_logo.png"
                  alt="Liberty Nation News"
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>
            </Link>
          </div>
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-5 right-5 text-white hover:text-primary-red transition"
            aria-label="Close menu"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="px-6 flex-1 flex flex-col">
          {/* SEARCH / AUTHOR COMMAND - At Top */}
          <div className="mb-8 pt-8">
            <div className="relative">
              {/* Toggle Icon - Left side */}
              <button
                onClick={() => setSearchMode(searchMode === 'search' ? 'author' : 'search')}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition z-10"
                aria-label={searchMode === 'search' ? 'Switch to authors' : 'Switch to search'}
              >
                {searchMode === 'search' ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                )}
              </button>

              {/* Input/Select Area */}
              {searchMode === 'search' ? (
                <form className="relative" onSubmit={(e) => { e.preventDefault(); /* handle search */ }}>
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white/5 border-2 border-white/10 font-sans text-base text-white placeholder:text-gray-500 focus:outline-none focus:border-primary-red transition rounded-sm"
                  />
                </form>
              ) : (
                <select
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border-2 border-white/10 font-sans text-base text-white focus:outline-none focus:border-primary-red appearance-none cursor-pointer transition rounded-sm"
                  onChange={(e) => { if (e.target.value) window.location.href = e.target.value; }}
                  defaultValue=""
                >
                  <option value="" className="bg-black">Select an author...</option>
                  <option value="https://www.libertynation.com/author/leesa-k-donner/" className="bg-black">Leesa K. Donner</option>
                  <option value="https://www.libertynation.com/author/mark-angelides/" className="bg-black">Mark Angelides</option>
                  <option value="https://www.libertynation.com/author/graham-j-noble/" className="bg-black">Graham J Noble</option>
                  <option value="https://www.libertynation.com/author/jimfite/" className="bg-black">James Fite</option>
                  <option value="https://www.libertynation.com/author/tim-donner/" className="bg-black">Tim Donner</option>
                  <option value="https://www.libertynation.com/author/sarah-cowgill/" className="bg-black">Sarah Cowgill</option>
                  <option value="https://www.libertynation.com/author/andrew/" className="bg-black">Andrew Moran</option>
                  <option value="https://www.libertynation.com/author/scott-d-cosenza/" className="bg-black">Scott D. Cosenza, Esq.</option>
                  <option value="https://www.libertynation.com/author/dave-patterson/" className="bg-black">Dave Patterson</option>
                  <option value="https://www.libertynation.com/author/joeschaeffer/" className="bg-black">Joe Schaeffer</option>
                  <option value="https://www.libertynation.com/author/tess-lynne/" className="bg-black">Kelli Ballard</option>
                  <option value="https://www.libertynation.com/author/johnklar/" className="bg-black">John Klar</option>
                  <option value="https://www.libertynation.com/author/laura-valkovic/" className="bg-black">Laura Valkovic</option>
                  <option value="https://www.libertynation.com/author/corey-smith/" className="bg-black">Corey Smith</option>
                  <option value="https://www.libertynation.com/author/kirsten/" className="bg-black">Kirsten Brooker</option>
                  <option value="https://www.libertynation.com/author/elizabeth-lawrence/" className="bg-black">Elizabeth Lawrence</option>
                  <option value="https://www.libertynation.com/author/michele-white/" className="bg-black">Michele White</option>
                  <option value="https://www.libertynation.com/author/guest-author/" className="bg-black">Guest Authors</option>
                  <option value="https://www.libertynation.com/f-andrew-wolf-jr-guest-author/" className="bg-black">F. Andrew Wolf, Jr</option>
                </select>
              )}
            </div>
          </div>

          {/* MAIN MENU */}
          <div className="space-y-2">
            {/* Home */}
            <Link href="https://www.libertynation.com/" className="block py-4 font-display font-bold text-2xl text-white hover:text-primary-red transition tracking-tight">
              Home
            </Link>

            {/* News */}
            <Link href="https://www.libertynation.com/articles/" className="block py-4 font-display font-bold text-2xl text-white hover:text-primary-red transition tracking-tight">
              News
            </Link>

            {/* Video */}
            <div>
              <button
                onClick={() => toggleSection('video')}
                className="w-full flex items-center justify-between py-4 font-display font-bold text-2xl text-white hover:text-primary-red transition tracking-tight"
              >
                Video
                <svg className={`w-5 h-5 transition-transform duration-300 ${expandedSection === 'video' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${expandedSection === 'video' ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="pl-6 pb-3 pt-1 space-y-1 border-l-2 border-white/10">
                  <Link href="https://www.libertynation.com/lntv/" className="block py-2 font-sans text-base text-gray-400 hover:text-white transition">
                    Liberty Nation TV
                  </Link>
                  <Link href="https://www.libertynation.com/lntv/the-conservative-five/" className="block py-2 font-sans text-base text-gray-400 hover:text-white transition">
                    The Conservative 5
                  </Link>
                  <Link href="https://www.libertynation.com/lntv/videocasts/" className="block py-2 font-sans text-base text-gray-400 hover:text-white transition">
                    Videocasts
                  </Link>
                  <Link href="https://www.libertynation.com/lntv/swamponomics/" className="block py-2 font-sans text-base text-gray-400 hover:text-white transition">
                    Swamponomics
                  </Link>
                </div>
              </div>
            </div>

            {/* Radio */}
            <Link href="https://www.libertynation.com/audio/ln-radio/" className="block py-4 font-display font-bold text-2xl text-white hover:text-primary-red transition tracking-tight">
              Radio
            </Link>

            {/* Liberty Vault */}
            <div>
              <button
                onClick={() => toggleSection('liberty-vault')}
                className="w-full flex items-center justify-between py-4 font-display font-bold text-2xl text-white hover:text-primary-red transition tracking-tight"
              >
                Liberty Vault
                <svg className={`w-5 h-5 transition-transform duration-300 ${expandedSection === 'liberty-vault' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${expandedSection === 'liberty-vault' ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="pl-6 pb-3 pt-1 space-y-1 border-l-2 border-white/10">
                  <Link href="https://www.libertynation.com/ln-liberty-vault/the-supreme-court/" className="block py-2 font-sans text-base text-gray-400 hover:text-white transition">
                    The Supreme Court
                  </Link>
                  <Link href="https://www.libertynation.com/ln-liberty-vault/federalist-papers/" className="block py-2 font-sans text-base text-gray-400 hover:text-white transition">
                    Federalist Papers
                  </Link>
                  <Link href="https://www.libertynation.com/ln-liberty-vault/founding-documents/" className="block py-2 font-sans text-base text-gray-400 hover:text-white transition">
                    Founding Documents
                  </Link>
                  <Link href="https://www.libertynation.com/ln-liberty-vault/speeches/" className="block py-2 font-sans text-base text-gray-400 hover:text-white transition">
                    Great American Speeches
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Spacer to push secondary menu to bottom */}
          <div className="flex-1"></div>

          {/* SECONDARY MENU */}
          <div className="border-t border-gray-800/50 pt-6 mt-6 space-y-2">
            <Link href="/subscribe" className="block py-2 font-sans text-xs uppercase tracking-wider text-gray-400 hover:text-white transition">
              Subscribe Now
            </Link>
            <Link href="https://www.libertynation.com/author/" className="block py-2 font-sans text-xs uppercase tracking-wider text-gray-400 hover:text-white transition">
              Our Authors
            </Link>
            <Link href="https://www.libertynation.com/about/" className="block py-2 font-sans text-xs uppercase tracking-wider text-gray-400 hover:text-white transition">
              About Us
            </Link>
            <Link href="https://www.libertynation.com/ln-genz/" className="block py-2 font-sans text-xs uppercase tracking-wider text-gray-400 hover:text-white transition">
              LN GenZ
            </Link>
            <Link href="https://www.libertynation.com/contact/" className="block py-2 font-sans text-xs uppercase tracking-wider text-gray-400 hover:text-white transition">
              Contact Us
            </Link>
          </div>
        </nav>

        {/* Bottom Section - Fixed Social & Donate */}
        <div className="mt-auto p-6 bg-black border-t border-gray-800/30">
          {/* Follow Us Section */}
          <div className="mb-6">
            <div className="font-sans text-xs uppercase tracking-wider text-gray-500 mb-4">Follow Us</div>
            <div className="flex gap-5 justify-start">
              <a href="https://twitter.com/libertynation" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition" aria-label="Twitter">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://facebook.com/libertynation" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition" aria-label="Facebook">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 3.667h-3.533v7.98H9.101z"/></svg>
              </a>
              <a href="https://instagram.com/libertynation" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition" aria-label="Instagram">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="https://youtube.com/@libertynation" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition" aria-label="YouTube">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>

          {/* Donate Button */}
          <Link href="https://www.libertynation.com/donate/" className="block py-4 px-6 bg-primary-red text-white text-center font-sans font-bold text-sm uppercase tracking-wider hover:bg-white hover:text-primary-red transition">
            Donate
          </Link>
        </div>
      </div>

      {/* Header */}
      <header className="z-[1000] py-4">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 flex justify-between items-center">
          {/* Left: Menu + Logo */}
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={() => setMenuOpen(true)}
              className="flex flex-col justify-center items-center w-12 h-12 bg-transparent border-none cursor-pointer group flex-shrink-0"
              aria-label="Open menu"
            >
              <span className="block w-8 h-1 bg-black mb-1.5 group-hover:bg-primary-red transition" />
              <span className="block w-8 h-1 bg-black mb-1.5 group-hover:bg-primary-red transition" />
              <span className="block w-8 h-1 bg-black group-hover:bg-primary-red transition" />
            </button>

            <Link href="/" className="flex items-center">
              <div className="relative w-[240px] sm:w-[320px] md:w-[380px] lg:w-[440px] h-[60px] sm:h-[70px] md:h-[80px] lg:h-[90px]">
                <Image
                  src="/white_logo.png"
                  alt="Liberty Nation News"
                  fill
                  className="object-contain object-left"
                  priority
                  style={{ filter: 'invert(1)' }}
                />
              </div>
            </Link>
          </div>

          {/* Right: Navigation */}
          <div className="flex items-center gap-3 sm:gap-4">
            <nav className="hidden md:flex items-center gap-4">
              <Link href="/newsletters" className="text-black px-4 lg:px-6 py-2 font-sans font-bold text-xs lg:text-sm uppercase hover:text-primary-red transition">
                DAILY BRIEFING
              </Link>
              <Link href="/donate" className="text-black px-4 lg:px-6 py-2 font-sans font-bold text-xs lg:text-sm uppercase hover:text-primary-red transition">
                DONATE
              </Link>
            </nav>
            <button className="text-primary-red px-4 lg:px-6 py-2 font-sans font-bold text-xs lg:text-sm uppercase hover:bg-primary-red hover:text-white transition whitespace-nowrap border-2 border-primary-red">
              SUBSCRIBE
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
