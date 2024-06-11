'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import BookingForm from './(components)/BookingForm';

const Booking = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const packageId = searchParams.get('packageId');
  const packageName = searchParams.get('packageName');
  const departureDate = searchParams.get('departureDate');
  const selectedOption = searchParams.get('selectedOption');

  const departureDateObject =
    typeof departureDate === 'string' ? new Date(departureDate) : new Date();

  const [bookingData, setBookingData] = useState({
    packageId: '',
    packageName: '',
    departureDateObject: new Date(),
    selectedOption: '',
    // Add other fields as necessary
  });

  useEffect(() => {
    if (packageId && packageName && departureDateObject && selectedOption) {
      setBookingData({
        packageId,
        packageName,
        departureDateObject,
        selectedOption,
      });
    }
  }, [packageId, packageName, departureDate, selectedOption]);

  const handleBookingSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    // Example: Make an API call to submit the booking data
    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    });

    if (res.ok) {
      // Handle successful booking, e.g., redirect to a confirmation page
      router.push('/confirmation');
    } else {
      // Handle booking error
      console.error('Booking failed');
    }
  };

  return (
    // <div>
    //   <h1>Booking for {bookingData.packageName}</h1>
    //   <form onSubmit={handleBookingSubmit}>
    //     <input
    //       type="hidden"
    //       name="packageId"
    //       value={bookingData.packageId}
    //       readOnly
    //     />
    //     <div className="mb-4">
    //       <label className="block mb-2 text-sm font-bold">Package Name</label>
    //       <input
    //         type="text"
    //         name="packageName"
    //         value={bookingData.packageName}
    //         readOnly
    //         className="w-full px-3 py-2 border rounded"
    //       />
    //     </div>
    //     <div className="mb-4">
    //       <label className="block mb-2 text-sm font-bold">Departure Date</label>
    //       <input
    //         type="text"
    //         name="departureDate"
    //         value={new Date(bookingData.departureDate).toLocaleDateString()}
    //         readOnly
    //         className="w-full px-3 py-2 border rounded"
    //       />
    //     </div>
    //     <div className="mb-4">
    //       <label className="block mb-2 text-sm font-bold">
    //         Selected Option
    //       </label>
    //       <input
    //         type="text"
    //         name="selectedOption"
    //         value={bookingData.selectedOption}
    //         readOnly
    //         className="w-full px-3 py-2 border rounded"
    //       />
    //     </div>
    //     <button
    //       type="submit"
    //       className="px-4 py-2 text-white bg-blue-500 rounded"
    //     >
    //       Confirm Booking
    //     </button>
    //   </form>
    // </div>
    <div className="min-h-screen bg-gray-100 py-8">
      <BookingForm bookingData={bookingData} />
    </div>
  );
};

export default Booking;
