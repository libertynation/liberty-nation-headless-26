'use client';

import { useState } from 'react';
import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { spacing, typography, transitions } from '@/lib/design-tokens';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic will be implemented later
    console.log('Form submitted:', formData);
    setSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Header />

      <main className="bg-bg-offwhite">
        {/* Hero Section */}
        <div className={`bg-black text-white ${spacing.section.xl}`}>
          <div className="max-w-[900px] mx-auto px-8 text-center">
            <h1 className={`font-serif font-bold ${typography.display.hero} mb-8 leading-[1.05]`}>
              Contact Us
            </h1>
            <p className={`font-serif ${typography.body.xl} text-gray-300 leading-[1.7] max-w-[700px] mx-auto`}>
              We value your feedback, story tips, and questions. Get in touch with our editorial team.
            </p>
          </div>
        </div>

        {/* Contact Form and Info */}
        <div className={`max-w-[1000px] mx-auto px-8 ${spacing.section.xl}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white border border-border-gray p-8">
              <h2 className="font-sans font-black text-2xl uppercase mb-6 text-text-dark">
                Send Us a Message
              </h2>

              {submitted ? (
                <div className="bg-green-50 border border-green-200 p-6 rounded text-center">
                  <p className="font-sans text-green-800 font-semibold mb-2">Thank you!</p>
                  <p className="font-serif text-sm text-green-700">
                    Your message has been received. We'll get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block font-sans text-sm font-semibold uppercase mb-2 text-text-dark">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-border-gray font-serif text-base focus:outline-none focus:border-primary-red transition"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block font-sans text-sm font-semibold uppercase mb-2 text-text-dark">
                      Email *
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
                    <label htmlFor="subject" className="block font-sans text-sm font-semibold uppercase mb-2 text-text-dark">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-border-gray font-serif text-base focus:outline-none focus:border-primary-red transition bg-white"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="editorial">Editorial Comment</option>
                      <option value="tip">News Tip</option>
                      <option value="technical">Technical Support</option>
                      <option value="advertising">Advertising</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block font-sans text-sm font-semibold uppercase mb-2 text-text-dark">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="w-full px-4 py-3 border border-border-gray font-serif text-base focus:outline-none focus:border-primary-red transition resize-none"
                      placeholder="Your message..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary-red text-white px-6 py-3 font-sans font-bold text-sm uppercase hover:bg-[#e02835] transition"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>

            {/* Contact Information */}
            <div>
              <div className="bg-white border border-border-gray p-8 mb-6">
                <h2 className="font-sans font-black text-2xl uppercase mb-6 text-text-dark">
                  Contact Information
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-sans font-bold text-sm uppercase mb-2 text-text-dark">
                      Editorial Team
                    </h3>
                    <p className="font-serif text-base text-text-gray">
                      <a href="mailto:editorial@libertynation.com" className="text-primary-red hover:underline">
                        editorial@libertynation.com
                      </a>
                    </p>
                  </div>

                  <div>
                    <h3 className="font-sans font-bold text-sm uppercase mb-2 text-text-dark">
                      News Tips
                    </h3>
                    <p className="font-serif text-base text-text-gray">
                      Have a story tip? Email us at{' '}
                      <a href="mailto:tips@libertynation.com" className="text-primary-red hover:underline">
                        tips@libertynation.com
                      </a>
                    </p>
                  </div>

                  <div>
                    <h3 className="font-sans font-bold text-sm uppercase mb-2 text-text-dark">
                      General Inquiries
                    </h3>
                    <p className="font-serif text-base text-text-gray">
                      <a href="mailto:info@libertynation.com" className="text-primary-red hover:underline">
                        info@libertynation.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white border border-border-gray p-8">
                <h2 className="font-sans font-black text-2xl uppercase mb-6 text-text-dark">
                  Follow Us
                </h2>
                <p className="font-serif text-base text-text-gray mb-4">
                  Connect with us on social media for breaking news and updates
                </p>
                <div className="flex gap-4">
                  <a
                    href="https://twitter.com/libertynation"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-12 h-12 border border-border-gray hover:border-primary-red hover:text-primary-red transition"
                    aria-label="Twitter"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                  <a
                    href="https://facebook.com/libertynation"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-12 h-12 border border-border-gray hover:border-primary-red hover:text-primary-red transition"
                    aria-label="Facebook"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 3.667h-3.533v7.98H9.101z"/>
                    </svg>
                  </a>
                  <a
                    href="https://youtube.com/@libertynation"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-12 h-12 border border-border-gray hover:border-primary-red hover:text-primary-red transition"
                    aria-label="YouTube"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className={`bg-white border-t-4 border-primary-red ${spacing.section.xl}`}>
          <div className="max-w-[900px] mx-auto px-8">
            <div className="border-l-4 border-primary-red pl-8 py-2">
              <h2 className={`font-serif font-bold ${typography.h2} text-text-dark mb-4`}>
                Response Time
              </h2>
              <p className={`font-serif ${typography.body.lg} text-gray-700 leading-[1.8]`}>
                We strive to respond to all inquiries within 48 hours. For urgent news tips,
                please mark your email subject line with "URGENT" for priority handling.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
