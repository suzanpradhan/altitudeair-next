interface BookingType {
  packageId: string;
  packageName: string;
  departureDateObject: Date;
  selectedOption: string;
}

const BookingForm = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
      <div className="grid grid-cols-3">
        <form className="col-span-3 md:col-span-2 px-4 py-5">
          <h1 className="text-2xl font-bold text-custom-blue mb-4">
            Booking Form
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div>
              <label className="block text-sm font-normal text-custom-blue mb-1">
                Trip Date
              </label>
              <input
                value="12 Jul 2024"
                className="w-full h-10 px-2 border border-custom-gray-light rounded bg-custom-gray-light/30"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-normal text-custom-blue mb-1">
                No. of Traveler
              </label>
              <input
                type="number"
                value="2"
                className="w-full h-10 px-2 border border-custom-gray-light rounded bg-custom-gray-light/30"
                readOnly
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-normal text-custom-blue mb-1">
                First Name <span className="text-rose-600">*</span>
              </label>
              <input
                type="text"
                placeholder="First Name"
                className="w-full h-10 px-2 border border-custom-gray-light rounded placeholder:font-light outline-none focus-visible:ring-2"
              />
            </div>
            <div>
              <label className="block text-sm font-normal text-custom-blue mb-1">
                Last Name <span className="text-rose-600">*</span>
              </label>
              <input
                type="text"
                placeholder="Last Name"
                className="w-full h-10 px-2 border border-custom-gray-light rounded placeholder:font-light outline-none focus-visible:ring-2"
              />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-normal text-custom-blue mb-1">
              Email Address <span className="text-rose-600">*</span>
            </label>
            <input
              type="email"
              placeholder="Email Address"
              className="w-full h-10 px-2 border border-custom-gray-light rounded placeholder:font-light outline-none focus-visible:ring-2"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-normal text-custom-blue mb-1">
                Country Code + Phone Number{' '}
                <span className="text-rose-600">*</span>
              </label>
              <input
                type="tel"
                placeholder="Country Code + Phone Number"
                className="w-full h-10 px-2 border border-custom-gray-light rounded placeholder:font-light outline-none focus-visible:ring-2"
              />
            </div>
            <div>
              <label className="block text-sm font-normal text-custom-blue mb-1">
                Select Your Country <span className="text-rose-600">*</span>
              </label>
              <select className="w-full p-2 border border-custom-gray-light rounded outline-none focus-visible:ring-2">
                <option value="">Nepal</option>
                <option value="">England</option>
                <option value="">United State</option>
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-normal text-custom-blue mb-1">
              Pickup Details/Extra Requirements
            </label>
            <textarea
              className="w-full p-2 border border-custom-gray-light rounded outline-none focus-visible:ring-2"
              rows={4}
              placeholder="Enter pickup details or extra requirements"
            ></textarea>
          </div>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="terms"
              className="h-4 w-4 text-custom-primary focus:ring-custom-blue border-gray-300 rounded outline-none focus-visible:ring-2"
            />
            <label
              htmlFor="terms"
              className="ml-2 block text-sm font-normal text-custom-blue"
            >
              I accept terms and conditions
            </label>
          </div>
          <button
            type="submit"
            className="w-full text-custom-primary bg-custom-blue py-3 px-6 rounded-md hover:bg-opacity-95 hover:shadow-lg"
          >
            Proceed
          </button>
        </form>
        <aside className="col-span-3 md:col-span-1 bg-custom-blue px-3 py-5">
          <div className="flex flex-col justify-between h-full">
            <div>
              <div>
                <h2 className="text-lg font-medium text-custom-primary mb-2">
                  Review Order Details
                </h2>
                <div className="mb-4">
                  <h3 className="text-white text-sm font-medium mb-2">
                    Damodar Kund - Muktinath Helicopter Tour - from Pokhara
                  </h3>
                  <div className="px-2 py-3 bg-custom-gray/5 flex flex-col gap-2">
                    <div className="flex items-start justify-between">
                      <p className="shrink-0 text-custom-gray text-xs font-light">
                        Duration:
                      </p>
                      <p className="text-white text-xs font-light text-right">
                        1 Day
                      </p>
                    </div>
                    <div className="flex items-start justify-between">
                      <p className="shrink-0 text-custom-gray text-xs font-light">
                        Trip Start:
                      </p>
                      <p className="text-white text-xs font-light text-right">
                        2024-06-27
                      </p>
                    </div>
                    <div className="flex items-start justify-between">
                      <p className="shrink-0 text-custom-gray text-xs font-light">
                        No. of Traveler:
                      </p>
                      <p className="text-white text-xs font-light text-right">
                        2 Person(s)
                      </p>
                    </div>
                    <div className="flex items-start justify-between">
                      <p className="shrink-0 text-custom-gray text-xs font-light">
                        Advance Payable:
                      </p>
                      <p className="text-white text-xs font-light text-right">
                        US$2150
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <hr className="my-4 border-custom-gray/10" />
              <div className="mb-4">
                <h2 className="text-lg font-medium text-custom-primary mb-2">
                  Payment Details
                </h2>
                <div className="px-2 py-3 bg-custom-gray/5 flex flex-col gap-2">
                  <div className="flex items-start justify-between">
                    <p className="shrink-0 text-custom-gray text-xs font-light">
                      Package Price:
                      <br />
                      (US$2150 x 2 Person(s))
                    </p>
                    <p className="text-white text-xs font-light text-right">
                      US$4300
                    </p>
                  </div>
                  <div className="flex items-start justify-between">
                    <p className="shrink-0 text-custom-gray text-xs font-light">
                      Total Price:
                    </p>
                    <p className="text-white text-xs font-light text-right">
                      US$4300
                    </p>
                  </div>
                  <div className="flex items-start justify-between">
                    <p className="shrink-0 text-custom-gray text-xs font-light">
                      Payable Now:
                    </p>
                    <p className="text-white text-xs font-light text-right">
                      US$2150
                    </p>
                  </div>
                  <div className="flex items-start justify-between">
                    <p className="text-custom-gray text-xs font-light">
                      The balance of US$2150 is payable upon arrival.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-custom-gray font-light text-xs">
              This is a 3D secure and SSL encrypted payment. Your card details
              are safe!
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default BookingForm;
