import { EnquirySchemaType } from '@/modules/enquiry/enquiryTypes';
import { ErrorMessage, Field, FormikProps } from 'formik';
import { Dispatch, SetStateAction } from 'react';

export default function PersonalInfo({
  formik,
  setPickedStep,
  formSubmitHandler,
}: {
  formik: FormikProps<EnquirySchemaType>;
  setPickedStep: Dispatch<SetStateAction<number>>;
  formSubmitHandler: (values: EnquirySchemaType) => void;
}) {
  return (
    <div className="budget_step_section">
      <h2>Your Personal Info</h2>

      <div>
        <div className="parent_wrapper">
          <div className="budget_field_wrapper">
            <label htmlFor="infosForm.firstName">First Name:</label>
            <Field
              id="infosForm.firstName"
              name="infosForm.firstName"
              type="text"
              value={formik.values.infosForm.firstName}
            ></Field>
            <p>
              <ErrorMessage name="infosForm.firstName" />
            </p>
          </div>
          <div className="budget_field_wrapper">
            <label htmlFor="infosForm.lastName">Last Name:</label>
            <Field
              name="infosForm.lastName"
              id="infosForm.lastName"
              type="text"
              value={formik.values.infosForm.lastName}
            ></Field>
            <p>
              <ErrorMessage name="infosForm.lastName" />
            </p>
          </div>
        </div>
        <div className="parent_wrapper">
          <div className="budget_field_wrapper">
            <label htmlFor="infosForm.email">Email:</label>
            <Field
              name="infosForm.email"
              id="infosForm.email"
              type="email"
              value={formik.values.infosForm.email}
            ></Field>
            <p>
              <ErrorMessage name="infosForm.email" />
            </p>
          </div>
          <div className="budget_field_wrapper">
            <label htmlFor="infosForm.phone">Contact No. :</label>
            <Field
              name="infosForm.phone"
              id="infosForm.phone"
              type="text"
              value={formik.values.infosForm.phone}
            ></Field>
            <p>
              <ErrorMessage name="infosForm.phone" />
            </p>
          </div>
        </div>
        <div className="parent_wrapper">
          <div className="budget_field_wrapper">
            <label htmlFor="infosForm.details">Additional Details:</label>
            <Field
              name="infosForm.details"
              id="infosForm.details"
              as="textarea"
              rows="5"
              cols="56"
              value={formik.values.infosForm.details}
            ></Field>
            <p>
              <ErrorMessage name="infosForm.details" />
            </p>
          </div>
        </div>
        <button
          className="action-button final_btn"
          type="submit"
          onClick={() => {
            formSubmitHandler(formik.values);
          }}
          //   disabled={formSubmitted}
        >
          SUBMIT
        </button>
      </div>
    </div>
  );
}
