import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getPosts, getPostBySlug, getCategory, getFeaturedImageUrl, getAuthorName, getCategoryName, formatDate, getAuthorAvatar, getAuthorTitle, stripHtmlTags, decodeHtmlEntities, isLNTVPost } from '@/lib/wordpress';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ShareButtons from '@/components/ShareButtons';
import FollowTopicButton from '@/components/FollowTopicButton';

// ISR: Revalidate every 5 minutes
export const revalidate = 300;

// List of valid category and static page slugs
const VALID_CATEGORIES = ['politics', 'economy', 'culture', 'opinion', 'podcasts', 'videos'];
const STATIC_PAGES = ['about', 'contact', 'newsletters', 'signin'];

// Generate static params for all posts, categories, and static pages at build time
export async function generateStaticParams() {
  const posts = await getPosts({ per_page: 100 });

  const postParams = posts.map((post) => ({
    slug: post.slug,
  }));

  const categoryParams = VALID_CATEGORIES.map((slug) => ({
    slug,
  }));

  const staticParams = STATIC_PAGES.map((slug) => ({
    slug,
  }));

  return [...postParams, ...categoryParams, ...staticParams];
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;

  // Check if it's a static page
  const staticPageTitles: Record<string, string> = {
    about: 'About Us',
    contact: 'Contact',
    newsletters: 'Newsletters',
    signin: 'Sign In',
  };

  if (staticPageTitles[slug]) {
    return {
      title: `${staticPageTitles[slug]} | Liberty Nation`,
    };
  }

  // Check if it's a category
  const categoryData = await getCategory(slug);
  if (categoryData) {
    return {
      title: `${categoryData.name} | Liberty Nation`,
      description: `Browse all ${categoryData.name} articles from Liberty Nation`,
    };
  }

  // Otherwise, try to get it as a post
  const post = await getPostBySlug(slug);
  if (post) {
    return {
      title: `${post.title.rendered} | Liberty Nation`,
      description: post.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 160),
    };
  }

  return {
    title: 'Page Not Found | Liberty Nation',
  };
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params;

  // Handle static pages first
  if (slug === 'about') {
    return (
      <>
        <Header />
        <main className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="font-headline text-5xl md:text-6xl font-black uppercase mb-8 tracking-tight">
            About Liberty Nation
          </h1>
          <div className="prose prose-lg max-w-none font-serif">
            <p className="text-[19px] leading-[1.7] mb-6">
              Liberty Nation is an independent news and opinion website dedicated to bringing you the latest news, analysis, and commentary from a libertarian and constitutional perspective.
            </p>
            <p className="text-[19px] leading-[1.7] mb-6">
              Our mission is to promote free thinking, free speech, and the principles that made America great. We believe in limited government, individual liberty, free markets, and the Constitution.
            </p>
            <h2 className="font-headline text-3xl font-black uppercase mt-12 mb-6">Our Values</h2>
            <ul className="space-y-3">
              <li className="text-[19px] leading-[1.7]"><strong>Free Speech:</strong> We defend the right to express ideas freely.</li>
              <li className="text-[19px] leading-[1.7]"><strong>Liberty:</strong> Individual freedom is paramount.</li>
              <li className="text-[19px] leading-[1.7]"><strong>Truth:</strong> We seek to report honestly and without bias.</li>
              <li className="text-[19px] leading-[1.7]"><strong>Constitution:</strong> The foundation of American freedom.</li>
            </ul>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (slug === 'contact') {
    return (
      <>
        <Header />
        <main className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="font-headline text-5xl md:text-6xl font-black uppercase mb-8 tracking-tight">
            Contact Us
          </h1>
          <div className="prose prose-lg max-w-none font-serif">
            <p className="text-[19px] leading-[1.7] mb-6">
              We'd love to hear from you. Whether you have a story tip, feedback, or just want to say hello, we're here to listen.
            </p>
            <h2 className="font-headline text-3xl font-black uppercase mt-12 mb-6">Get In Touch</h2>
            <p className="text-[19px] leading-[1.7] mb-6">
              Email: <a href="mailto:contact@libertynation.com" className="text-primary-red hover:underline">contact@libertynation.com</a>
            </p>
            <p className="text-[19px] leading-[1.7] mb-6">
              For editorial inquiries: <a href="mailto:editor@libertynation.com" className="text-primary-red hover:underline">editor@libertynation.com</a>
            </p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (slug === 'newsletters') {
    return (
      <>
        <Header />
        <main className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="font-headline text-5xl md:text-6xl font-black uppercase mb-8 tracking-tight">
            Newsletters
          </h1>
          <div className="prose prose-lg max-w-none font-serif">
            <p className="text-[19px] leading-[1.7] mb-8">
              Stay informed with Liberty Nation's newsletters. Get the latest news, analysis, and commentary delivered straight to your inbox.
            </p>
            <div className="bg-bg-cream border-2 border-border-gray rounded-lg p-8 my-8">
              <h2 className="font-headline text-2xl font-black uppercase mb-4">Subscribe to Our Newsletter</h2>
              <form className="space-y-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border-2 border-border-gray rounded font-sans focus:outline-none focus:border-primary-red transition"
                  required
                />
                <button
                  type="submit"
                  className="bg-primary-red text-white px-8 py-3 font-sans font-bold text-sm uppercase hover:bg-[#e02835] transition rounded"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (slug === 'signin') {
    return (
      <>
        <Header />
        <main className="max-w-md mx-auto px-4 py-12">
          <h1 className="font-headline text-4xl md:text-5xl font-black uppercase mb-8 tracking-tight text-center">
            Sign In
          </h1>
          <div className="bg-white border-2 border-border-gray rounded-lg p-8">
            <form className="space-y-6">
              <div>
                <label className="block font-sans text-sm font-semibold mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border-2 border-border-gray rounded font-sans focus:outline-none focus:border-primary-red transition"
                  required
                />
              </div>
              <div>
                <label className="block font-sans text-sm font-semibold mb-2">Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-3 border-2 border-border-gray rounded font-sans focus:outline-none focus:border-primary-red transition"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary-red text-white px-8 py-3 font-sans font-bold text-sm uppercase hover:bg-[#e02835] transition rounded"
              >
                Sign In
              </button>
            </form>
            <p className="text-center mt-6 font-sans text-sm text-text-gray">
              Don't have an account? <a href="#" className="text-primary-red hover:underline font-semibold">Sign up</a>
            </p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Check if it's a category page
  const categoryData = await getCategory(slug);
  if (categoryData) {
    const posts = await getPosts({ categories: categoryData.id.toString(), per_page: 30 });

    return (
      <>
        <Header />

        <main className="max-w-7xl mx-auto px-4 py-12">
          {/* Category Header */}
          <div className="mb-12 pb-8 border-b-2 border-border-gray">
            <h1 className="font-headline text-5xl md:text-6xl font-black uppercase mb-4 tracking-tight">
              {categoryData.name}
            </h1>
            <p className="font-sans text-text-gray">
              {categoryData.count} {categoryData.count === 1 ? 'article' : 'articles'}
            </p>
          </div>

          {/* Articles Grid */}
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => {
                const imageUrl = getFeaturedImageUrl(post);
                const author = getAuthorName(post);
                const date = formatDate(post.date);

                return (
                  <article key={post.id} className="group">
                    <Link href={`/${post.slug}`}>
                      {imageUrl && (
                        <div className="relative w-full aspect-[580/436] mb-4 rounded overflow-hidden">
                          <Image
                            src={imageUrl}
                            alt={post.title.rendered}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        </div>
                      )}

                      <h2 className="font-serif text-[22px] font-bold leading-tight mb-3 group-hover:text-primary-red transition">
                        {post.title.rendered}
                      </h2>

                      <p className="font-serif text-text-gray mb-3 leading-relaxed line-clamp-3">
                        {post.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 120)}...
                      </p>

                      <div className="flex items-center gap-2 text-xs font-sans uppercase">
                        <span className="text-primary-red font-semibold">{author}</span>
                        <span className="text-text-gray">•</span>
                        <span className="text-text-gray">{date}</span>
                      </div>
                    </Link>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="font-sans text-xl text-text-gray">
                No articles found in this category.
              </p>
            </div>
          )}
        </main>

        <Footer />
      </>
    );
  }

  // Finally, try to load it as an article
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const imageUrl = getFeaturedImageUrl(post);
  const author = getAuthorName(post);
  const authorSlug = post._embedded?.author?.[0]?.slug || '';
  const authorBio = post._embedded?.author?.[0]?.description || `${author} is a contributing writer for Liberty Nation, covering politics, culture, and current events with a focus on constitutional liberty and American values.`;
  const authorAvatar = getAuthorAvatar(post);
  const authorTitle = getAuthorTitle(post);
  const category = getCategoryName(post);
  const date = formatDate(post.date);

  // Check if post is in LNTV category (ID: 600) or child categories - hide featured image for LNTV posts
  const isLNTV = await isLNTVPost(post);
  const shouldShowFeaturedImage = imageUrl && !isLNTV;

  return (
    <>
      <Header />

      <article className="bg-bg-offwhite">
        {/* SECTION 1: Wide Header - Category, Title, Excerpt (max-w-[1400px]) */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-12 pb-8">
          {/* Category Badge */}
          <div className="mb-8">
            <Link href={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}>
              <span className="inline-block font-sans font-bold text-sm uppercase text-gray-700 hover:text-primary-red transition tracking-wider border-b-2 border-transparent hover:border-primary-red pb-1">
                {category} ▼
              </span>
            </Link>
          </div>

          {/* Title - Extra large, impactful headline */}
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.05] font-bold mb-10 text-gray-900 tracking-tight">
            {decodeHtmlEntities(post.title.rendered)}
          </h1>

          {/* Excerpt/Dek - Large intro text with more breathing room */}
          {post.excerpt.rendered && (
            <p className="font-serif text-2xl md:text-3xl leading-[1.5] text-gray-700 mb-12 max-w-[1200px]">
              {decodeHtmlEntities(stripHtmlTags(post.excerpt.rendered))}
            </p>
          )}

          {/* Author Byline & Metadata - In wide header section */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pb-12 border-b border-gray-300">
            <div>
              <Link href={`/author/${authorSlug}`}>
                <h2 className="font-serif text-2xl md:text-3xl text-primary-red hover:underline mb-2">
                  By {author}
                </h2>
              </Link>
              <div className="flex items-center gap-3 text-base font-sans text-gray-600">
                <span>{date}</span>
                <span>•</span>
                <span className="uppercase tracking-wide">{category}</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <FollowTopicButton
                author={author}
                category={category}
                title={post.title.rendered}
              />
              <ShareButtons
                title={post.title.rendered}
                url={`https://www.libertynation.com/${post.slug}`}
              />
            </div>
          </div>
        </div>

        {/* SECTION 2: Ultra-wide Featured Image (max-w-[1600px]) */}
        {shouldShowFeaturedImage && (
          <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-16">
            <div className="relative w-full aspect-[16/9] overflow-hidden bg-gray-200 shadow-2xl">
              <Image
                src={imageUrl}
                alt={post.title.rendered}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 1600px"
              />
            </div>
          </div>
        )}

        {/* SECTION 3: Readable Content Section (max-w-[750px]) */}
        <div className="max-w-[750px] mx-auto px-6 md:px-8 py-12">
          {/* Content - Clean readable typography */}
          <div
            className="prose prose-xl max-w-none font-serif
              prose-headings:font-serif prose-headings:font-bold prose-headings:text-gray-900
              prose-h2:text-4xl prose-h2:mt-14 prose-h2:mb-6 prose-h2:leading-tight
              prose-h3:text-3xl prose-h3:mt-12 prose-h3:mb-5
              prose-h4:text-2xl prose-h4:mt-10 prose-h4:mb-4
              prose-p:text-[21px] prose-p:leading-[1.75] prose-p:mb-8 prose-p:text-gray-900
              prose-a:text-primary-red prose-a:no-underline hover:prose-a:underline prose-a:transition-colors prose-a:font-medium
              prose-strong:font-bold prose-strong:text-gray-900
              prose-em:italic
              prose-img:my-12 prose-img:w-full prose-img:rounded-sm prose-img:shadow-lg
              prose-figcaption:text-base prose-figcaption:text-gray-600 prose-figcaption:mt-4 prose-figcaption:text-center prose-figcaption:italic
              prose-ul:my-8 prose-ul:list-disc prose-ul:pl-8
              prose-ol:my-8 prose-ol:list-decimal prose-ol:pl-8
              prose-li:text-[21px] prose-li:leading-[1.75] prose-li:mb-3
              prose-blockquote:border-l-4 prose-blockquote:border-primary-red prose-blockquote:pl-8 prose-blockquote:py-6 prose-blockquote:italic prose-blockquote:text-2xl prose-blockquote:leading-relaxed prose-blockquote:text-gray-800
              prose-hr:border-gray-300 prose-hr:my-14"
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />

          {/* Author Bio */}
          <div className="mt-20 p-8 bg-white border border-gray-200 rounded-sm shadow-sm">
            <div className="flex items-start gap-6">
              <Link href={`/author/${authorSlug}`} className="flex-shrink-0">
                {authorAvatar ? (
                  <div className="w-24 h-24 rounded-full overflow-hidden hover:opacity-80 transition">
                    <Image
                      src={authorAvatar}
                      alt={author}
                      width={96}
                      height={96}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ) : (
                  <div className="w-24 h-24 bg-primary-red rounded-full flex items-center justify-center text-white font-serif font-bold text-3xl hover:bg-[#e02835] transition">
                    {author.charAt(0)}
                  </div>
                )}
              </Link>
              <div className="flex-1">
                <Link href={`/author/${authorSlug}`}>
                  <h3 className="font-serif text-2xl font-bold mb-1 text-gray-900 hover:text-primary-red transition">{author}</h3>
                </Link>
                {authorTitle && (
                  <p className="font-sans text-sm text-gray-600 uppercase tracking-wider mb-4 font-semibold">
                    {authorTitle}
                  </p>
                )}
                <p className="font-serif text-lg text-gray-700 leading-relaxed">
                  {authorBio}
                </p>
              </div>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </>
  );
}
