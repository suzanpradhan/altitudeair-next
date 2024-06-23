'use client';
import { apiPaths } from '@/core/api/apiConstants';
import { useAppDispatch, useAppSelector } from '@/core/redux/hooks';
import { RootState } from '@/core/redux/store';
import galleryApi from '@/modules/gallery/galleryApi';
import { GalleryDataType } from '@/modules/gallery/galleryType';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export default function Gallery() {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
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

  // const [modalImage, setModalImage] = useState<string | null>(null);
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
  // const openModal = (imagePath: string) => {
  //   setModalImage(imagePath);
  // };

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
    <section className="gallery">
      <div className="dashed_news_container">
        <div className="image_content_container">
          <h2 className="text-2xl">GALLERY</h2>

          <div
            className="image_flex_container !overflow-x-scroll"
            ref={galleryContainer}
          >
            {!isLoading
              ? getGalleries && getGalleries.length > 0
                ? getGalleries.map((image, index) => {
                    const title = image.title;
                    const imageUrl = apiPaths.baseUrl + image.image;
                    if (!image.isImage) return null;
                    return (
                      <div
                        key={index}
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
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
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
      {/* {modalImage && (
        <Modal show={openModal} hide={closeModal}>
          <img
            src={modalImage}
            alt="Gallery Image"
            onError={(e) => {
              const target = e.currentTarget as HTMLImageElement;
              target.src = '/images/errors/placeholder.webp';
            }}
          />
        </Modal>
      )} */}
    </section>
  );
}
