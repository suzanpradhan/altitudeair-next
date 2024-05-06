import { parseHtml } from '@/core/utils/helper';
import Link from 'next/link';

interface NewsItemProps {
  publisher: string;
  headline: string;
  description: string;
  date: string;
  id: number;
}

export default function NewsItem(props: NewsItemProps) {
  const details = {
    publisher: props.publisher,
    headline: props.headline,
    description: props.description,
    date: props.date,
    id: props.id,
  };

  return (
    <Link href={'news/' + details.id} className="news_card">
      <div>
        <h4>{details.publisher}</h4>

        <p>{parseHtml(details.headline)}</p>

        <p>{details.description}</p>
        <div className="news_date">
          <p>{details.date}</p>
        </div>
      </div>
    </Link>
  );
}
