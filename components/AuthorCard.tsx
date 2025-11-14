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
      <div className="border-t-2 border-b-2 border-border-dark py-8 my-8 bg-white">
        <div className="flex items-start gap-6">
          {/* Author Avatar */}
          <Link href={`/author/${slug}`} className="flex-shrink-0 group">
            {avatar ? (
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden ring-4 ring-primary-red ring-offset-2 shadow-lg group-hover:ring-offset-4 transition-all duration-300">
                <Image
                  src={avatar}
                  alt={name}
                  width={112}
                  height={112}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ) : (
              <div className="w-24 h-24 md:w-28 md:h-28 bg-primary-red rounded-full flex items-center justify-center text-white font-display font-black text-4xl ring-4 ring-primary-red ring-offset-2 shadow-lg group-hover:ring-offset-4 transition-all duration-300">
                {name.charAt(0).toUpperCase()}
              </div>
            )}
          </Link>

          {/* Author Info */}
          <div className="flex-1 min-w-0">
            <Link href={`/author/${slug}`} className="group">
              <h3 className="font-display font-bold text-2xl md:text-3xl text-text-dark mb-2 group-hover:text-primary-red transition-colors duration-300">
                {name}
              </h3>
            </Link>
            {title && (
              <p className="font-sans text-sm font-semibold uppercase tracking-widest text-text-gray mb-3">
                {title}
              </p>
            )}
            {bio && (
              <p className="font-serif text-base md:text-lg leading-relaxed text-text-dark mb-4 line-clamp-2">
                {bio}
              </p>
            )}
            <Link
              href={`/author/${slug}`}
              className="inline-flex items-center gap-2 text-primary-red font-sans text-sm font-bold uppercase tracking-wide hover:gap-3 transition-all duration-300 group"
            >
              <span>Read more from {name}</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Default variant - full card with decorative elements
  return (
    <div className="relative border-4 border-text-dark bg-gradient-to-br from-white to-bg-offwhite p-8 md:p-10 my-12 shadow-xl overflow-hidden">
      {/* Decorative Corner Accents */}
      <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-primary-red" />
      <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-primary-red" />

      {/* Decorative Background Pattern */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary-red opacity-[0.03] rounded-full -translate-y-16 translate-x-16" />
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-primary-red opacity-[0.03] rounded-full translate-y-20 -translate-x-20" />

      <div className="relative">
        {/* Header with decorative line */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-[3px] bg-primary-red" />
          <h4 className="font-sans text-xs font-bold uppercase tracking-widest text-text-gray">
            About the Author
          </h4>
          <div className="flex-1 h-[1px] bg-border-dark" />
        </div>

        <div className="flex flex-col md:flex-row items-start gap-6">
          {/* Author Avatar */}
          <Link href={`/author/${slug}`} className="flex-shrink-0 group">
            {avatar ? (
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden ring-4 ring-primary-red ring-offset-4 shadow-2xl group-hover:ring-offset-6 transition-all duration-300">
                <Image
                  src={avatar}
                  alt={name}
                  width={160}
                  height={160}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ) : (
              <div className="w-32 h-32 md:w-40 md:h-40 bg-primary-red rounded-full flex items-center justify-center text-white font-display font-black text-6xl ring-4 ring-primary-red ring-offset-4 shadow-2xl group-hover:ring-offset-6 transition-all duration-300">
                {name.charAt(0).toUpperCase()}
              </div>
            )}
          </Link>

          {/* Author Details */}
          <div className="flex-1 min-w-0">
            <Link href={`/author/${slug}`} className="group inline-block mb-3">
              <h3 className="font-display font-black text-4xl md:text-5xl text-text-dark tracking-tight group-hover:text-primary-red transition-colors duration-300">
                {name}
              </h3>
            </Link>

            {title && (
              <div className="inline-block mb-4 px-4 py-2 bg-text-dark text-white font-sans text-xs font-bold uppercase tracking-widest shadow-md">
                {title}
              </div>
            )}

            {bio && (
              <p className="font-serif text-lg md:text-xl leading-[1.7] text-text-dark mb-6 max-w-2xl">
                {bio}
              </p>
            )}

            <Link
              href={`/author/${slug}`}
              className="inline-flex items-center gap-3 px-6 py-3 bg-primary-red text-white font-sans text-sm font-bold uppercase tracking-wide hover:bg-text-dark transition-all duration-300 shadow-lg hover:shadow-xl hover:gap-4 group"
            >
              <span>Read more from {name}</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
