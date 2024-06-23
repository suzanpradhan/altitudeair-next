'use client';
import { useAppDispatch, useAppSelector } from '@/core/redux/hooks';
import { RootState } from '@/core/redux/store';
import packagesApi from '@/modules/packages/packagesApi';
import { PackagesDataType } from '@/modules/packages/packagesType';
import { useEffect, useState } from 'react';
import PackageCard from './PackageCard';

// const data: PackageType[] = [
//   {
//     id: 1,
//     image: '/images/banner/Sheyphoksundo.png',
//     name: 'Gosaikunda Pilgrimage Tour',
//     duration: '2 Days',
//     location: 'Everest Base Camp',
//     description:
//       'Altitude air takes us through the different villages towards the southern face of Annapurna base camp.',
//     rating: 4.5,
//     elevation: '3700m',
//   },
//   {
//     id: 1,
//     image: '/images/banner/banner-4.jpg',
//     name: 'Gosaikunda Pilgrimage Tour',
//     duration: '2 Days',
//     location: 'Everest Base Camp',
//     description:
//       'Altitude air takes us through the different villages towards the southern face of Annapurna base camp.',
//     rating: 5.0,
//     elevation: '3700m',
//   },
//   {
//     id: 1,
//     image: '/images/banner/altitude.png',
//     name: 'Gosaikunda Pilgrimage Tour',
//     duration: '2 Days',
//     location: 'Everest Base Camp',
//     description:
//       'Altitude air takes us through the different villages towards the southern face of Annapurna base camp.',
//     rating: 4.0,
//     elevation: '3700m',
//   },
//   {
//     id: 1,
//     image: '/images/banner/banner-4.jpg',
//     name: 'Gosaikunda Pilgrimage Tour',
//     duration: '2 Days',
//     location: 'Everest Base Camp',
//     description:
//       'Altitude air takes us through the different villages towards the southern face of Annapurna base camp.',
//     rating: 3.5,
//     elevation: '3700m',
//   },
//   {
//     id: 1,
//     image: '/images/banner/banner.webp',
//     name: 'Gosaikunda Pilgrimage Tour',
//     duration: '2 Days',
//     location: 'Everest Base Camp',
//     description:
//       'Altitude air takes us through the different villages towards the southern face of Annapurna base camp.',
//     rating: 5.0,
//     elevation: '3700m',
//   },
//   {
//     id: 1,
//     image: '/images/banner/banner-2.webp',
//     name: 'Gosaikunda Pilgrimage Tour',
//     duration: '2 Days',
//     location: 'Everest Base Camp',
//     description:
//       'Altitude air takes us through the different villages towards the southern face of Annapurna base camp.',
//     rating: 5.0,
//     elevation: '3700m',
//   },
//   {
//     id: 1,
//     image: '/images/banner/banner-3.webp',
//     name: 'Gosaikunda Pilgrimage Tour',
//     duration: '2 Days',
//     location: 'Everest Base Camp',
//     description:
//       'Altitude air takes us through the different villages towards the southern face of Annapurna base camp.',
//     rating: 5.0,
//     elevation: '3700m',
//   },
//   {
//     id: 1,
//     image: '/images/banner/banner-4.jpg',
//     name: 'Gosaikunda Pilgrimage Tour',
//     duration: '2 Days',
//     location: 'Everest Base Camp',
//     description:
//       'Altitude air takes us through the different villages towards the southern face of Annapurna base camp.',
//     rating: 5.0,
//     elevation: '3700m',
//   },
// ];

const PackagesList = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    dispatch(packagesApi.endpoints.getAllPackages.initiate())
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error('Error fetching packages:', error);
        setError('Error fetching data');
      });
  }, [dispatch]);

  const packagesResponse = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries[`getAllPackages`]?.data as PackagesDataType[]
  );

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className="grid grid-cols-12 gap-y-7 gap-x-7 px-5 sm:px-0">
      {!isLoading ? (
        packagesResponse && packagesResponse.length > 0 ? (
          packagesResponse.map((item, index) => {
            return <PackageCard item={item} key={index} />;
          })
        ) : (
          <div className="col-span-12 text-center">
            <h3 className="border-2 border-dashed mx-auto max-w-xs text-custom-gray-light text-sm font-semibold bg-custom-gray py-2">
              No packages available at this time
            </h3>
          </div>
        )
      ) : (
        <div className="col-span-12 text-center">
          <h3 className="border-2 border-dashed mx-auto max-w-xs text-custom-gray-light text-sm font-semibold bg-custom-gray py-2">
            Loading...
          </h3>
        </div>
      )}
    </div>
  );
};

export default PackagesList;
