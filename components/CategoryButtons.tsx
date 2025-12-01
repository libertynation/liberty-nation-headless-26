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
    <div className="bg-white py-10 sm:py-12 border-t-2 border-black">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-sans font-black text-2xl sm:text-3xl uppercase tracking-tight">
            Explore Topics
          </h2>
        </div>

        {/* Category Grid - Clean editorial style */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {displayCategories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="group text-center py-4 px-3 border-2 border-gray-200 hover:border-black hover:bg-black transition-all duration-300"
            >
              <h3 className="font-sans font-bold text-sm text-gray-900 group-hover:text-white transition-colors duration-300 leading-tight">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
