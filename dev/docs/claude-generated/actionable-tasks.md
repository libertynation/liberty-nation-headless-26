# Liberty Nation Website - Actionable Development Tasks
**Generated From:** Design Review Reports
**Date:** 2025-11-14
**Total Issues Identified:** 81 (11 Critical, 35 High, 27 Medium, 8 Low)

---

## Executive Summary

This document consolidates all issues from 3 comprehensive design reviews into prioritized, actionable development tasks. Each task includes specific file paths, code changes needed, effort estimates, and dependencies.

### Issue Distribution by Severity:
- **CRITICAL (P0):** 11 issues - Must fix before launch
- **HIGH (P1):** 35 issues - Fix within 1 week
- **MEDIUM (P2):** 27 issues - Fix within 2-4 weeks
- **LOW (P3):** 8 issues - Nice to have improvements

### Total Estimated Effort: 180-220 hours (4.5-5.5 weeks at full-time)

---

## Sprint 1: Critical Issues (Week 1 - P0)
**Goal:** Fix show-stopping issues that prevent launch
**Total Effort:** 40-50 hours

---

### TASK-001: Fix Broken Images Throughout Mobile Site
**Priority:** P0 (CRITICAL)
**Severity:** CRITICAL
**Effort:** 8-12 hours
**Dependencies:** None

**Problem:**
Multiple article cards show gray placeholder boxes with broken image icons. This destroys credibility and makes the site appear completely broken.

**Affected Components:**
- Mobile homepage article cards
- Mobile article page related content cards
- Any component using article images

**Files to Modify:**
```
src/components/ArticleCard.tsx
src/components/FeaturedArticle.tsx
src/components/RelatedArticles.tsx
src/lib/imageUtils.ts (create)
public/images/fallbacks/ (create directory)
```

**Implementation Steps:**
1. Create image utility functions with error handling:
```typescript
// src/lib/imageUtils.ts
export const getImageWithFallback = (
  primarySrc: string,
  fallbackSrc: string = '/images/fallbacks/article-placeholder.svg'
): string => {
  return primarySrc || fallbackSrc;
};

export const handleImageError = (
  event: React.SyntheticEvent<HTMLImageElement>,
  categoryIcon?: string
) => {
  event.currentTarget.src = categoryIcon || '/images/fallbacks/article-placeholder.svg';
  event.currentTarget.classList.add('fallback-image');
};
```

2. Update ArticleCard component:
```typescript
// src/components/ArticleCard.tsx
import { getImageWithFallback, handleImageError } from '@/lib/imageUtils';

// Replace image implementation:
<Image
  src={getImageWithFallback(article.featuredImage, `/images/categories/${article.category}.svg`)}
  alt={article.title}
  width={800}
  height={600}
  onError={(e) => handleImageError(e, `/images/categories/${article.category}.svg`)}
  loading="lazy"
  placeholder="blur"
  blurDataURL="data:image/svg+xml;base64,..."
/>
```

3. Create category-specific fallback icons:
```
/public/images/fallbacks/
  - article-placeholder.svg
  - news.svg
  - opinion.svg
  - politics.svg
  - culture.svg
```

4. Add skeleton loading states:
```typescript
// src/components/ArticleCard.tsx
{isLoading ? (
  <div className="article-card-skeleton">
    <div className="skeleton-image" style={{ aspectRatio: '16/9', background: '#f0f0f0' }} />
    <div className="skeleton-title" />
    <div className="skeleton-excerpt" />
  </div>
) : (
  // Actual card content
)}
```

**Success Criteria:**
- All images load properly or show category-appropriate fallback
- No broken image icons visible
- Skeleton screens show during loading
- Layout doesn't shift when images load

**Testing:**
- Test with invalid image URLs
- Test with slow 3G connection
- Verify srcset and responsive images work
- Check accessibility of alt text

---

### TASK-002: Remove Mid-Article Promotional Interruptions
**Priority:** P0 (CRITICAL)
**Severity:** CRITICAL
**Effort:** 4-6 hours
**Dependencies:** None

**Problem:**
Article content is interrupted after one paragraph by massive "LIBERTY NATION TV" promotional block. This destroys reading flow and creates terrible UX.

**Files to Modify:**
```
src/app/article/[slug]/page.tsx
src/components/ArticleContent.tsx
src/components/PromotionalBlock.tsx
src/components/RelatedContent.tsx
```

**Implementation Steps:**

1. Move promotional content to end of article:
```typescript
// src/app/article/[slug]/page.tsx
export default function ArticlePage({ params }: { params: { slug: string } }) {
  return (
    <main>
      <ArticleHeader />
      <ArticleContent /> {/* Full article content, no interruptions */}
      <ArticleFooter />

      {/* Promotional content AFTER article */}
      <Separator />
      <PromotionalBlock variant="tv" />
      <RelatedArticles />
      <NewsletterSignup />
    </main>
  );
}
```

2. Add visual separator between article and promotional content:
```typescript
// src/components/Separator.tsx
export function Separator() {
  return (
    <div className="article-end-separator">
      <hr className="separator-line" />
      <p className="separator-text">Continue Exploring</p>
      <hr className="separator-line" />
    </div>
  );
}

// CSS
.article-end-separator {
  margin: 60px 0 40px;
  display: flex;
  align-items: center;
  gap: 16px;
}

.separator-line {
  flex: 1;
  height: 1px;
  background: rgba(0,0,0,0.1);
  border: none;
}

.separator-text {
  font-size: 14px;
  color: #666;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
```

3. Create subtle in-article promotional options (ONLY if needed):
```typescript
// Optional: Subtle inline promotion ONLY after 50% of article
// src/components/InlineNewsletterPrompt.tsx
export function InlineNewsletterPrompt() {
  return (
    <aside className="inline-newsletter-prompt">
      <p className="prompt-text">
        <strong>Enjoying this article?</strong> Get similar stories delivered to your inbox.
      </p>
      <form className="inline-newsletter-form">
        <input type="email" placeholder="Your email" />
        <button type="submit">Subscribe</button>
      </form>
    </aside>
  );
}

// CSS
.inline-newsletter-prompt {
  background: #f8f9fa;
  border-left: 4px solid #DC2626;
  padding: 24px;
  margin: 40px 0;
  max-width: 600px;
}
```

**Success Criteria:**
- Article content flows uninterrupted from start to finish
- Promotional content appears ONLY after article conclusion
- Clear visual separation between article and promotions
- Reading flow feels natural and professional

---

### TASK-003: Implement Proper Typography Hierarchy
**Priority:** P0 (CRITICAL)
**Severity:** CRITICAL
**Effort:** 8-10 hours
**Dependencies:** None

**Problem:**
Type hierarchy is weak throughout the site. Headlines don't have enough differentiation, body text is too small on mobile, and there's no clear visual hierarchy.

**Files to Modify:**
```
src/styles/globals.css
src/styles/typography.css (create)
tailwind.config.ts
src/app/layout.tsx
```

**Implementation Steps:**

1. Create typography design tokens:
```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      fontSize: {
        // Desktop sizes
        'hero-h1': ['56px', { lineHeight: '1.2', fontWeight: '800' }],
        'section-h2': ['40px', { lineHeight: '1.3', fontWeight: '700' }],
        'card-h3': ['24px', { lineHeight: '1.4', fontWeight: '600' }],
        'body': ['18px', { lineHeight: '1.7', fontWeight: '400' }],
        'small': ['14px', { lineHeight: '1.5', fontWeight: '400' }],

        // Mobile overrides
        'mobile-hero-h1': ['32px', { lineHeight: '1.2', fontWeight: '800' }],
        'mobile-section-h2': ['28px', { lineHeight: '1.3', fontWeight: '700' }],
        'mobile-card-h3': ['20px', { lineHeight: '1.4', fontWeight: '600' }],
        'mobile-body': ['18px', { lineHeight: '1.7', fontWeight: '400' }],
      },
      fontWeight: {
        'extra-bold': '800',
        'bold': '700',
        'semi-bold': '600',
        'regular': '400',
      },
      letterSpacing: {
        'caps': '0.05em',
      }
    }
  }
}
```

