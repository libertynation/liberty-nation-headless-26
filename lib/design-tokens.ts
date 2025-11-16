/**
 * Liberty Nation Design System Tokens
 *
 * Central source of truth for all spacing, typography, transitions, and visual constants.
 * Based on 8px spacing scale for consistency and alignment.
 */

// ============================================
// SPACING SYSTEM (8px base unit)
// ============================================

export const spacing = {
  // Base units (multiples of 8px)
  base: {
    1: '4px',   // 0.5 unit
    2: '8px',   // 1 unit
    3: '12px',  // 1.5 units
    4: '16px',  // 2 units
    5: '20px',  // 2.5 units
    6: '24px',  // 3 units
    8: '32px',  // 4 units
    10: '40px', // 5 units
    12: '48px', // 6 units
    16: '64px', // 8 units
    20: '80px', // 10 units
    24: '96px', // 12 units
  },

  // Section spacing (vertical rhythm)
  section: {
    sm: 'py-8',          // 32px
    md: 'py-12',         // 48px
    lg: 'py-16',         // 64px
    xl: 'py-20',         // 80px
  },

  // Container padding
  container: {
    default: 'px-4 sm:px-6 lg:px-10',
    tight: 'px-4',
    wide: 'px-6 lg:px-12',
  },

  // Gap values for grids/flex
  gap: {
    xs: 'gap-4',         // 16px
    sm: 'gap-6',         // 24px
    md: 'gap-8',         // 32px
    lg: 'gap-10',        // 40px
    xl: 'gap-12',        // 48px
  },

  // Margin bottom for elements
  mb: {
    xs: 'mb-3',          // 12px
    sm: 'mb-4',          // 16px
    md: 'mb-5',          // 20px
    lg: 'mb-6',          // 24px
    xl: 'mb-8',          // 32px
  },
} as const;

// ============================================
// TYPOGRAPHY SYSTEM
// ============================================

export const typography = {
  // Display sizes (for hero/featured content)
  display: {
    // Featured article hero
    hero: 'text-[36px] sm:text-[48px] md:text-[60px] lg:text-[72px] xl:text-[80px] leading-[1.05]',
    // Large section headers
    xl: 'text-5xl md:text-6xl lg:text-7xl leading-[1.05]',
    // Medium section headers
    lg: 'text-4xl md:text-5xl lg:text-6xl leading-[1.05]',
  },

  // Heading sizes
  h1: 'text-4xl md:text-5xl leading-[1.1]',
  h2: 'text-3xl md:text-4xl leading-[1.1]',
  h3: 'text-2xl md:text-3xl leading-[1.2]',
  h4: 'text-xl md:text-2xl leading-[1.2]',
  h5: 'text-lg md:text-xl leading-[1.3]',

  // Article card titles (standardized across components)
  card: {
    featured: 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.05]',
    large: 'text-2xl sm:text-3xl md:text-4xl leading-[1.1]',
    medium: 'text-xl sm:text-2xl md:text-3xl leading-[1.2]',
    standard: 'text-lg sm:text-xl md:text-2xl leading-[1.2]',
    small: 'text-base sm:text-lg leading-[1.3]',
  },

  // Body text
  body: {
    xl: 'text-xl leading-[1.7]',
    lg: 'text-lg leading-[1.7]',
    md: 'text-base leading-[1.6]',
    sm: 'text-sm leading-[1.5]',
    xs: 'text-xs leading-[1.4]',
  },

  // Excerpts
  excerpt: {
    large: 'text-[16px] sm:text-[17px] md:text-[18px] lg:text-[20px] leading-[1.6]',
    standard: 'text-base md:text-lg leading-[1.6]',
  },

  // Metadata (author, date, category)
  meta: {
    default: 'text-[12px] sm:text-[13px] md:text-[14px]',
    small: 'text-xs sm:text-[13px]',
  },
} as const;

// ============================================
// TRANSITIONS & ANIMATIONS
// ============================================

export const transitions = {
  // Duration standards
  fast: 'duration-200',
  normal: 'duration-300',
  slow: 'duration-500',
  slowest: 'duration-700',

  // Complete transition classes
  color: 'transition-colors duration-300 ease-out',
  transform: 'transition-transform duration-500 ease-out',
  opacity: 'transition-opacity duration-300 ease-out',
  shadow: 'transition-shadow duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
  all: 'transition-all duration-300 ease-out',

  // Hover scale effects
  scale: {
    subtle: 'transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-102',
    medium: 'transition-transform duration-500 ease-out group-hover:scale-105',
  },
} as const;

// ============================================
// IMAGE ASPECT RATIOS
// ============================================

export const aspectRatios = {
  // Standard aspect ratios
  video: 'aspect-[16/9]',
  standard: 'aspect-[4/3]',
  hero: 'aspect-[580/436]',  // Current hero ratio
  square: 'aspect-square',
} as const;

// ============================================
// BORDERS
// ============================================

export const borders = {
  // Standard border widths
  thin: 'border',
  medium: 'border-2',
  thick: 'border-[3px]',

  // Border positions (NEVER use border-transparent)
  top: {
    thin: 'border-t',
    medium: 'border-t-2',
    thick: 'border-t-[3px]',
  },
  bottom: {
    thin: 'border-b',
    medium: 'border-b-2',
    thick: 'border-b-[3px]',
  },

  // Common border colors
  color: {
    primary: 'border-primary-red',
    dark: 'border-black',
    light: 'border-gray-200',
    divider: 'border-gray-300',
  },
} as const;

// ============================================
// AUTHOR METADATA LAYOUT
// ============================================

export const authorMeta = {
  // Avatar sizes
  avatar: {
    small: 'w-6 h-6',
    medium: 'w-7 h-7',
    large: 'w-8 h-8',
  },

  // Gap between avatar and name
  gap: 'gap-2',

  // Container gap (between author and date)
  containerGap: {
    tight: 'gap-2',
    normal: 'gap-3',
  },

  // Font styles
  name: 'text-primary-red font-bold hover:underline',
  separator: 'text-black',
  date: 'text-black',
} as const;

// ============================================
// RESPONSIVE GRIDS
// ============================================

export const grids = {
  // Three column layouts (homepage style)
  threeColumn: {
    container: 'grid grid-cols-1 lg:grid-cols-[26%_48%_26%]',
    gap: 'gap-6 sm:gap-8 lg:gap-10',
    alignment: 'items-start',
  },

  // Article grids
  articles: {
    single: 'grid grid-cols-1',
    double: 'grid grid-cols-1 md:grid-cols-2',
    triple: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    quad: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    breaking: 'grid grid-cols-5',
  },
} as const;

// ============================================
// SHADOWS
// ============================================

export const shadows = {
  card: 'shadow-md',
  cardHover: 'group-hover:shadow-xl',
  none: 'shadow-none',
} as const;

// ============================================
// COMMON COMPONENT PATTERNS
// ============================================

export const patterns = {
  // Article card wrapper
  articleCard: 'group',

  // Article link wrapper
  articleLink: 'group block',

  // Image container
  imageContainer: 'relative w-full overflow-hidden bg-gray-200',

  // Hover text color change
  hoverText: 'group-hover:text-primary-red',
} as const;
