/* eslint-disable @next/next/no-img-element */
'use client';
import axiosInst from '@/core/utils/axoisInst';
import { constants } from '@/core/utils/constants';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

interface ImageType {
  id: number;
  title: string;
  image: string;
  isImage: boolean;
}

export default function Gallery() {
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [images, setImages] = useState<ImageType[]>([]);
  const galleryContainer = useRef<HTMLDivElement>(null);
  let pos = { left: 0, x: 0 };

  useEffect(() => {
    const mouseDownHandler = (e: MouseEvent) => {
      if (galleryContainer.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        pos = {
          left: galleryContainer.current.scrollLeft,
          x: e.clientX,
        };

        galleryContainer.current.addEventListener(
          'mousemove',
          mouseMoveHandler
        );
        window.addEventListener('mouseup', mouseUpHandler);
      }
    };

    if (galleryContainer.current) {
      galleryContainer.current.scrollLeft = 0;
      galleryContainer.current.addEventListener('mousedown', mouseDownHandler);
    }

    axiosInst.get('/gallery/featuredlist/').then((result) => {
      const data: ImageType[] = result.data.data;
      setImages(data);
    });

    return () => {
      if (galleryContainer.current) {
        galleryContainer.current.removeEventListener(
          'mousedown',
          mouseDownHandler
        );
      }
      window.removeEventListener('mouseup', mouseUpHandler);
    };
  }, []);

  const mouseMoveHandler = function (e: MouseEvent) {
    if (galleryContainer.current) {
      galleryContainer.current.style.cursor = 'grabbing';
      galleryContainer.current.style.userSelect = 'none';
      galleryContainer.current.style.scrollSnapType = '';
      galleryContainer.current.style.pointerEvents = 'stroke';

      const dx = (e as MouseEvent).clientX - pos.x;

      galleryContainer.current.scrollLeft = pos.left - dx;
    }
  };

  const mouseUpHandler = function () {
    if (galleryContainer.current) {
      galleryContainer.current.style.cursor = 'grab';
      galleryContainer.current.style.scrollSnapType = 'x mandatory';
      galleryContainer.current.style.removeProperty('user-select');
      galleryContainer.current.style.removeProperty('pointer-events');
      galleryContainer.current.removeEventListener(
        'mousemove',
        mouseMoveHandler
      );
    }
  };

  const openModal = (imagePath: string) => {
    setModalImage(imagePath);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  const imageLoader = ({
    src,
    width,
    quality,
  }: {
    src: string;
    width: number;
    quality: number;
  }) => {
    return `https://example.com/${src}?w=${width}&q=${quality || 75}`;
  };

  return (
    <section className="gallery">
      <div className="dashed_news_container">
        <div className="image_content_container">
          <h2>GALLERY</h2>

          <div
            className="image_flex_container !overflow-x-scroll"
            ref={galleryContainer}
          >
            {images.map((image) => {
              const title = image.title;
              const imageUrl = constants.baseUrl + image.image;
              if (!image.isImage) return null;
              return (
                <div
                  key={image.id}
                  className="image_container relative w-44"
                  onClick={() => {
                    openModal(imageUrl);
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
            })}
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
