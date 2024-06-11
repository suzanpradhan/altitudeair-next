interface BookingType {
  packageId: string;
  packageName: string;
  departureDateObject: Date;
  selectedOption: string;
}

const BookingForm = ({ bookingData }: { bookingData: BookingType }) => {
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="grid grid-cols-3 gap-4">
        <form className="col-span-3 md:col-span-2 p-6">
          <h1 className="text-3xl font-semibold text-custom-blue mb-6">
            Booking for {bookingData.packageName}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div>
              <label className="block text-sm font-medium text-custom-blue mb-2">
                Trip Date
              </label>
              <input
                type="date"
                value=""
                className="w-full p-2 border border-custom-gray-light rounded"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-custom-blue mb-2">
                No. of Traveler
              </label>
              <input
                type="number"
                value={bookingData?.selectedOption}
                className="w-full p-2 border border-custom-gray-light rounded"
                readOnly
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-custom-blue mb-2">
                First Name
              </label>
              <input
                type="text"
                placeholder="First Name"
                className="w-full p-2 border border-custom-gray-light rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-custom-blue mb-2">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Last Name"
                className="w-full p-2 border border-custom-gray-light rounded"
              />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-custom-blue mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Email Address"
              className="w-full p-2 border border-custom-gray-light rounded"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-custom-blue mb-2">
                Country Code + Phone Number
              </label>
              <input
                type="tel"
                placeholder="Country Code + Phone Number"
                className="w-full p-2 border border-custom-gray-light rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-custom-blue mb-2">
                Select Your Country
              </label>
              <select className="w-full p-2 border border-custom-gray-light rounded">
                <option>---- Select Your Country ----</option>
                {/* Add more country options as needed */}
              </select>
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-custom-blue mb-2">
              Pickup Details/Extra Requirements
            </label>
            <textarea
              className="w-full p-2 border border-custom-gray-light rounded"
              rows={4}
              placeholder="Enter pickup details or extra requirements"
            ></textarea>
          </div>
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              id="terms"
              className="h-4 w-4 text-custom-primary focus:ring-custom-blue border-gray-300 rounded"
            />
            <label
              htmlFor="terms"
              className="ml-2 block text-sm text-custom-blue"
            >
              I accept terms and conditions
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-custom-primary text-white py-3 px-6 rounded-md hover:bg-opacity-80"
          >
            Confirm Booking
          </button>
        </form>
        <aside className="col-span-3 md:col-span-1 bg-custom-gray-light p-6">
          <div className="sticky top-0">
            <h2 className="text-xl font-semibold text-custom-blue mb-4">
              Review Order Details
            </h2>
            <div className="mb-4">
              <p className="text-custom-blue">
                <strong>
                  Damodar Kund - Muktinath Helicopter Tour - from Pokhara
                </strong>
              </p>
              <p className="text-custom-blue">Duration: 1 Day</p>
              <p className="text-custom-blue">Trip Start: 2024-06-27</p>
              <p className="text-custom-blue">Trip End: 2024-06-27</p>
              <p className="text-custom-blue">No. of Traveler: 2 Person(s)</p>
              <p className="text-custom-blue">
                Advance Payable: US$2150 (50% of total amount)
              </p>
            </div>
            <hr className="my-4 border-custom-gray" />
            <h2 className="text-xl font-semibold text-custom-blue mb-4">
              Payment Details
            </h2>
            <div className="mb-4">
              <p className="text-custom-blue">
                Package Price: US$2150 x 2 Person(s) = US$4300
              </p>
              <p className="text-custom-blue">Total Price: US$4300</p>
              <p className="text-custom-blue">Payable Now: US$2150</p>
              <p className="text-custom-gray-light mb-6">
                The balance of US$2150 is payable upon arrival.
              </p>
              <p className="text-custom-gray-light mb-6">
                This is a 3D secure and SSL encrypted payment. Your card details
                are safe!
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default BookingForm;
