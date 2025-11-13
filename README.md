# Liberty Nation - Headless Next.js Site

A high-performance, headless Next.js website for Liberty Nation, featuring:

- **ISR (Incremental Static Regeneration)** - Pages rebuild every 5 minutes when content updates
- **WordPress REST API Integration** - Fetches real-time data from Liberty Nation's WordPress backend
- **Optimized Images** - Next.js Image component with automatic optimization
- **The Free Press Design** - Faithful recreation of The Free Press aesthetic for Liberty Nation
- **Three-Column Layout** - Classic newspaper grid with featured articles
- **TypeScript** - Full type safety
- **Tailwind CSS** - Utility-first styling

## Performance Benefits vs Expo Web

This dedicated Next.js website provides:

1. **Static Generation + ISR** - Pages pre-rendered at build time, then incrementally updated
2. **Edge Caching** - Content served from CDN edge locations globally
3. **Automatic Image Optimization** - WebP/AVIF formats with responsive sizing
4. **Code Splitting** - Only load JavaScript needed for each page
5. **SEO Optimized** - Server-side rendering with proper meta tags

Expected improvements:
- **50-70% faster page loads** vs client-side rendering
- **90+ Lighthouse scores** for performance
- **Instant updates** when WordPress content changes (5-minute revalidation)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Access to Liberty Nation WordPress API

### Installation

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Configure environment variables (already set in `.env.local`):
\`\`\`
WORDPRESS_API_URL=https://www.libertynation.com/wp-json/wp/v2
REVALIDATE_TIME=300
\`\`\`

3. Run development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000)

### Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## ISR Configuration

Pages automatically revalidate every 5 minutes (300 seconds). Adjust in:
- `app/page.tsx` - Homepage
- `app/[slug]/page.tsx` - Article pages
- `.env.local` - `REVALIDATE_TIME`

## Deployment

### Recommended: Vercel

1. Push to GitHub
2. Import project in Vercel
3. Deploy (automatic configuration detected)

### Alternative: Any Node.js Host

Build output can be deployed to any platform supporting Next.js:
- Netlify
- AWS Amplify
- DigitalOcean App Platform
- Railway
- Render

## Architecture

\`\`\`
├── app/
│   ├── [slug]/          # Dynamic article pages with ISR
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Homepage with ISR
│   └── globals.css      # Global styles
├── components/
│   ├── ArticleCard.tsx
│   ├── FeaturedArticle.tsx
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Marquee.tsx
│   ├── DailyBriefing.tsx
│   └── TrendingTopics.tsx
├── lib/
│   └── wordpress.ts     # WordPress API utilities
└── public/              # Static assets
\`\`\`

## API Integration

### WordPress REST API Endpoints Used:

- `GET /wp/v2/posts` - Fetch posts with pagination
- `GET /wp/v2/posts?slug={slug}` - Fetch single post
- `GET /wp/v2/categories` - Fetch categories

All API calls include `?_embed=true` to get:
- Featured images
- Author information
- Category/tag data

## Customization

### Colors

Edit `tailwind.config.ts`:

\`\`\`typescript
colors: {
  primary: {
    red: '#DC2626',  // Change brand color
  },
}
\`\`\`

### Fonts

Update `app/globals.css` Google Fonts import and font families.

### Revalidation Time

Adjust ISR revalidation in `.env.local`:

\`\`\`
REVALIDATE_TIME=300  # 5 minutes (in seconds)
\`\`\`

## License

Proprietary - Liberty Nation
