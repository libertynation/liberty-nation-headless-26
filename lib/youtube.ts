// This file should only run on the server
import 'server-only';

// Liberty Nation YouTube Channel ID
// Found from: https://www.youtube.com/@libertynation
const CHANNEL_ID = 'UCFJNurMd0OqPRdeKgV8R9BA';

// YouTube API key (optional - falls back to RSS feed if not provided)
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  publishedAt: string;
  videoUrl: string;
}

/**
 * Fetch latest videos from Liberty Nation's YouTube channel
 * Uses YouTube Data API if key is available, otherwise uses RSS feed
 */
export async function getLatestYouTubeVideos(maxResults: number = 3): Promise<YouTubeVideo[]> {
  if (YOUTUBE_API_KEY) {
    return getVideosFromAPI(maxResults);
  } else {
    return getVideosFromRSS(maxResults);
  }
}

/**
 * Fetch videos using YouTube Data API v3
 */
async function getVideosFromAPI(maxResults: number): Promise<YouTubeVideo[]> {
  try {
    const url = `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet&order=date&type=video&maxResults=${maxResults}`;

    const response = await fetch(url, {
      next: {
        revalidate: 300, // Cache for 5 minutes
        tags: ['youtube-videos']
      }
    });

    if (!response.ok) {
      console.error('YouTube API error:', response.status, response.statusText);
      return [];
    }

    const data = await response.json();

    return data.items.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnailUrl: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default.url,
      publishedAt: item.snippet.publishedAt,
      videoUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`
    }));
  } catch (error) {
    console.error('Error fetching YouTube videos from API:', error);
    return [];
  }
}

/**
 * Fetch videos using YouTube RSS feed (no API key required)
 */
async function getVideosFromRSS(maxResults: number): Promise<YouTubeVideo[]> {
  try {
    const url = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

    const response = await fetch(url, {
      next: {
        revalidate: 300, // Cache for 5 minutes
        tags: ['youtube-videos']
      }
    });

    if (!response.ok) {
      console.error('YouTube RSS error:', response.status, response.statusText);
      return [];
    }

    const xmlText = await response.text();

    // Parse XML to extract video data
    const videos: YouTubeVideo[] = [];

    // Use regex to extract entries from XML
    const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
    const entries = [...xmlText.matchAll(entryRegex)];

    for (let i = 0; i < Math.min(entries.length, maxResults); i++) {
      const entry = entries[i][1];

      // Extract video ID
      const videoIdMatch = entry.match(/<yt:videoId>(.*?)<\/yt:videoId>/s);
      const videoId = videoIdMatch ? videoIdMatch[1].trim() : '';

      // Extract title (handle CDATA)
      const titleMatch = entry.match(/<title>(.*?)<\/title>/s);
      let title = '';
      if (titleMatch) {
        const titleContent = titleMatch[1];
        const cdataMatch = titleContent.match(/<!\[CDATA\[(.*?)\]\]>/s);
        title = cdataMatch ? cdataMatch[1] : titleContent;
      }

      // Extract description (handle CDATA)
      const descMatch = entry.match(/<media:description>(.*?)<\/media:description>/s);
      let description = '';
      if (descMatch) {
        const descContent = descMatch[1];
        const cdataMatch = descContent.match(/<!\[CDATA\[(.*?)\]\]>/s);
        description = cdataMatch ? cdataMatch[1] : descContent;
      }

      // Extract thumbnail
      const thumbMatch = entry.match(/<media:thumbnail url="(.*?)"/);
      const thumbnailUrl = thumbMatch ? thumbMatch[1] : `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;

      // Extract published date
      const pubMatch = entry.match(/<published>(.*?)<\/published>/);
      const publishedAt = pubMatch ? pubMatch[1].trim() : '';

      if (videoId && title) {
        videos.push({
          id: videoId,
          title: decodeHTMLEntities(title.trim()),
          description: decodeHTMLEntities(description.trim()),
          thumbnailUrl,
          publishedAt,
          videoUrl: `https://www.youtube.com/watch?v=${videoId}`
        });
      }
    }

    return videos;
  } catch (error) {
    console.error('Error fetching YouTube videos from RSS:', error);
    return [];
  }
}

/**
 * Decode HTML entities in strings
 */
function decodeHTMLEntities(text: string): string {
  const entities: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&apos;': "'"
  };

  return text.replace(/&[^;]+;/g, (entity) => entities[entity] || entity);
}
