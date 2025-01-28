import { Metadata } from 'next';
import Description from './page';
export const metadata: Metadata = {
  title: 'Fleets',
  description: 'Fleets page',
  openGraph: {
    title: 'Fleets ',
    description: 'Fleets page',
    url: 'https://altitudeairnepal.com',
    images: [
      {
        url: 'https://altitudeairnepal.com/images/description/down.webp',
        width: 1200,
        height: 630,
        alt: 'Fleets ',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function FleetsPage() {
  return <Description />;
}
