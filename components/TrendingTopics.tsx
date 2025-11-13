import Link from 'next/link';

interface TrendingTopicsProps {
  topics: Array<{ topic: string; isHot: boolean }>;
}

export default function TrendingTopics({ topics }: TrendingTopicsProps) {
  return (
    <div className="bg-white border border-border-gray rounded-lg p-8">
      <h3 className="font-heading text-xl font-extrabold uppercase mb-6 flex items-center gap-2">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
        </svg>
        Trending Topics
      </h3>
      <div className="flex flex-wrap gap-3">
        {topics.map((item, i) => (
          <Link
            key={i}
            href={`/tag/${item.topic.toLowerCase().replace(/\s+/g, '-')}`}
            className={`px-4 py-2 rounded-full font-heading text-xs font-bold uppercase tracking-wide transition-all hover:-translate-y-0.5 ${
              item.isHot
                ? 'bg-primary-red text-white hover:bg-red-700'
                : 'bg-light-gray text-black border border-border-gray hover:bg-border-gray'
            }`}
          >
            {item.topic}
          </Link>
        ))}
      </div>
    </div>
  );
}