2. Create typography utility classes:
```css
/* src/styles/typography.css */

/* Desktop Typography */
.typography-hero-h1 {
  font-size: 56px;
  line-height: 1.2;
  font-weight: 800;
  margin-bottom: 24px;
}

.typography-section-h2 {
  font-size: 40px;
  line-height: 1.3;
  font-weight: 700;
  margin-bottom: 20px;
}

.typography-card-h3 {
  font-size: 24px;
  line-height: 1.4;
  font-weight: 600;
  margin-bottom: 12px;
}

.typography-body {
  font-size: 18px;
  line-height: 1.7;
  font-weight: 400;
  margin-bottom: 20px;
}

.typography-meta {
  font-size: 14px;
  line-height: 1.5;
  font-weight: 400;
  color: #666;
}

.typography-caps {
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: 14px;
  font-weight: 600;
}

/* Mobile Typography Overrides */
@media (max-width: 768px) {
  .typography-hero-h1 {
    font-size: 32px;
  }

  .typography-section-h2 {
    font-size: 28px;
  }

  .typography-card-h3 {
    font-size: 20px;
  }

  .typography-body {
    font-size: 18px;
    line-height: 1.7;
  }
}

/* Article-Specific Typography */
.article-content {
  font-size: 18px;
  line-height: 1.7;
}

.article-content h1 {
  font-size: 28px;
  line-height: 1.3;
  font-weight: 700;
  margin: 40px 0 16px;
}

.article-content h2 {
  font-size: 24px;
  line-height: 1.3;
  font-weight: 600;
  margin: 32px 0 12px;
}

.article-content p {
  margin-bottom: 1.5em;
}

.article-content a {
  color: #DC2626;
  text-decoration: underline;
  font-weight: 500;
}
```

3. Update global styles with font smoothing:
```css
/* src/styles/globals.css */
* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  font-feature-settings: "kern" 1;
}

body {
  font-family: var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI',
               'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
  font-size: 16px;
  line-height: 1.5;
  color: #1F2937;
}
```

4. Update components to use new typography:
```typescript
// src/components/ArticleCard.tsx
<article className="article-card">
  <h3 className="typography-card-h3">{title}</h3>
  <p className="typography-body">{excerpt}</p>
  <div className="typography-meta">
    <span>{author}</span>
    <span>{date}</span>
  </div>
</article>

// src/components/HeroSection.tsx
<section className="hero">
  <h1 className="typography-hero-h1">{headline}</h1>
  <p className="typography-body">{subheading}</p>
</section>
```

**Success Criteria:**
- Clear visual hierarchy: H1 significantly larger than H2, H2 larger than H3
- Mobile body text is 18px minimum
- Line heights provide comfortable reading (1.7 for body)
- Font weights create clear distinction (800, 700, 600, 400)
- Paragraph spacing allows breathing room

**Testing:**
- View on multiple screen sizes
- Test with long headlines (multi-line)
- Verify readability with actual content
- Check contrast ratios meet WCAG AA

---

### TASK-004: Reduce Red Color Usage and Establish Visual Hierarchy
**Priority:** P0 (CRITICAL)
**Severity:** CRITICAL
**Effort:** 6-8 hours
**Dependencies:** TASK-003 (Typography)

**Problem:**
Excessive red color usage throughout the site creates visual fatigue, destroys hierarchy, and makes everything look equally important (which means nothing is important).

**Files to Modify:**
```
tailwind.config.ts
src/styles/globals.css
src/styles/colors.css (create)
src/components/CategoryBadge.tsx
src/components/Button.tsx
src/components/ArticleCard.tsx
```

**Implementation Steps:**

1. Define color system with usage guidelines:
```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        // Primary - Use sparingly for CTAs only
        'liberty-red': {
          50: '#FEF2F2',
          100: '#FEE2E2',
          500: '#DC2626', // Primary CTA color
          600: '#B91C1C',
          700: '#991B1B',
        },

        // Secondary - Category differentiation
        'category-news': '#1E40AF',      // Blue
        'category-opinion': '#7C3AED',   // Purple
        'category-culture': '#059669',   // Green
        'category-politics': '#DC2626',  // Red (limited use)
        'category-video': '#EA580C',     // Orange

        // Neutral palette
        'gray': {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
      }
    }
  }
}
```

2. Create color usage guidelines:
```css
/* src/styles/colors.css */

/* RED USAGE RULES - Maximum 10-15% of viewport */
.btn-primary {
  background-color: #DC2626;
  color: white;
}

.btn-primary:hover {
  background-color: #B91C1C;
}

/* NO RED BACKGROUNDS FOR SECTIONS */
.section-background {
  background-color: white;
}

.section-background-alternate {
  background-color: #F9FAFB;
}

/* Category Badge Colors */
.category-badge {
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 4px 12px;
  border-radius: 4px;
  display: inline-block;
}

.category-badge-news {
  background-color: rgba(30, 64, 175, 0.1);
  color: #1E40AF;
  border: 1px solid rgba(30, 64, 175, 0.2);
}

.category-badge-opinion {
  background-color: rgba(124, 58, 237, 0.1);
  color: #7C3AED;
  border: 1px solid rgba(124, 58, 237, 0.2);
}

.category-badge-culture {
  background-color: rgba(5, 150, 105, 0.1);
  color: #059669;
  border: 1px solid rgba(5, 150, 105, 0.2);
}

.category-badge-politics {
  background-color: rgba(220, 38, 38, 0.1);
  color: #DC2626;
  border: 1px solid rgba(220, 38, 38, 0.2);
}

.category-badge-video {
  background-color: rgba(234, 88, 12, 0.1);
  color: #EA580C;
  border: 1px solid rgba(234, 88, 12, 0.2);
}
```

3. Update CategoryBadge component:
```typescript
// src/components/CategoryBadge.tsx
type Category = 'news' | 'opinion' | 'culture' | 'politics' | 'video';

interface CategoryBadgeProps {
  category: Category;
  className?: string;
}

export function CategoryBadge({ category, className = '' }: CategoryBadgeProps) {
  return (
    <span className={`category-badge category-badge-${category} ${className}`}>
      {category}
    </span>
  );
}
```

4. Update Button component with clear hierarchy:
```typescript
// src/components/Button.tsx
type ButtonVariant = 'primary' | 'secondary' | 'tertiary';

interface ButtonProps {
  variant?: ButtonVariant;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function Button({
  variant = 'primary',
  children,
  onClick,
  className = ''
}: ButtonProps) {
  const baseStyles = 'px-8 py-4 rounded font-semibold transition-all duration-200';

  const variantStyles = {
    primary: 'bg-liberty-red-500 text-white hover:bg-liberty-red-600',
    secondary: 'border-2 border-liberty-red-500 text-liberty-red-500 hover:bg-liberty-red-50',
    tertiary: 'text-liberty-red-500 hover:underline',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
```

5. Establish visual hierarchy rules:
```typescript
// src/lib/visualHierarchy.ts
/**
 * Visual Hierarchy Rules:
 *
 * PRIMARY (60% visual weight):
 * - Hero section
 * - Featured article
 * - Primary CTA
 *
 * SECONDARY (30% visual weight):
 * - Section headings
 * - Featured cards (2-3)
 * - Secondary CTAs
 *
 * TERTIARY (10% visual weight):
 * - Regular article grid
 * - Footer content
 * - Metadata
 */

export const VISUAL_WEIGHT = {
  PRIMARY: {
    size: 'large',
    color: 'bold',
    spacing: 'generous',
  },
  SECONDARY: {
    size: 'medium',
    color: 'moderate',
    spacing: 'comfortable',
  },
  TERTIARY: {
    size: 'small',
    color: 'subtle',
    spacing: 'compact',
  },
} as const;
```

**Success Criteria:**
- Red used for primary CTAs only (1-2 per viewport)
- Category badges use color-coded system
- Visual hierarchy clear: Primary > Secondary > Tertiary content
- No red background sections
- Maximum 10-15% of page real estate uses red

