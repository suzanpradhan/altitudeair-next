'use client';
import DateSelector from '@/core/ui/components/DateSelector';
import { useState } from 'react';

const BookingMainCard = () => {
  const [departureDate, setDepartureDate] = useState<Date | undefined>();
  const [isOpen, toogleOpen] = useState<boolean>(false);
  const handleChange = (value: Date) => {
    console.log('just now', value);
    if (isOpen) setDepartureDate(value);
  };

  const months: Record<number, string> = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December',
  };

  return (
    <div className="relative container mx-auto min-h-20">
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 min-w-80 w-1/2 grid grid-cols-12 place-content-center items-stretch bg-custom-gray border border-custom-gray-light rounded-lg shadow-md px-3">
        <div
          className="col-span-3 first-of-type:border-0 border-l border-custom-gray-light py-3 first-of-type:ps-0 ps-3 cursor-pointer"
          onClick={() => {
            console.log(!isOpen);

            toogleOpen(!isOpen);
          }}
        >
          <label
            className="text-base text-custom-blue capitalize font-normal"
            aria-label="departure-date"
            htmlFor="departure-date"
          >
            Departure Date
          </label>
          <p className="text-xl text-custom-blue capitalize font-bold">
            {departureDate
              ? `${departureDate.getDate()} ${months[departureDate.getMonth()]} ${departureDate.getFullYear()}`
              : ''}
          </p>
          <DateSelector
            id="departure-date"
            className="date-selector"
            handleOnChange={handleChange}
            isOpen={isOpen}
            onCalendarClose={() => {
              if (isOpen) {
                toogleOpen(!isOpen);
              }
            }}
          />
        </div>
        <div className="col-span-3 first-of-type:border-0 border-l border-custom-gray-light py-3 ps-3">
          <p className="text-base text-custom-blue capitalize font-normal">
            Travelers
          </p>
          <p className="text-xl text-custom-blue capitalize font-bold">
            4 Travelers
          </p>
        </div>
        <div className="col-span-3 first-of-type:border-0 border-l border-custom-gray-light py-3 ps-3">
          <p className="text-base text-custom-blue capitalize font-normal">
            Total Price
          </p>
          <p className="text-xl text-custom-blue capitalize font-bold">$7200</p>
        </div>
        <div className="col-span-3 py-3 ps-3 text-right">
          <button className="rounded-md text-custom-primary bg-custom-blue hover:shadow-md h-full px-6 text-lg font-light">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingMainCard;
