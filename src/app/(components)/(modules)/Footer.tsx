'use client';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
// import {
//   faFacebookSquare,
//   faInstagramSquare,
//   faTwitterSquare,
//   faYoutubeSquare,
// } from "@fortawesome/free-brands-svg-icons";
import { parseHtml } from '@/core/utils/helper';
import Image from 'next/image';
import {
  default as axiosInst,
  default as axiosInstance,
} from '../../../core/utils/axoisInst';

function Footer() {
  const [footerData, setFooterData] = useState({
    copyright: '',
    hotline: null,
    address: '',
    email: '',
    aboutUs: '',
  });

  const [socialLinks, setSocialLinks] = useState({
    id: 1,
    instagram: '',
    facebook: '',
    youtube: '',
    twitter: '',
  });

  // const notificationContext = useNotificationContext();

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    axiosInstance.get('/footer/').then((result) => {
      const data = result.data.data;
      setFooterData(data[0]);
    });

    // eslint-disable-next-line no-undef
    axiosInst.get('/socialLink/').then((result) => {
      const data = result.data.data;
      setSocialLinks(data[0]);
    });
  }, []);

  function showError(message: any) {
    // notificationContext.showNotification(message, 2000);
  }

  return (
    <footer>
      <div className="footer_container">
        <div className="nav_n_form_container">
          <div className="footer_intro">
            <Image
              src="/images/inverse-logo.webp"
              alt="altitude-air-logo"
              width={100}
              height={100}
            />
            <p>{parseHtml(footerData.aboutUs)}</p>
          </div>
          <div className="footer_nav_link about_us_nav">
            <h5>ABOUT US</h5>
            <ul>
              <li>
                <Link href="/news">Media Coverage</Link>
              </li>
              <li>
                <Link href="/about#crew">Our Fleet</Link>
              </li>
              <li>
                <Link href="/voluntary-hazard-report">
                  Voluntary Hazard Report
                </Link>
              </li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          <div className="footer_nav_link navigate_to_nav">
            <h5>NAVIGATE TO</h5>
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/gallery">Gallery</Link>
              </li>
              <li>
                <Link href="/blog">Blogs</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>
          <div className="footer_subscribe">
            <h5>SUBSCRIBE TO OUR NEWSLETTER</h5>
            <p>
              Subscribe for Latest News and Updates from <br />
              Altitude Air
            </p>
            <Formik
              initialValues={{ email: '' }}
              validationSchema={Yup.object({
                email: Yup.string()
                  .email('Not a valid email')
                  .required('Required'),
              })}
              onSubmit={async (values, { resetForm }) => {
                if (submitting) {
                  return;
                }

                setSubmitting(true);
                try {
                  let response = await axiosInstance.post(
                    '/newsletter/',
                    values
                  );
                  if (response.status === 200) {
                    resetForm();
                  }
                } catch (error: any) {
                  if (error.response.status === 409) {
                    showError('Email already exists');
                  } else {
                    showError('Network Error');
                  }

                  setSubmitting(false);
                }
              }}
            >
              <>
                <Form>
                  <Field
                    name="email"
                    type="email"
                    placeholder="Email Address"
                  />
                  <button
                    type="submit"
                    className="action-button"
                    disabled={submitting}
                  >
                    {submitting ? 'Subscribed' : 'Subscribe Now'}
                  </button>
                </Form>
                <p className="error_email">
                  <ErrorMessage name="email" />
                </p>
              </>
            </Formik>

            <div className="socials">
              {socialLinks.facebook ? (
                <a rel="noreferrer" target="_blank" href={socialLinks.facebook}>
                  {/* <FontAwesomeIcon className="icon" icon={faFacebookSquare} /> */}
                </a>
              ) : null}

              {socialLinks.twitter ? (
                <a rel="noreferrer" target="_blank" href={socialLinks.twitter}>
                  {/* <FontAwesomeIcon className="icon" icon={faTwitterSquare} /> */}
                </a>
              ) : null}

              {socialLinks.youtube ? (
                <a rel="noreferrer" target="_blank" href={socialLinks.youtube}>
                  {/* <FontAwesomeIcon className="icon" icon={faYoutubeSquare} /> */}
                </a>
              ) : null}

              {socialLinks.instagram ? (
                <a
                  rel="noreferrer"
                  target="_blank"
                  href={socialLinks.instagram}
                >
                  {/* <FontAwesomeIcon className="icon" icon={faInstagramSquare} /> */}
                </a>
              ) : null}
            </div>
          </div>
        </div>

        <div className="copyright_container">
          {parseHtml(footerData.copyright)}
          <p>
            Crafted by <a href="https://kurmatechnepal.com">KurmaTech</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
