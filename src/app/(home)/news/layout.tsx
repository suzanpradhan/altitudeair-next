import News from '@/app/(components)/(sections)/(landing)/News';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Article',
  description: 'Article page',
  openGraph: {
    title: 'Article ',
    description: 'Article page',
    url: 'https://altitudeairnepal.com',
    images: [
      {
        url: 'https://altitudeairnepal.com/images/banner/banner-4.jpg',
        width: 1200,
        height: 630,
        alt: 'Altitude Air Article',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function ArticlePage() {
  return <News />;
}
