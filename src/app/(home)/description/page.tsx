import { Metadata } from 'next';
import Image from 'next/image';

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
const page = () => {
  return (
    <main className="description-main">
      <section className="intro relative">
        <div className="absolute inset-0 bg-black opacity-70 z-10"></div>
        <div className="absolute top-36 left-1/2 transform -translate-x-1/2 z-10 text-center px-4">
          <h1 className="">FLEETS</h1>
        </div>
        <div className="bg-img mountain-img relative h-64 sm:h-80 md:h-96 lg:h-[32rem] ">
          <Image
            src="/images/description/Altitude1.jpg"
            alt="mountain background"
            fill
            className="object-cover"
          />
        </div>
      </section>
    </main>
  );
};

export default page;
