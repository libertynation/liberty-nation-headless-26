import Link from 'next/link';
import Image from 'next/image';
import { WordPressPost, getFeaturedImageUrl, getAuthorName, formatDate, stripHtmlTags, decodeHtmlEntities } from '@/lib/wordpress';

interface FeaturedArticleProps {
  post: WordPressPost;
}

export default function FeaturedArticle({ post }: FeaturedArticleProps) {
  const imageUrl = getFeaturedImageUrl(post);
  const author = getAuthorName(post);
  const date = formatDate(post.date);
  const excerpt = stripHtmlTags(post.excerpt.rendered);

  return (
    <article className="group">
      <Link href={`/${post.slug}`}>
        {imageUrl && (
          <div className="relative w-full aspect-[580/436] overflow-hidden bg-gray-200 mb-5 shadow-md group-hover:shadow-xl transition-shadow duration-400 ease-out">
            <Image
              src={imageUrl}
              alt={post.title.rendered}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-102"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1440px) 60vw, 800px"
            />
          </div>
        )}
        <h1 className="font-display font-black text-[72px] xl:text-[80px] leading-[0.9] mb-5 tracking-tight uppercase text-primary-red transition-colors duration-300 ease-out text-center group-hover:opacity-80">
          {decodeHtmlEntities(post.title.rendered)}
        </h1>
        <p className="font-serif text-[20px] leading-[1.6] mb-5 text-text-dark max-w-[95%]">
          {excerpt.substring(0, 180)}...
        </p>
        <div className="flex items-center justify-center gap-2 text-[14px] font-sans uppercase tracking-wide">
          <span className="text-primary-red font-bold">{author.toUpperCase()}</span>
          <span className="text-black">—</span>
          <span className="text-black">{date}</span>
        </div>
      </Link>
    </article>
  );
}