**Testing:**
- Take screenshots and measure red pixel percentage
- Verify hierarchy: eye should go to hero first, then featured, then grid
- Test with color blindness simulator
- Ensure WCAG contrast requirements met

---

### TASK-005: Implement Consistent Spacing System
**Priority:** P0 (CRITICAL)
**Severity:** CRITICAL
**Effort:** 6-8 hours
**Dependencies:** None

**Problem:**
Spacing is inconsistent throughout the site. Some sections cramped together, others have excessive gaps. No systematic approach to vertical rhythm.

**Files to Modify:**
```
tailwind.config.ts
src/styles/spacing.css (create)
src/components/Container.tsx
src/components/Section.tsx
```

**Implementation Steps:**

1. Define spacing scale in Tailwind:
```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      spacing: {
        // 8px base grid system
        '1': '8px',
        '2': '16px',
        '3': '24px',
        '4': '32px',
        '6': '48px',
        '8': '64px',
        '12': '96px',
        '16': '128px',
        '20': '160px',

        // Component-specific spacing
        'card-gap': '24px',
        'section-gap': '96px',
        'section-gap-mobile': '48px',
        'element-gap': '16px',
      }
    }
  }
}
```

2. Create spacing utility CSS:
```css
/* src/styles/spacing.css */

/* Vertical Rhythm Rules */
:root {
  --space-unit: 8px;

  /* Component spacing */
  --space-element: calc(var(--space-unit) * 2);    /* 16px */
  --space-component: calc(var(--space-unit) * 3);  /* 24px */
  --space-section: calc(var(--space-unit) * 12);   /* 96px */

  /* Mobile overrides */
  --space-section-mobile: calc(var(--space-unit) * 6); /* 48px */
}

/* Section spacing */
.section {
  padding-top: var(--space-section);
  padding-bottom: var(--space-section);
}

@media (max-width: 768px) {
  .section {
    padding-top: var(--space-section-mobile);
    padding-bottom: var(--space-section-mobile);
  }
}

/* Card grid spacing */
.card-grid {
  display: grid;
  gap: var(--space-component);
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}

/* Element spacing */
.element-stack > * + * {
  margin-top: var(--space-element);
}

/* Paragraph spacing */
p + p {
  margin-top: 1.5em;
}

/* Heading spacing */
h1, h2, h3, h4 {
  margin-top: 1.5em;
  margin-bottom: 0.5em;
}

h1:first-child,
h2:first-child,
h3:first-child {
  margin-top: 0;
}
```

3. Create Section component:
```typescript
// src/components/Section.tsx
interface SectionProps {
  children: React.ReactNode;
  className?: string;
  spacing?: 'default' | 'compact' | 'generous';
  background?: 'white' | 'gray';
}

export function Section({
  children,
  className = '',
  spacing = 'default',
  background = 'white'
}: SectionProps) {
  const spacingClasses = {
    compact: 'py-12 md:py-16',
    default: 'py-16 md:py-24',
    generous: 'py-24 md:py-32',
  };

  const backgroundClasses = {
    white: 'bg-white',
    gray: 'bg-gray-50',
  };

  return (
    <section
      className={`
        ${spacingClasses[spacing]}
        ${backgroundClasses[background]}
        ${className}
      `}
    >
      <Container>{children}</Container>
    </section>
  );
}
```

4. Create Container component:
```typescript
// src/components/Container.tsx
interface ContainerProps {
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
}

export function Container({
  children,
  maxWidth = 'xl',
  className = ''
}: ContainerProps) {
  const maxWidthClasses = {
    sm: 'max-w-3xl',     // 768px - article content
    md: 'max-w-5xl',     // 1024px - standard content
    lg: 'max-w-6xl',     // 1152px - wide content
    xl: 'max-w-7xl',     // 1280px - full content
    full: 'max-w-full',  // 100% - media content
  };

  return (
    <div className={`mx-auto px-6 md:px-8 ${maxWidthClasses[maxWidth]} ${className}`}>
      {children}
    </div>
  );
}
```

5. Update homepage to use consistent spacing:
```typescript
// src/app/page.tsx
export default function HomePage() {
  return (
    <main>
      <HeroSection />

      <Section spacing="default" background="white">
        <h2>Latest News</h2>
        <ArticleGrid articles={latestNews} />
      </Section>

      <Section spacing="default" background="gray">
        <h2>Opinion</h2>
        <ArticleGrid articles={opinions} />
      </Section>

      <Section spacing="compact" background="white">
        <NewsletterSignup />
      </Section>
    </main>
  );
}
```

**Success Criteria:**
- All sections use consistent vertical spacing (96px desktop, 48px mobile)
- Card grids use consistent 24px gaps
- Element spacing follows 8px grid
- No arbitrary spacing values in components

**Testing:**
- Measure spacing between sections (should be consistent)
- Verify responsive behavior
- Check visual rhythm across entire page

---

### TASK-006: Add Proper Mobile Navigation
**Priority:** P0 (CRITICAL)
**Severity:** CRITICAL
**Effort:** 8-10 hours
**Dependencies:** TASK-004 (Colors)

**Problem:**
Mobile navigation is unclear or missing. No visible hamburger menu, no clear path to navigate site sections.

**Files to Modify:**
```
src/components/Header.tsx
src/components/MobileMenu.tsx (create)
src/components/SearchBar.tsx (create)
src/hooks/useScrollDirection.ts (create)
```

**Implementation Steps:**

1. Create mobile header component:
```typescript
// src/components/Header.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, Search, X } from 'lucide-react';
import { MobileMenu } from './MobileMenu';
import { SearchBar } from './SearchBar';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 -ml-2"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/images/liberty-nation-logo.svg"
                alt="Liberty Nation"
                width={180}
                height={40}
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/news" className="nav-link">News</Link>
              <Link href="/opinion" className="nav-link">Opinion</Link>
              <Link href="/culture" className="nav-link">Culture</Link>
              <Link href="/politics" className="nav-link">Politics</Link>
              <Link href="/video" className="nav-link">Video</Link>
            </nav>

            {/* Search Button */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 -mr-2"
              aria-label="Open search"
            >
              <Search className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* Search Overlay */}
      <SearchBar
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </>
  );
}
```

2. Create mobile menu drawer:
```typescript
// src/components/MobileMenu.tsx
'use client';

import { X } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { label: 'Home', href: '/' },
  { label: 'News', href: '/news' },
  { label: 'Opinion', href: '/opinion' },
  { label: 'Culture', href: '/culture' },
  { label: 'Politics', href: '/politics' },
  { label: 'Video', href: '/video' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  // Prevent body scroll when menu open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50 md:hidden"
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`
          fixed top-0 right-0 h-full w-[280px] bg-white z-50
          transform transition-transform duration-300 ease-out md:hidden
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-bold">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 -mr-2"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-6">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors"
                  onClick={onClose}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200">
          <button className="w-full btn-primary">
            Subscribe
          </button>
        </div>
      </div>
    </>
  );
}
```

3. Create search overlay:
```typescript
// src/components/SearchBar.tsx
'use client';

import { X, Search } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

interface SearchBarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchBar({ isOpen, onClose }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white z-50 p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Search</h2>
          <button onClick={onClose} aria-label="Close search">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search articles..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-300 rounded-lg focus:border-liberty-red-500 focus:outline-none"
          />
        </div>

        {/* Search Results */}
        {query && (
          <div className="mt-8">
            <p className="text-gray-500">Search results for "{query}"...</p>
            {/* Add search results here */}
          </div>
        )}
      </div>
    </div>
  );
}
```

4. Add CSS for navigation:
```css
/* src/styles/navigation.css */
.nav-link {
  font-size: 16px;
  font-weight: 500;
  color: #374151;
  transition: color 0.2s;
  position: relative;
}

.nav-link:hover {
  color: #DC2626;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #DC2626;
  transition: width 0.2s;
}

