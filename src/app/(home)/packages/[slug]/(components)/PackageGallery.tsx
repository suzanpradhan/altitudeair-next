'use client';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

const PackageGallery = () => {
  const swiperRef = useRef<SwiperRef | null>(null);
  const [isBeginning, toggleIsBeginning] = useState<boolean>(true);
  const [isEnd, toggleIsEnd] = useState<boolean>(false);

  const breakpoints = {
    // when window width is >= 320px
    200: {
      slidesPerView: 1,
      spaceBetween: 15,
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    // when window width is >= 640px
    1024: {
      slidesPerView: 2,
      spaceBetween: 25,
    },
  };

  return (
    <>
      <h3 className="text-2xl font-bold text-custom-blue mt-5">Gallery</h3>
      <div className="group relative w-full my-5 transition-all duration-100">
        <div>
          <button
            disabled={isBeginning}
            onClick={() => swiperRef.current?.swiper.slidePrev()}
            className="text-[#f7c024] disabled:text-gray-400 absolute left-0 top-1/2 -translate-y-1/2 z-20"
          >
            <IoIosArrowBack size={60} />
          </button>
          <button
            disabled={isEnd}
            className="text-[#f7c024] disabled:text-gray-400 absolute right-0 top-1/2 -translate-y-1/2 z-20"
            onClick={() => swiperRef.current?.swiper.slideNext()}
          >
            <IoIosArrowForward size={60} />
          </button>
        </div>
        <Swiper
          navigation={true}
          onReachEnd={() => (toggleIsEnd(true), toggleIsBeginning(false))}
          onReachBeginning={() => (toggleIsBeginning(true), toggleIsEnd(false))}
          onSlideChange={() => {
            if (
              !swiperRef.current?.swiper.isBeginning &&
              !swiperRef.current?.swiper.isEnd
            ) {
              toggleIsBeginning(false), toggleIsEnd(false);
            }
          }}
          ref={swiperRef}
          modules={[Navigation]}
          breakpoints={breakpoints}
          className="w-full"
        >
          <SwiperSlide>
            <div className="relative mx-auto aspect-video">
              <Image
                src="/images/banner/Sheyphoksundo.jpg"
                alt="gosaikunda"
                onError={(e) => {
                  e.currentTarget.src = '/images/errors/placeholder.webp';
                }}
                fill
                sizes="(max-width: 2000px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative mx-auto aspect-video">
              <Image
                src="/images/banner/banner-4.jpg"
                alt="gosaikunda"
                onError={(e) => {
                  e.currentTarget.src = '/images/errors/placeholder.webp';
                }}
                fill
                sizes="(max-width: 2000px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};

export default PackageGallery;
