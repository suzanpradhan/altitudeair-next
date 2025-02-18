import { Metadata } from 'next';
import PackagesList from './(components)/PackagesList';

export const metadata: Metadata = {
  title: 'Packages',
  description:
    'Helicopter tour over the Himalayas is indeed a lifetime experience. The magnificent views of the Himalayas is the unique specialty of helicopter treks.',
  openGraph: {
    title: 'Packages ',
    description:
      'Helicopter tour over the Himalayas is indeed a lifetime experience. The magnificent views of the Himalayas is the unique specialty of helicopter treks.',
    images: [
      {
        url: 'https://altitudeairnepal.com/images/banner/banner.webp',
        width: 1200,
        height: 630,
        alt: 'Altitude Air Packages',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};
export default function Packages() {
  return (
    <div className="bg-custom-gray-light/50 pb-20">
      <div
        className="relative h-[80vh] w-full bg-no-repeat bg-cover flex items-end justify-center"
        style={{ backgroundImage: 'url(/images/banner/banner.webp)' }}
      >
        <h1
          className="text-white z-10 mb-16 text-3xl text-center"
          style={{ fontFamily: 'BankGothic-Regular', wordSpacing: '5px' }}
        >
          Heli Trek
        </h1>
        <div className="absolute bottom-0 left-0 top-0 right-0 bg-gradient-to-t from-custom-blue to-transparent"></div>
      </div>
      <div className="container mx-auto">
        <h2 className="text-center text-lg font-medium text-custom-blue my-10 max-w-xs md:max-w-3xl mx-auto">
          Helicopter tour over the Himalayas is indeed a lifetime experience.
          The magnificent views of the Himalayas is the unique specialty of
          helicopter treks.
        </h2>
        <PackagesList />
      </div>
    </div>
  );
}
