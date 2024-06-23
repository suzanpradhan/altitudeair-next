'use client';
import DateSelector from '@/core/ui/components/DateSelector';
import SelectInput from '@/core/ui/components/SelecrInput';
import { PackagesDataType } from '@/modules/packages/packagesType';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

const options = [
  { value: '1', label: '1 Traveler' },
  { value: '2', label: '2 Travelers' },
  { value: '3', label: '3 Travelers' },
  { value: '4', label: '4 Travelers' },
  { value: '5', label: '5 Travelers' },
];

const BookingMainCard = ({
  packageData,
}: {
  packageData: PackagesDataType;
}) => {
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
    0: 'Jan',
    1: 'Feb',
    2: 'Mar',
    3: 'Apr',
    4: 'May',
    5: 'Jun',
    6: 'Jul',
    7: 'Aug',
    8: 'Sept',
    9: 'Oct',
    10: 'Nov',
    11: 'Dec',
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
      `/booking?slug=${slug}&packageId=${packageData.id}&packageName=${packageData.title}&departureDate=${departureDate!.toISOString()}&selectedOption=${selectedOption.value}`
    );
  };

  return (
    <div className="relative container mx-auto min-h-20">
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 min-w-72 w-11/12 sm:w-full md:w-3/4 lg:w-2/3 xl:w-1/2 grid grid-cols-12 place-content-center items-stretch bg-custom-gray border border-custom-gray-light rounded-lg shadow-md px-3">
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
          <p className="text-xs sm:text-base text-custom-blue capitalize font-normal">
            Departure Date
          </p>
          <p
            className={`text-sm sm:text-xl capitalize font-bold ${departureDate ? 'text-custom-blue' : 'text-custom-blue/50'}`}
          >
            {departureDate
              ? `${departureDate.getDate()} ${months[departureDate.getMonth()]} ${departureDate.getFullYear()}`
              : 'Month Days Years'}
          </p>
        </div>
        <div className="relative col-span-3 first-of-type:border-0 border-l border-custom-gray-light py-3 ps-3 cursor-pointer hover:bg-custom-blue/10">
          <SelectInput options={options} onChange={handleSelectChange} />
        </div>
        <div className="col-span-3 first-of-type:border-0 border-l border-custom-gray-light py-3 ps-3">
          <p className="text-xs sm:text-base text-custom-blue capitalize font-normal">
            Total Price
          </p>
          <p className="text-sm sm:text-xl text-custom-blue capitalize font-bold">
            $7200
          </p>
        </div>
        <div className="col-span-3 py-3 ps-3 cursor-pointer text-right">
          <button
            onClick={handleBooking}
            className="rounded-md text-custom-primary bg-custom-blue hover:shadow-md h-full px-3 sm:px-6 text-xs sm:text-lg font-light"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingMainCard;
