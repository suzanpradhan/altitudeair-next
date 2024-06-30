'use client';
import { useAppDispatch, useAppSelector } from '@/core/redux/hooks';
import { RootState } from '@/core/redux/store';
import { PaginatedResponseType } from '@/core/types/responseTypes';
import CalendarPicker from '@/core/ui/components/CalendarPicker';
import SelectInput from '@/core/ui/components/SelectInput';
import availableSeatsApi from '@/modules/availableSeats/avaiableSeatsApi';
import { AvailableSeatsDataType } from '@/modules/availableSeats/avaiableSeatsType';
import { setBookingDetails } from '@/modules/bookings/bookingSlice';
import { PackagesDataType } from '@/modules/packages/packagesType';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// export const options = [
//   { value: '1', label: '1 Traveler' },
//   { value: '2', label: '2 Travelers' },
//   { value: '3', label: '3 Travelers' },
//   { value: '4', label: '4 Travelers' },
//   { value: '5', label: '5 Travelers' },
//   { value: '5', label: '5 Travelers' },
// ];

interface Option {
  value: string;
  label: string;
}

export const months: Record<number, string> = {
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

const BookingMainCard = ({
  packageData,
}: {
  packageData: PackagesDataType;
}) => {
  const router = useRouter();
  const [departureDate, setDepartureDate] = useState<Date>(new Date());
  const [selectedOption, setSelectedOption] = useState({
    value: '1',
    label: '1 traveler',
  });
  const [isOpen, toggleOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const generateOptions = (n: number) => {
    return Array.from({ length: n }, (_, i) => ({
      value: (i + 1).toString(),
      label: `${i + 1} Traveler${i + 1 > 1 ? 's' : ''}`,
    }));
  };
  const initialOptions = generateOptions(packageData.max_size ?? 5);
  const [options, setOptions] = useState<Option[]>(initialOptions);

  useEffect(() => {
    setIsLoading(true);
    dispatch(
      availableSeatsApi.endpoints.getAvailableSeats.initiate(packageData.slug)
    )
      .then(() => {
        setIsLoading(false);
      })
      .catch((error: any) => {
        setIsLoading(false);
        console.error('Error fetching available seats:', error);
        setError('Error fetching data');
      });
  }, [dispatch, packageData.slug]);

  const availableSeats = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries[`getAvailableSeats`]
        ?.data as PaginatedResponseType<AvailableSeatsDataType>
  );

  const handleDateSelect = (date: Date) => {
    setDepartureDate(date);
  };

  const handleAvailableSeats = (seats: number | null) => {
    console.log(seats);
    if (seats != null && packageData.max_size) {
      if (seats < packageData.max_size) {
        console.log('seats is less than max size');
        setOptions(generateOptions(seats));
      } else {
        setOptions(initialOptions);
      }
    }
  };

  const handleSelectChange = (selectedOption: {
    value: string;
    label: string;
  }) => {
    setSelectedOption(selectedOption);
  };

  const handleBooking = () => {
    dispatch(
      setBookingDetails({
        packageSlug: packageData.slug,
        packageName: packageData.title,
        packagePrice: packageData.price,
        packageCover: packageData.cover_image,
        departureDate: departureDate,
        totalPerson: selectedOption.value,
      })
    );
    router.push(`/packages/${packageData.slug}/booking`);
  };

  return (
    <div className="relative container mx-auto min-h-20 z-20">
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 min-w-72 w-11/12 sm:w-full md:w-3/4 lg:w-2/3 xl:w-1/2 grid grid-cols-12 place-content-center items-stretch bg-custom-gray border border-custom-gray-light rounded-lg shadow-md px-3">
        <div className="col-span-3 first-of-type:border-0 border-l border-custom-gray-light py-3 first-of-type:ps-0 ps-3 hover:bg-custom-blue/10 cursor-pointer">
          <CalendarPicker
            customElement={true}
            onDateSelect={handleDateSelect}
            hasAvailableSeats={handleAvailableSeats}
            availableSeats={availableSeats && availableSeats.results}
          >
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
          </CalendarPicker>
        </div>
        <div className="relative col-span-3 first-of-type:border-0 border-l border-custom-gray-light py-3 ps-3 cursor-pointer hover:bg-custom-blue/10">
          <SelectInput options={options} onChange={handleSelectChange} />
        </div>
        <div className="col-span-3 first-of-type:border-0 border-l border-custom-gray-light py-3 ps-3">
          <p className="text-xs sm:text-base text-custom-blue capitalize font-normal">
            Total Price
          </p>
          <p className="text-sm sm:text-xl text-custom-blue font-bold">
            {packageData.pricing_type === 'per_person'
              ? `${packageData.price! * parseInt(selectedOption.value)} /p`
              : `${packageData.price} /f`}
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
