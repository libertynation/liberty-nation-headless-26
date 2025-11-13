'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SecretArea from './SecretArea';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

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
        className={`fixed inset-0 z-[2000] transition-opacity duration-300 ${
          menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        {/* Left side overlay - clickable to close */}
        <div
          className="absolute inset-0 bg-black/95"
          onClick={() => setMenuOpen(false)}
        />

        {/* Right side - Secret Area (starts after sidebar) */}
        <div className="absolute top-0 left-[420px] right-0 bottom-0">
          <SecretArea />
        </div>
      </div>

      {/* Slide-out Menu */}
      <div
        className={`fixed top-0 left-0 w-[420px] h-full bg-black z-[2001] overflow-y-auto transition-transform duration-300 shadow-xl flex flex-col ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header at Top */}
        <div className="border-b border-gray-800 p-6 pb-5">
          <div className="pr-12 flex items-center gap-4">
            <Image
              src="/liberty-nation-logo.png"
              alt="Liberty Nation News"
              width={280}
              height={80}
              className="h-auto w-auto invert"
              priority
            />
          </div>
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-6 right-6 text-white text-5xl hover:text-primary-red transition leading-none"
            aria-label="Close menu"
          >
            ×
          </button>
        </div>

        <nav className="px-6 py-6">
          {/* Search */}
          <Link href="/search" className="w-full flex items-center justify-between py-4 border-b border-gray-800 font-sans font-bold text-2xl text-white hover:text-primary-red transition">
            Search
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </Link>

          {/* Topics */}
          <div className="border-b border-gray-800">
            <button
              onClick={() => toggleSection('topics')}
              className="w-full flex items-center justify-between py-4 font-sans font-bold text-2xl text-white hover:text-primary-red transition"
            >
              Topics
              <svg className={`w-6 h-6 transition-transform ${expandedSection === 'topics' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {expandedSection === 'topics' && (
              <div className="pb-4 space-y-1">
                <Link href="/politics" className="block py-2 font-sans text-base text-gray-300 hover:text-white transition">
                  Politics
                </Link>
                <Link href="/economy" className="block py-2 font-sans text-base text-gray-300 hover:text-white transition">
                  Economy
                </Link>
                <Link href="/culture" className="block py-2 font-sans text-base text-gray-300 hover:text-white transition">
                  Culture
                </Link>
                <Link href="/opinion" className="block py-2 font-sans text-base text-gray-300 hover:text-white transition">
                  Opinion
                </Link>
                <Link href="/world" className="block py-2 font-sans text-base text-gray-300 hover:text-white transition">
                  International
                </Link>
              </div>
            )}
          </div>

          {/* Podcasts */}
          <div className="border-b border-gray-800">
            <button
              onClick={() => toggleSection('podcasts')}
              className="w-full flex items-center justify-between py-4 font-sans font-bold text-2xl text-white hover:text-primary-red transition"
            >
              Podcasts
              <svg className={`w-6 h-6 transition-transform ${expandedSection === 'podcasts' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {expandedSection === 'podcasts' && (
              <div className="pb-4 space-y-1">
                <Link href="/podcasts" className="block py-2 font-sans text-base text-gray-300 hover:text-white transition">
                  All Podcasts
                </Link>
                <Link href="/audio/ln-radio" className="block py-2 font-sans text-base text-gray-300 hover:text-white transition">
                  LN Radio
                </Link>
              </div>
            )}
          </div>

          {/* Video */}
          <div className="border-b border-gray-800">
            <button
              onClick={() => toggleSection('video')}
              className="w-full flex items-center justify-between py-4 font-sans font-bold text-2xl text-white hover:text-primary-red transition"
            >
              Video
              <svg className={`w-6 h-6 transition-transform ${expandedSection === 'video' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {expandedSection === 'video' && (
              <div className="pb-4 space-y-1">
                <Link href="/lntv" className="block py-2 font-sans text-base text-gray-300 hover:text-white transition">
                  Liberty Nation TV
                </Link>
                <Link href="/liberty-vault" className="block py-2 font-sans text-base text-gray-300 hover:text-white transition">
                  Liberty Vault
                </Link>
              </div>
            )}
          </div>

          {/* Latest */}
          <Link href="/" className="w-full flex items-center justify-between py-4 border-b border-gray-800 font-sans font-bold text-2xl text-white hover:text-primary-red transition">
            Latest
          </Link>

          {/* Newsletters */}
          <Link href="/newsletters" className="w-full flex items-center justify-between py-4 border-b border-gray-800 font-sans font-bold text-2xl text-white hover:text-primary-red transition">
            Newsletters
          </Link>

          {/* Who We Are */}
          <Link href="/about" className="w-full flex items-center justify-between py-4 border-b border-gray-800 font-sans font-bold text-2xl text-white hover:text-primary-red transition">
            Who We Are
          </Link>

          {/* Support Us */}
          <Link href="/donate" className="w-full flex items-center justify-between py-4 border-b border-gray-800 font-sans font-bold text-2xl text-white hover:text-primary-red transition">
            Support Us
          </Link>

          {/* About */}
          <div className="border-b border-gray-800">
            <button
              onClick={() => toggleSection('about')}
              className="w-full flex items-center justify-between py-4 font-sans font-bold text-2xl text-white hover:text-primary-red transition"
            >
              About
              <svg className={`w-6 h-6 transition-transform ${expandedSection === 'about' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {expandedSection === 'about' && (
              <div className="pb-4 space-y-1">
                <Link href="/contact" className="block py-2 font-sans text-base text-gray-300 hover:text-white transition">
                  Contact Us
                </Link>
                <Link href="/authors" className="block py-2 font-sans text-base text-gray-300 hover:text-white transition">
                  Our Authors
                </Link>
                <Link href="/privacy-policy" className="block py-2 font-sans text-base text-gray-300 hover:text-white transition">
                  Privacy Policy
                </Link>
                <Link href="/terms-and-conditions" className="block py-2 font-sans text-base text-gray-300 hover:text-white transition">
                  Terms & Conditions
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* Bottom Section - Fixed Social & Donate */}
        <div className="mt-auto p-6 bg-black">
          {/* Donate Button */}
          <Link href="/donate" className="block py-4 px-6 bg-primary-red text-white text-center font-sans font-bold text-lg uppercase hover:bg-[#c41e2a] transition mb-6 rounded-sm">
            Donate
          </Link>

          {/* Follow Us Section */}
          <div className="mb-6">
            <div className="font-sans font-bold text-xs text-primary-red mb-4 uppercase tracking-wider">Follow Us</div>
            <div className="flex gap-5 justify-center">
              <a href="https://twitter.com/libertynation" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary-red transition" aria-label="Twitter">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://facebook.com/libertynation" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary-red transition" aria-label="Facebook">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 3.667h-3.533v7.98H9.101z"/></svg>
              </a>
              <a href="https://instagram.com/libertynation" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary-red transition" aria-label="Instagram">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="https://youtube.com/@libertynation" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary-red transition" aria-label="YouTube">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>

          {/* Copyright */}
          <p className="text-gray-500 text-xs text-center">©2025 Liberty Nation. All Rights Reserved.</p>
        </div>
      </div>

      {/* Header */}
      <header className="bg-bg-offwhite sticky top-0 z-[1000]">
        <div className="max-w-[1600px] mx-auto px-10 py-6 flex justify-between items-center">
          {/* Left: Menu + Logo */}
          <div className="flex items-center gap-5">
            <button
              onClick={() => setMenuOpen(true)}
              className="flex flex-col justify-center items-center w-12 h-12 bg-transparent border-none cursor-pointer group"
              aria-label="Open menu"
            >
              <span className="block w-8 h-1 bg-black mb-1.5 group-hover:bg-gray-600 transition" />
              <span className="block w-8 h-1 bg-black mb-1.5 group-hover:bg-gray-600 transition" />
              <span className="block w-8 h-1 bg-black group-hover:bg-gray-600 transition" />
            </button>

            <Link href="/" className="flex items-center">
              <Image
                src="/liberty-nation-logo.png"
                alt="Liberty Nation News"
                width={400}
                height={120}
                className="h-auto w-auto max-h-16"
                priority
                style={{ objectFit: 'contain' }}
              />
            </Link>
          </div>

          {/* Right: Navigation */}
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-4">
              <Link href="/newsletters" className="text-black px-6 py-2 font-sans font-bold text-sm uppercase hover:text-gray-600 transition">
                DAILY BRIEFING
              </Link>
              <Link href="/donate" className="text-black px-6 py-2 font-sans font-bold text-sm uppercase hover:text-gray-600 transition">
                DONATE
              </Link>
            </nav>
            <button className="text-primary-red px-6 py-2 font-sans font-bold text-sm uppercase hover:text-[#e02835] transition">
              SUBSCRIBE
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
