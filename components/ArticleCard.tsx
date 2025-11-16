import Link from 'next/link';
import Image from 'next/image';
import { WordPressPost, getFeaturedImageUrl, getAuthorName, formatDate, getExcerpt, decodeHtmlEntities, getAuthorAvatar, getAuthorSlug } from '@/lib/wordpress';

interface ArticleCardProps {
  post: WordPressPost;
  variant?: 'sidebar';
}

export default function ArticleCard({ post, variant = 'sidebar' }: ArticleCardProps) {
  const imageUrl = getFeaturedImageUrl(post);
  const author = getAuthorName(post);
  const authorSlug = getAuthorSlug(post);
  const authorAvatar = getAuthorAvatar(post);
  const date = formatDate(post.date);
  const excerpt = getExcerpt(post);

  return (
    <article className="group text-center border-t-2 border-transparent hover:border-primary-red transition-colors duration-300 pt-8 sm:pt-10 lg:pt-12">
      <Link href={`/${post.slug}`} className="block" prefetch={true}>
        {imageUrl && (
          <div className="relative w-full aspect-[580/436] overflow-hidden bg-gray-200 mb-3">
            <Image
              src={imageUrl}
              alt={post.title.rendered}
              fill
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 280px"
              loading="lazy"
              quality={85}
            />
            <div className="absolute inset-0 bg-primary-red opacity-0 group-hover:opacity-10 transition-opacity duration-500 ease-out" />
          </div>
        )}

        <h3 className="font-display font-black text-[24px] sm:text-[28px] md:text-[34px] leading-[1.1] mb-3 tracking-tight group-hover:text-primary-red transition-colors duration-300 ease-out">
          {decodeHtmlEntities(post.title.rendered)}
        </h3>

        {excerpt && (
          <p className="font-serif text-[15px] sm:text-[16px] md:text-[17px] leading-[1.5] text-text-dark mb-3">
            {excerpt.substring(0, 135)}...
          </p>
        )}

        <div className="flex items-center justify-center gap-2 sm:gap-3 text-[11px] sm:text-[12px] md:text-[13px] font-sans uppercase tracking-wide">
          {authorSlug && (
            <Link href={`/author/${authorSlug}`} className="flex items-center gap-2 hover:opacity-80 transition" onClick={(e) => e.stopPropagation()} prefetch={false}>
              {authorAvatar ? (
                <div className="w-6 h-6 rounded-full overflow-hidden">
                  <Image
                    src={authorAvatar}
                    alt={author}
                    width={24}
                    height={24}
                    className="object-cover w-full h-full"
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className="w-6 h-6 bg-primary-red rounded-full flex items-center justify-center text-white font-bold text-[10px]">
                  {author.charAt(0)}
                </div>
              )}
              <span className="text-primary-red font-bold hover:underline">{author.toUpperCase()}</span>
            </Link>
          )}
          {!authorSlug && (
            <span className="text-primary-red font-bold">{author.toUpperCase()}</span>
          )}
          <span className="text-black">—</span>
          <span className="text-black">{date}</span>
        </div>
      </Link>
    </article>
  );
}