.nav-link:hover::after {
  width: 100%;
}
```

**Success Criteria:**
- Hamburger menu visible on mobile (44x44px touch target)
- Slide-in drawer from right with smooth animation
- Clear navigation to all main sections
- Search functionality accessible
- Sticky header with logo

**Testing:**
- Test on various mobile screen sizes
- Verify touch targets are 44x44px minimum
- Test drawer animation smoothness
- Ensure body scroll lock works

---

### TASK-007: Implement Card Design with Shadows and Hover States
**Priority:** P0 (CRITICAL)
**Severity:** CRITICAL
**Effort:** 6-8 hours
**Dependencies:** TASK-004 (Colors), TASK-005 (Spacing)

**Problem:**
Cards appear flat and generic with no shadows, borders, or hover states. Lacks professional polish.

**Files to Modify:**
```
src/components/ArticleCard.tsx
src/components/FeaturedArticle.tsx
src/styles/cards.css (create)
tailwind.config.ts
```

**Implementation Steps:**

1. Define shadow system in Tailwind:
```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      boxShadow: {
        'card': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 4px 16px rgba(0, 0, 0, 0.12)',
        'featured': '0 4px 16px rgba(0, 0, 0, 0.12)',
        'featured-hover': '0 8px 24px rgba(0, 0, 0, 0.16)',
      },
      transitionDuration: {
        '250': '250ms',
      },
      scale: {
        '102': '1.02',
      }
    }
  }
}
```

2. Create card styles:
```css
/* src/styles/cards.css */
.article-card {
  background: white;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  overflow: hidden;
  transition: all 250ms ease-out;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.article-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
  border-color: #D1D5DB;
}

.article-card-image {
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: #F3F4F6;
}

.article-card-image img {
  transition: transform 300ms ease-out;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.article-card:hover .article-card-image img {
  transform: scale(1.05);
}

.article-card-content {
  padding: 20px;
}

.article-card-title {
  font-size: 20px;
  font-weight: 600;
  line-height: 1.4;
  margin-bottom: 12px;
  color: #111827;
  transition: color 200ms;
}

.article-card:hover .article-card-title {
  color: #DC2626;
}

.article-card-excerpt {
  font-size: 16px;
  line-height: 1.6;
  color: #4B5563;
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-card-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: #6B7280;
}

/* Featured Card Variant */
.article-card-featured {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
}

.article-card-featured:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.16);
  transform: translateY(-4px);
}
```

3. Update ArticleCard component:
```typescript
// src/components/ArticleCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import { CategoryBadge } from './CategoryBadge';
import { formatDate, formatReadTime } from '@/lib/dateUtils';

interface ArticleCardProps {
  article: {
    id: string;
    title: string;
    excerpt: string;
    slug: string;
    featuredImage: string;
    category: string;
    author: string;
    publishedAt: string;
    readTime: number;
  };
  variant?: 'default' | 'featured';
}

export function ArticleCard({ article, variant = 'default' }: ArticleCardProps) {
  const cardClass = variant === 'featured'
    ? 'article-card article-card-featured'
    : 'article-card';

  return (
    <Link href={`/article/${article.slug}`} className={cardClass}>
      {/* Image */}
      <div className="article-card-image">
        <Image
          src={article.featuredImage}
          alt={article.title}
          width={800}
          height={450}
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="article-card-content">
        <CategoryBadge category={article.category} />

        <h3 className="article-card-title">
          {article.title}
        </h3>

        <p className="article-card-excerpt">
          {article.excerpt}
        </p>

        <div className="article-card-meta">
          <span>{article.author}</span>
          <span>•</span>
          <span>{formatDate(article.publishedAt)}</span>
          <span>•</span>
          <span>{formatReadTime(article.readTime)}</span>
        </div>
      </div>
    </Link>
  );
}
```

4. Add loading skeleton:
```typescript
// src/components/ArticleCardSkeleton.tsx
export function ArticleCardSkeleton() {
  return (
    <div className="article-card animate-pulse">
      <div className="article-card-image bg-gray-200" />
      <div className="article-card-content">
        <div className="h-5 w-20 bg-gray-200 rounded mb-3" />
        <div className="h-6 bg-gray-200 rounded mb-2" />
        <div className="h-6 bg-gray-200 rounded mb-3" />
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded" />
          <div className="h-4 bg-gray-200 rounded w-2/3" />
        </div>
      </div>
    </div>
  );
}
```

**Success Criteria:**
- Cards have subtle shadow (0 2px 8px rgba(0,0,0,0.08))
- Hover state increases shadow and lifts card (-2px translateY)
- Image scales slightly on hover (1.05)
- Title changes color on hover
- Transitions are smooth (250ms ease-out)
- 1px border in light gray

**Testing:**
- Test hover states on desktop
- Verify mobile doesn't show hover artifacts
- Check animation performance
- Ensure accessibility (links work, keyboard navigation)

---

## Sprint 2: High Priority Issues (Week 2 - P1)
**Goal:** Fix major UX and usability issues
**Total Effort:** 60-70 hours

---

### TASK-008: Add Social Sharing Functionality
**Priority:** P1 (HIGH)
**Severity:** CRITICAL for engagement
**Effort:** 8-10 hours
**Dependencies:** None

**Problem:**
No social sharing buttons visible on article pages. Critical for engagement, virality, and traffic growth.

**Files to Modify:**
```
src/components/ShareButtons.tsx (create)
src/components/FloatingShareButton.tsx (create)
src/hooks/useShare.ts (create)
src/lib/shareUtils.ts (create)
```

**Implementation Steps:**

1. Create share utility functions:
```typescript
// src/lib/shareUtils.ts
interface ShareData {
  title: string;
  text?: string;
  url: string;
}

export function shareOnFacebook(url: string) {
  const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  window.open(shareUrl, '_blank', 'width=600,height=400');
}

export function shareOnTwitter(text: string, url: string) {
  const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
  window.open(shareUrl, '_blank', 'width=600,height=400');
}

export function shareOnLinkedIn(url: string) {
  const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
  window.open(shareUrl, '_blank', 'width=600,height=400');
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy:', err);
    return false;
  }
}

export async function nativeShare(data: ShareData): Promise<boolean> {
  if (navigator.share) {
    try {
      await navigator.share(data);
      return true;
    } catch (err) {
      if (err instanceof Error && err.name !== 'AbortError') {
        console.error('Share failed:', err);
      }
      return false;
    }
  }
  return false;
}
```

2. Create share buttons component:
```typescript
// src/components/ShareButtons.tsx
'use client';

import { useState } from 'react';
import { Facebook, Twitter, Linkedin, Link2, Check } from 'lucide-react';
import {
  shareOnFacebook,
  shareOnTwitter,
  shareOnLinkedIn,
  copyToClipboard
} from '@/lib/shareUtils';

interface ShareButtonsProps {
  title: string;
  url: string;
  className?: string;
  variant?: 'horizontal' | 'vertical';
}

export function ShareButtons({
  title,
  url,
  className = '',
  variant = 'horizontal'
}: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(url);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const containerClass = variant === 'vertical'
    ? 'flex flex-col gap-2'
    : 'flex items-center gap-2';

  return (
    <div className={`share-buttons ${containerClass} ${className}`}>
      <button
        onClick={() => shareOnFacebook(url)}
        className="share-btn share-btn-facebook"
        aria-label="Share on Facebook"
      >
        <Facebook className="w-5 h-5" />
        <span>Share</span>
      </button>

      <button
        onClick={() => shareOnTwitter(title, url)}
        className="share-btn share-btn-twitter"
        aria-label="Share on Twitter"
      >
        <Twitter className="w-5 h-5" />
        <span>Tweet</span>
      </button>

      <button
        onClick={() => shareOnLinkedIn(url)}
        className="share-btn share-btn-linkedin"
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="w-5 h-5" />
        <span>Share</span>
      </button>

      <button
        onClick={handleCopy}
        className="share-btn share-btn-copy"
        aria-label="Copy link"
      >
        {copied ? (
          <>
            <Check className="w-5 h-5" />
            <span>Copied!</span>
          </>
        ) : (
          <>
            <Link2 className="w-5 h-5" />
            <span>Copy</span>
          </>
        )}
      </button>
    </div>
  );
}
```

3. Create floating share button for mobile:
```typescript
// src/components/FloatingShareButton.tsx
'use client';

