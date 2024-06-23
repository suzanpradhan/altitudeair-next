'use client';

import { useAppSelector } from '@/core/redux/hooks';
import { useRouter } from 'next/navigation';
import { FaLocationDot } from 'react-icons/fa6';
import { IoTimeOutline } from 'react-icons/io5';
import BookingForm from './(components)/BookingForm';

const Booking = () => {
  const router = useRouter();
  const {
    packageId,
    packageName,
    packagePrice,
    packageCover,
    departureDate,
    selectedOption,
  } = useAppSelector((state) => state.booking);

  if (!packageId || !packageName || !packagePrice) {
    router.push(`/packages`);
  }
  return (
    <main className="bg-custom-gray">
      <div
        className="relative h-[50vh] sm:h-[70vh] w-full bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: `url(${packageCover})` }}
      >
        <div className="relative z-50 container mx-auto h-[40vh] sm:h-[60vh] px-6 sm:px-0 flex items-end">
          <div>
            <h1 className="text-4xl text-white capitalize font-black">
              {packageName}
            </h1>
            <p className="text-base text-white capitalize font-light flex items-center gap-2">
              <FaLocationDot /> Everest Base Camp
            </p>
            <p className="text-base text-white capitalize font-light flex items-center gap-2">
              <IoTimeOutline /> Duration: 1 Day
            </p>
            <p className="text-base text-white font-light">
              Starting from{' '}
              <span className="text-[#fbc200]">${packagePrice}</span>/p
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 top-0 right-0 bg-gradient-to-t from-custom-blue to-transparent"></div>
      </div>
      <div className="container mx-auto relative pb-20">
        <div className="relative -top-14">
          <BookingForm />
        </div>
      </div>
    </main>
  );
};

export default Booking;
