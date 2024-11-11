import { Metadata } from 'next';
import About from './page';
export const metadata: Metadata = {
  title: 'About',
  description: 'About page',
  openGraph: {
    title: 'Contact Us',
    description: 'Contact page',
    images: [
      {
        url: 'https://altitudeairnepal.com/images/banner/banner-2.webp',
        width: 1200,
        height: 630,
        alt: 'Altitude Air Contact',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function AboutPage() {
  return <About />;
}
