import PackageCard from './PackageCard';

export interface PackageType {
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
      'Altitude air takes us through the different villages towards the southern face of Annapurna base camp.',
    rating: 4.5,
    elevation: '3700m',
  },
  {
    id: 1,
    image: '/images/banner/banner-4.jpg',
    name: 'Gosaikunda Pilgrimage Tour',
    location: 'NEPAL - Pilgrimage - Rasuwa',
    description:
      'Altitude air takes us through the different villages towards the southern face of Annapurna base camp.',
    rating: 5.0,
    elevation: '3700m',
  },
  {
    id: 1,
    image: '/images/banner/banner-4.jpg',
    name: 'Gosaikunda Pilgrimage Tour',
    location: 'NEPAL - Pilgrimage - Rasuwa',
    description:
      'Altitude air takes us through the different villages towards the southern face of Annapurna base camp.',
    rating: 4.0,
    elevation: '3700m',
  },
  {
    id: 1,
    image: '/images/banner/banner-4.jpg',
    name: 'Gosaikunda Pilgrimage Tour',
    location: 'NEPAL - Pilgrimage - Rasuwa',
    description:
      'Altitude air takes us through the different villages towards the southern face of Annapurna base camp.',
    rating: 3.5,
    elevation: '3700m',
  },
  {
    id: 1,
    image: '/images/banner/banner-4.jpg',
    name: 'Gosaikunda Pilgrimage Tour',
    location: 'NEPAL - Pilgrimage - Rasuwa',
    description:
      'Altitude air takes us through the different villages towards the southern face of Annapurna base camp.',
    rating: 5.0,
    elevation: '3700m',
  },
  {
    id: 1,
    image: '/images/banner/banner-4.jpg',
    name: 'Gosaikunda Pilgrimage Tour',
    location: 'NEPAL - Pilgrimage - Rasuwa',
    description:
      'Altitude air takes us through the different villages towards the southern face of Annapurna base camp.',
    rating: 5.0,
    elevation: '3700m',
  },
  {
    id: 1,
    image: '/images/banner/banner-4.jpg',
    name: 'Gosaikunda Pilgrimage Tour',
    location: 'NEPAL - Pilgrimage - Rasuwa',
    description:
      'Altitude air takes us through the different villages towards the southern face of Annapurna base camp.',
    rating: 5.0,
    elevation: '3700m',
  },
  {
    id: 1,
    image: '/images/banner/banner-4.jpg',
    name: 'Gosaikunda Pilgrimage Tour',
    location: 'NEPAL - Pilgrimage - Rasuwa',
    description:
      'Altitude air takes us through the different villages towards the southern face of Annapurna base camp.',
    rating: 5.0,
    elevation: '3700m',
  },
];

const PackagesList = () => {
  return (
    <div className="grid grid-cols-12 gap-y-5 gap-x-5">
      {data && data.length > 0 ? (
        data.map((item, index) => <PackageCard item={item} key={index} />)
      ) : (
        <></>
      )}
    </div>
  );
};

export default PackagesList;
