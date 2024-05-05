'use client';

import animateOnScroll from '@/core/utils/animateOnScroll';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function About() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // console.log(props);
    animateOnScroll('.about .info', '.about .info', 'animate__slideInRight');
    animateOnScroll(
      '.about .video-thumb',
      '.about .info',
      'animate__slideInLeft'
    );
  }, []);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <section className="about">
      <div className="dash-border">
        <div className="info" style={{ animationDuration: '.3s' }}>
          <h1>ABOUT US</h1>
          <p>
            Marking a difference in Helicopter Airlines, Altitude Air Pvt .Ltd.
            is committed to the highest level of safety and performance!
            Comprising of veterans who have made a significant growth and
            contribution in the field of tourism and made Nepal proud, our team
            of highly qualified and experienced personnel is our biggest pride
            and strength!
          </p>
        </div>
        <div
          className="video-thumb"
          onClick={openModal}
          style={{ animationDuration: '.3s' }}
        >
          <Image
            src="https://i.ytimg.com/vi_webp/vNCWbmSLYeY/maxresdefault.webp"
            alt="video thumbnail"
            height={100}
            width={100}
            className="thumbnail_img"
          />
          <Image
            src="/icons/play.svg"
            alt="play svg image"
            className="play_icon"
            height={100}
            width={100}
          />
        </div>
      </div>
      {/* {showModal && (
        <Modal show={showModal} hide={closeModal}>
          <iframe width="853" height="480" src="https://www.youtube.com/embed/vNCWbmSLYeY?autoplay=1" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </Modal>
      )} */}
    </section>
  );
}