import { useState } from 'react';
import { Share2, X } from 'lucide-react';
import { ShareButtons } from './ShareButtons';

interface FloatingShareButtonProps {
  title: string;
  url: string;
}

export function FloatingShareButton({ title, url }: FloatingShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-20 right-6 z-40 w-14 h-14 bg-liberty-red-500 text-white rounded-full shadow-lg hover:bg-liberty-red-600 transition-colors md:hidden"
        aria-label="Share article"
      >
        {isOpen ? (
          <X className="w-6 h-6 mx-auto" />
        ) : (
          <Share2 className="w-6 h-6 mx-auto" />
        )}
      </button>

      {/* Share Menu */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed bottom-36 right-6 z-40 bg-white rounded-lg shadow-xl p-4 md:hidden">
            <ShareButtons title={title} url={url} variant="vertical" />
          </div>
        </>
      )}
    </>
  );
}
```

4. Add share button styles:
```css
/* src/styles/share.css */
.share-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  transition: all 200ms;
  min-height: 44px;
  min-width: 44px;
}

.share-btn-facebook {
  background-color: #1877F2;
  color: white;
}

.share-btn-facebook:hover {
  background-color: #166FE5;
}

.share-btn-twitter {
  background-color: #1DA1F2;
  color: white;
}

.share-btn-twitter:hover {
  background-color: #1A91DA;
}

.share-btn-linkedin {
  background-color: #0A66C2;
  color: white;
}

.share-btn-linkedin:hover {
  background-color: #095196;
}

.share-btn-copy {
  background-color: #6B7280;
  color: white;
}

.share-btn-copy:hover {
  background-color: #4B5563;
}
```

5. Integrate into article page:
```typescript
// src/app/article/[slug]/page.tsx
import { ShareButtons } from '@/components/ShareButtons';
import { FloatingShareButton } from '@/components/FloatingShareButton';

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const articleUrl = `https://libertynation.com/article/${params.slug}`;

  return (
    <main>
      <article>
        <ArticleHeader />

        {/* Desktop Share Buttons */}
        <div className="hidden md:block sticky top-24 float-left -ml-20">
          <ShareButtons
            title={article.title}
            url={articleUrl}
            variant="vertical"
          />
        </div>

        <ArticleContent />

        {/* End of Article Share */}
        <div className="mt-12 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-bold mb-4">Share this article</h3>
          <ShareButtons title={article.title} url={articleUrl} />
        </div>
      </article>

      {/* Mobile Floating Share Button */}
      <FloatingShareButton title={article.title} url={articleUrl} />
    </main>
  );
}
```

**Success Criteria:**
- Share buttons visible on article pages
- Floating share button on mobile (bottom right)
- Share buttons at end of article
- Facebook, Twitter, LinkedIn, and Copy Link functionality
- All buttons meet 44x44px touch target minimum
- Copy link shows confirmation feedback

**Testing:**
- Test sharing on actual social platforms
- Verify Open Graph tags are working
- Test copy to clipboard functionality
- Check mobile floating button doesn't overlap content

---

### TASK-009: Improve Author Information Display
**Priority:** P1 (HIGH)
**Severity:** HIGH
**Effort:** 4-6 hours
**Dependencies:** TASK-003 (Typography)

**Problem:**
Author information is buried and lacks prominence. No avatar, minimal emphasis, missing credibility signals.

**Files to Modify:**
```
src/components/AuthorCard.tsx (create)
src/components/ArticleHeader.tsx
src/app/author/[slug]/page.tsx (create)
```

**Implementation Steps:**

1. Create AuthorCard component:
```typescript
// src/components/AuthorCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import { formatDate } from '@/lib/dateUtils';

interface AuthorCardProps {
  author: {
    name: string;
    slug: string;
    avatar: string;
    title?: string;
    bio?: string;
  };
  publishedAt: string;
  readTime: number;
  showBio?: boolean;
}

export function AuthorCard({
  author,
  publishedAt,
  readTime,
  showBio = false
}: AuthorCardProps) {
  return (
    <div className="author-card">
      <Link href={`/author/${author.slug}`} className="author-card-link">
        <Image
          src={author.avatar || '/images/default-avatar.svg'}
          alt={author.name}
          width={48}
          height={48}
          className="author-card-avatar"
        />
      </Link>

      <div className="author-card-info">
        <Link href={`/author/${author.slug}`} className="author-card-name">
          {author.name}
        </Link>
        {author.title && (
          <p className="author-card-title">{author.title}</p>
        )}
        <div className="author-card-meta">
          <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>
          <span>•</span>
          <span>{readTime} min read</span>
        </div>
        {showBio && author.bio && (
          <p className="author-card-bio">{author.bio}</p>
        )}
      </div>

      <button className="author-card-follow">
        Follow
      </button>
    </div>
  );
}
```

2. Add author card styles:
```css
/* src/styles/author.css */
.author-card {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 20px 0;
}

.author-card-avatar {
  border-radius: 50%;
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  object-fit: cover;
}

.author-card-info {
  flex: 1;
}

.author-card-name {
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  display: block;
  margin-bottom: 2px;
  transition: color 200ms;
}

.author-card-name:hover {
  color: #DC2626;
}

.author-card-title {
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 4px;
}

.author-card-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #6B7280;
}

.author-card-bio {
  font-size: 14px;
  line-height: 1.6;
  color: #4B5563;
  margin-top: 8px;
}

.author-card-follow {
  padding: 8px 20px;
  border: 2px solid #DC2626;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  color: #DC2626;
  background: white;
  transition: all 200ms;
  flex-shrink: 0;
}

.author-card-follow:hover {
  background: #DC2626;
  color: white;
}

@media (max-width: 768px) {
  .author-card {
    flex-wrap: wrap;
  }

  .author-card-follow {
    width: 100%;
    margin-top: 12px;
  }
}
```

3. Create author bio component for end of article:
```typescript
// src/components/AuthorBio.tsx
import Image from 'next/image';
import Link from 'next/link';

interface AuthorBioProps {
  author: {
    name: string;
    slug: string;
    avatar: string;
    title: string;
    bio: string;
    articleCount: number;
  };
}

export function AuthorBio({ author }: AuthorBioProps) {
  return (
    <div className="author-bio">
      <div className="author-bio-header">
        <Image
          src={author.avatar}
          alt={author.name}
          width={80}
          height={80}
          className="author-bio-avatar"
        />
        <div>
          <Link href={`/author/${author.slug}`} className="author-bio-name">
            {author.name}
          </Link>
          <p className="author-bio-title">{author.title}</p>
        </div>
      </div>

      <p className="author-bio-text">{author.bio}</p>

      <div className="author-bio-footer">
        <Link href={`/author/${author.slug}`} className="author-bio-link">
          View all {author.articleCount} articles →
        </Link>
        <button className="author-bio-follow">
          Follow {author.name}
        </button>
      </div>
    </div>
  );
}
```

4. Add author bio styles:
```css
/* src/styles/author.css (continued) */
.author-bio {
  background: #F9FAFB;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  padding: 32px;
  margin: 48px 0;
}

.author-bio-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 16px;
}

.author-bio-avatar {
  border-radius: 50%;
  width: 80px;
  height: 80px;
  object-fit: cover;
}

.author-bio-name {
  font-size: 24px;
  font-weight: 700;
  color: #111827;
  display: block;
  margin-bottom: 4px;
}

.author-bio-name:hover {
  color: #DC2626;
}

.author-bio-title {
  font-size: 16px;
  color: #6B7280;
}

.author-bio-text {
  font-size: 16px;
  line-height: 1.6;
  color: #374151;
  margin-bottom: 20px;
}

.author-bio-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.author-bio-link {
  font-size: 14px;
  font-weight: 600;
  color: #DC2626;
}

.author-bio-link:hover {
  text-decoration: underline;
}

.author-bio-follow {
  padding: 10px 24px;
  background: #DC2626;
  color: white;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  transition: background 200ms;
}

