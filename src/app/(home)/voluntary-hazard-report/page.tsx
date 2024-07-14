'use client';

import ScrollIndicator from '@/app/(components)/(elements)/ScrollIndicator';
import axiosInstance from '@/core/utils/axoisInst';
import { constants } from '@/core/utils/constants';
import { hazardFormSchema, HazardFormType } from '@/modules/hazard/hazard';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { toast } from 'react-toastify';
import { toFormikValidate } from 'zod-formik-adapter';

const VoluntaryHazardReport = () => {
  const [hazardFormLink, setHazardFormLink] = useState('');

  const { executeRecaptcha } = useGoogleReCaptcha();

  async function formSubmitHandler(values: HazardFormType, resetForm: any) {
    let obj = { ...values, isContact: false };
    let res;

    if (!executeRecaptcha) {
      console.log('Execute recaptcha not yet available');
    }

    if (!executeRecaptcha) {
      return;
    }
    const token = await executeRecaptcha('hello');

    if (!token) {
      toast.error('Error submitting form!');
      return;
    }

    try {
      res = await axiosInstance.post('/contactUs', obj);
      toast.success(
        'Your request has been submitted. Check your email for verification.'
      );
    } catch (error) {
      toast.error('Error submitting form!');
      return;
    }
    resetForm();
  }

  useEffect(() => {
    axiosInstance
      .get('/general/hazard')
      .then((result) => {
        const data = result.data.data;
        setHazardFormLink(data);
      })
      .catch((e) => {
        console.log('error: ' + e);
      });
  }, []);

  return (
    <main className="hazard-main">
      <section>
        <div className="featured-img">
          <div className="fading-bottom" />
          <ScrollIndicator id="hazard_intro" />
        </div>
      </section>
      <section className="section_hazard_intro" id="hazard_intro">
        <div className="hazard_intro">
          <h2>Voluntary Hazard Report - Altitude Air Nepal</h2>
          <hr />
          <p className="english">
            Any of the Altitude Air Pvt. Ltd. employees noticing any hazard or
            observing any activity or procedure that may affect the safety of
            the people‚ aircraft‚ vehicles or equipment should fill Part A of
            this form as soon as practical and submit the completed form to
            person responsible for safety or drop in the boxes kept in different
            places for collecting such forms as far as practicable. The
            information contained in the form shall be used only for improving
            safety standard of the company. Confidentiality of the information
            and reporter shall be maintained.
          </p>
          <p className="nepali">
            अल्टिच्युड एयरका कुनै पनि कर्मचारीले, व्यक्ति, विमान, वाहन वा
            उपकरणको सुरक्षामा प्रतिकुल असर हुने गतिविधि वा खतराजन्य परिस्थितिको
            अवलोकन वा पहिचान गरेमा यस फारमको “ भाग ए “ भरि सुरक्षाका लागि
            जिम्मेवार व्यक्ति समक्ष प्रस्तुत गर्ने वा विभिन्न ठाउँमा राखिएका
            सुचना संकलन पेटिकामा यथाशिघ्र छिटो खसालि दिनु होला । यस फारममा
            भरिएका जानकारी कम्पनीको सुरक्षामानक सुधारको लागि मात्र प्रयोग गरिनेछ
            । फारममा उल्लेखित व्यक्तिगत विवरण गोप्य राखिने छ ।
          </p>
          <hr />
          <p>Please send your message below or download the form here.</p>
          <a
            href={constants.baseUrl + hazardFormLink}
            target="_blank"
            rel="noreferrer"
          >
            <button className="button-outline-light">DOWNLOAD NOW</button>
          </a>
        </div>
      </section>

      <section className="form-section">
        <div className="corner-border--top" />

        <h2>Voluntary Hazard Form</h2>

        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            tel: '',
            date: new Date(),
            details: '',
          }}
          validate={toFormikValidate(hazardFormSchema)}
          onSubmit={async (values, { resetForm }) => {
            formSubmitHandler(values, resetForm);
          }}
        >
          <Form>
            <div className="form-field">
              <label htmlFor="given-name">First Name</label>
              <Field
                id="firstName"
                placeholder="First Name"
                type="text"
                name="firstName"
              />
            </div>
            <div className="error-message">
              <ErrorMessage name="firstName" />
            </div>
            <div className="form-field">
              <label htmlFor="lastName">Last Name</label>
              <Field
                id="lastName"
                placeholder="Last Name"
                type="text"
                name="lastName"
              />
            </div>
            <div className="error-message">
              <ErrorMessage name="lastName" />
            </div>
            <div className="form-field">
              <label htmlFor="email">Email</label>
              <Field id="email" placeholder="Email" type="text" name="email" />
            </div>
            <div className="error-message">
              <ErrorMessage name="email" />
            </div>

            <div className="form-field">
              <label htmlFor="tel">Contact Number</label>
              <Field
                id="tel"
                placeholder="Contact Number"
                type="text"
                name="tel"
              />
            </div>
            <div className="error-message">
              <ErrorMessage name="tel" />
            </div>

            <div className="form-field">
              <label htmlFor="date" className="required">
                Date of Occurrence /<br /> Hazard
              </label>
              <Field id="date" type="date" name="date" />
            </div>
            <div className="error-message">
              <ErrorMessage name="date" />
            </div>

            <div className="form-field">
              <label htmlFor="details" className="required">
                Details of Occurrence /<br /> Hazard
              </label>
              <Field as="textarea" id="details" name="details" rows="5" />
            </div>
            <div className="error-message">
              <ErrorMessage name="details" />
            </div>

            <div className="form-field">
              <div />
              <button className="button-outline-light" type="submit">
                Submit
              </button>
            </div>
          </Form>
        </Formik>
        <div className="corner-border--bottom" />
      </section>
    </main>
  );
};

export default VoluntaryHazardReport;
