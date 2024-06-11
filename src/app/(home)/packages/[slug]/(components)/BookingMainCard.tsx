'use client';
import DateSelector from '@/core/ui/components/DateSelector';
import SelectInput from '@/core/ui/components/SelecrInput';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { PackageType } from '../../(components)/PackagesList';

const options = [
  { value: '1', label: '1 Traveler' },
  { value: '2', label: '2 Travelers' },
  { value: '3', label: '3 Travelers' },
  { value: '4', label: '4 Travelers' },
  { value: '5', label: '5 Travelers' },
];

const BookingMainCard = ({ packageData }: { packageData: PackageType }) => {
  const router = useRouter();
  const slug = useParams();
  console.log(slug);
  const [departureDate, setDepartureDate] = useState<Date>(new Date());
  const [selectedOption, setSelectedOption] = useState({
    value: '',
    label: '',
  });
  const [isOpen, toogleOpen] = useState<boolean>(false);
  const handleChange = (value: Date) => {
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

  const handleSelectChange = (selectedOption: {
    value: string;
    label: string;
  }) => {
    setSelectedOption(selectedOption);
    console.log('Selected option:', selectedOption);
  };

  const handleBooking = () => {
    router.push(
      `/booking?slug=${slug}&packageId=${packageData.id}&packageName=${packageData.name}&departureDate=${departureDate!.toISOString()}&selectedOption=${selectedOption.value}`
    );
  };

  return (
    <div className="relative container mx-auto min-h-20">
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 min-w-80 w-1/2 grid grid-cols-12 place-content-center items-stretch bg-custom-gray border border-custom-gray-light rounded-lg shadow-md px-3">
        <div
          className="col-span-3 first-of-type:border-0 border-l border-custom-gray-light py-3 first-of-type:ps-0 ps-3 hover:bg-custom-blue/10 cursor-pointer"
          onClick={() => {
            toogleOpen(!isOpen);
          }}
        >
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
          <label
            className="text-base text-custom-blue capitalize font-normal"
            aria-label="departure-date"
            htmlFor="departure-date"
          >
            Departure Date
          </label>
          <p
            className={` text-xl capitalize font-bold ${departureDate ? 'text-custom-blue' : 'text-custom-blue/50'}`}
          >
            {departureDate
              ? `${departureDate.getDate()} ${months[departureDate.getMonth()]} ${departureDate.getFullYear()}`
              : 'Month Days Years'}
          </p>
        </div>
        <div className="relative col-span-3 first-of-type:border-0 border-l border-custom-gray-light py-3 ps-3 cursor-pointer hover:bg-custom-blue/10">
          <SelectInput options={options} onChange={handleSelectChange} />
        </div>
        <div className="col-span-3 first-of-type:border-0 border-l border-custom-gray-light py-3 ps-3 cursor-pointer hover:bg-custom-blue/10">
          <p className="text-base text-custom-blue capitalize font-normal">
            Total Price
          </p>
          <p className="text-xl text-custom-blue capitalize font-bold">$7200</p>
        </div>
        <div className="col-span-3 py-3 ps-3 cursor-pointer text-right">
          <button
            onClick={handleBooking}
            className="rounded-md text-custom-primary bg-custom-blue hover:shadow-md h-full px-6 text-lg font-light"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingMainCard;
