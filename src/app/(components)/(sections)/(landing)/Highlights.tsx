'use client';
import animateOnScroll from '@/core/utils/animateOnScroll';
import Image from 'next/image';

import { useEffect } from 'react';

export default function Highlights() {
  useEffect(() => {
    animateOnScroll(
      '.highlights .svg_text_container',
      '.highlights .animation-observer-helper',
      'animate__zoomIn'
    );
  }, []);
  return (
    <section className="highlights" id="highlights">
      <div className="animation-observer-helper" />
      <div className="highlights_container">
        <div className="border-[1rem] border-[#a7b9c7] max-w-60 py-14 px-20 mr-[10vw] flex items-center">
          <h2 className="text-5xl font-gilroy text-custom-blue m-0">
            WHY ALTITUDE AIR?
          </h2>
        </div>

        <div className="feature_container">
          <div
            className="svg_text_container"
            style={{ animationDuration: '.1s' }}
          >
            <div className="svg_container">
              <Image
                src="/icons/support.svg"
                alt="Support svg icon"
                width={100}
                height={100}
              />
            </div>
            <h4>Experienced Team</h4>
            <p>
              Our Board of Directors comprise of the legendaries and veterans in
              the field of travel and tourism in Nepal along with highly
              experienced and skilled rescue operations team with extensive
              experience in flying helicopters in high altitudes and in the most
              treacherous mountain terrains.
            </p>
          </div>
          <div
            className="svg_text_container"
            style={{ animationDelay: '.1s', animationDuration: '.3s' }}
          >
            <div className="svg_container">
              <Image
                src="/icons/24-hours.svg"
                alt="24hr svg icon"
                width={100}
                height={100}
              />
            </div>
            <h4>We are here </h4>
            <p>
              Our support system allows you to reach us round the clock. This
              gives us the advantage to take action quickly, without wasting
              precious time for any kind of emergencies such as rescue mission,
              medical evacuation and relief, or to respond to your needs on
              time.
            </p>
          </div>
          <div
            className="svg_text_container"
            style={{ animationDelay: '.2s', animationDuration: '.3s' }}
          >
            <div className="svg_container">
              <Image
                src="/icons/helicopter.svg"
                alt="Helicopter svg icon"
                width={100}
                height={100}
              />
            </div>
            <h4>Brand New Helicopters</h4>
            <p>
              Our Brand New, first class fleet of Airbuses (AMX/AMS) is capable
              of combating the tough and treacherous mountainous terrains. Our
              competence lies in reaching the most remote areas for risky rescue
              missions and emergency medical services.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
