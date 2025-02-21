'use client';
import axiosInst from '@/core/utils/axoisInst';
import { useEffect, useState } from 'react';

export default function GetInTouch() {
  const [showModal, setShowModal] = useState(false);
  const [hotline, setHotline] = useState('');
  const [firstHotline, setFirstHotline] = useState('');

  useEffect(() => {
    axiosInst.get('/footer/').then((result) => {
      const data = result.data.data;
      const hotlineData = data[0].hotline || '';
      setHotline(hotlineData);
      const firstNumber = hotlineData.split('\n')[0].trim();
      setFirstHotline(firstNumber);
    });
  }, []);

  const openModal = () => {
    if (
      typeof window !== 'undefined' &&
      /Mobi|Android|iPhone/i.test(navigator.userAgent)
    ) {
      window.location.href = `tel:${firstHotline}`;
    } else {
      const whatsappURL = `https://wa.me/9779801249908`;
      window.open(whatsappURL, '_blank');
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const hotlineNumbers = hotline.split('\n').join(', ');

  return (
    <section className="get_in_touch !py-10 !px-9">
      <div className="touch_container">
        <div className="touch_heading_container">
          <h2>Get in touch with us?</h2>
        </div>

        <div className="enquiry_container">
          <div className="contact_container">
            <a className="w-10" href={`tel:${firstHotline}`}>
              <h2>{hotlineNumbers}</h2>
            </a>
          </div>

          <div className="button_container">
            <button className="action-button" onClick={openModal}>
              Enquiry Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
