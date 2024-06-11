import { FaLocationDot } from 'react-icons/fa6';
import { IoTimeOutline } from 'react-icons/io5';
import BookingCard from './(components)/BookingCard';
import BookingMainCard from './(components)/BookingMainCard';
import PackageAdditionalInfo from './(components)/PackageAdditionalInfo';
import PackageGallery from './(components)/PackageGallery';
import PackageHighlights from './(components)/PackageHighlights';
import PackageLocation from './(components)/PackageLocation';

interface PackageType {
  id: number;
  image: string;
  name: string;
  location: string;
  description: string;
  rating: number;
  elevation: string;
}

const data: PackageType = {
  id: 1,
  image: '/images/banner/Sheyphoksundo.png',
  name: 'Gosaikunda Pilgrimage Tour',
  location: 'NEPAL - Pilgrimage - Rasuwa',
  description:
    'Annapurna Sanctuary Heli Trek takes us through the different villages towards the southern face of Annapurna base camp.',
  rating: 4.5,
  elevation: '3700m',
};

export default function Packages() {
  return (
    <main className="bg-custom-gray-light/50 pb-20">
      <div
        className="relative h-[70vh] w-full bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: `url(${data.image})` }}
      >
        <div className="relative z-50 container mx-auto h-[60vh] flex items-end">
          <div>
            <h1 className="text-4xl text-white capitalize font-black">
              Ebc Private Heli Tour
            </h1>
            <p className="text-base text-white capitalize font-light flex items-center gap-2">
              <FaLocationDot /> Everest Base Camp
            </p>
            <p className="text-base text-white capitalize font-light flex items-center gap-2">
              <IoTimeOutline /> Duration: 1 Day
            </p>
            <p className="text-base text-white font-light">
              Starting from <span className="text-[#fbc200]">$1800</span>/p
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 top-0 right-0 bg-gradient-to-t from-custom-blue to-transparent"></div>
      </div>
      <BookingMainCard />
      <div className="container mx-auto flex justify-end items-center mb-5">
        <button className="rounded-sm text-white bg-custom-blue hover:shadow-md py-2 px-3 text-sm font-light">
          Ask Questions
        </button>
      </div>
      <div className="container mx-auto">
        <div className="grid grid-cols-12 place-content-start gap-x-10">
          <div className="col-span-8 w-full">
            <PackageAdditionalInfo />
            <PackageGallery />
            <PackageHighlights />
          </div>
          <div className="col-span-4 w-full">
            <PackageLocation />
            <BookingCard />
          </div>
        </div>
      </div>
    </main>
  );
}
