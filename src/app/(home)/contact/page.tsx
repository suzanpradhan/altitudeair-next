'use client';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
// import { useNotificationContext } from '../../contexts/NotifyContext';
import axiosInst from '@/core/utils/axoisInst';
import { constants } from '@/core/utils/constants';
import { dateFromSqlDateTime, parseHtml } from '@/core/utils/helper';
import mapboxgl from 'mapbox-gl';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

export default function Description() {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiaWN5aG90c2hvdG8iLCJhIjoiY2tmeHQwc3E5MjRxajJxbzhmbDN1bjJ5aiJ9.mNKmhIjRyKxFkJYrm4dMqg';
  const mapContainer = useRef(null);
  const map = useRef(null);

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
          const marker1 = new mapboxgl.Marker({ color: '#fbc200' })
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

        <section className="contact-section">
          <div className={'contact-details'}>
            <h2>Details</h2>
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
            <div className="qr_wrapper">
              <div className="socials">
                {/* <a href={socialLinks.facebook}>
                  <FontAwesomeIcon className="icon" icon={faFacebookSquare} />
                </a>
                <a href={socialLinks.twitter}>
                  <FontAwesomeIcon className="icon" icon={faTwitterSquare} />
                </a>
                <a href={socialLinks.youtube}>
                  <FontAwesomeIcon className="icon" icon={faYoutubeSquare} />
                </a>
                <a href={socialLinks.instagram}>
                  <FontAwesomeIcon className="icon" icon={faInstagramSquare} />
                </a> */}
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

          <div className="contact-form">
            <h2>Send a Message</h2>
            <ContactForm />
          </div>
        </section>
      </main>
    </>
  );
}

export function ContactForm() {
  //   const { executeRecaptcha } = useGoogleReCaptcha();
  //   const notif = useNotificationContext();
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [isVerified, setIsVerified] = useState(false);

  const handleChange = (value: string | null) => {
    if (value) {
      setIsVerified(true);
    } else {
      setIsVerified(false);
    }
  };

  function handleExpired() {
    setIsVerified(false);
  }

  return (
    <>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          tel: '',
          date: '',
          details: '',
        }}
        validationSchema={Yup.object({
          // Validation schema definition...
        })}
        onSubmit={async (values, { resetForm }) => {
          if (!isVerified) {
            console.log('Please complete the ReCAPTCHA challenge');
            return;
          }

          let obj = {
            ...values,
            isContact: true,
            date: dateFromSqlDateTime(new Date().toISOString()),
          };
          try {
            const response = await axiosInst.post('/contactUs', obj);
            console.log('Form submitted successfully:', response.data);
            resetForm();
          } catch (error) {
            console.error('Error submitting form:', error);
          }
        }}
      >
        {({ values, handleChange, handleSubmit, errors, touched }) => (
          <Form onSubmit={handleSubmit}>
            <div className="form-field">
              <label htmlFor="given-name">First Name</label>
              <Field
                id="firstName"
                placeholder="First Name"
                type="text"
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
                className={errors.firstName && touched.firstName ? 'error' : ''}
              />
            </div>
            {errors.firstName && touched.firstName && (
              <div className="error-message">{errors.firstName}</div>
            )}

            <div className="form-field">
              <label htmlFor="lastName">Last Name</label>
              <Field
                id="lastName"
                placeholder="Last Name"
                type="text"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                className={errors.lastName && touched.lastName ? 'error' : ''}
              />
            </div>
            {errors.lastName && touched.lastName && (
              <div className="error-message">{errors.lastName}</div>
            )}

            <div className="form-field">
              <label htmlFor="email">Email</label>
              <Field
                id="email"
                placeholder="Email"
                type="text"
                name="email"
                value={values.email}
                onChange={handleChange}
                className={errors.email && touched.email ? 'error' : ''}
              />
            </div>
            {errors.email && touched.email && (
              <div className="error-message">{errors.email}</div>
            )}

            <div className="form-field">
              <label htmlFor="tel">Phone Number</label>
              <Field
                id="tel"
                placeholder="Contact Number"
                type="text"
                name="tel"
                value={values.tel}
                onChange={handleChange}
                className={errors.tel && touched.tel ? 'error' : ''}
              />
            </div>
            {errors.tel && touched.tel && (
              <div className="error-message">{errors.tel}</div>
            )}

            <div className="form-field">
              <label htmlFor="details">Message</label>
              <Field
                as="textarea"
                id="details"
                name="details"
                rows="5"
                value={values.details}
                onChange={handleChange}
                className={errors.details && touched.details ? 'error' : ''}
              />
            </div>
            {errors.details && touched.details && (
              <div className="error-message">{errors.details}</div>
            )}

            <div className="form-field">
              <button
                type="submit"
                className="button-outline-light"
                disabled={!isVerified}
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>

      <ReCAPTCHA
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
        ref={recaptchaRef}
        onChange={handleChange}
        onExpired={handleExpired}
      />
    </>
  );
}
