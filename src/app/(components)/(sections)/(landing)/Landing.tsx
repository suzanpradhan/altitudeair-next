'use client';
import { useEffect, useState } from 'react';
// import Modal from "../../elements/Modal";
// import StepForm from "../../elements/StepForm";
import { constants } from '@/core/utils/constants';
import ScrollIndicator from '../../(elements)/ScrollIndicator';
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

  return (
    <section className="landing">
      {/*<div className="parallax-container">*/}
      {/*  <div className="parallax-element background" data-rellax-speed="-1" />*/}
      {/*  <div className="parallax-element land" data-rellax-speed="3" />*/}
      {/*  <div className="heli-container">*/}
      {/*    <div className="parallax-element heli" data-rellax-speed="5" />*/}
      {/*  </div>*/}
      {/*</div>*/}
      <video
        // loop={true}
        src={constants.baseUrl + videoUrl}
        autoPlay={true}
        muted={true}
      />

      <div className="card">
        <h1>
          WE ARE <br />
          HERE 24/7
        </h1>
        <p>
          Committed to the highest level of safety and performance, our highly
          experienced and qualified team members are our biggest pride and
          strength!!! Driven towards exceptional service and efficiency, we are
          here to do extraordinary.
        </p>
        <div className="actions">
          <a href={`tel:${hotline}`}>
            <h2 className="phone">{hotline}</h2>
          </a>
          <p>OR</p>
          <div className="btn-container">
            <button className="action-button" onClick={openModal}>
              ENQUIRY NOW
            </button>
          </div>
        </div>
      </div>
      <ScrollIndicator id="highlights" />
      {/* {showModal && (
        <Modal show={showModal} hide={closeModal}>
          <StepForm hide={closeModal} />
        </Modal>
      )} */}
      <div className="animation-observer-helper" />
    </section>
  );
}

export default Landing;
