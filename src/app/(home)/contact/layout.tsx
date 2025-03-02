import { Metadata } from 'next';
import ContactPage from './page';
export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact page',
  openGraph: {
    title: 'Contact Us',
    description: 'Contact page',
    images: [
      {
        url: 'https://altitudeairnepal.com/images/banner/banner.webp',
        width: 1200,
        height: 630,
        alt: 'Altitude Air Contact',
      },
    ],
  },
};

export default function Contact() {
  return <ContactPage />;
}
