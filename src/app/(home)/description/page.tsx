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
      <section className="intro relative flex flex-col lg:flex-row">
        <div className="absolute top-36 left-1/2 transform -translate-x-1/2 z-20 text-center px-4">
          <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-semibold">
            FLEETS
          </h1>
        </div>
        <div className="flex flex-col lg:flex-row w-full h-full">
          <div className="flex-1 relative cursor-pointer w-full h-[250px] md:h-[400px] lg:h-full group">
            <div className="absolute inset-0 bg-black opacity-70 z-10 group-hover:opacity-0 transition-opacity duration-300"></div>
            <Image
              src="/images/description/Altitude1.jpg"
              alt="mountain background"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center z-30 group-hover:hidden transition-all duration-300">
              <span className="text-white text-2xl font-semibold">9N-AMS</span>
            </div>
          </div>
          <div className="flex-1 relative cursor-pointer w-full h-[250px] md:h-[400px] lg:h-full group">
            <div className="absolute inset-0 bg-black opacity-70 z-10 group-hover:opacity-0 transition-opacity duration-300"></div>
            <Image
              src="/images/banner/banner-4.jpg"
              alt="another background"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center z-30 group-hover:hidden transition-all duration-300">
              <span className="text-white text-2xl font-semibold">9N-ANX</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default page;
