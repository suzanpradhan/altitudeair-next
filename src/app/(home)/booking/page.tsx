'use client';

import { FaLocationDot } from 'react-icons/fa6';
import { IoTimeOutline } from 'react-icons/io5';
import BookingForm from './(components)/BookingForm';

const Booking = () => {
  return (
    <main className="bg-custom-gray">
      <div
        className="relative h-[50vh] sm:h-[70vh] w-full bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: `url(/images/banner/Sheyphoksundo.png)` }}
      >
        <div className="relative z-50 container mx-auto h-[40vh] sm:h-[60vh] px-6 sm:px-0 flex items-end">
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
      <div className="container mx-auto relative pb-20">
        <div className="relative -top-24">
          <BookingForm />
        </div>
      </div>
    </main>
  );
};

export default Booking;
