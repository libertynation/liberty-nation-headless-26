'use client';

import Link from 'next/link';
import Image from 'next/image';
import { WordPressPost, getFeaturedImageUrl, getAuthorName, formatDate, getExcerpt, decodeHtmlEntities, getAuthorAvatar, getAuthorSlug } from '@/lib/wordpress';
import { typography, transitions, spacing, authorMeta, aspectRatios, shadows } from '@/lib/design-tokens';

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
          <div className={`relative w-full ${aspectRatios.hero} overflow-hidden bg-gray-200 ${spacing.mb.lg} ${shadows.card} ${shadows.cardHover} ${transitions.shadow}`}>
            <Image
              src={imageUrl}
              alt={post.title.rendered}
              fill
              className={`object-cover ${transitions.scale.subtle}`}
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1440px) 60vw, 800px"
              quality={90}
            />
          </div>
        )}
        <h1 className={`font-serif font-bold ${typography.display.hero} ${spacing.mb.lg} tracking-tight text-gray-900 ${transitions.color} text-center group-hover:text-primary-red`}>
          {decodeHtmlEntities(post.title.rendered)}
        </h1>
        <p className={`font-serif ${typography.excerpt.large} ${spacing.mb.lg} text-text-dark text-center mx-auto max-w-[95%]`}>
          {excerpt.substring(0, 180)}...
        </p>
        <div className={`flex items-center justify-center ${authorMeta.containerGap.normal} ${typography.meta.default} font-sans uppercase tracking-wide`}>
          {authorSlug && (
            <Link href={`/author/${authorSlug}`} className={`flex items-center ${authorMeta.gap} hover:opacity-80 ${transitions.fast}`} onClick={(e) => e.stopPropagation()} prefetch={false}>
              {authorAvatar ? (
                <div className={`${authorMeta.avatar.medium} rounded-full overflow-hidden`}>
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
                <div className={`${authorMeta.avatar.medium} bg-primary-red rounded-full flex items-center justify-center text-white font-bold text-xs`}>
                  {author.charAt(0)}
                </div>
              )}
              <span className={authorMeta.name}>{author.toUpperCase()}</span>
            </Link>
          )}
          {!authorSlug && (
            <span className="text-primary-red font-bold">{author.toUpperCase()}</span>
          )}
          <span className={authorMeta.separator}>—</span>
          <span className={authorMeta.date}>{date}</span>
        </div>
      </Link>
    </article>
  );
}
