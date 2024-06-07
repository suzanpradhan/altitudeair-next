'use client';
import axiosInst from '@/core/utils/axoisInst';
import { dateFromSqlDateTime } from '@/core/utils/helper';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import NewsItem, { NewsItemProps } from '../../(elements)/NewsItem';

export default function News() {
  const [newsList, setNewsList] = useState<NewsItemProps[] | undefined>([]);

  useEffect(() => {
    axiosInst.get('/news/latest/4/').then((result) => {
      const data = result.data.data;
      setNewsList(data);
    });
  }, []);

  return (
    <section className="news">
      <div className="dashed_news_container">
        <div className="news_content_container">
          <h2>IN THE NEWS</h2>
          {/* <div className="news_flex_container gap-6"> */}
          <div className="grid grid-cols-12 gap-6 max-w-6xl mx-auto my-5">
            {newsList &&
              newsList.map((item, index) => {
                return (
                  <NewsItem
                    key={index}
                    id={item.id}
                    publisher={item.publisher}
                    title={item.title}
                    description={item.description}
                    date={dateFromSqlDateTime(item.date)}
                  />
                );
              })}
          </div>
          <Link href={'/news'}>
            <button className="button-outline-light">MORE NEWS</button>
          </Link>
        </div>
      </div>
    </section>
  );
}
