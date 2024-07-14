'use client';

import axiosInstance from '@/core/utils/axoisInst';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Rellax from 'rellax';
import Details from '../(components)/Details';

export default function Description() {
  const { slug } = useParams();

  const router = useRouter();
  const [chopperInfo, setChopperInfo] = useState({
    id: 0,
    name: '',
    image: '',
  });

  useEffect(() => {
    if (slug == null) {
      return;
    }

    axiosInstance.get('/chopper/').then((item) => {
      const chopperList = item.data.data;
      let chopper = chopperList.filter((item: any) => item.id == slug)[0];

      if (!chopper) {
        router.push('/404');
        return;
      }

      setChopperInfo({
        id: chopper.id,
        name: chopper.name,
        image: chopper.image,
      });
      let rellax = new Rellax('.parallax-element');
    });
  }, [slug]);

  return (
    <main className="description-main">
      <section className="intro ">
        <div className="parallax-container">
          <div
            className="bg-img parallax-element background-img"
            data-rellax-speed="-6"
          />
          <h1 className="bg-img parallax-element" data-rellax-speed="-10">
            {chopperInfo.name} <br />
            DESCRIPTION
          </h1>
        </div>
        <div className="bg-img mountain-img">
          <img src="/images/description/down.webp" alt="mountain background" />
        </div>
      </section>

      <div className="details-wrapper">
        <Details />
      </div>
    </main>
  );
}
