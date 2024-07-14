'use client';
import axiosInst from '@/core/utils/axoisInst';
import { constants } from '@/core/utils/constants';
import { dateFromSqlDateTime, parseHtml } from '@/core/utils/helper';
import { NewsDataType } from '@/modules/news/newsType';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function NewsDetail() {
  const { slug } = useParams();
  const router = useRouter();

  const [news, setNews] = useState<NewsDataType>();

  //   console.log(slug);
  useEffect(() => {
    if (!slug) {
      return;
    }
    axiosInst
      .get('/news/' + slug)
      .then((response) => {
        setNews(response.data.data);
      })
      .catch((err) => {
        if (
          err.response &&
          (err.response.status === 404 || err.response.status === 500)
        ) {
          router.push('/404');
        }
      });
    // axiosInst
    //   .get('/news/' + slug)
    //   .then((result) => {
    //     const data = result.data.data;
    //     setNews(data);
    //   })
    //   .catch((err) => {
    //     if (err.response.status === 404) {
    //       //   router.push('/404');
    //     }
    //   });
  }, [slug]);

  return (
    <>
      {news && (
        <main className="news-item-main">
          <div className="featured-img">
            <Image
              src={constants.baseUrl + news.coverImage}
              alt="News item"
              height={100}
              width={100}
              quality={75}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="fading-bottom" />
          </div>

          <article>
            <h2>{news.title}</h2>
            <div className="content">{parseHtml(news.description ?? '')}</div>

            <span>
              {'- Published in '}
              <a href="#">{news.publisher}</a>
            </span>
            <br />
            <span>{dateFromSqlDateTime(news.date)}</span>
          </article>
        </main>
      )}
    </>
  );
}