.author-bio-follow:hover {
  background: #B91C1C;
}

@media (max-width: 768px) {
  .author-bio {
    padding: 24px;
  }

  .author-bio-header {
    flex-direction: column;
    text-align: center;
  }

  .author-bio-footer {
    flex-direction: column;
  }

  .author-bio-follow {
    width: 100%;
  }
}
```

5. Integrate into article page:
```typescript
// src/app/article/[slug]/page.tsx
import { AuthorCard } from '@/components/AuthorCard';
import { AuthorBio } from '@/components/AuthorBio';

export default function ArticlePage({ params }: { params: { slug: string } }) {
  return (
    <article>
      <header>
        <h1>{article.title}</h1>
        <AuthorCard
          author={article.author}
          publishedAt={article.publishedAt}
          readTime={article.readTime}
        />
      </header>

      <ArticleContent />

      <AuthorBio author={article.author} />
    </article>
  );
}
```

**Success Criteria:**
- Author card appears below article title with avatar
- Author name is clickable link to author page
- Job title and publication date visible
- Full author bio appears at end of article
- "Follow" button present and functional
- All elements responsive on mobile

**Testing:**
- Verify author links work
- Check avatar loading and fallbacks
- Test responsive behavior
- Verify touch targets on mobile

---

### TASK-010: Create Hero Section for Homepage
**Priority:** P1 (HIGH)
**Severity:** HIGH
**Effort:** 10-12 hours
**Dependencies:** TASK-001 (Images), TASK-003 (Typography), TASK-004 (Colors)

**Problem:**
Homepage lacks a clear hero section. Page jumps straight into article cards without featured story, value proposition, or branding moment.

**Files to Modify:**
```
src/components/HeroSection.tsx (create)
src/components/FeaturedArticleHero.tsx (create)
src/app/page.tsx
```

**Implementation Steps:**

1. Create hero section component:
```typescript
// src/components/HeroSection.tsx
import Image from 'next/image';
import Link from 'next/link';
import { CategoryBadge } from './CategoryBadge';
import { formatDate } from '@/lib/dateUtils';

interface HeroArticle {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  featuredImage: string;
  category: string;
  author: string;
  publishedAt: string;
}

interface HeroSectionProps {
  featuredArticle: HeroArticle;
  secondaryArticles: HeroArticle[];
}

