'use client';

import { useState } from 'react';
import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function SignInPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Authentication logic will be implemented later
    console.log('Sign in attempt:', { ...formData, rememberMe });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Header />

      <main className="bg-bg-offwhite min-h-screen">
        {/* Hero Section */}
        <div className="bg-white border-b border-border-gray">
          <div className="max-w-[800px] mx-auto px-8 py-16 text-center">
            <h1 className="font-display font-bold text-5xl md:text-6xl mb-4 text-text-dark">
              Sign In
            </h1>
            <p className="font-serif text-lg text-text-gray">
              Access your Liberty Nation account
            </p>
          </div>
        </div>

        {/* Sign In Form */}
        <div className="max-w-[500px] mx-auto px-8 py-16">
          <div className="bg-white border border-border-gray p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block font-sans text-sm font-semibold uppercase mb-3 text-text-dark">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-border-gray font-serif text-base focus:outline-none focus:border-primary-red transition"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block font-sans text-sm font-semibold uppercase mb-3 text-text-dark">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-border-gray font-serif text-base focus:outline-none focus:border-primary-red transition"
                  placeholder="Enter your password"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 border-border-gray text-primary-red focus:ring-primary-red mr-2"
                  />
                  <span className="font-sans text-sm text-text-dark">Remember me</span>
                </label>
                <Link
                  href="/forgot-password"
                  className="font-sans text-sm text-primary-red hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full bg-primary-red text-white px-6 py-4 font-sans font-bold text-sm uppercase hover:bg-[#e02835] transition"
              >
                Sign In
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-border-gray text-center">
              <p className="font-serif text-base text-text-gray mb-4">
                Don't have an account?
              </p>
              <Link
                href="/signup"
                className="inline-block bg-white text-primary-red border-2 border-primary-red px-6 py-3 font-sans font-bold text-sm uppercase hover:bg-primary-red hover:text-white transition"
              >
                Create Account
              </Link>
            </div>
          </div>

          {/* Additional Options */}
          <div className="mt-8 bg-white border border-border-gray p-8 text-center">
            <h2 className="font-sans font-black text-lg uppercase mb-4 text-text-dark">
              Or Continue With
            </h2>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center gap-3 px-6 py-3 border-2 border-border-gray hover:border-text-dark transition font-sans text-sm font-semibold">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span>Sign in with Google</span>
              </button>

              <button className="w-full flex items-center justify-center gap-3 px-6 py-3 border-2 border-border-gray hover:border-text-dark transition font-sans text-sm font-semibold">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 3.667h-3.533v7.98H9.101z"/>
                </svg>
                <span>Sign in with Facebook</span>
              </button>

              <button className="w-full flex items-center justify-center gap-3 px-6 py-3 border-2 border-border-gray hover:border-text-dark transition font-sans text-sm font-semibold">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                <span>Sign in with X (Twitter)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-white border-t border-b border-border-gray py-16 mt-8">
          <div className="max-w-[1000px] mx-auto px-8">
            <h2 className="font-sans font-black text-2xl uppercase mb-10 text-center text-text-dark">
              Why Create an Account?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-5xl mb-4">💾</div>
                <h3 className="font-sans font-bold text-lg mb-3 text-text-dark">Save Articles</h3>
                <p className="font-serif text-base text-text-gray leading-relaxed">
                  Bookmark your favorite articles and read them later across all your devices
                </p>
              </div>
              <div className="text-center">
                <div className="text-5xl mb-4">📬</div>
                <h3 className="font-sans font-bold text-lg mb-3 text-text-dark">Personalized Newsletters</h3>
                <p className="font-serif text-base text-text-gray leading-relaxed">
                  Customize your newsletter preferences and get content tailored to your interests
                </p>
              </div>
              <div className="text-center">
                <div className="text-5xl mb-4">💬</div>
                <h3 className="font-sans font-bold text-lg mb-3 text-text-dark">Join Discussions</h3>
                <p className="font-serif text-base text-text-gray leading-relaxed">
                  Comment on articles and engage with our community of liberty-minded readers
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="max-w-[800px] mx-auto px-8 py-16 text-center">
          <h2 className="font-sans font-black text-xl uppercase mb-4 text-text-dark">
            Need Help?
          </h2>
          <p className="font-serif text-base text-text-gray mb-6">
            If you're having trouble signing in or need assistance with your account,
            please contact our support team.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-primary-red border-2 border-primary-red px-6 py-3 font-sans font-bold text-sm uppercase hover:bg-primary-red hover:text-white transition"
          >
            Contact Support
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}
