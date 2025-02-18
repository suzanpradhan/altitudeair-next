'use client';

import { useAppDispatch, useAppSelector } from '@/core/redux/hooks';
import { RootState } from '@/core/redux/store';
import packagesApi from '@/modules/packages/packagesApi';
import { PackagesDataType } from '@/modules/packages/packagesType';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaLocationDot } from 'react-icons/fa6';
import { IoTimeOutline } from 'react-icons/io5';
import axiosInst from '../../../../core/utils/axoisInst';
import BookingMainCard from './(components)/BookingMainCard';
import PackageAdditionalInfo from './(components)/PackageAdditionalInfo';
import PackageGallery from './(components)/PackageGallery';
import PackageHighlights from './(components)/PackageHighlights';
import PackageLocation from './(components)/PackageLocation';
import RelatedPackages from './(components)/RelatedPackages';

export default function Packages({ params }: { params: { slug: string } }) {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hotline, setHotline] = useState('');
  const [departureDate, setDepartureDate] = useState<Date>(new Date());
  const [selectedOption, setSelectedOption] = useState({
    value: '1',
    label: '1 traveler',
  });

  const getImage = (packageSlug: string) => {
    switch (packageSlug) {
      case 'khumbu':
        return '/images/packages/khumbu.jpg';
      default:
        return undefined;
    }
  };

  useEffect(() => {
    axiosInst.get('/footer/').then((result) => {
      const data = result.data.data;
      setHotline(data[0].hotline);
    });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    dispatch(packagesApi.endpoints.getPackage.initiate(params.slug))
      .then(() => {
        setIsLoading(false);
      })
      .catch((error: any) => {
        setIsLoading(false);
        console.error('Error fetching package:', error);
        setError('Error fetching data');
      });
  }, [dispatch, params]);

  const packageData = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries[`getPackage`]?.data as PackagesDataType
  );

  if (error) {
    return <div>Error: {error}</div>;
  }
  return !isLoading ? (
    packageData ? (
      <div className="bg-custom-gray-light/50 ">
        <div
          className="relative h-[50vh] sm:h-[70vh] w-full bg-no-repeat bg-cover bg-center"
          style={{ backgroundImage: `url(${packageData.cover_image})` }}
        >
          <div className="relative z-10 container mx-auto h-[40vh] sm:h-[60vh] px-6 sm:px-0 flex items-end">
            <div>
              <h1 className="text-4xl text-white capitalize font-black">
                {packageData.title}
              </h1>
              <p className="text-base text-white capitalize font-light flex items-center gap-2">
                <FaLocationDot /> {packageData.address}
              </p>
              <p className="text-base text-white capitalize font-light flex items-center gap-2">
                <IoTimeOutline /> Duration: {packageData.duration}
              </p>
              <p className="text-base text-white font-light">
                Starting from{' '}
                <span className="text-[#fbc200]">
                  {packageData.currency === 'USD' ? '$' : 'NPR.'}
                  {parseFloat(packageData.price ?? '0').toFixed(
                    packageData.currency === 'USD' ? 2 : 0
                  )}
                  {packageData.pricing_type === 'fixed' ? '' : ' /p'}
                </span>
              </p>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 top-0 right-0 bg-gradient-to-t from-custom-blue to-transparent"></div>
        </div>
        <BookingMainCard
          packageData={packageData}
          departureDate={departureDate}
          selectedOption={selectedOption}
          setDepartureDate={setDepartureDate}
          setSelectedOption={setSelectedOption}
        />
        <div className="container mx-auto">
          <div className="grid grid-cols-12 place-content-start sm:gap-x-10 sm:gap-y-10 px-0">
            <div className="col-span-12 md:col-span-8 w-full">
              <PackageAdditionalInfo />
              <PackageGallery packageSlug={packageData.slug} />
              <PackageHighlights
                data={packageData.description}
                hotline={hotline}
              />
            </div>
            <div className="col-span-12 md:col-span-4 w-full flex flex-col gap-4">
              {/* <CalendarPicker /> */}
              {packageData.latitude && packageData.longitude ? (
                <PackageLocation
                  latitude={parseFloat(packageData.latitude)}
                  longtitude={parseFloat(packageData.longitude)}
                />
              ) : (
                <></>
              )}
              {getImage(params.slug) ? (
                <div className="relative w-full aspect-square">
                  <Image
                    src={getImage(params.slug)!}
                    sizes=""
                    fill
                    objectFit="cover"
                    alt={`${packageData.title} route image`}
                  />
                </div>
              ) : (
                <></>
              )}
              {/* <BookingCard /> */}
            </div>
          </div>
        </div>
        <RelatedPackages />
        <Link
          href={(() => {
            const params = new URLSearchParams({
              depart: departureDate.toUTCString(),
              travellers:
                packageData.pricing_type === 'fixed'
                  ? ''
                  : selectedOption.value,
            });
            return `/packages/${packageData.slug}/booking?${params.toString()} `;
          })()}
          className="fixed sm:hidden mb-5 mr-20 rounded-xl border border-white  text-white shadow-xl inline-flex z-50 text-xl items-center bg-custom-blue  bottom-0 right-0 hover:shadow-md px-3 py-2 font-light"
        >
          Book Now
        </Link>
      </div>
    ) : null
  ) : (
    <>Loading...</>
  );
  // return <div></div>;
}
