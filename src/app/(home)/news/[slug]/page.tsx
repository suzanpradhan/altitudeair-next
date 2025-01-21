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
    <div className="bg-[#A7B9C7]">
      {news && (
        <div className="md:max-w-3xl px-10 sm:px-20 md:px-0 mx-auto py-32">
          <h2 className="font-bold text-4xl pb-4">{news.title}</h2>
          <p className="pb-4">
            <a href="#" className="pr-2 text-base">
              {news.publisher}
            </a>
            &#x2022;
            <span className="pl-2">{dateFromSqlDateTime(news.date)}</span>
          </p>

          <div className="w-full md:h-96 h-80 relative ">
            <Image
              src={constants.baseUrl + news.coverImage}
              alt="News item"
              fill
              objectFit="cover"
              quality={75}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="fading-bottom" />
          </div>

          <article className="pt-8">
            <div className="content !text-gray-600">
              {parseHtml(news.description ?? '')}
            </div>
          </article>
        </div>
      )}
    </div>
  );
}
