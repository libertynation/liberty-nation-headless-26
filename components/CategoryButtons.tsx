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
    <div className="bg-white relative">
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-black" />
      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-black" />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 py-6">
        <div className="flex items-center gap-6">
          {/* Explore Topics Label - Black box with white text */}
          <div className="flex-shrink-0">
            <span className="font-sans font-black text-xl uppercase text-white bg-black px-6 py-4 inline-block tracking-tight">
              EXPLORE TOPICS
            </span>
          </div>

          {/* Category Grid - Inline with label, items-center for vertical alignment */}
          <div className="flex-1 grid grid-cols-4 lg:grid-cols-8 gap-3 items-center">
            {displayCategories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="group text-center py-4 px-3 border-2 border-gray-200 hover:border-black hover:bg-black transition-all duration-300 flex items-center justify-center"
              >
                <h3 className="font-sans font-bold text-sm text-gray-900 group-hover:text-white transition-colors duration-300 leading-tight">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
