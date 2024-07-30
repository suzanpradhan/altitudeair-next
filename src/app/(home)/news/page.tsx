'use client';
import NewsItem from '@/app/(components)/(elements)/NewsItem';
import { useAppDispatch, useAppSelector } from '@/core/redux/hooks';
import { RootState } from '@/core/redux/store';
import newsApi from '@/modules/news/newsApi';
import { NewsDataType } from '@/modules/news/newsType';
import { useEffect, useState } from 'react';

const NewsList = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    dispatch(newsApi.endpoints.getAllNews.initiate())
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error('Error fetching news:', error);
        setError('Error fetching data');
      });
  }, [dispatch]);

  const newsResponse = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries[`getAllNews`]?.data as NewsDataType[]
  );

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <main className="news-main">
      <div className="relative featured-img">
        <h1>Recent News & Events</h1>
        <div className="absolute bottom-0 left-0 top-0 right-0 bg-gradient-to-t from-custom-blue to-transparent"></div>
      </div>
      <section className="news-section">
        <div className="container mx-auto">
          <h2 className="text-center text-xl font-bold mb-10">IN THE NEWS</h2>
          <div className="grid grid-cols-12 gap-y-10 gap-x-10 max-w-6xl mx-auto my-5">
            {!isLoading ? (
              newsResponse && newsResponse.length > 0 ? (
                newsResponse.map((item, index) => {
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
        </div>
      </section>
    </main>
  );
};

export default NewsList;
