'use client';
import { useRef } from 'react';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import PackageCard from '../../(components)/PackageCard';
import { PackageType } from '../../(components)/PackagesList';

const packageList: PackageType[] = [
  {
    id: 1,
    image: '/images/banner/Sheyphoksundo.png',
    name: 'Gosaikunda Pilgrimage Tour',
    duration: '2 Days',
    location: 'Everest Base Camp',
    description:
      'Altitude air takes us through the different villages towards the southern face of Annapurna base camp.',
    rating: 4.5,
    elevation: '3700m',
  },
  {
    id: 1,
    image: '/images/banner/banner-4.jpg',
    name: 'Gosaikunda Pilgrimage Tour',
    duration: '2 Days',
    location: 'Everest Base Camp',
    description:
      'Altitude air takes us through the different villages towards the southern face of Annapurna base camp.',
    rating: 5.0,
    elevation: '3700m',
  },
  {
    id: 1,
    image: '/images/banner/altitude.png',
    name: 'Gosaikunda Pilgrimage Tour',
    duration: '2 Days',
    location: 'Everest Base Camp',
    description:
      'Altitude air takes us through the different villages towards the southern face of Annapurna base camp.',
    rating: 4.0,
    elevation: '3700m',
  },
  {
    id: 1,
    image: '/images/banner/banner.webp',
    name: 'Gosaikunda Pilgrimage Tour',
    duration: '2 Days',
    location: 'Everest Base Camp',
    description:
      'Altitude air takes us through the different villages towards the southern face of Annapurna base camp.',
    rating: 5.0,
    elevation: '3700m',
  },
  {
    id: 1,
    image: '/images/banner/banner-2.webp',
    name: 'Gosaikunda Pilgrimage Tour',
    duration: '2 Days',
    location: 'Everest Base Camp',
    description:
      'Altitude air takes us through the different villages towards the southern face of Annapurna base camp.',
    rating: 5.0,
    elevation: '3700m',
  },
  {
    id: 1,
    image: '/images/banner/banner-3.webp',
    name: 'Gosaikunda Pilgrimage Tour',
    duration: '2 Days',
    location: 'Everest Base Camp',
    description:
      'Altitude air takes us through the different villages towards the southern face of Annapurna base camp.',
    rating: 5.0,
    elevation: '3700m',
  },
];

const RelatedPackages = () => {
  const swiperRef = useRef<SwiperRef | null>(null);

  const breakpoints = {
    // when window width is >= 320px
    320: {
      slidesPerView: 1,
      spaceBetween: 15,
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    728: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    // when window width is >= 640px
    1024: {
      slidesPerView: 4,
      spaceBetween: 25,
    },
  };

  return (
    <>
      <div className="bg-custom-blue/10 py-10 mt-10">
        <div className="container mx-auto">
          <h3 className="text-2xl font-bold text-custom-blue mb-5 px-6 sm:px-0">
            Related Packages
          </h3>
          <div className="relative w-full my-5 transition-all duration-100 px-6 sm:px-0">
            <Swiper
              pagination={{
                dynamicBullets: true,
              }}
              navigation={true}
              ref={swiperRef}
              modules={[Navigation, Pagination]}
              breakpoints={breakpoints}
              className="w-full pb-12"
            >
              {packageList && packageList.length > 0 ? (
                packageList.map((item, index) => (
                  <SwiperSlide key={index}>
                    <PackageCard item={item} />
                  </SwiperSlide>
                ))
              ) : (
                <></>
              )}
            </Swiper>
          </div>
        </div>
      </div>

      {/* <div className="relative w-full my-5 transition-all duration-100">
        <div>
          <button
            disabled={isBeginning}
            onClick={() => swiperRef.current?.swiper.slidePrev()}
            className="text-[#f7c024] disabled:text-gray-400 absolute left-0 top-1/2 -translate-y-1/2 z-50"
          >
            <IoIosArrowBack size={60} />
          </button>
          <button
            disabled={isEnd}
            className="text-[#f7c024] disabled:text-gray-400 absolute right-0 top-1/2 -translate-y-1/2 z-50"
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
                objectFit="cover"
                fill
                sizes="(max-width: 2000px) 100vw, 33vw"
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
                objectFit="cover"
                fill
                sizes="(max-width: 2000px) 100vw, 33vw"
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div> */}
    </>
  );
};

export default RelatedPackages;
