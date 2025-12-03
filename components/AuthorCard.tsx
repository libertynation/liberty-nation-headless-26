import Image from 'next/image';
import Link from 'next/link';

interface AuthorCardProps {
  name: string;
  slug: string;
  title?: string | null;
  bio?: string;
  avatar?: string | null;
  variant?: 'default' | 'compact';
  showName?: boolean; // Whether to show the name (default true, set false if name already shown elsewhere)
}

export default function AuthorCard({
  name,
  slug,
  title,
  bio,
  avatar,
  variant = 'default',
  showName = true
}: AuthorCardProps) {
  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-4">
        {/* Author Avatar */}
        <Link href={`/author/${slug}`} className="flex-shrink-0">
          {avatar ? (
            <div className="w-20 h-20 rounded-full overflow-hidden border border-gray-200">
              <Image
                src={avatar}
                alt={name}
                width={86}
                height={86}
                className="object-cover w-full h-full"
              />
            </div>
          ) : (
            <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 font-display font-bold text-xl border border-gray-200">
              {name.charAt(0).toUpperCase()}
            </div>
          )}
        </Link>

        {/* Author Info */}
        <div className="flex-1 min-w-0">
          {showName && (
            <Link href={`/author/${slug}`}>
              <h3 className="font-display text-lg font-bold text-gray-900 hover:text-primary-red transition-colors leading-tight">
                {name}
              </h3>
            </Link>
          )}
          {bio && (
            <p className="font-serif text-lg leading-relaxed text-gray-600 mt-1 line-clamp-2">
              {bio}
            </p>
          )}
        </div>
      </div>
    );
  }

  // Default variant - thefp.com editorial style
  return (
    <div className="border-t border-gray-200 pt-10 mt-12">
      <p className="font-sans text-xs font-bold uppercase tracking-widest text-gray-500 mb-6">
        About the Author
      </p>

      <div className="flex items-center gap-6">
        {/* Author Avatar - Larger for prominence */}
        <Link href={`/author/${slug}`} className="flex-shrink-0">
          {avatar ? (
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border border-gray-200 shadow-sm">
              <Image
                src={avatar}
                alt={name}
                width={96}
                height={96}
                className="object-cover w-full h-full"
              />
            </div>
          ) : (
            <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 font-display font-bold text-2xl md:text-3xl border border-gray-200">
              {name.charAt(0).toUpperCase()}
            </div>
          )}
        </Link>

        {/* Author Details */}
        <div className="flex-1 min-w-0">
          <Link href={`/author/${slug}`}>
            <h3 className="font-display text-xl md:text-2xl font-bold text-gray-900 hover:text-primary-red transition-colors mb-1">
              {name}
            </h3>
          </Link>

          {bio && (
            <p className="font-serif text-sm md:text-base leading-[1.6] text-gray-700 mb-3 line-clamp-2 md:line-clamp-none md:max-w-xl">
              {bio}
            </p>
          )}

          <Link
            href={`/author/${slug}`}
            className="inline-flex items-center gap-2 text-primary-red font-sans text-sm font-medium hover:underline"
          >
            <span>More articles by {name}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
