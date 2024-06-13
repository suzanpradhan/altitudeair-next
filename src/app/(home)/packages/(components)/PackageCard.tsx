import Image from 'next/image';
import Link from 'next/link';
import { FaLocationDot } from 'react-icons/fa6';
import { PackageType } from './PackagesList';

export default function PackageCard({ item }: { item: PackageType }) {
  return (
    <div className="relative col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 before:absolute before:-top-3 before:-bottom-3 before:-left-3 before:-right-3 before:border-dashed before:border-custom-blue-light/20 before:-z-10 before:hover:border-2 transition-all duration-200 group">
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col gap-1 mb-2">
          <div className="w-full h-64 relative overflow-hidden">
            <Image
              src={item.image}
              alt="image"
              objectFit="cover"
              layout="fill"
              sizes="(max-width: 2000px) 75vw, 33vw"
              className="group-hover:scale-105 transition-all duration-300 ease-in-out"
            />
          </div>
          <h3 className="text-xl font-medium text-custom-blue">{item.name}</h3>
          <div className="flex items-center gap-2">
            <p className="text-sm text-custom-blue-light capitalize font-light flex items-center gap-2">
              <FaLocationDot /> {item.location}
            </p>
            <p className="text-xs text-custom-blue-light">&#9679;</p>
            <p className="text-sm text-custom-blue-light capitalize font-light flex items-center gap-2">
              <span className="font-medium">Duration</span> {item.duration}
            </p>
          </div>
          <p className="text-sm text-custom-blue py-2">{item.description}</p>
        </div>
        <div className="flex items-center justify-start gap-5">
          <Link
            href={`packages/dummy`}
            className="text-center text-sm font-medium py-2 px-5 text-custom-primary bg-custom-blue hover:bg-custom-blue/90 hover:shadow-md"
          >
            View Detail
          </Link>
          <p className="text-custom-blue-light">
            Starting from{' '}
            <span className="text-custom-blue font-medium">$1800</span>/p
          </p>
        </div>
      </div>
    </div>
  );
}
