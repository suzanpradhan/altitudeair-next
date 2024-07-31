'use client';
import { useAppDispatch, useAppSelector } from '@/core/redux/hooks';
import { RootState } from '@/core/redux/store';
import newsApi from '@/modules/news/newsApi';
import { NewsDataType } from '@/modules/news/newsType';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import NewsItem from '../../(elements)/NewsItem';

export default function News() {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    dispatch(newsApi.endpoints.getNewsLimit.initiate(3))
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error('Error fetching news:', error);
        setError('Error fetching data');
      });
  }, [dispatch]);

  const getNews = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries[`getNewsLimit`]?.data as NewsDataType[]
  );

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section className="news">
      <div className="dashed_news_container">
        <div className="news_content_container">
          <h2>IN THE NEWS</h2>
          {/* <div className="news_flex_container gap-6"> */}
          <div className="grid grid-cols-12 gap-6 max-w-6xl mx-auto my-5">
            {!isLoading ? (
              getNews && getNews.length > 0 ? (
                getNews.map((item, index) => {
                  return <NewsItem key={index} data={item} />;
                })
              ) : (
                <div className="col-span-12 text-center">
                  <h3 className="border-2 border-dashed mx-auto max-w-xs text-custom-gray-light text-sm font-semibold bg-custom-gray py-2">
                    No Major News to Report at This Time
                  </h3>
                </div>
              )
            ) : (
              <div className="col-span-12 text-center">
                <h3 className="border-2 border-dashed mx-auto max-w-xs text-custom-gray-light text-sm font-semibold bg-custom-gray py-2">
                  Loading...
                </h3>
              </div>
            )}
          </div>
          {!isLoading ? (
            getNews && getNews.length > 0 ? (
              <Link href={'/news'}>
                <button className="button-outline-light">MORE NEWS</button>
              </Link>
            ) : null
          ) : null}
        </div>
      </div>
    </section>
  );
}
