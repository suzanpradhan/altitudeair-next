import { parseHtml } from '@/core/utils/helper';
import Link from 'next/link';

export interface NewsItemProps {
  publisher: string;
  title: string;
  description: string;
  date: string;
  id: number;
  coverImage?: string;
}

export default function NewsItem(props: NewsItemProps) {
  const details = {
    publisher: props.publisher,
    title: props.title,
    description: props.description,
    date: props.date,
    id: props.id,
  };

  return (
    <Link
      href={'news/' + details.id}
      className="col-span-12 sm:col-span-6 md:col-span-3 !m-0 text-left border border-[#8395ac] px-4 py-2 cursor-pointer hover:bg-[#c1d5e6] transition-colors duration-300"
    >
      <div>
        <h4 className="font-black">{details.publisher}</h4>

        <p className="font-semibold py-5">{parseHtml(details.title ?? '')}</p>

        <p className="!text-gray-600 text-sm">{details.description}</p>
        <div className="flex justify-end">
          <p className="text-sm font-semibold">{details.date}</p>
        </div>
      </div>
    </Link>
  );
}
