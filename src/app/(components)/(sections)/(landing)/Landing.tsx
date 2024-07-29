'use client';
import { useEffect, useState } from 'react';
// import Modal from "../../elements/Modal";
// import StepForm from "../../elements/StepForm";
import { constants } from '@/core/utils/constants';
import Dialog from '../../(elements)/Dialog';
import ScrollIndicator from '../../(elements)/ScrollIndicator';
import StepFormV2 from '../../(elements)/StepFormV2';
import axiosInst from '../../../../core/utils/axoisInst';
// import animateOnScroll from "../../../util/animateOnScroll";
// import { constants } from "../../../util/constants";
// import ScrollIndicator from "../../elements/ScrollIndicator";

function Landing() {
  const [showModal, setShowModal] = useState(false);
  const [hotline, setHotline] = useState('');
  const [videoUrl, setVideoUrl] = useState('');

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    axiosInst.get('/footer/').then((result) => {
      const data = result.data.data;
      setHotline(data[0].hotline);
    });

    axiosInst.get('/general/').then((result) => {
      const data = result.data.data;
      setVideoUrl(data.VideoUrl);
    });

    // new Rellax('.parallax-element');

    // animateOnScroll(
    //   ".landing .heli-container",
    //   ".landing .animation-observer-helper",
    //   "chopper-fly",
    //   true
    // );
  }, []);

  console.log(showModal);

  return (
    <section className="landing">
      <video
        // loop={true}
        src={constants.baseUrl + videoUrl}
        autoPlay={true}
        muted={true}
      />
      {/* border: 1.1rem solid #202e43; background: rgba(32, 46, 67, .5); max-width:
      330px; padding: 1rem 1.5rem; z-index: 2; */}
      <div className="cardFamily border-8 border-custom-blue bg-custom-blue/50 w-full max-w-md py-4 px-5 z-10">
        <h2 className="text-4xl font-black text-white">
          WE ARE <br />
          HERE 24/7
        </h2>
        <p className="text-lg text-gray-200 py-4">
          Committed to the highest level of safety and performance, our highly
          experienced and qualified team members are our biggest pride and
          strength!!! Driven towards exceptional service and efficiency, we are
          here to do extraordinary.
        </p>
        <div className="flex flex-col justify-center w-full">
          <a href={`tel:${hotline}`} className="self-center">
            <h2 className="text-2xl font-black text-custom-primary">
              {hotline}
            </h2>
          </a>
          <p className="self-center text-2xl font-black text-custom-primary">
            OR
          </p>
          <div className="self-center">
            <button className="action-button" onClick={openModal}>
              ENQUIRY NOW
            </button>
          </div>
        </div>
      </div>
      <ScrollIndicator id="highlights" />

      <Dialog isDialogOpen={showModal} setIsDialogOpen={setShowModal}>
        {/* <StepForm hide={closeModal} /> */}
        <StepFormV2 />
      </Dialog>

      <div className="animation-observer-helper" />
    </section>
  );
}

export default Landing;
