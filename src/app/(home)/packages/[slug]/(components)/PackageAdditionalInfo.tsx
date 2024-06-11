import { GiPathDistance } from 'react-icons/gi';
import { HiOutlineUserGroup } from 'react-icons/hi2';
import { IoLocationOutline, IoTimeOutline } from 'react-icons/io5';
import { LiaMountainSolid } from 'react-icons/lia';
import { PiMountainsLight, PiTent } from 'react-icons/pi';
import { TiWeatherPartlySunny } from 'react-icons/ti';

export default function PackageAdditionalInfo() {
  return (
    <div className="border-2 border-dashed border-custom-gray-light">
      <div className="grid grid-cols-12 place-content-center gap-5 bg-custom-gray-light/30 p-5 m-2">
        <div className="col-span-6 md:col-span-4">
          <div className="flex items-center gap-2">
            <IoTimeOutline size={35} className="text-custom-blue" />
            <div className="flex flex-col items-start justify-center">
              <p className="text-sm text-custom-blue capitalize font-normal">
                Duration
              </p>
              <p className="text-base text-custom-blue font-semibold">1 Day</p>
            </div>
          </div>
        </div>
        <div className="col-span-6 md:col-span-4">
          <div className="flex items-center gap-2">
            <IoLocationOutline size={35} className="text-custom-blue" />
            <div className="flex flex-col items-start justify-center">
              <p className="text-sm text-custom-blue capitalize font-normal">
                Destination
              </p>
              <p className="text-base text-custom-blue font-semibold">
                Kathmandu, Nepal
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-6 md:col-span-4">
          <div className="flex items-center gap-2">
            <PiMountainsLight size={35} className="text-custom-blue" />
            <div className="flex flex-col items-start justify-center">
              <p className="text-sm text-custom-blue capitalize font-normal">
                Trip Grade
              </p>
              <p className="text-base text-custom-blue font-semibold">Easy</p>
            </div>
          </div>
        </div>
        <div className="col-span-6 md:col-span-4">
          <div className="flex items-center gap-2">
            <GiPathDistance size={35} className="text-custom-blue" />
            <div className="flex flex-col items-start justify-center">
              <p className="text-sm text-custom-blue capitalize font-normal">
                Starts At
              </p>
              <p className="text-base text-custom-blue font-semibold">
                Kathmandu
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-6 md:col-span-4">
          <div className="flex items-center gap-2">
            <GiPathDistance size={35} className="text-custom-blue" />
            <div className="flex flex-col items-start justify-center">
              <p className="text-sm text-custom-blue capitalize font-normal">
                Ends At
              </p>
              <p className="text-base text-custom-blue font-semibold">
                Gosaikunda
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-6 md:col-span-4">
          <div className="flex items-center gap-2">
            <PiTent size={35} className="text-custom-blue" />
            <div className="flex flex-col items-start justify-center">
              <p className="text-sm text-custom-blue capitalize font-normal">
                Accommodation
              </p>
              <p className="text-base text-custom-blue font-semibold">
                Ask for reservation
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-6 md:col-span-4">
          <div className="flex items-center gap-2">
            <LiaMountainSolid size={35} className="text-custom-blue" />
            <div className="flex flex-col items-start justify-center">
              <p className="text-sm text-custom-blue capitalize font-normal">
                Max. Altitude
              </p>
              <p className="text-base text-custom-blue font-semibold">
                Gosaikunda (4300 Meters)
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-6 md:col-span-4">
          <div className="flex items-center gap-2">
            <HiOutlineUserGroup size={35} className="text-custom-blue" />
            <div className="flex flex-col items-start justify-center">
              <p className="text-sm text-custom-blue capitalize font-normal">
                Group Size
              </p>
              <p className="text-base text-custom-blue font-semibold">1 to 5</p>
            </div>
          </div>
        </div>
        <div className="col-span-6 md:col-span-4">
          <div className="flex items-center gap-2">
            <TiWeatherPartlySunny size={35} className="text-custom-blue" />
            <div className="flex flex-col items-start justify-center">
              <p className="text-sm text-custom-blue capitalize font-normal">
                Best Season
              </p>
              <p className="text-base text-custom-blue font-semibold">
                Whole Year, Mostly Spring and Autumn
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
