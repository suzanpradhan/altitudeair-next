import { Metadata } from 'next';
import Gallery from './page';
export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Gallery page',
  openGraph: {
    title: 'Gallery',
    description: 'Gallery Page ',
    url: 'https://altitudeairnepal.com',
    images: [
      {
        url: 'https://altitudeairnepal.com/public/images/banner/banner.webp',
        width: 1200,
        height: 630,
        alt: 'Altitude Air Gallery',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function AboutPage() {
  return <Gallery />;
}
