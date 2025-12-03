import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Daily Briefing | Liberty Nation',
  description: 'Get your daily briefing from Liberty Nation - news, analysis, and commentary delivered to your inbox.',
};

export default function DailyBriefingPage() {
  redirect('/subscribe');
}
