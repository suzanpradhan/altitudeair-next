import { fetchData } from '@/core/api/api_client';
import { apiPaths } from '@/core/api/apiConstants';
import { PaginatedResponseType } from '@/core/types/responseTypes';
import { BlogType } from '@/modules/servicess/servicessType';
import BlogItem from './(components)/BlogItem';
import Title from './(components)/Title';

export default async function Blog() {
  const { data: blogData, error: blogDataError } = await fetchData<
    PaginatedResponseType<BlogType>
  >(apiPaths.blogUrl);

  return (
    <main className="blog-main pb-10 ">
      <Title />
      {/* {loading && <div className="loader" />} */}
      <div className="blog-item-list " id="blog">
        {!blogDataError &&
          blogData?.results?.map((item, index) => (
            <BlogItem
              blogCategory={item.blogCategory.toString()}
              key={index}
              id={item.id.toString()}
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
