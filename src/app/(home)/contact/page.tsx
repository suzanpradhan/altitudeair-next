'use client';
import axiosInst from '@/core/utils/axoisInst';
import { constants } from '@/core/utils/constants';
import { parseHtml } from '@/core/utils/helper';
import mapboxgl from 'mapbox-gl';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaTwitterSquare,
  FaYoutubeSquare,
} from 'react-icons/fa';
import { ContactForm } from './(components)/ContactForm';

export default function Description() {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiaWN5aG90c2hvdG8iLCJhIjoiY2tmeHQwc3E5MjRxajJxbzhmbDN1bjJ5aiJ9.mNKmhIjRyKxFkJYrm4dMqg';
  const mapContainer = useRef(null);
  const map = useRef<any>(null);

  useEffect(() => {
    if (map.current) {
      axiosInst
        .get('/contact/')
        .then((res) => {
          let lat = res.data.data[0].latitude;
          let lng = res.data.data[0].longitude;
          map.current?.flyTo({
            center: [lng, lat],
            minZoom: 5,
            speed: 0.8,
            zoom: 13,
          });
          new mapboxgl.Marker({ color: '#fbc200' })
            .setLngLat([lng, lat])
            .addTo(map.current);
        })
        .catch((err) => {});
    }

    if (map.current || !mapContainer.current) {
      return;
    }
    if (!map.current && mapContainer.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/icyhotshoto/ckto9qg2x123s18kkno3md7h4',
        center: [86, 27],
        zoom: 8,
      });
    }
  }, []);

  const [footerData, setFooterData] = useState({
    copyright: '',
    hotline: null,
    address: '',
    airportNumber: '',
    email: '',
    aboutUs: '',
  });

  const [contactData, setContactData] = useState({
    address: '',
    airportNumber: '',
    headNumber: '',
    inquiry1: '',
    inquiry2: '',
    inquiry3: '',
    inquiry4: '',
    bookingEmail: '',
    bookingInquiry: '',
  });

  const [socialLinks, setSocialLinks] = useState({
    id: 1,
    instagram: '',
    facebook: 'https://www.facebook.com/altitude.airlines/',
    youtube: '',
    twitter: '',
  });

  const [qr, setQr] = useState('');

  useEffect(() => {
    axiosInst.get('/footer/').then((result) => {
      const data = result.data.data;
      setFooterData(data[0]);
    });

    axiosInst.get('/contact/').then((result) => {
      const data = result.data.data;
      setContactData(data[0]);
    });

    axiosInst.get('/socialLink/').then((result) => {
      const data = result.data.data;
      setSocialLinks(data[0]);
    });

    axiosInst.get('/general/').then((result) => {
      const data = result.data.data;
      setQr(data.QRcode);
    });
  }, []);

  return (
    <>
      <section className="contact-featured-section">
        <div className="featured-img" />
        <div className="heading">
          <h1>CONTACT US</h1>
          {/*<p>{footerData.aboutUs}</p>*/}
        </div>

        <div className="transition-box" />
      </section>
      <main className="contact-main">
        {/*TODO: Designs for contact us */}

        {/* <section className="contact-section"> */}
        <section className=" contact-section grid grid-cols-12 gap-10">
          <div
            className={
              'contact-details col-span-6 flex flex-col justify-stretch items-start gap-7'
            }
          >
            <h2 className="text-center w-full">Details</h2>
            <p>
              <strong>{'Address: '}</strong>
              <span>
                {contactData.address ? parseHtml(contactData.address) : '...'}
              </span>
            </p>

            <p>
              <strong>{'For Booking: '}</strong>
              <span>
                {contactData.bookingEmail
                  ? parseHtml(contactData.bookingEmail)
                  : '...'}
              </span>
            </p>

            <p>
              <strong>{'For Enquiry: '}</strong>
              <span>
                {contactData.bookingInquiry
                  ? parseHtml(contactData.bookingInquiry)
                  : '...'}
              </span>
            </p>
            <p>
              <strong>{'Airport Office: '}</strong>
              <span>
                {contactData.airportNumber
                  ? parseHtml(contactData.airportNumber)
                  : '...'}
              </span>
            </p>
            <p>
              <strong>{'Head Office: '}</strong>
              <span>
                {contactData.headNumber
                  ? parseHtml(contactData.headNumber)
                  : '...'}
              </span>
            </p>
            <p>
              <strong>{'For Inquiry: '}</strong>
              <span>
                {contactData.inquiry1
                  ? parseHtml(
                      contactData.inquiry1 +
                        contactData.inquiry2 +
                        contactData.inquiry3 +
                        contactData.inquiry4
                    )
                  : '...'}
              </span>
            </p>

            <p>
              <strong>Socials:</strong>
            </p>
            <div className="qr_wrapper flex items-start justify-evenly">
              <div className="socials flex gap-2 items-center">
                <a href={socialLinks.facebook}>
                  <FaFacebookSquare size={36} />
                </a>
                <a href={socialLinks.twitter}>
                  <FaTwitterSquare size={36} />
                </a>
                <a href={socialLinks.youtube}>
                  <FaYoutubeSquare size={36} />
                </a>
                <a href={socialLinks.instagram}>
                  <FaInstagramSquare size={36} />
                </a>
              </div>

              <div className="qr">
                <Image
                  src={constants.baseUrl + qr}
                  alt="QR Code"
                  onError={(e) => {
                    e.currentTarget.src = '/images/errors/placeholder.webp';
                  }}
                  height={100}
                  width={100}
                />
              </div>
            </div>
            <div className="desc-map-wrapper">
              <div ref={mapContainer}></div>
            </div>
          </div>

          <div className="contact-form col-span-6">
            <h2>Send a Message</h2>
            <ContactForm />
          </div>
        </section>
      </main>
    </>
  );
}
