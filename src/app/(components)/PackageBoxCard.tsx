import { parseHtml } from '@/core/utils/helper';
import { PackagesDataType } from '@/modules/packages/packagesType';
import { formatDuration } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { FaClock, FaLocationDot } from 'react-icons/fa6';

export default function PackageBoxCard({ item }: { item: PackagesDataType }) {
  const defaultImage = '/images/no-image.png';
  const coverImage = item.cover_image ? item.cover_image : defaultImage;
  const durationLabel = item.duration
    ? (() => {
        const parts = item.duration.split(':');
        if (parts.length !== 3) return '-';
        const [hours, minutes, seconds] = parts;
        return formatDuration({
          hours: parseInt(hours),
          minutes: parseInt(minutes),
          seconds: parseInt(seconds),
        });
      })()
    : '-';
  const priceLabel = item.price
    ? `${item.currency === 'USD' ? '$' : 'NPR.'}${parseFloat(item.price).toFixed(
        item.currency === 'USD' ? 2 : 0
      )}${item.pricing_type === 'fixed' ? '' : '/p'}`
    : '-';

  return (
    <Link
      href={`/packages/${item.slug}`}
      className="relative col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 block h-full"
    >
      <article className="group flex h-full flex-col overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
        <div className="relative h-72 overflow-hidden">
          <Image
            src={coverImage}
            alt={item.title || 'package image'}
            fill
            sizes="(max-width: 2000px) 75vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950/70 to-transparent" />
          <div className="absolute left-4 top-4 rounded-md bg-custom-red px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white shadow-sm">
            Package
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="flex-1 space-y-4"> 
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900 line-clamp-1">
                {item.title}
              </h3>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600 font-bold">
              <span className="inline-flex items-center gap-2 rounded-md bg-custom-blue/10 px-3 py-1 text-custom-blue">
                <FaLocationDot />
                {item.address || 'Unknown location'}
              </span>
              <span className="inline-flex items-center gap-2 rounded-md bg-custom-red/10 px-3 py-1 text-custom-red">
                <FaClock className="text-custom-red" />
                {durationLabel}
              </span>
            </div>
            <div className="text-sm leading-6 text-slate-900 line-clamp-4">
              {parseHtml(item.description ?? '')}
            </div>
          </div>

          <div className="flex items-end justify-between gap-4 mt-6">
            <div className="text-left text-sm text-slate-500">
              <p className="uppercase text-xs font-bold text-custom-red/80">
                Starting from
              </p>
              <p className="mt-1 text-lg font-semibold text-custom-blue font-bold">{priceLabel}</p>
            </div>
            <span className="inline-flex items-center justify-center rounded-md bg-custom-blue px-5 py-3 text-sm font-semibold text-white transition duration-200 hover:bg-custom-red/90">
              Book Now
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
