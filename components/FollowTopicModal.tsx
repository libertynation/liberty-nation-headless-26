'use client';

import { useState } from 'react';

interface FollowTopicModalProps {
  isOpen: boolean;
  onClose: () => void;
  author: string;
  category: string;
  keywords: string[];
}

export default function FollowTopicModal({
  isOpen,
  onClose,
  author,
  category,
  keywords
}: FollowTopicModalProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [email, setEmail] = useState('');

  if (!isOpen) return null;

  const handleToggleOption = (option: string) => {
    setSelectedOptions(prev =>
      prev.includes(option)
        ? prev.filter(o => o !== option)
        : [...prev, option]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle subscription logic here
    console.log('Follow:', { email, selectedOptions });
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-[3000] transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white z-[3001] shadow-2xl">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <h2 className="font-serif text-2xl font-bold">Follow This Topic</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl leading-none transition"
              aria-label="Close"
            >
              ×
            </button>
          </div>

          {/* Description */}
          <p className="font-sans text-sm text-gray-600 mb-6 leading-relaxed">
            Get notified when new content is published. Select what you'd like to follow:
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Options */}
            <div className="space-y-3">
              {/* Author Option */}
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={selectedOptions.includes('author')}
                  onChange={() => handleToggleOption('author')}
                  className="mt-1 w-4 h-4 text-primary-red border-gray-300 focus:ring-primary-red"
                />
                <div className="flex-1">
                  <div className="font-sans text-sm font-semibold text-gray-900 group-hover:text-primary-red transition">
                    Author: {author}
                  </div>
                  <div className="font-sans text-xs text-gray-500">
                    Get updates when {author} publishes new articles
                  </div>
                </div>
              </label>

              {/* Category Option */}
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={selectedOptions.includes('category')}
                  onChange={() => handleToggleOption('category')}
                  className="mt-1 w-4 h-4 text-primary-red border-gray-300 focus:ring-primary-red"
                />
                <div className="flex-1">
                  <div className="font-sans text-sm font-semibold text-gray-900 group-hover:text-primary-red transition">
                    Category: {category}
                  </div>
                  <div className="font-sans text-xs text-gray-500">
                    Get updates for all {category} articles
                  </div>
                </div>
              </label>

              {/* Keywords Option */}
              {keywords.length > 0 && (
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={selectedOptions.includes('keywords')}
                    onChange={() => handleToggleOption('keywords')}
                    className="mt-1 w-4 h-4 text-primary-red border-gray-300 focus:ring-primary-red"
                  />
                  <div className="flex-1">
                    <div className="font-sans text-sm font-semibold text-gray-900 group-hover:text-primary-red transition">
                      Keywords: {keywords.slice(0, 3).join(', ')}
                    </div>
                    <div className="font-sans text-xs text-gray-500">
                      Get updates for articles with similar topics
                    </div>
                  </div>
                </label>
              )}
            </div>

            {/* Email Input */}
            <div>
              <label className="block font-sans text-sm font-semibold text-gray-900 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-3 border border-gray-300 focus:border-primary-red focus:outline-none focus:ring-1 focus:ring-primary-red transition font-sans text-sm"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={selectedOptions.length === 0}
              className="w-full bg-primary-red text-white px-6 py-3 font-sans font-bold text-sm uppercase hover:bg-[#e02835] transition disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Follow {selectedOptions.length > 0 && `(${selectedOptions.length})`}
            </button>

            {/* Privacy Note */}
            <p className="font-sans text-xs text-gray-500 text-center">
              We'll only send you updates for your selected topics. Unsubscribe anytime.
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