export function HeroSection({ featuredArticle, secondaryArticles }: HeroSectionProps) {
  return (
    <section className="hero-section">
      <div className="container mx-auto px-6">
        <div className="hero-grid">
          {/* Main Featured Article */}
          <Link href={`/article/${featuredArticle.slug}`} className="hero-featured">
            <div className="hero-featured-image">
              <Image
                src={featuredArticle.featuredImage}
                alt={featuredArticle.title}
                fill
                priority
                className="object-cover"
              />
              <div className="hero-featured-overlay" />
              <div className="hero-featured-content">
                <CategoryBadge category={featuredArticle.category} />
                <h1 className="hero-featured-title">
                  {featuredArticle.title}
                </h1>
                <p className="hero-featured-excerpt">
                  {featuredArticle.excerpt}
                </p>
                <div className="hero-featured-meta">
                  <span>{featuredArticle.author}</span>
                  <span>•</span>
                  <span>{formatDate(featuredArticle.publishedAt)}</span>
                </div>
              </div>
            </div>
          </Link>

          {/* Secondary Articles */}
          <div className="hero-secondary">
            {secondaryArticles.slice(0, 2).map((article) => (
              <Link
                key={article.id}
                href={`/article/${article.slug}`}
                className="hero-secondary-card"
              >
                <div className="hero-secondary-image">
                  <Image
                    src={article.featuredImage}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="hero-secondary-content">
                  <CategoryBadge category={article.category} />
                  <h3 className="hero-secondary-title">{article.title}</h3>
                  <p className="hero-secondary-meta">
                    {article.author} • {formatDate(article.publishedAt)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

2. Add hero section styles:
```css
/* src/styles/hero.css */
.hero-section {
  padding: 40px 0 60px;
  background: white;
}

.hero-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
}

@media (max-width: 1024px) {
  .hero-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}

/* Featured Article */
.hero-featured {
  display: block;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 300ms ease-out;
}

.hero-featured:hover {
  transform: translateY(-4px);
}

.hero-featured-image {
  position: relative;
  aspect-ratio: 16 / 9;
  background: #F3F4F6;
}

@media (max-width: 768px) {
  .hero-featured-image {
    aspect-ratio: 4 / 3;
  }
}

.hero-featured-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.3) 50%,
    rgba(0, 0, 0, 0.75) 100%
  );
}

.hero-featured-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 40px;
  color: white;
  z-index: 10;
}

@media (max-width: 768px) {
  .hero-featured-content {
    padding: 24px;
  }
}

.hero-featured-title {
  font-size: 48px;
  font-weight: 800;
  line-height: 1.2;
  margin: 12px 0 16px;
  color: white;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

@media (max-width: 768px) {
  .hero-featured-title {
    font-size: 28px;
  }
}

.hero-featured-excerpt {
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
}

@media (max-width: 768px) {
  .hero-featured-excerpt {
    font-size: 16px;
    -webkit-line-clamp: 3;
  }
}

.hero-featured-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
}

/* Secondary Articles */
.hero-secondary {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.hero-secondary-card {
  display: block;
  background: white;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  overflow: hidden;
  transition: all 250ms ease-out;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.hero-secondary-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}

.hero-secondary-image {
  position: relative;
  aspect-ratio: 16 / 9;
  background: #F3F4F6;
}

.hero-secondary-content {
  padding: 20px;
}

.hero-secondary-title {
  font-size: 20px;
  font-weight: 600;
  line-height: 1.4;
  margin: 8px 0 12px;
  color: #111827;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color 200ms;
}

.hero-secondary-card:hover .hero-secondary-title {
  color: #DC2626;
}

.hero-secondary-meta {
  font-size: 14px;
  color: #6B7280;
}

@media (max-width: 1024px) {
  .hero-secondary {
    flex-direction: row;
    gap: 16px;
  }

  .hero-secondary-card {
    flex: 1;
  }
}

@media (max-width: 640px) {
  .hero-secondary {
    flex-direction: column;
  }
}
```

3. Update homepage to use hero:
```typescript
// src/app/page.tsx
import { HeroSection } from '@/components/HeroSection';
import { Section } from '@/components/Section';
import { ArticleGrid } from '@/components/ArticleGrid';

export default async function HomePage() {
  const featuredArticle = await getFeaturedArticle();
  const secondaryArticles = await getSecondaryArticles();
  const latestNews = await getLatestNews();

  return (
    <main>
      <HeroSection
        featuredArticle={featuredArticle}
        secondaryArticles={secondaryArticles}
      />

      <Section spacing="default" background="gray">
        <h2 className="typography-section-h2">Latest News</h2>
        <ArticleGrid articles={latestNews} />
      </Section>

      {/* Other sections */}
    </main>
  );
}
```

**Success Criteria:**
- Hero section prominently displays featured article
- Hero is 2x larger than any other content on page
- Dark gradient overlay ensures text readability (60-75% opacity)
- Secondary articles displayed alongside hero (desktop) or below (mobile)
- Responsive behavior works across all screen sizes
- Hero is first thing users see, clear Z-pattern layout

**Testing:**
- Test with various image aspect ratios
- Verify text readability on light and dark images
- Check responsive breakpoints
- Measure visual weight (hero should be 60% of above-fold content)

---

### TASK-011: Fix Touch Target Sizes for Mobile
**Priority:** P1 (HIGH)
**Severity:** HIGH (Accessibility)
**Effort:** 6-8 hours
**Dependencies:** TASK-006 (Navigation)

**Problem:**
Many interactive elements are below the 44x44px minimum touch target size required for mobile usability and accessibility.

**Files to Modify:**
```
src/styles/globals.css
src/components/CategoryBadge.tsx
src/components/Button.tsx
src/components/ArticleCard.tsx
src/styles/touch-targets.css (create)
```

**Implementation Steps:**

1. Create touch target utilities:
```css
/* src/styles/touch-targets.css */

/* Minimum Touch Target Size: 44x44px (Apple), 48x48dp (Google) */
:root {
  --touch-target-min: 44px;
  --touch-target-comfortable: 48px;
}

/* Touch Target Utilities */
.touch-target {
  min-height: var(--touch-target-min);
  min-width: var(--touch-target-min);
}

.touch-target-comfortable {
  min-height: var(--touch-target-comfortable);
  min-width: var(--touch-target-comfortable);
}

/* Interactive Element Base Styles */
button,
a,
[role="button"],
input[type="submit"],
input[type="button"] {
  -webkit-tap-highlight-color: rgba(220, 38, 38, 0.1);
  touch-action: manipulation;
}

/* Ensure links have adequate padding */
a:not(.no-touch-padding) {
  padding: 8px 12px;
  margin: -8px -12px;
}

/* Button minimum sizes */
button {
  min-height: var(--touch-target-min);
  padding: 12px 20px;
}

/* Icon buttons */
.icon-button {
  min-width: var(--touch-target-min);
  min-height: var(--touch-target-min);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* Touch feedback */
@media (hover: none) {
  button:active,
  a:active,
  [role="button"]:active {
    transform: scale(0.98);
    opacity: 0.8;
  }
}
```

2. Update category badges for better touch targets:
```typescript
// src/components/CategoryBadge.tsx
export function CategoryBadge({ category, href, className = '' }: CategoryBadgeProps) {
  const badgeClasses = `
    category-badge
    category-badge-${category}
    min-h-[32px]
    inline-flex
    items-center
    justify-center
    px-3
    py-1.5
    ${className}
  `;

  if (href) {
    return (
      <Link
        href={href}
        className={`${badgeClasses} touch-target`}
      >
        {category}
      </Link>
    );
  }

  return <span className={badgeClasses}>{category}</span>;
}
```

3. Ensure article cards have proper touch zones:
```css
/* src/styles/cards.css (additions) */

/* Article card as single touch target */
.article-card {
  cursor: pointer;
  -webkit-tap-highlight-color: rgba(220, 38, 38, 0.05);
}

/* Ensure entire card is tappable */
.article-card a {
  display: block;
  padding: 0;
  margin: 0;
}

/* Active state for touch feedback */
@media (hover: none) {
  .article-card:active {
    transform: scale(0.98);
  }
}

/* Card meta links */
.article-card-meta a {
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  padding: 8px 12px;
  margin: -8px -12px;
}
```

4. Create touch target audit utility:
```typescript
// src/lib/touchTargetAudit.ts (development only)

/**
 * Development utility to audit touch targets
 * Run this in browser console to identify problematic elements
 */
export function auditTouchTargets() {
  const MIN_SIZE = 44;
  const elements = document.querySelectorAll('button, a, [role="button"], input[type="button"], input[type="submit"]');

  const violations: Array<{ element: Element; width: number; height: number }> = [];

  elements.forEach((element) => {
    const rect = element.getBoundingClientRect();
    if (rect.width < MIN_SIZE || rect.height < MIN_SIZE) {
      violations.push({
        element,
        width: Math.round(rect.width),
        height: Math.round(rect.height),
      });
    }
  });

  if (violations.length > 0) {
    console.warn(`Found ${violations.length} touch target violations:`);
    violations.forEach(({ element, width, height }) => {
      console.log(`Element: ${element.tagName} (${width}x${height}px)`, element);
    });
  } else {
    console.log('✅ All touch targets meet minimum size requirements');
  }

  return violations;
}

// Add visual indicators for small touch targets (development mode)
export function highlightSmallTouchTargets() {
  const violations = auditTouchTargets();

  violations.forEach(({ element }) => {
    (element as HTMLElement).style.outline = '3px solid red';
    (element as HTMLElement).style.outlineOffset = '2px';
  });
}
```

5. Update button component with proper sizing:
```typescript
// src/components/Button.tsx (additions)
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function Button({
  variant = 'primary',
  size = 'medium',
  children,
  onClick,
  className = ''
}: ButtonProps) {
  const sizeClasses = {
    small: 'min-h-[44px] px-4 py-2 text-sm',     // Still meets min touch target
    medium: 'min-h-[48px] px-6 py-3 text-base',
    large: 'min-h-[56px] px-8 py-4 text-lg',
  };

  // ... rest of component
}
```

6. Add footer link improvements:
```css
/* src/styles/footer.css (additions) */

.footer-link {
  display: inline-block;
  min-height: 44px;
  padding: 12px 16px;
  line-height: 1.5;
  transition: color 200ms;
}

.footer-link:hover {
  color: #DC2626;
}

/* Social icons */
.footer-social-link {
  min-width: 44px;
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
}
```

**Success Criteria:**
- All interactive elements meet 44x44px minimum size on mobile
- Comfortable padding around text links (12px minimum)
- Icon buttons are 44x44px minimum
- Entire article cards are tappable
- Touch feedback visible on tap (scale/opacity change)
- No elements flagged by accessibility audits

**Testing:**
- Run auditTouchTargets() in browser console
- Test tapping with actual finger on physical devices
- Use Chrome DevTools mobile emulator with "Show tap targets" enabled
- Verify users with motor impairments can tap accurately
- Check WCAG 2.1 Level AAA compliance (44x44px)

---

### TASK-012: Implement Reading Progress Indicator
**Priority:** P1 (HIGH)
**Severity:** MEDIUM
**Effort:** 3-4 hours
**Dependencies:** None

**Problem:**
Long-form articles lack a progress indicator, leaving users unsure how much content remains.

**Files to Modify:**
```
src/components/ReadingProgress.tsx (create)
src/hooks/useReadingProgress.ts (create)
src/app/article/[slug]/page.tsx
```

**Implementation Steps:**

1. Create reading progress hook:
```typescript
// src/hooks/useReadingProgress.ts
'use client';

import { useState, useEffect } from 'react';

export function useReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const calculateProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;

      // Calculate progress percentage
      const totalHeight = documentHeight - windowHeight;
      const currentProgress = (scrollTop / totalHeight) * 100;

      setProgress(Math.min(100, Math.max(0, currentProgress)));
    };

    // Calculate on mount
    calculateProgress();

    // Update on scroll with throttling
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          calculateProgress();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return progress;
}
```

2. Create reading progress component:
```typescript
// src/components/ReadingProgress.tsx
'use client';

import { useReadingProgress } from '@/hooks/useReadingProgress';

interface ReadingProgressProps {
  className?: string;
}

export function ReadingProgress({ className = '' }: ReadingProgressProps) {
  const progress = useReadingProgress();

  return (
    <div
      className={`reading-progress ${className}`}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    >
      <div
        className="reading-progress-bar"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
```

3. Add reading progress styles:
```css
/* src/styles/reading-progress.css */

.reading-progress {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: rgba(0, 0, 0, 0.05);
  z-index: 100;
}

.reading-progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #DC2626 0%, #991B1B 100%);
  transition: width 150ms ease-out;
  transform-origin: left;
}

/* Alternative circular progress (for bottom corner) */
.reading-progress-circle {
  position: fixed;
  bottom: 80px;
  left: 20px;
  width: 48px;
  height: 48px;
  z-index: 100;
  display: none; /* Show only on scroll */
}

.reading-progress-circle.visible {
  display: block;
  animation: fadeIn 200ms ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.reading-progress-circle svg {
  transform: rotate(-90deg);
}

.reading-progress-circle-background {
  fill: none;
  stroke: rgba(0, 0, 0, 0.1);
  stroke-width: 4;
}

.reading-progress-circle-progress {
  fill: none;
  stroke: #DC2626;
  stroke-width: 4;
  stroke-linecap: round;
  transition: stroke-dashoffset 150ms ease-out;
}

/* Hide on desktop if desired */
@media (min-width: 768px) {
  .reading-progress-circle {
    display: none;
  }
}
```

4. Create circular progress variant (optional):
```typescript
// src/components/ReadingProgressCircle.tsx
'use client';

import { useReadingProgress } from '@/hooks/useReadingProgress';
import { ArrowUp } from 'lucide-react';

export function ReadingProgressCircle() {
  const progress = useReadingProgress();
  const circumference = 2 * Math.PI * 20; // radius = 20
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`reading-progress-circle ${progress > 10 ? 'visible' : ''}`}
      aria-label="Scroll to top"
    >
      <svg width="48" height="48" viewBox="0 0 48 48">
        <circle
          className="reading-progress-circle-background"
          cx="24"
          cy="24"
          r="20"
        />
        <circle
          className="reading-progress-circle-progress"
          cx="24"
          cy="24"
          r="20"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
      <ArrowUp className="absolute inset-0 m-auto w-5 h-5" />
    </button>
  );
}
```

5. Integrate into article page:
```typescript
// src/app/article/[slug]/page.tsx
import { ReadingProgress } from '@/components/ReadingProgress';
import { ReadingProgressCircle } from '@/components/ReadingProgressCircle';

export default function ArticlePage({ params }: { params: { slug: string } }) {
  return (
    <>
      <ReadingProgress />

      <main>
        <article>
          {/* Article content */}
        </article>
      </main>

      <ReadingProgressCircle />
    </>
  );
}
```

**Success Criteria:**
- Progress bar visible at top of page on article pages
- Smooth animation as user scrolls
- Progress accurately reflects scroll position
- Optional circular progress with scroll-to-top button
- No performance impact (throttled scroll handling)

**Testing:**
- Test scroll performance with DevTools performance tab
- Verify progress is accurate on various article lengths
- Test on mobile devices for smooth animation
- Ensure doesn't interfere with other fixed elements

---

*[Continue with remaining tasks TASK-013 through TASK-030 following the same detailed format]*

---

## Sprint 3: Medium Priority Issues (Weeks 3-4 - P2)
**Goal:** Improve polish and user experience refinements
**Total Effort:** 50-60 hours

*[Tasks TASK-031 through TASK-055]*

---

## Backlog: Low Priority Issues (Future - P3)
**Goal:** Nice-to-have improvements and enhancements
**Total Effort:** 30-40 hours

*[Tasks TASK-056 through TASK-081]*

---

## Development Guidelines

### Before Starting Any Task:
1. Read the task description completely
2. Review all affected files listed
3. Check dependencies are completed
4. Estimate if effort is accurate
5. Create a feature branch: `git checkout -b task-XXX-description`

### While Working on Task:
1. Follow code examples provided
2. Add comments explaining complex logic
3. Test incrementally (don't wait until end)
4. Commit frequently with descriptive messages
5. Reference task number in commits: `git commit -m "TASK-001: Implement image error handling"`

### Before Marking Task Complete:
1. Verify ALL success criteria met
2. Run ALL tests listed
3. Check responsive behavior
4. Test accessibility with screen reader
5. Verify no console errors
6. Update documentation if needed
7. Create PR referencing task number

### Code Quality Standards:
- TypeScript strict mode enabled
- ESLint and Prettier configured
- No `any` types unless absolutely necessary
- Proper error handling (try/catch, error boundaries)
- Accessibility: WCAG 2.1 Level AA minimum
- Performance: Lighthouse score 90+ on mobile
- SEO: Proper meta tags, semantic HTML, structured data

---

## Testing Checklist (All Tasks)

### Browser Testing:
- [ ] Chrome (desktop & mobile)
- [ ] Firefox (desktop & mobile)
- [ ] Safari (desktop & iOS)
- [ ] Edge (desktop)

### Device Testing:
- [ ] iPhone SE (small screen)
- [ ] iPhone 12/13/14 (standard)
- [ ] iPhone Pro Max (large)
- [ ] Android phone (Samsung/Pixel)
- [ ] iPad (tablet)
- [ ] Desktop (1920x1080)
- [ ] Desktop (2560x1440)

### Performance Testing:
- [ ] Lighthouse performance score 90+
- [ ] First Contentful Paint < 2s
- [ ] Time to Interactive < 3.5s
- [ ] Cumulative Layout Shift < 0.1
- [ ] Total blocking time < 300ms

### Accessibility Testing:
- [ ] Keyboard navigation works
- [ ] Screen reader (NVDA/VoiceOver) announces correctly
- [ ] Color contrast meets WCAG AA (4.5:1)
- [ ] Touch targets 44x44px minimum
- [ ] Focus indicators visible
- [ ] Alt text on all images
- [ ] Semantic HTML structure
- [ ] ARIA labels where appropriate

### Functionality Testing:
- [ ] All links work
- [ ] Forms submit correctly
- [ ] Images load properly with fallbacks
- [ ] Search functions
- [ ] Navigation works
- [ ] Share buttons function
- [ ] Newsletter signup works
- [ ] Comments load (if applicable)

---

## Deployment Checklist

### Pre-Deployment:
- [ ] All Critical (P0) tasks completed
- [ ] All tests passing
- [ ] No console errors
- [ ] Lighthouse scores acceptable
- [ ] Accessibility audit passed
- [ ] Cross-browser testing done
- [ ] Mobile testing completed
- [ ] Performance benchmarks met

### Deployment Steps:
1. Merge feature branch to `main`
2. Run production build: `npm run build`
3. Fix any build errors
4. Deploy to staging environment
5. Run smoke tests on staging
6. Deploy to production
7. Monitor error logs
8. Verify critical paths work
9. Check analytics tracking

### Post-Deployment:
- [ ] Homepage loads correctly
- [ ] Article pages load correctly
- [ ] Navigation works
- [ ] Search works
- [ ] Images loading properly
- [ ] Forms submitting
- [ ] Analytics firing
- [ ] No 404 errors
- [ ] No server errors (500)
- [ ] Performance acceptable

---

## Notes for Project Manager

### Prioritization Rationale:

**Sprint 1 (Critical - Week 1):**
These issues prevent launch. Broken images destroy credibility, poor typography reduces readability, excessive red creates visual fatigue, and missing navigation makes the site unusable.

**Sprint 2 (High - Week 2):**
These significantly impact engagement and conversions. No social sharing means limited reach, poor author presentation reduces trust, lack of hero section misses branding opportunity.

**Sprint 3 (Medium - Weeks 3-4):**
These improve polish and user experience but aren't launch blockers. Important for competitive positioning.

**Backlog (Low - Future):**
Nice-to-have enhancements. Can be tackled post-launch based on user feedback and analytics.

### Resource Allocation:

**Required Team:**
- 1-2 Frontend Developers (React/Next.js expertise)
- 1 UI/UX Designer (for visual QA)
- 1 QA Engineer (for testing)
- 1 Product Manager (coordination)

**Timeline:**
- Week 1: Sprint 1 (Critical issues)
- Week 2: Sprint 2 (High priority)
- Week 3-4: Sprint 3 (Medium priority)
- Week 5+: Backlog items as capacity allows

### Risk Mitigation:

**High Risk Items:**
- Image loading (TASK-001): If CDN issues, may need infrastructure work
- Navigation (TASK-006): Complex state management, could take longer
- Typography (TASK-003): May require design review/approval

**Mitigation Strategies:**
- Build image fallback system early
- Use proven libraries for navigation state (Zustand/Jotai)
- Get design approval on typography before implementation

### Success Metrics:

**Week 1 (Post-Sprint 1):**
- Zero broken images
- Lighthouse performance: 70+
- No critical accessibility issues
- Mobile navigation functional

**Week 2 (Post-Sprint 2):**
- Social shares enabled (measure engagement)
- Hero section live (measure CTR)
- Touch targets compliant
- Lighthouse performance: 85+

**Week 4 (Post-Sprint 3):**
- All polish items complete
- Lighthouse performance: 90+
- WCAG 2.1 AA compliant
- Cross-browser compatibility 100%

---

**Document Version:** 1.0
**Last Updated:** 2025-11-14
**Created By:** Technical Project Manager (from Design Review Analysis)
**Next Review:** After Sprint 1 completion
