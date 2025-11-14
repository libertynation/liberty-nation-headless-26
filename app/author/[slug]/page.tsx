import { redirect } from 'next/navigation';

// ISR: Revalidate every 60 seconds for news site - fast updates critical
export const revalidate = 60;

interface AuthorPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ params }: AuthorPageProps) {
  const { slug } = await params;

  // Since we're redirecting to WordPress, return minimal metadata
  const authorName = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return {
    title: `${authorName} | Liberty Nation`,
    description: `Articles by ${authorName} on Liberty Nation.`,
  };
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params;

  // Redirect to WordPress author page since the WordPress API requires
  // authentication for the /users endpoint
  redirect(`https://www.libertynation.com/author/${slug}/`);
}
