import Image from 'next/image';
import Link from 'next/link';
import { FaStar } from 'react-icons/fa';
import { PackageType } from './PackagesList';

export default function PackageCard({ item }: { item: PackageType }) {
  return (
    <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 rounded bg-white p-3">
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col gap-1 mb-2">
          <div className="w-full h-64 relative overflow-hidden rounded">
            <Image
              src={item.image}
              alt="image"
              objectFit="cover"
              layout="fill"
              sizes="(max-width: 2000px) 75vw, 33vw"
            />
          </div>
          <h3 className="text-lg font-medium">{item.name}</h3>
          <p className="text-xs text-slate-400">{item.location}</p>
          <div className="border-b border-slate-100 my-2"></div>
          <p className="text-sm text-slate-600">{item.description}</p>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center">
            <p className="flex items-center gap-1">
              <FaStar size={21} color="#fbba22" />
              <span className="font-bold">{item.rating}</span>
            </p>
            <span className="text-base font-medium">{item.elevation}</span>
          </div>
          <div className="border-b border-slate-100 my-2"></div>
          <div>
            <Link
              href={`packages/dummy`}
              className="w-full block text-center text-sm font-medium py-2 px-5 rounded bg-custom-primary hover:bg-custom-primary/90 hover:shadow-md"
            >
              View Detail
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
