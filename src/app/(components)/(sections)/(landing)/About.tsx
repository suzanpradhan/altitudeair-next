'use client';

import animateOnScroll from '@/core/utils/animateOnScroll';
import { ShieldCross } from 'iconsax-react';
import Image from 'next/image';
import { useEffect } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '../../(elements)/Dialog';

export default function About() {
  useEffect(() => {
    animateOnScroll('.about .info', '.about .info', 'animate__slideInRight');
    animateOnScroll(
      '.about .video-thumb',
      '.about .info',
      'animate__slideInLeft'
    );
  }, []);

  return (
    <section className="about ">
      <div className="dash-border">
        <div
          className="info max-w-md !w-full rounded-md"
          style={{ animationDuration: '.3s' }}
        >
          <h1>ABOUT US</h1>
          <p>
            Marking a difference in Helicopter Airlines, Altitude Air Pvt. Ltd.
            is committed to the highest level of safety and performance!
            Comprising of veterans who have made a significant growth and
            contribution in the field of tourism and made Nepal proud, our team
            of highly qualified and experienced personnel is our biggest pride
            and strength!
          </p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <div
              className="video-thumb cursor-pointer"
              style={{ animationDuration: '.3s' }}
            >
              <div className="relative w-full">
                <Image
                  src="https://i.ytimg.com/vi_webp/vNCWbmSLYeY/maxresdefault.webp"
                  alt="video thumbnail"
                  width={100}
                  height={100}
                  quality={75}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="thumbnail_img rounded-lg"
                />
              </div>

              <Image
                src="/icons/play.svg"
                alt="play svg image"
                className="play_icon absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                height={100}
                width={100}
              />
            </div>
          </DialogTrigger>

          <DialogContent className="w-[90%] max-w-[720px] p-4 rounded-lg shadow-lg">
            <div className="relative w-full h-0 pb-[56.25%]">
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                src="https://www.youtube.com/embed/vNCWbmSLYeY?autoplay=1"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <DialogClose className="absolute top-4 right-4">
              <ShieldCross size="32" className="text-white " />
            </DialogClose>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
