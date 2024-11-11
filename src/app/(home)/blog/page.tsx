import { apiPaths } from '@/core/api/apiConstants';
import { Metadata } from 'next';
import BlogItem from './(components)/BlogItem';
import Title from './(components)/Title';

interface BlogItemType {
  id: string;
  title: string;
  description: string;
  date: string;
  coverImage: string;
  direction: string;
}
export const metadata: Metadata = {
  title: 'Area of Operation',
  description: 'Area of Operation Page',
  openGraph: {
    title: 'Area of Operation',
    description: 'Area of Operation Page',
    images: [
      {
        url: 'https://altitudeairnepal.com/images/banner/banner-4.jpg',
        width: 1200,
        height: 630,
        alt: 'Area of Operation ',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};
export default async function Blog(props: any) {
  const category = props.searchParams.category as string[];
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const path = category ? `/blog/${category}/` : '/blog/';
  const response = apiKey
    ? await fetch(`${apiPaths.baseUrl}${path}`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'X-Api-Key': apiKey,
        },
      })
    : undefined;

  const blogs = response ? ((await response.json()) as any) : undefined;

  return (
    <main className="blog-main">
      <Title />
      {/* {loading && <div className="loader" />} */}
      <div className="blog-item-list" id="blog">
        {(blogs?.data as Array<any>).map((item, index) => (
          <BlogItem
            blogCategory={blogs}
            key={index}
            id={item.id}
            direction={index % 2 === 0 ? 'right' : 'left'}
            title={item.title}
            description={item.description}
            date={item.date}
            coverImage={item.coverImage}
          />
        ))}
      </div>
    </main>
  );
}
