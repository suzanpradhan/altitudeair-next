import { dateFromSqlDateTime, parseHtml } from '@/core/utils/helper';
import { NewsDataType } from '@/modules/news/newsType';
import Image from 'next/image';
import Link from 'next/link';
import LocalImage from '../../../../public/images/gallery/1 (1).webp';

export default function NewsItem({ data }: { data: NewsDataType }) {
  return (
    <Link
      href={'news/' + data.id}
      className="col-span-12 sm:col-span-6 md:col-span-3 !m-0 text-left first-of-type:bg-[#c1d5e6] px-4 py-2 cursor-pointer hover:bg-[#c1d5e6] transition-colors duration-300"
    >
      <div className="flex flex-col justify-between h-full gap-5">
        <div className="flex flex-col gap-2">
          <h4 className="font-black">{data.publisher}</h4>
          <div className="flex justify-start">
            <p className="text-sm font-semibold text-gray-500">
              {dateFromSqlDateTime(data.date)}
            </p>
          </div>
          <div className="relative">
            <Image src={LocalImage} alt="article-image" />
          </div>
          <p className="font-medium">{data.title}</p>
          <p className="!text-gray-600 text-sm overflow-clip line-clamp-6">
            {parseHtml(data.description ?? '')}
          </p>
        </div>
      </div>
    </Link>
  );
}
