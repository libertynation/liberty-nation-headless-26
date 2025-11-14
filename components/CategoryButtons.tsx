import Link from 'next/link';
import { getCategories, getPosts } from '@/lib/wordpress';

interface CategoryButtonsProps {
  variant?: 'default' | 'compact';
  limit?: number;
}

export default async function CategoryButtons({ variant = 'default', limit = 10 }: CategoryButtonsProps) {
  // Fetch recent posts to determine which categories are active
  const recentPosts = await getPosts({ per_page: 100, orderby: 'date', order: 'desc' });

  // Count posts per category from recent posts
  const categoryCounts = new Map<number, number>();
  recentPosts.forEach(post => {
    post.categories.forEach(catId => {
      categoryCounts.set(catId, (categoryCounts.get(catId) || 0) + 1);
    });
  });

  // Fetch all categories
  const allCategories = await getCategories();

  // Filter categories with recent posts and sort by post count
  const activeCategories = allCategories
    .filter(cat => {
      const count = categoryCounts.get(cat.id) || 0;
      // Only include categories with at least 3 recent posts
      return count >= 3;
    })
    .sort((a, b) => {
      const countA = categoryCounts.get(a.id) || 0;
      const countB = categoryCounts.get(b.id) || 0;
      return countB - countA; // Sort by count descending
    })
    .slice(0, limit); // Limit to top categories

  if (activeCategories.length === 0) {
    return null;
  }

  if (variant === 'compact') {
    return (
      <div className="flex flex-wrap items-center gap-3">
        {activeCategories.map((category) => (
          <Link
            key={category.id}
            href={`/category/${category.slug}`}
            className="px-4 py-2 bg-white border-2 border-border-dark text-text-dark font-sans text-sm font-bold uppercase tracking-wide hover:bg-text-dark hover:text-white hover:border-text-dark transition-all duration-300"
          >
            {category.name}
          </Link>
        ))}
      </div>
    );
  }

  // Default variant - Editorial style with decorative elements
  return (
    <div className="bg-gradient-to-br from-white to-bg-gray border-t-4 border-b-4 border-primary-red py-12 md:py-16">
      <div className="max-w-[1400px] mx-auto px-8">
        {/* Section Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-[2px] bg-primary-red" />
            <svg className="w-3 h-3 text-primary-red" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            <svg className="w-3 h-3 text-primary-red" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            <svg className="w-3 h-3 text-primary-red" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            <div className="w-12 h-[2px] bg-primary-red" />
          </div>
          <h2 className="font-display font-black text-3xl md:text-4xl uppercase tracking-tight text-text-dark mb-2">
            Explore Topics
          </h2>
          <p className="font-serif text-lg text-text-gray">
            Browse our most active categories
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {activeCategories.map((category) => {
            const postCount = categoryCounts.get(category.id) || 0;
            return (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="group relative bg-white border-2 border-border-dark hover:border-primary-red p-6 transition-all duration-300 hover:shadow-xl hover:shadow-primary-red/10"
              >
                {/* Corner Accent */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary-red opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary-red opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="text-center">
                  <h3 className="font-display font-bold text-xl md:text-2xl uppercase tracking-tight text-text-dark group-hover:text-primary-red transition-colors duration-300 mb-2">
                    {category.name}
                  </h3>
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-8 h-[2px] bg-primary-red" />
                  </div>
                  <p className="font-sans text-xs uppercase tracking-widest text-text-gray mt-3">
                    {postCount} {postCount === 1 ? 'Article' : 'Articles'}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Decorative Bottom Divider */}
        <div className="flex items-center justify-center gap-3 mt-12">
          <div className="w-12 h-[2px] bg-primary-red" />
          <svg className="w-3 h-3 text-primary-red" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
          <svg className="w-3 h-3 text-primary-red" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
          <svg className="w-3 h-3 text-primary-red" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
          <div className="w-12 h-[2px] bg-primary-red" />
        </div>
      </div>
    </div>
  );
}
