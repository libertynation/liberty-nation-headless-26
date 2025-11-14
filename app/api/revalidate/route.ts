import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

// API route for on-demand revalidation
// WordPress can call this webhook when content is updated
// URL: /api/revalidate?secret=YOUR_SECRET_TOKEN&path=/

export async function POST(request: NextRequest) {
  const searchParams = request.searchParams;
  const secret = searchParams.get('secret');
  const path = searchParams.get('path');
  const slug = searchParams.get('slug');

  // Check for secret to confirm this is a valid request
  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json(
      { message: 'Invalid secret' },
      { status: 401 }
    );
  }

  try {
    // Revalidate by path
    if (path) {
      revalidatePath(path);
      return NextResponse.json({
        revalidated: true,
        path,
        now: Date.now()
      });
    }

    // Revalidate specific article by slug
    if (slug) {
      revalidatePath(`/${slug}`);
      return NextResponse.json({
        revalidated: true,
        slug,
        path: `/${slug}`,
        now: Date.now()
      });
    }

    // Revalidate all WordPress API calls by tag
    revalidateTag('wordpress-api');

    // Also revalidate homepage
    revalidatePath('/');

    return NextResponse.json({
      revalidated: true,
      message: 'Revalidated all WordPress content',
      now: Date.now()
    });
  } catch (err) {
    return NextResponse.json(
      { message: 'Error revalidating', error: String(err) },
      { status: 500 }
    );
  }
}

// Also support GET for easier testing
export async function GET(request: NextRequest) {
  return POST(request);
}
