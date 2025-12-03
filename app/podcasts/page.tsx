import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Podcasts | Liberty Nation',
  description: 'Listen to Liberty Nation podcasts - political commentary, news analysis, and insightful discussions.',
};

export default function PodcastsPage() {
  redirect('/audio');
}
