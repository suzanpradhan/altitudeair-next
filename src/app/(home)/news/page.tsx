'use client';

import NewsItem from '@/app/(components)/(elements)/NewsItem';
import { fetchData } from '@/core/api/api_client';
import { PaginatedResponseType } from '@/core/types/responseTypes';
import { NewsDataType } from '@/modules/news/newsType';
import { useEffect, useState } from 'react';

export default function NewsList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [allNews, setAllNews] = useState<NewsDataType[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  // Initialize first page on mount
  useEffect(() => {
    const initializeFirstPage = async () => {
      try {
        setIsInitialLoading(true);
        const { data, error: fetchError } =
          await fetchData<PaginatedResponseType<NewsDataType>>(
            '/news/v1/?page=1'
          );

        if (fetchError || !data) {
          setError('Failed to load news');
          return;
        }

        setAllNews(data.results);
        setTotalPages(data.pagination.total_page);
        setCurrentPage(1);
        setError(null);
      } catch (err) {
        setError('Failed to load news');
        console.error(err);
      } finally {
        setIsInitialLoading(false);
      }
    };

    initializeFirstPage();
  }, []);

  const handleLoadMore = async () => {
    if (currentPage >= totalPages || isLoadingMore) return;

    try {
      setIsLoadingMore(true);
      const nextPage = currentPage + 1;

      const { data, error: fetchError } = await fetchData<
        PaginatedResponseType<NewsDataType>
      >(`/news/v1/?page=${nextPage}`);

      if (fetchError || !data) {
        setError('Failed to load more news');
        return;
      }

      // Append new results to existing news
      setAllNews((prev) => [...prev, ...data.results]);
      setCurrentPage(nextPage);
      setError(null);
    } catch (err) {
      setError('Failed to load more news');
      console.error(err);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const hasMore = currentPage < totalPages;

  return (
    <main className="news-main">
      <div className="relative featured-img">
        <h1>Recent News & Events</h1>
        <div className="absolute bottom-0 left-0 top-0 right-0 bg-gradient-to-t from-custom-blue to-transparent"></div>
      </div>
      <section className="news-section">
        <div className="container mx-auto">
          <h2 className="text-center text-xl font-bold mb-10">IN THE NEWS</h2>
          <div className="grid px-3 sm:px-0 grid-cols-12 gap-y-10 gap-x-0 sm:gap-x-10 max-w-6xl mx-auto my-5">
            {error ? (
              <div className="col-span-12 text-center">
                <h3 className="border-2 border-dashed mx-auto max-w-xs text-custom-gray-light text-sm font-semibold bg-custom-gray py-2">
                  {error}
                </h3>
              </div>
            ) : allNews.length > 0 ? (
              allNews.map((item: NewsDataType) => (
                <NewsItem key={item.id} data={item} />
              ))
            ) : isInitialLoading ? (
              <div className="col-span-12 text-center">
                <h3 className="border-2 border-dashed mx-auto max-w-xs text-custom-gray-light text-sm font-semibold bg-custom-gray py-2">
                  Loading news...
                </h3>
              </div>
            ) : (
              <div className="col-span-12 text-center">
                <h3 className="border-2 border-dashed mx-auto max-w-xs text-custom-gray-light text-sm font-semibold bg-custom-gray py-2">
                  No Major News to Report at This Time
                </h3>
              </div>
            )}
          </div>

          {/* Load More Button */}
          {hasMore && allNews.length > 0 && (
            <div className="flex justify-center mt-10">
              <button
                onClick={handleLoadMore}
                disabled={isLoadingMore}
                className="px-8 py-3 bg-custom-blue text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {isLoadingMore ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
