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

  //   .news_card {
  //     text-align: left;
  //     border: 1px solid #8395ac;
  //     padding: 0.5rem 1rem 0 1rem;
  //     -webkit-box-flex: 0;
  //     -ms-flex: 0 1 200px;
  //     flex: 0 1 200px;
  //     margin: 1rem;
  //     -webkit-transition: background-color 0.3s ease;
  //     transition: background-color 0.3s ease;
  //     cursor: pointer;
  // }

  return (
    <Link
      href={'news/' + details.id}
      className="col-span-12 sm:col-span-6 md:col-span-3 !m-0 text-left border border-[#8395ac] px-4 py-2 cursor-pointer hover:bg-[#c1d5e6] transition-colors duration-300"
    >
      <div>
        <h4>{details.publisher}</h4>

        <p>{parseHtml(details.title ?? '')}</p>

        <p className="!text-gray-700">{details.description}</p>
        <div className="news_date">
          <p>{details.date}</p>
        </div>
      </div>
    </Link>
  );
}
