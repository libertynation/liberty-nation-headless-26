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
        {/* Left side overlay - clickable to close - Only visible on sm+ screens */}
        <div
          className="hidden sm:block absolute inset-0 bg-black/85"
          onClick={() => setMenuOpen(false)}
        />

        {/* Right side - Secret Area (starts after sidebar) - Only visible on sm+ screens */}
        <div className="hidden sm:block absolute top-0 left-[420px] right-0 bottom-0">
          <SecretArea />
        </div>
      </div>

      {/* Slide-out Menu */}
      <div
        className={`fixed top-0 left-0 w-full sm:w-[420px] sm:max-w-[420px] h-full bg-black z-[2001] overflow-y-auto transition-all duration-500 ease-out shadow-xl flex flex-col ${
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
          {/* SEARCH / AUTHOR TOGGLE - Clean Editorial Style */}
          <div className="pt-6 pb-6 border-b border-white/10">
            {/* Toggle Pills */}
            <div className="flex mb-4">
              <button
                onClick={() => setSearchMode('search')}
                className={`flex-1 py-2 px-4 font-sans text-xs uppercase tracking-widest transition-all duration-300 ${
                  searchMode === 'search'
                    ? 'bg-white text-black font-bold'
                    : 'bg-transparent text-gray-400 hover:text-white border border-white/20'
                }`}
              >
                Search
              </button>
              <button
                onClick={() => setSearchMode('author')}
                className={`flex-1 py-2 px-4 font-sans text-xs uppercase tracking-widest transition-all duration-300 ${
                  searchMode === 'author'
                    ? 'bg-white text-black font-bold'
                    : 'bg-transparent text-gray-400 hover:text-white border border-white/20'
                }`}
              >
                Authors
              </button>
            </div>

            {/* Input/Select Area */}
            {searchMode === 'search' ? (
              <form className="relative" onSubmit={(e) => { e.preventDefault(); if (searchQuery) window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`; }}>
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 font-sans text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-white focus:bg-white/10 transition-all duration-300"
                />
              </form>
            ) : (
              <div className="relative">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <select
                  className="w-full pl-12 pr-10 py-3 bg-white/5 border border-white/20 font-sans text-sm text-white focus:outline-none focus:border-white focus:bg-white/10 appearance-none cursor-pointer transition-all duration-300"
                  onChange={(e) => { if (e.target.value) window.location.href = e.target.value; }}
                  defaultValue=""
                >
                  <option value="" className="bg-gray-900">Select an author...</option>
                  <option value="/author/leesa-k-donner" className="bg-gray-900">Leesa K. Donner</option>
                  <option value="/author/mark-angelides" className="bg-gray-900">Mark Angelides</option>
                  <option value="/author/graham-j-noble" className="bg-gray-900">Graham J Noble</option>
                  <option value="/author/james-fite" className="bg-gray-900">James Fite</option>
                  <option value="/author/tim-donner" className="bg-gray-900">Tim Donner</option>
                  <option value="/author/sarah-cowgill" className="bg-gray-900">Sarah Cowgill</option>
                  <option value="/author/andrew-moran" className="bg-gray-900">Andrew Moran</option>
                  <option value="/author/scott-d-cosenza" className="bg-gray-900">Scott D. Cosenza, Esq.</option>
                  <option value="/author/dave-patterson" className="bg-gray-900">Dave Patterson</option>
                  <option value="/author/joe-schaeffer" className="bg-gray-900">Joe Schaeffer</option>
                  <option value="/author/kelli-ballard" className="bg-gray-900">Kelli Ballard</option>
                  <option value="/author/john-klar" className="bg-gray-900">John Klar</option>
                  <option value="/author/laura-valkovic" className="bg-gray-900">Laura Valkovic</option>
                  <option value="/author/corey-smith" className="bg-gray-900">Corey Smith</option>
                  <option value="/author/kirsten-brooker" className="bg-gray-900">Kirsten Brooker</option>
                  <option value="/author/elizabeth-lawrence" className="bg-gray-900">Elizabeth Lawrence</option>
                  <option value="/author/michele-white" className="bg-gray-900">Michele White</option>
                </select>
                <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            )}
          </div>

          {/* MAIN MENU */}
          <div className="space-y-1 pt-6">
            {/* Home */}
            <Link href="/" onClick={() => setMenuOpen(false)} className="block py-3 font-display font-bold text-xl text-white hover:text-primary-red transition-colors duration-200">
              Home
            </Link>

            {/* News */}
            <Link href="/category/articles" onClick={() => setMenuOpen(false)} className="block py-3 font-display font-bold text-xl text-white hover:text-primary-red transition-colors duration-200">
              News
            </Link>

            {/* Video */}
            <div>
              <button
                onClick={() => toggleSection('video')}
                className="w-full flex items-center justify-between py-3 font-display font-bold text-xl text-white hover:text-primary-red transition-colors duration-200"
              >
                Video
                <svg className={`w-4 h-4 transition-transform duration-300 ${expandedSection === 'video' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${expandedSection === 'video' ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="pl-4 pb-2 pt-1 space-y-1 border-l border-white/20 ml-2">
                  <Link href="/category/lntv" onClick={() => setMenuOpen(false)} className="block py-2 font-sans text-sm text-gray-400 hover:text-white transition-colors">
                    Liberty Nation TV
                  </Link>
                  <Link href="/category/the-conservative-five" onClick={() => setMenuOpen(false)} className="block py-2 font-sans text-sm text-gray-400 hover:text-white transition-colors">
                    The Conservative 5
                  </Link>
                  <Link href="/category/videocasts" onClick={() => setMenuOpen(false)} className="block py-2 font-sans text-sm text-gray-400 hover:text-white transition-colors">
                    Videocasts
                  </Link>
                </div>
              </div>
            </div>

            {/* Radio */}
            <Link href="/category/audio" onClick={() => setMenuOpen(false)} className="block py-3 font-display font-bold text-xl text-white hover:text-primary-red transition-colors duration-200">
              Radio
            </Link>

            {/* Liberty Vault */}
            <div>
              <button
                onClick={() => toggleSection('liberty-vault')}
                className="w-full flex items-center justify-between py-3 font-display font-bold text-xl text-white hover:text-primary-red transition-colors duration-200"
              >
                Liberty Vault
                <svg className={`w-4 h-4 transition-transform duration-300 ${expandedSection === 'liberty-vault' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${expandedSection === 'liberty-vault' ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="pl-4 pb-2 pt-1 space-y-1 border-l border-white/20 ml-2">
                  <Link href="/liberty-vault" onClick={() => setMenuOpen(false)} className="block py-2 font-sans text-sm text-gray-400 hover:text-white transition-colors">
                    The Supreme Court
                  </Link>
                  <Link href="/liberty-vault" onClick={() => setMenuOpen(false)} className="block py-2 font-sans text-sm text-gray-400 hover:text-white transition-colors">
                    Federalist Papers
                  </Link>
                  <Link href="/liberty-vault" onClick={() => setMenuOpen(false)} className="block py-2 font-sans text-sm text-gray-400 hover:text-white transition-colors">
                    Founding Documents
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Spacer to push secondary menu to bottom */}
          <div className="flex-1 min-h-[40px]"></div>

          {/* SECONDARY MENU */}
          <div className="border-t border-white/10 pt-5 pb-2 space-y-1">
            <Link href="/subscribe" onClick={() => setMenuOpen(false)} className="block py-2 font-sans text-xs uppercase tracking-widest text-gray-500 hover:text-white transition-colors">
              Subscribe Now
            </Link>
            <Link href="/authors" onClick={() => setMenuOpen(false)} className="block py-2 font-sans text-xs uppercase tracking-widest text-gray-500 hover:text-white transition-colors">
              Our Authors
            </Link>
            <Link href="/about" onClick={() => setMenuOpen(false)} className="block py-2 font-sans text-xs uppercase tracking-widest text-gray-500 hover:text-white transition-colors">
              About Us
            </Link>
            <Link href="/contact" onClick={() => setMenuOpen(false)} className="block py-2 font-sans text-xs uppercase tracking-widest text-gray-500 hover:text-white transition-colors">
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
      <header className="z-[1000] py-2">
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

            <Link href="/" className="flex items-center flex-shrink min-w-0">
              <div className="relative w-[220px] sm:w-[280px] md:w-[380px] lg:w-[460px] xl:w-[540px] h-[60px] sm:h-[72px] md:h-[86px] lg:h-[100px] xl:h-[114px]">
                <Image
                  src="/liberty-nation-logo.png"
                  alt="Liberty Nation News"
                  fill
                  className="object-contain object-left"
                  priority
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
            <button className="hidden sm:block text-primary-red px-4 lg:px-6 py-2 font-sans font-bold text-xs lg:text-sm uppercase hover:bg-primary-red hover:text-white transition whitespace-nowrap border-2 border-primary-red">
              SUBSCRIBE
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
