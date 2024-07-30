'use client';
import { apiPaths } from '@/core/api/apiConstants';
import { useAppDispatch, useAppSelector } from '@/core/redux/hooks';
import { RootState } from '@/core/redux/store';
import galleryApi from '@/modules/gallery/galleryApi';
import { GalleryDataType } from '@/modules/gallery/galleryType';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Dialog from '../../(elements)/Dialog';

export default function Gallery() {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    dispatch(galleryApi.endpoints.getAllGallery.initiate())
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error('Error fetching news:', error);
        setError('Error fetching data');
      });
  }, [dispatch]);

  const getGalleries = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries[`getAllGallery`]?.data as GalleryDataType[]
  );

  const [modalImage, setModalImage] = useState<string | null>(null);
  // const [images, setImages] = useState<GalleryDataType[]>([]);
  const galleryContainer = useRef<HTMLDivElement>(null);
  let pos = { left: 0, x: 0 };

  useEffect(() => {
    const currentGalleryContainer = galleryContainer.current;

    const mouseDownHandler = (e: MouseEvent) => {
      if (currentGalleryContainer) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        pos = {
          left: currentGalleryContainer.scrollLeft,
          x: e.clientX,
        };

        currentGalleryContainer.addEventListener('mousemove', mouseMoveHandler);
        window.addEventListener('mouseup', mouseUpHandler);
      }
    };

    const mouseMoveHandler = (e: MouseEvent) => {
      if (currentGalleryContainer) {
        currentGalleryContainer.style.cursor = 'grabbing';
        currentGalleryContainer.style.userSelect = 'none';
        currentGalleryContainer.style.scrollSnapType = '';
        currentGalleryContainer.style.pointerEvents = 'stroke';

        const dx = e.clientX - pos.x;
        currentGalleryContainer.scrollLeft = pos.left - dx;
      }
    };

    const mouseUpHandler = () => {
      if (currentGalleryContainer) {
        currentGalleryContainer.style.cursor = 'grab';
        currentGalleryContainer.style.scrollSnapType = 'x mandatory';
        currentGalleryContainer.style.removeProperty('user-select');
        currentGalleryContainer.style.removeProperty('pointer-events');
        currentGalleryContainer.removeEventListener(
          'mousemove',
          mouseMoveHandler
        );
      }
      window.removeEventListener('mouseup', mouseUpHandler);
    };

    if (currentGalleryContainer) {
      currentGalleryContainer.scrollLeft = 0;
      currentGalleryContainer.addEventListener('mousedown', mouseDownHandler);
    }

    return () => {
      if (currentGalleryContainer) {
        currentGalleryContainer.removeEventListener(
          'mousedown',
          mouseDownHandler
        );
        currentGalleryContainer.removeEventListener(
          'mousemove',
          mouseMoveHandler
        );
      }
      window.removeEventListener('mouseup', mouseUpHandler);
    };
  }, []);
  const openModal = (imagePath: string) => {
    setModalImage(imagePath);
  };

  // const closeModal = () => {
  //   setModalImage(null);
  // };

  // const imageLoader = ({
  //   src,
  //   width,
  //   quality,
  // }: {
  //   src: string;
  //   width: number;
  //   quality: number;
  // }) => {
  //   return `https://example.com/${src}?w=${width}&q=${quality || 75}`;
  // };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section
      className="bg-no-repeat bg-cover flex items-center justify-center"
      style={{ backgroundImage: "url('/images/gallery/background.webp')" }}
    >
      <div className="pt-20 pb-16">
        <div className="text-[#a7b9c7] font image_content_container">
          <h2 className="text-2xl mb-12">GALLERY</h2>
          <div
            className="max-w-5xl  grid grid-flow-col grid-rows-2 !overflow-x-scroll hidden-scrollbar  "
            ref={galleryContainer}
          >
            {!isLoading
              ? getGalleries && getGalleries.length > 0
                ? getGalleries.map((image, index) => {
                    const title = image.title;
                    const imageUrl = apiPaths.baseUrl + image.image;
                    if (!image.isImage) return null;
                    return (
                      <button
                        key={index}
                        className=" relative w-44 h-44 "
                        onClick={() => {
                          openModal(imageUrl);
                          setShowModal((prevState) => !prevState);
                        }}
                      >
                        <Image
                          // loader={imageLoader}
                          src={imageUrl}
                          alt={title}
                          onError={(e) => {
                            const target = e.currentTarget as HTMLImageElement;
                            target.src = '/images/errors/placeholder.webp';
                          }}
                          fill
                          placeholder="blur"
                          blurDataURL={imageUrl}
                          quality={75}
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </button>
                    );
                  })
                : null
              : null}

            {/* {getNews.map((image) => {
              const title = image.title;
              const imageUrl = constants.baseUrl + image.image;
              if (!image.isImage) return null;
              return (
                <div
                  key={image.id}
                  className="image_container relative w-44"
                  onClick={() => {
                    // openModal(imageUrl);
                  }}
                >
                  <Image
                    // loader={imageLoader}
                    src={imageUrl}
                    alt={title}
                    onError={(e) => {
                      const target = e.currentTarget as HTMLImageElement;
                      target.src = '/images/errors/placeholder.webp';
                    }}
                    fill
                    placeholder="blur"
                    blurDataURL={imageUrl}
                    quality={75}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              );
            })} */}
          </div>
        </div>
      </div>
      {modalImage && (
        <Dialog isDialogOpen={showModal} setIsDialogOpen={setShowModal}>
          <img
            src={modalImage}
            alt="Gallery Image"
            onError={(e) => {
              const target = e.currentTarget as HTMLImageElement;
              target.src = '/images/errors/placeholder.webp';
            }}
          />
        </Dialog>
      )}
    </section>
  );
}
