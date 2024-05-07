'use client';
// import Glide from '@glidejs/glide';
import axiosInstance from '@/core/utils/axoisInst';
import { constants } from '@/core/utils/constants';
import Image from 'next/image';
import { useEffect, useState } from 'react';
// import Rellax from 'rellax';
// import Modal from '../../components/elements/Modal';
// import Layout from '../../components/layouts/Layout';

interface FeaturedImagesType {
  isImage: boolean;
  title: string;
  image?: string;
  thumbnail?: string;
  videoURL?: string;
}

interface ImagesNVideos {
  id: number;
  isImage: boolean;
  title: string;
  image?: string;
  thumbnail?: string;
  videoURL?: string;
}

export default function Gallery() {
  // const [featuredImages, setFeaturedImages] = useState([]);
  // const [imagesNVideos, setImagesNVideos] = useState([]);
  const [showVideoModal, setShowVideoModal] = useState('');
  const [modalImage, setModalImage] = useState('');

  const [featuredImages, setFeaturedImages] = useState<FeaturedImagesType[]>(
    []
  );
  const [imagesNVideos, setImagesNVideos] = useState<ImagesNVideos[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const featuredRes = await axiosInstance.get('/gallery/featuredlist/');
        const galleryRes = await axiosInstance.get('/gallery/');
        setFeaturedImages(featuredRes.data.data);
        setImagesNVideos(galleryRes.data.data);
      } catch (error) {
        setError('Error fetching data');
      }
    };

    fetchData();

    // Cleanup function if needed
    // return () => {
    //   cleanup code...
    // };
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const openModal = (imagePath: string) => {
    setModalImage(imagePath);
  };

  const closeModal = () => {
    setModalImage('');
  };

  const openVidModal = (imagePath: string) => {
    setShowVideoModal(imagePath);
  };

  const closeVidModal = () => {
    setShowVideoModal('');
  };

  return (
    // <Layout>
    //   <Head>
    //     <title>Gallery - Altitude Air</title>
    //   </Head>

    <main className="gallery-main">
      <section className="gallery-featured">
        <div className="glide">
          <div className="glide__track" data-glide-el="track">
            <ul className="glide__slides">
              {featuredImages &&
                featuredImages.map((item, index) => {
                  if (item.isImage) {
                    const title = item.title;
                    const imageUrl = constants.baseUrl + item.image;
                    return (
                      <li className="glide__slide relative" key={index}>
                        <Image
                          src={imageUrl}
                          alt={title}
                          onError={(e) => {
                            e.currentTarget.src =
                              '/images/errors/placeholder.webp';
                          }}
                          width={100}
                          height={100}
                          quality={75}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </li>
                    );
                  } else {
                    const videoURL = item.videoURL;
                    return (
                      <div
                        className="video-thumb relative"
                        onClick={() => {
                          openVidModal(videoURL ?? '');
                        }}
                        style={{ animationDuration: '.3s' }}
                        key={index}
                      >
                        <Image
                          src={
                            item.thumbnail
                              ? item.thumbnail
                              : '/images/errors/placeholder.webp'
                          }
                          alt="video thumbnail"
                          className="thumbnail_img"
                          onError={(e) => {
                            e.currentTarget.src =
                              '/images/errors/placeholder.webp';
                          }}
                          width={100}
                          height={100}
                          quality={75}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <Image
                          src="/icons/play.svg"
                          alt="play svg image"
                          className="play_icon"
                          onError={(e) => {
                            e.currentTarget.src =
                              '/images/errors/placeholder.webp';
                          }}
                          width={100}
                          height={100}
                          quality={75}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    );
                  }
                })}
            </ul>
          </div>

          <div className="glide__arrows" data-glide-el="controls">
            <div
              className="glide__arrow glide__arrow--left"
              data-glide-dir="<"
            />
            <div
              className="glide__arrow glide__arrow--right"
              data-glide-dir=">"
            />
          </div>
        </div>
      </section>

      <div className="transition-box">
        <h2>
          <div className="corner-border--open" />
          Gallery
          <div className="corner-border--close" />
        </h2>
      </div>

      <section className="gallery-section ">
        <div className="images-list parallax-container">
          {imagesNVideos &&
            imagesNVideos.map((item, index) => {
              if (item.isImage) {
                return (
                  <div
                    key={item.id}
                    className="image_container"
                    onClick={() => {
                      openModal(constants.baseUrl + item.image);
                    }}
                  >
                    <Image
                      src={constants.baseUrl + item.image}
                      alt={item.title}
                      onError={(e) => {
                        e.currentTarget.src = '/images/errors/placeholder.webp';
                      }}
                      width={100}
                      height={100}
                      quality={75}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                );
              } else {
                return (
                  <div
                    className="video-thumb relative"
                    onClick={() => {
                      openVidModal(item.videoURL ?? '');
                    }}
                    style={{ animationDuration: '.3s' }}
                    key={index}
                  >
                    <Image
                      src={constants.baseUrl + item.thumbnail}
                      alt="video thumbnail"
                      className="thumbnail_img"
                      onError={(e) => {
                        e.currentTarget.src = '/images/errors/placeholder.webp';
                      }}
                      width={100}
                      height={100}
                      quality={75}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <Image
                      src="/icons/play.svg"
                      alt="play svg image"
                      className="play_icon"
                      width={100}
                      height={100}
                      quality={75}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                );
              }
            })}
        </div>
        {/* {modalImage && (
          <Modal show={openModal} hide={closeModal}>
            <Image
              src={modalImage}
              alt="Gallery Image"
              onError={(e) => {
                e.currentTarget.src = '/images/errors/placeholder.webp';
              }}
              width={100}
              height={100}
              quality={75}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </Modal>
        )} */}
        {/* {showVideoModal && (
          <Modal show={openVidModal} hide={closeVidModal}>
            <iframe
              src={
                showVideoModal.replace('/watch?v=', '/embed/') + '?autoplay=1'
              }
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </Modal>
        )} */}
      </section>
    </main>
    //</Layout>
  );
}

// export async function getStaticProps() {
//   let featuredRes;
//   let gallery;
//   try {
//     featuredRes = await axiosInstance.get('/gallery/featuredlist/');
//     gallery = await axiosInstance.get('/gallery/');
//   } catch (error) {
//     /* empty */
//   }

//   return {
//     props: {
//       featuredImages: featuredRes ? featuredRes.data.data : [],
//       imagesNVideos: gallery ? gallery.data.data : [],
//     },
//     revalidate: 60,
//   };
// }
