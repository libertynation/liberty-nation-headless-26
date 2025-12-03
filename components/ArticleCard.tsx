'use client';

import Link from 'next/link';
import Image from 'next/image';
import { WordPressPost, getFeaturedImageUrl, getAuthorName, formatDate, getExcerpt, decodeHtmlEntities, getAuthorAvatar, getAuthorSlug } from '@/lib/wordpress';
import { typography, transitions, spacing, authorMeta, aspectRatios } from '@/lib/design-tokens';

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
    <article className="group text-center">
      <Link href={`/${post.slug}`} className="block" prefetch={true}>
        {imageUrl && (
          <div className={`relative w-full ${aspectRatios.hero} overflow-hidden bg-gray-200 ${spacing.mb.sm}`}>
            <Image
              src={imageUrl}
              alt={post.title.rendered}
              fill
              className={`object-cover ${transitions.scale.subtle}`}
              sizes="(max-width: 768px) 100vw, 280px"
              loading="lazy"
              quality={85}
            />
            <div className={`absolute inset-0 bg-primary-red opacity-0 group-hover:opacity-10 ${transitions.slow} ease-out`} />
          </div>
        )}

        <h3 className={`font-display font-black ${typography.card.large} ${spacing.mb.sm} tracking-tight group-hover:text-primary-red ${transitions.color}`}>
          {decodeHtmlEntities(post.title.rendered)}
        </h3>

        {excerpt && (
          <p className={`font-serif ${typography.excerpt.standard} text-text-dark ${spacing.mb.sm}`}>
            {excerpt.substring(0, 135)}...
          </p>
        )}

        <div className={`flex items-center justify-center ${authorMeta.containerGap.normal} ${typography.meta.default} font-sans uppercase tracking-wide`}>
          {authorSlug && (
            <Link href={`/author/${authorSlug}`} className={`flex items-center ${authorMeta.gap} hover:opacity-80 ${transitions.fast}`} onClick={(e) => e.stopPropagation()} prefetch={false}>
              {authorAvatar ? (
                <div className={`${authorMeta.avatar.small} rounded-full overflow-hidden`}>
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
                <div className={`${authorMeta.avatar.small} bg-primary-red rounded-full flex items-center justify-center text-white font-bold text-[10px]`}>
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
