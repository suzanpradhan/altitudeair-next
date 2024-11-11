import { Metadata } from 'next';
import VoluntaryHazardReport from './page';
export const metadata: Metadata = {
  title: 'Voluntary Hazard',
  description: 'VoluntaryHazardReport page',
  openGraph: {
    title: 'Voluntary Hazard',
    description: 'VoluntaryHazardReport page',
    url: 'https://altitudeairnepal.com',
    images: [
      {
        url: 'https://altitudeairnepal.com/public/images/hazard/featured.webp',
        width: 1200,
        height: 630,
        alt: 'VoluntaryHazardReport ',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function VoluntaryPage() {
  return <VoluntaryHazardReport />;
}
