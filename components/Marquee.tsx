'use client';

interface MarqueeProps {
  items: string[];
}

export default function Marquee({ items }: MarqueeProps) {
  // Double the items for seamless scrolling
  const doubledItems = [...items, ...items];

  return (
    <div className="bg-gradient-to-br from-primary-red to-red-700 py-3 overflow-hidden relative border-t-2 border-b-2 border-black">
      <div className="flex gap-12 animate-marquee whitespace-nowrap">
        {doubledItems.map((item, i) => (
          <span
            key={i}
            className="text-white font-heading text-[0.85rem] font-bold px-6 border-r-2 border-white/40 min-w-fit uppercase tracking-wide"
          >
            {item}
          </span>
        ))}
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 60s linear infinite;
        }
      `}</style>
    </div>
  );
}
