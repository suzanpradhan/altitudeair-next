'use client';

import animateOnScroll from '@/core/utils/animateOnScroll';
import { constants } from '@/core/utils/constants';
import { parseHtml } from '@/core/utils/helper';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import axiosInst from '../../../../core/utils/axoisInst';
// import Modal from '../../elements/Modal';

interface ServicesType {
  id: number;
  title: string;
  blog: BlogType;
}

interface BlogType {
  coverImage: string;
  description: string;
}

export default function Services() {
  const [services, setServices] = useState<ServicesType[] | undefined>();
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    axiosInst.get('/service/3').then((item: any) => {
      setServices(item.data.data);
      animateOnScroll(
        '.services .card',
        '.services .animation-observer-helper',
        'animate__pulse'
      );
    });
  }, []);

  return (
    <section className="services">
      <h2>WHAT WE DO</h2>

      <div className="cards-container">
        <div className="animation-observer-helper" />

        {services &&
          services.map((service, pos) => {
            return (
              <div
                className="card relative"
                key={service.id}
                style={{
                  animationDelay: `${pos * 0.4}s`,
                  animationDuration: `${pos * 0.1 + 0.2}s`,
                }}
              >
                <Image
                  src={constants.baseUrl + service.blog.coverImage}
                  alt="Heli Tours"
                  onError={(e) => {
                    e.currentTarget.src = '/images/errors/placeholder.webp';
                  }}
                  quality={75}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  height={100}
                  width={100}
                  // fill
                />
                <h3>{service.title}</h3>
                <p>
                  {parseHtml(
                    service.blog.description.length > 140
                      ? service.blog.description.slice(0, 140) + '...'
                      : service.blog.description
                  )}
                </p>
              </div>
            );
          })}
      </div>

      {/* {showModal && (
        <Modal show={showModal} hide={closeModal}>
          <StepForm hide={closeModal} />
        </Modal>
      )} */}
    </section>
  );
}
