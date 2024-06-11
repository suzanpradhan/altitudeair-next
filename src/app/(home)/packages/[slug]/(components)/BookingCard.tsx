import { FaCcMastercard } from 'react-icons/fa';
import { RiVisaFill } from 'react-icons/ri';
import { SiAmericanexpress } from 'react-icons/si';

export default function BookingCard() {
  return (
    <div className="relative container mx-auto min-h-20">
      <div className="min-w-80 grid grid-cols-4 place-content-evenly bg-gradient-to-r from-custom-blue to-custom-blue/90 rounded-lg shadow-lg py-5 px-4 border-l-2 border-white transition-all duration-200 hover:shadow-lg hover:-translate-y-2">
        <div className="col-span-4 py-3 flex justify-between items-center">
          <p className="text-lg text-white capitalize font-normal">
            Departure Date
          </p>
          <p className="text-lg text-white capitalize font-bold">11 Jun 2024</p>
        </div>
        <div className="col-span-4 py-3 flex justify-between items-center">
          <p className="text-lg text-white capitalize font-normal">Travelers</p>
          <p className="text-lg text-white capitalize font-bold">4 Travelers</p>
        </div>
        <div className="col-span-4 py-3 flex justify-between items-center">
          <p className="text-lg text-white capitalize font-normal">
            Total Price
          </p>
          <p className="text-lg text-white capitalize font-bold">$7200</p>
        </div>
        <div className="col-span-4 py-3 text-right flex items-center justify-between">
          <div className="flex items-center justify-start gap-2 border rounded-md p-1">
            <RiVisaFill size={35} className="text-white" />
            <FaCcMastercard size={35} className="text-white" />
            <SiAmericanexpress size={35} className="text-white" />
          </div>
          <button className="rounded-sm text-custom-primary bg-custom-blue hover:shadow-lg drop-shadow-md border-l border-custom-gray py-2 px-4 text-sm font-light">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
