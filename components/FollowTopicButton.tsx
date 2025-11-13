'use client';

import { useState } from 'react';
import FollowTopicModal from './FollowTopicModal';

interface FollowTopicButtonProps {
  author: string;
  category: string;
  title: string;
}

export default function FollowTopicButton({ author, category, title }: FollowTopicButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Extract potential keywords from title (simple implementation)
  const keywords = title
    .split(' ')
    .filter(word => word.length > 4 && !['About', 'This', 'That', 'With', 'From', 'There', 'Their', 'Where', 'Which'].includes(word))
    .slice(0, 5);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition font-sans text-sm font-medium text-gray-700 rounded-sm"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        <span>FOLLOW TOPIC</span>
      </button>

      <FollowTopicModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        author={author}
        category={category}
        keywords={keywords}
      />
    </>
  );
}
