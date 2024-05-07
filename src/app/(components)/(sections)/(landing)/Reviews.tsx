'use client';
import axiosInst from '@/core/utils/axoisInst';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { parseHtml } from '@/core/utils/helper';
import Image from 'next/image';
import { Autoplay, Pagination } from 'swiper/modules';

interface ReviewType {
  title: string;
  content: string;
  author: string;
  rating: number;
}

export default function Reviews() {
  const [reviews, setReviews] = useState<ReviewType[] | undefined>([]);

  useEffect(() => {
    axiosInst.get('/review/').then((result: any) => {
      const data = result.data.data;
      setReviews(data);
    });
  }, []);

  return (
    <section className="reviews">
      <div className="review-list">
        {reviews && (
          // <div className="glide">
          //   <div className="glide__track" data-glide-el="track">
          //     <ul className="glide__slides">
          //       {reviews.map((review, index) => {
          //         return (
          //           <li className="glide__slide" key={index}>
          //             <div className="review-item">
          //               <h2>WHAT OUR CLIENTS SAY</h2>

          //               <h3>{review.title}</h3>
          //               {parseHtml(review.content)}
          //               <h4>{review.author}</h4>
          //               <div className="ratings">
          //                 {[...Array(review.rating)].map((x, i) => (
          //                   <Image
          //                     key={i}
          //                     src="./images/icons/star.svg"
          //                     alt="*"
          //                     width={25}
          //                     height={25}
          //                   />
          //                 ))}
          //               </div>
          //             </div>
          //           </li>
          //         );
          //       })}
          //     </ul>
          //   </div>
          //   <div className="glide__bullets" data-glide-el="controls[nav]">
          //     <button className="glide__bullet" data-glide-dir="=0" />
          //     <button className="glide__bullet" data-glide-dir="=1" />
          //     <button className="glide__bullet" data-glide-dir="=2" />
          //   </div>
          // </div>
          <Swiper
            pagination={{
              dynamicBullets: true,
            }}
            modules={[Pagination, Autoplay]}
            className="mySwiper"
            autoplay
          >
            {reviews.map((review, index) => {
              return (
                <SwiperSlide key={index}>
                  <div className="review-item">
                    <h2>WHAT OUR CLIENTS SAY</h2>

                    <h3>{review.title}</h3>
                    {parseHtml(review.content)}
                    <h4>{review.author}</h4>
                    <div className="flex justify-center items-center gap-2 mb-10">
                      {[...Array(review.rating)].map((x, i) => (
                        <Image
                          key={i}
                          src="./images/icons/star.svg"
                          alt="*"
                          width={25}
                          height={25}
                        />
                      ))}
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
      </div>
    </section>
  );
}
