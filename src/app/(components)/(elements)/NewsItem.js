import Link from "next/link";
import { parseHtml } from "../../util/helper";

export default function NewsItem(props) {
  const details = {
    publisher: props.publisher,
    headline: props.headline,
    description: props.description,
    date: props.date,
    id: props.id,
  };

  return (
    <Link href={"news/" + details.id}>
      <div className="news_card">
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
