import { fetchData } from '@/core/api/api_client';
import { apiPaths } from '@/core/api/apiConstants';
import { customMetaDataGenerator } from '@/core/helpers/customMetaDataGenerator';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

interface ChoppersType {
  id: number;
  name: string;
  image?: string;
}
export const metadata: Metadata = customMetaDataGenerator({
  title: 'Fleets',
  ogImage1: 'https://altitudeairnepal.com/images/resized-images/Fleets.jpg',
  ogImage2: 'https://altitudeairnepal.com/images/resized-images/Fleets.jpg',
});
const Page = async () => {
  const choppers = await fetchData<{
    results: Array<ChoppersType>;
  }>(apiPaths.chopperUrl);

  const chopperList = choppers.data?.results ?? [];

  const getImageUrl = (imagePath?: string) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }
    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || '';
    return `${serverUrl}/${imagePath.replace(/^\//, '')}`;
  };

  return (
    <main className="description-main">
      <section className="intro relative flex flex-col lg:flex-row">
        <div className="absolute top-36 left-1/2 transform -translate-x-1/2 z-20 text-center px-4">
          <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-semibold">
            FLEETS
          </h1>
        </div>
        <div className="flex flex-col lg:flex-row w-full h-full">
          {chopperList.map((chopper, index) => (
            <Link
              key={chopper.id}
              href={`/fleets/${chopper.id}`}
              className="flex-1 relative cursor-pointer w-full h-[250px] md:h-[400px] lg:h-full group"
            >
              <div className="absolute inset-0 bg-black opacity-80 z-10 group-hover:opacity-0 transition-opacity duration-300"></div>
              <Image
                src={
                  chopper.image
                    ? getImageUrl(chopper.image)
                    : index === 0
                      ? '/images/banner/IMG_2036.JPG'
                      : '/images/banner/9N-AON.jpg'
                }
                alt={chopper.name || `Chopper ${chopper.id}`}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center z-30 group-hover:hidden transition-all duration-300">
                <span className="text-white text-2xl font-semibold">
                  {chopper.name || `Chopper ${chopper.id}`}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Page;
