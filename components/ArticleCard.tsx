import Link from 'next/link';
import Image from 'next/image';
import { WordPressPost, getFeaturedImageUrl, getAuthorName, formatDate, getExcerpt, decodeHtmlEntities } from '@/lib/wordpress';

interface ArticleCardProps {
  post: WordPressPost;
  variant?: 'sidebar';
}

export default function ArticleCard({ post, variant = 'sidebar' }: ArticleCardProps) {
  const imageUrl = getFeaturedImageUrl(post);
  const author = getAuthorName(post);
  const date = formatDate(post.date);
  const excerpt = getExcerpt(post);

  return (
    <article className="group text-center border-t-2 border-transparent hover:border-primary-red transition-colors duration-300 pt-4">
      <Link href={`/${post.slug}`} className="block">
        {imageUrl && (
          <div className="relative w-full aspect-[580/436] overflow-hidden bg-gray-200 mb-3">
            <Image
              src={imageUrl}
              alt={post.title.rendered}
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 280px"
            />
            <div className="absolute inset-0 bg-primary-red opacity-0 group-hover:opacity-10 transition-opacity duration-400 ease-in-out" />
          </div>
        )}

        <h3 className="font-display font-extrabold text-[34px] leading-[1.1] mb-3 tracking-tight group-hover:text-primary-red transition-colors duration-300 ease-out">
          {decodeHtmlEntities(post.title.rendered)}
        </h3>

        {excerpt && (
          <p className="font-serif text-[17px] leading-[1.5] text-text-dark mb-3">
            {excerpt.substring(0, 135)}...
          </p>
        )}

        <div className="flex items-center justify-center gap-2 text-[13px] font-sans uppercase tracking-wide">
          <span className="text-primary-red font-bold">{author.toUpperCase()}</span>
          <span className="text-black">—</span>
          <span className="text-black">{date}</span>
        </div>
      </Link>
    </article>
  );
}
