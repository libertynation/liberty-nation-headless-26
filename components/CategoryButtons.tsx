import Link from 'next/link';
import { getCategories, getChildCategories } from '@/lib/wordpress';

export default async function CategoryButtons() {
  // Fetch all categories
  const allCategories = await getCategories();

  // Define top-level parent categories to display (customize based on your site structure)
  // Filter to only show parent categories (no parent field or parent === 0)
  const parentCategories = allCategories
    .filter(cat => !cat.parent || cat.parent === 0)
    .filter(cat => cat.count > 0); // Only show categories with articles

  // For each parent, get total count including children
  const categoriesWithTotalCounts = await Promise.all(
    parentCategories.map(async (category) => {
      const childCategories = await getChildCategories(category.id);
      const totalCount = category.count + childCategories.reduce((sum, child) => sum + child.count, 0);
      return { ...category, totalCount };
    })
  );

  // Sort by total count (including children) and take top categories
  const topCategories = categoriesWithTotalCounts
    .filter(cat => cat.totalCount > 50) // Only show categories with substantial content
    .sort((a, b) => b.totalCount - a.totalCount)
    .slice(0, 8); // Take top 8, ensuring even number

  // Ensure even number of categories
  const displayCategories = topCategories.length % 2 === 0
    ? topCategories
    : topCategories.slice(0, -1); // Remove last one if odd

  if (displayCategories.length === 0) {
    return null;
  }

  return (
    <div className="bg-white border-t border-gray-200 py-8">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="mb-6">
          <h2 className="font-sans font-bold text-sm uppercase tracking-widest text-gray-500">
            Explore by Topic
          </h2>
        </div>

        {/* Single Row Category Grid - Clean TheFP.com style */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {displayCategories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="group flex flex-col items-start p-4 border border-gray-200 hover:border-primary-red transition-all duration-200 bg-white hover:bg-gray-50"
            >
              <h3 className="font-sans font-bold text-base text-gray-900 group-hover:text-primary-red transition-colors duration-200 mb-2">
                {category.name}
              </h3>
              <span className="font-sans text-xs text-gray-500 uppercase tracking-wide">
                {category.totalCount.toLocaleString()} {category.totalCount === 1 ? 'Article' : 'Articles'}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
