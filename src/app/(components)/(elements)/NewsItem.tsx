import { dateFromSqlDateTime, parseHtml } from '@/core/utils/helper';
import { NewsDataType } from '@/modules/news/newsType';
import Link from 'next/link';

export default function NewsItem({ data }: { data: NewsDataType }) {
  return (
    <Link
      href={'news/' + data.id}
      className="col-span-12 sm:col-span-6 md:col-span-3 !m-0 text-left border border-[#8395ac] px-4 py-2 cursor-pointer hover:bg-[#c1d5e6] transition-colors duration-300"
    >
      <div className="flex flex-col justify-between h-full gap-5">
        <div className="flex flex-col gap-2">
          <h4 className="font-black">{data.publisher}</h4>
          <p className="font-medium">{data.title}</p>
          <p className="!text-gray-600 text-sm overflow-clip line-clamp-6">
            {parseHtml(data.description ?? '')}
          </p>
        </div>

        <div className="flex justify-end">
          <p className="text-sm font-semibold">
            {dateFromSqlDateTime(data.date)}
          </p>
        </div>
      </div>
    </Link>
  );
}
