import Image from 'next/image';
import Link from 'next/link';

interface AuthorCardProps {
  name: string;
  slug: string;
  title?: string | null;
  bio?: string;
  avatar?: string | null;
  variant?: 'default' | 'compact';
}

export default function AuthorCard({
  name,
  slug,
  title,
  bio,
  avatar,
  variant = 'default'
}: AuthorCardProps) {
  if (variant === 'compact') {
    return (
      <div className="border-t border-gray-300 py-6 my-6">
        <div className="flex items-start gap-5">
          {/* Author Avatar */}
          <Link href={`/author/${slug}`} className="flex-shrink-0">
            {avatar ? (
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-300">
                <Image
                  src={avatar}
                  alt={name}
                  width={80}
                  height={80}
                  className="object-cover w-full h-full"
                />
              </div>
            ) : (
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 font-display font-bold text-2xl border-2 border-gray-300">
                {name.charAt(0).toUpperCase()}
              </div>
            )}
          </Link>

          {/* Author Info */}
          <div className="flex-1 min-w-0">
            <Link href={`/author/${slug}`}>
              <h3 className="font-display text-xl font-bold text-gray-900 mb-1 hover:text-gray-700">
                {name}
              </h3>
            </Link>
            {title && (
              <p className="font-sans text-xs uppercase tracking-wide text-gray-600 mb-2">
                {title}
              </p>
            )}
            {bio && (
              <p className="font-serif text-sm leading-relaxed text-gray-700 line-clamp-2">
                {bio}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Default variant - clean minimal design
  return (
    <div className="border-t-2 border-gray-300 py-10 my-10">
      <div className="flex flex-col md:flex-row items-start gap-6">
        {/* Author Avatar */}
        <Link href={`/author/${slug}`} className="flex-shrink-0">
          {avatar ? (
            <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-gray-300">
              <Image
                src={avatar}
                alt={name}
                width={112}
                height={112}
                className="object-cover w-full h-full"
              />
            </div>
          ) : (
            <div className="w-28 h-28 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 font-display font-bold text-4xl border-2 border-gray-300">
              {name.charAt(0).toUpperCase()}
            </div>
          )}
        </Link>

        {/* Author Details */}
        <div className="flex-1 min-w-0">
          <p className="font-sans text-xs uppercase tracking-wide text-gray-500 mb-2">
            About the Author
          </p>

          <Link href={`/author/${slug}`}>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mb-2 hover:text-gray-700">
              {name}
            </h3>
          </Link>

          {title && (
            <p className="font-sans text-sm text-gray-600 mb-3">
              {title}
            </p>
          )}

          {bio && (
            <p className="font-serif text-base leading-relaxed text-gray-700 mb-4 max-w-2xl">
              {bio}
            </p>
          )}

          <Link
            href={`/author/${slug}`}
            className="inline-flex items-center gap-2 text-gray-900 font-sans text-sm hover:text-gray-700"
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
