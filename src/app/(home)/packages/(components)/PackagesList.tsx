import Image from 'next/image';
import { FaStar } from 'react-icons/fa';

interface PackageType {
  id: number;
  image: string;
  name: string;
  location: string;
  description: string;
  rating: number;
  elevation: string;
}

const data: PackageType[] = [
  {
    id: 1,
    image: '/images/banner/banner-4.jpg',
    name: 'Gosaikunda Pilgrimage Tour',
    location: 'NEPAL - Pilgrimage - Rasuwa',
    description:
      'Annapurna Sanctuary Heli Trek takes us through the different villages towards the southern face of Annapurna base camp.',
    rating: 5.0,
    elevation: '3700m',
  },
  {
    id: 1,
    image: '/images/banner/banner-4.jpg',
    name: 'Gosaikunda Pilgrimage Tour',
    location: 'NEPAL - Pilgrimage - Rasuwa',
    description:
      'Annapurna Sanctuary Heli Trek takes us through the different villages towards the southern face of Annapurna base camp.',
    rating: 5.0,
    elevation: '3700m',
  },
  {
    id: 1,
    image: '/images/banner/banner-4.jpg',
    name: 'Gosaikunda Pilgrimage Tour',
    location: 'NEPAL - Pilgrimage - Rasuwa',
    description:
      'Annapurna Sanctuary Heli Trek takes us through the different villages towards the southern face of Annapurna base camp.',
    rating: 5.0,
    elevation: '3700m',
  },
  {
    id: 1,
    image: '/images/banner/banner-4.jpg',
    name: 'Gosaikunda Pilgrimage Tour',
    location: 'NEPAL - Pilgrimage - Rasuwa',
    description:
      'Annapurna Sanctuary Heli Trek takes us through the different villages towards the southern face of Annapurna base camp.',
    rating: 5.0,
    elevation: '3700m',
  },
  {
    id: 1,
    image: '/images/banner/banner-4.jpg',
    name: 'Gosaikunda Pilgrimage Tour',
    location: 'NEPAL - Pilgrimage - Rasuwa',
    description:
      'Annapurna Sanctuary Heli Trek takes us through the different villages towards the southern face of Annapurna base camp.',
    rating: 5.0,
    elevation: '3700m',
  },
  {
    id: 1,
    image: '/images/banner/banner-4.jpg',
    name: 'Gosaikunda Pilgrimage Tour',
    location: 'NEPAL - Pilgrimage - Rasuwa',
    description:
      'Annapurna Sanctuary Heli Trek takes us through the different villages towards the southern face of Annapurna base camp.',
    rating: 5.0,
    elevation: '3700m',
  },
  {
    id: 1,
    image: '/images/banner/banner-4.jpg',
    name: 'Gosaikunda Pilgrimage Tour',
    location: 'NEPAL - Pilgrimage - Rasuwa',
    description:
      'Annapurna Sanctuary Heli Trek takes us through the different villages towards the southern face of Annapurna base camp.',
    rating: 5.0,
    elevation: '3700m',
  },
  {
    id: 1,
    image: '/images/banner/banner-4.jpg',
    name: 'Gosaikunda Pilgrimage Tour',
    location: 'NEPAL - Pilgrimage - Rasuwa',
    description:
      'Annapurna Sanctuary Heli Trek takes us through the different villages towards the southern face of Annapurna base camp.',
    rating: 5.0,
    elevation: '3700m',
  },
];

const PackagesList = () => {
  return (
    <div className="grid grid-cols-12 gap-y-5 gap-x-5">
      {data && data.length > 0 ? (
        data.map((item, index) => {
          return (
            <div className="col-span-3 bg-white rounded-2xl p-3" key={index}>
              <div className="flex flex-col gap-1">
                <div className="w-full h-64 relative overflow-hidden rounded-xl">
                  <Image
                    src={item.image}
                    alt="image"
                    objectFit="cover"
                    layout="fill"
                    sizes="(max-width: 768px) 100vw, (max-width: 2000px) 75vw, 33vw"
                  />
                </div>
                <h3 className="text-lg font-medium">{item.name}</h3>
                <p className="text-xs text-slate-400">{item.location}</p>
                <div className="border-b border-slate-100 my-2"></div>
                <p className="text-sm text-slate-600">{item.description}</p>
                <div className="flex justify-between items-center">
                  <p className="flex items-center gap-1">
                    <FaStar size={21} color="#fbba22" />
                    <span className="font-bold">{item.rating}</span>
                  </p>
                  <span className="text-base font-medium">
                    {item.elevation}
                  </span>
                </div>
                <div className="border-b border-slate-100 my-2"></div>
                <div>
                  <button className="w-full text-sm font-medium py-2 px-5 rounded-md bg-[#fbc200] hover:bg-[#fbc000db] hover:shadow-md">
                    View Detail
                  </button>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <></>
      )}
    </div>
  );
};

export default PackagesList;
