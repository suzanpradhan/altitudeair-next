import News from '@/app/(components)/(sections)/(landing)/News';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Article',
  description: 'Article page',
};

export default function ArticlePage() {
  return <News />;
}
