'use client';
/* eslint-disable @next/next/no-img-element */
import axiosInstance from '@/core/utils/axoisInst';
import { constants } from '@/core/utils/constants';
import { dateFromSqlDateTime, parseHtml } from '@/core/utils/helper';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface BlogItemType {
  id: string;
  title: string;
  description: string;
  date: string;
  coverImage: string;
  direction: string;
}

export default function Blog() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<BlogItemType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const params = useSearchParams();

  useEffect(() => {
    const category = new URLSearchParams(window.location.search).get(
      'category'
    );
    const path = category ? `/blog/${category}/` : '/blog/';

    setLoading(true);
    axiosInstance
      .get(path)
      .then((response) => {
        setBlogs(response.data.data);
      })
      .catch((err) => {
        if (
          err.response &&
          (err.response.status === 404 || err.response.status === 500)
        ) {
          router.push('/404');
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [params]);

  return (
    <main className="blog-main">
      <Title />
      {loading && <div className="loader" />}
      <div className="blog-item-list" id="blog">
        {blogs.map((item, index) => (
          <BlogItem
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

function BlogItem({
  id,
  title,
  description,
  date,
  coverImage,
  direction,
}: BlogItemType) {
  const router = useRouter();

  return (
    <div className={`blog-item ${direction || ''}`} id={id}>
      <div className="image_container">
        <div className="absolute_shadow relative" />
        <Image
          src={constants.baseUrl + coverImage}
          alt="blog heli image"
          onError={(e) => {
            e.currentTarget.src = '/images/errors/placeholder.webp';
          }}
          height={100}
          width={100}
          quality={75}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="text_container">
        <Link href={`/blog/${id}`} passHref>
          <h2>{title}</h2>
        </Link>

        <p className="publish-date">
          Published on {date ? dateFromSqlDateTime(date) : ''}
        </p>
        <p>{parseHtml(description ?? '')}</p>
        <button
          className="button-outline-light"
          onClick={() => {
            router.push(`/blog/${id}`);
          }}
        >
          VIEW MORE
        </button>
      </div>
    </div>
  );
}

export function Title() {
  return (
    <section className="title">
      <div className="overlay"></div>
      <div className="heading-container">
        <h1>ALTITUDE AIR</h1>
        <div className="p-wrapper">
          <div className="corner-border--open" />
          <p>
            In 2016 Altitude Air bought the first Airbus Helicopter for
            commercial operation in Nepal and is continuing to provide services
            in the country
          </p>
          <div className="corner-border--close" />
        </div>
      </div>

      <a href="#blog">
        <div className="learn-more">
          <h2>
            LEARN MORE
            <div className="arrow-bottom" />
          </h2>
        </div>
      </a>
    </section>
  );
}
