import Link from 'next/link';
import Image from 'next/image';
import { WordPressPost, getFeaturedImageUrl, getAuthorName, formatDate, getExcerpt, decodeHtmlEntities, getAuthorAvatar, getAuthorSlug } from '@/lib/wordpress';

interface FeaturedArticleProps {
  post: WordPressPost;
}

export default function FeaturedArticle({ post }: FeaturedArticleProps) {
  const imageUrl = getFeaturedImageUrl(post);
  const author = getAuthorName(post);
  const authorSlug = getAuthorSlug(post);
  const authorAvatar = getAuthorAvatar(post);
  const date = formatDate(post.date);
  const excerpt = getExcerpt(post);

  return (
    <article className="group">
      <Link href={`/${post.slug}`} prefetch={true}>
        {imageUrl && (
          <div className="relative w-full aspect-[580/436] overflow-hidden bg-gray-200 mb-4 sm:mb-5 shadow-md group-hover:shadow-xl transition-shadow duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
            <Image
              src={imageUrl}
              alt={post.title.rendered}
              fill
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-102"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1440px) 60vw, 800px"
              quality={90}
            />
          </div>
        )}
        <h1 className="font-serif font-bold text-[36px] sm:text-[48px] md:text-[60px] lg:text-[72px] xl:text-[80px] leading-[1.05] mb-4 sm:mb-5 tracking-tight text-gray-900 transition-colors duration-300 ease-out text-center group-hover:text-primary-red">
          {decodeHtmlEntities(post.title.rendered)}
        </h1>
        <p className="font-serif text-[16px] sm:text-[17px] md:text-[18px] lg:text-[20px] leading-[1.6] mb-4 sm:mb-5 text-text-dark text-center mx-auto max-w-[95%]">
          {excerpt.substring(0, 180)}...
        </p>
        <div className="flex items-center justify-center gap-2 sm:gap-3 text-[12px] sm:text-[13px] md:text-[14px] font-sans uppercase tracking-wide">
          {authorSlug && (
            <Link href={`/author/${authorSlug}`} className="flex items-center gap-2 hover:opacity-80 transition" onClick={(e) => e.stopPropagation()} prefetch={false}>
              {authorAvatar ? (
                <div className="w-7 h-7 rounded-full overflow-hidden">
                  <Image
                    src={authorAvatar}
                    alt={author}
                    width={28}
                    height={28}
                    className="object-cover w-full h-full"
                    loading="eager"
                  />
                </div>
              ) : (
                <div className="w-7 h-7 bg-primary-red rounded-full flex items-center justify-center text-white font-bold text-xs">
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
