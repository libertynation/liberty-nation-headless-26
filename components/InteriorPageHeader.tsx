import { spacing, typography } from '@/lib/design-tokens';

interface InteriorPageHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  variant?: 'white' | 'black';
}

/**
 * Interior Page Header Component
 *
 * Clean, editorial-style header for static pages (about, contact, donate, subscribe, etc.)
 * NOT for posts, archives, authors, or categories.
 *
 * Inspired by thefp.com editorial aesthetic with:
 * - Bold serif typography (font-display for titles)
 * - Clean borders (3px bottom border for white variant)
 * - Excellent contrast (text-gray-900 on white, white/gray-300 on black)
 * - Simple, elegant spacing
 *
 * Usage Examples:
 *
 * // Black background variant (for donate, about pages)
 * <InteriorPageHeader
 *   title="Support Independent Journalism"
 *   description="Your contribution helps us deliver independent journalism."
 *   variant="black"
 * />
 *
 * // White background variant (default)
 * <InteriorPageHeader
 *   title="Privacy Policy"
 *   subtitle="Your privacy matters to us"
 *   description="Learn how we protect your personal information."
 * />
 *
 * // Minimal usage (title only)
 * <InteriorPageHeader title="Terms and Conditions" />
 */
export default function InteriorPageHeader({
  title,
  subtitle,
  description,
  variant = 'white'
}: InteriorPageHeaderProps) {

  if (variant === 'black') {
    return (
      <section className={`bg-black text-white ${spacing.section.xl} relative`}>
        <div className="max-w-[900px] mx-auto px-8">
          <div className="text-center">
            <h1 className={`font-display font-bold ${typography.display.hero} mb-8 leading-[1.05]`}>
              {title}
            </h1>
            {subtitle && (
              <p className={`font-display text-2xl md:text-3xl text-white/80 mb-6 leading-[1.2]`}>
                {subtitle}
              </p>
            )}
            {description && (
              <p className={`font-serif ${typography.body.xl} text-white/80 leading-[1.7] max-w-[700px] mx-auto`}>
                {description}
              </p>
            )}
          </div>
        </div>
      </section>
    );
  }

  // White variant (default)
  return (
    <section className={`bg-white border-b-[3px] border-black ${spacing.section.xl}`}>
      <div className="max-w-[900px] mx-auto px-8">
        <div className="text-center">
          <h1 className={`font-display font-bold ${typography.display.hero} text-gray-900 mb-8 leading-[1.05]`}>
            {title}
          </h1>
          {subtitle && (
            <p className={`font-display text-2xl md:text-3xl text-gray-700 mb-6 leading-[1.2]`}>
              {subtitle}
            </p>
          )}
          {description && (
            <p className={`font-serif ${typography.body.xl} text-gray-600 leading-[1.7] max-w-[700px] mx-auto`}>
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
