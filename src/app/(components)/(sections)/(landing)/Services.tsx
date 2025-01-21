'use client';

import { constants } from '@/core/utils/constants';
import { parseHtml } from '@/core/utils/helper';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
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
  const router = useRouter();

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    axiosInst.get('/service/3').then((item: any) => {
      setServices(item.data.data);
      // animateOnScroll(
      //   '.services .card',
      //   '.services .animation-observer-helper',
      //   'animate__pulse'
      // );
    });
  }, []);

  return (
    <section className="services">
      <h2>WHAT WE DO</h2>
      <div className="flex justify-center flex-wrap">
        {services &&
          services.map((service, pos) => {
            return (
              <button
                className="card flex flex-col gap-4 cursor-pointer"
                key={service.id}
                // onClick={() => router.push()}
              >
                <Image
                  src={constants.baseUrl + service.blog.coverImage}
                  alt="Heli Tours"
                  onError={(e) => {
                    e.currentTarget.src = '/images/errors/placeholder.webp';
                  }}
                  quality={75}
                  className="rounded-md"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  height={100}
                  width={100}
                  // fill
                />
                <h3 className="font-bold text-lg m-0">{service.title}</h3>
                <p className="text-left">
                  {parseHtml(
                    // service.blog.description
                    service.blog.description.length > 100
                      ? service.blog.description.slice(0, 100) + '...'
                      : service.blog.description
                  )}
                </p>
              </button>
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
