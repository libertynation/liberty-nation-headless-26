# Liberty Nation - Site Demo Videos

Screen recordings of the Liberty Nation website at 1920x1080 resolution, showcasing user interactions with smooth scrolling and pauses at key sections to highlight animations and content.

## Video Inventory

| Video File | Page | Duration Approx. | File Size | Sections Featured |
|-----------|------|-----------------|-----------|-------------------|
| `homepage-demo.webm` | Homepage | ~25s | 4.4 MB | Hero, Breaking Headlines, Category Buttons, Daily Briefing, Footer |
| `article-demo.webm` | Article Page | ~20s | 133 KB | Article Header, Content, Author Card, Share Buttons, Footer |
| `category-politics-demo.webm` | Politics Category | ~18s | 2.3 MB | Category Header, Articles Grid (top/mid), Footer |
| `newsletters-demo.webm` | Newsletters | ~18s | 2.4 MB | Newsletter Header, Options, Footer |

**Total:** 4 videos, ~9.2 MB

## Recording Details

### Viewport Specifications
- **Resolution:** 1920x1080 (Desktop HD)
- **Device Scale Factor:** 1x
- **Format:** WebM (Chromium default)

### Recording Behavior

Each video simulates human browsing patterns:

1. **Initial Load:** Page loads with `networkidle` wait condition
2. **Animation Wait:** 3-second pause for initial animations to complete
3. **Image Loading:** Waits for lazy-loaded images to appear
4. **Smooth Scrolling:** Uses `behavior: 'smooth'` for natural scroll motion
5. **Section Pauses:** 2-4 second pauses at each major section to showcase content and animations
6. **Return to Top:** Smooth scroll back to top at the end

### Scroll Points by Page

**Homepage:**
- Hero section (3s pause)
- Breaking Headlines at 800px (2.5s pause)
- Category Buttons at 1400px (2s pause)
- Daily Briefing at 2000px (3s pause)
- Footer at bottom (2s pause)

**Article:**
- Article Header at top (3s pause)
- Article Content at 800px (4s pause)
- Mid-article at 1600px (3s pause)
- Author Card at 2400px (2s pause)
- Footer at bottom (2s pause)

**Category (Politics):**
- Category Header at top (2.5s pause)
- Articles Grid Top at 600px (3s pause)
- Articles Grid Mid at 1400px (3s pause)
- Footer at bottom (2s pause)

**Newsletters:**
- Newsletter Header at top (2.5s pause)
- Newsletter Options at 800px (3s pause)
- More Options at 1400px (2.5s pause)
- Footer at bottom (2s pause)

## Usage

### Viewing
These videos can be viewed directly in most modern browsers and video players that support WebM format.

### Converting to MP4
If you need MP4 format (for broader compatibility), use ffmpeg:

```bash
# Install ffmpeg if needed:
# Windows: choco install ffmpeg
# Mac: brew install ffmpeg
# Linux: sudo apt-get install ffmpeg

# Convert to MP4:
ffmpeg -i homepage-demo.webm -c:v libx264 -crf 23 -c:a aac homepage-demo.mp4

# Batch convert all:
for file in *.webm; do
  ffmpeg -i "$file" -c:v libx264 -crf 23 -c:a aac "${file%.webm}.mp4"
done
```

### Use Cases

- **Stakeholder Presentations:** Show website functionality without live demo
- **Design Review:** Review page animations and transitions
- **Bug Reporting:** Demonstrate issues with visual context
- **Documentation:** Include in technical documentation
- **Social Media:** Share website updates and features
- **Training:** Onboard new team members on site layout

## Recording Scripts

Videos were generated using Playwright automation:

- **Main Script:** `dev/scripts/claude-generated/record-all-demos.mjs`
- **Individual Scripts:**
  - `record-homepage.mjs` - Homepage only
  - `record-site-demo.mjs` - All pages (original comprehensive script)

### Re-recording

To re-record all videos:

```bash
# Ensure dev server is running on port 3004
npm run dev

# In a new terminal, run:
node dev/scripts/claude-generated/record-all-demos.mjs
```

## Notes

- Videos are recorded in headless Chromium browser
- All videos return to top of page before ending for clean loops
- File sizes vary based on page content and animation complexity
- Article demo is notably smaller (133 KB) due to simpler content/animations
- All recordings wait for `networkidle` to ensure page is fully loaded

## Related Documentation

- Screenshots: `dev/screenshots/claude-generated/`
- Design Reviews: `dev/docs/claude-generated/design-reviews/`
- Actionable Tasks: `dev/docs/claude-generated/actionable-tasks.md`
- Final Issues Report: `dev/docs/claude-generated/FINAL-ISSUES-REPORT.md`

---

**Generated:** 2025-11-14
**Viewport:** 1920x1080
**Format:** WebM
**Tool:** Playwright + Chromium
