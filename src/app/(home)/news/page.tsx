import NewsItem from '@/app/(components)/(elements)/NewsItem';
import { fetchData } from '@/core/api/api_client';
import { apiPaths } from '@/core/api/apiConstants';
import { customMetaDataGenerator } from '@/core/helpers/customMetaDataGenerator';
import { ObjectResponseType } from '@/core/types/responseTypes';
import { NewsDataType } from '@/modules/news/newsType';
import { Metadata } from 'next';

export const metadata: Metadata = customMetaDataGenerator({
  title: 'News',
  description: 'Recent News & Events in Altitude air Neapl',
  ogImage: 'https://altitudeairnepal.com/images/banner/banner-2.webp',
});
export default async function NewsList() {
  const { data: newsData, error: bodMessageDataError } = await fetchData<
    ObjectResponseType<NewsDataType[]>
  >(apiPaths.getNewsUrl);

  console.log(newsData);

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
            {!bodMessageDataError &&
              newsData?.data.map((item: any) => {
                return <NewsItem key={item.id} data={item} />;
              })}
          </div>
        </div>
      </section>
    </main>
  );
}
