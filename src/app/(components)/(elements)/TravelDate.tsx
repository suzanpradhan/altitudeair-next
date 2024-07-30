import { EnquirySchemaType } from '@/modules/enquiry/enquiryTypes';
import { ErrorMessage, Field, FormikProps } from 'formik';
import { Dispatch, SetStateAction, useState } from 'react';

export default function TravelDate({
  formik,
  setPickedStep,
}: {
  formik: FormikProps<EnquirySchemaType>;
  setPickedStep: Dispatch<SetStateAction<number>>;
}) {
  const [isExactDate, toggleExactDate] = useState(true);

  return (
    <div className="travel_date_container">
      <h2>Travel Date</h2>
      <div className="option_container_one">
        <div
          className={`single ${
            isExactDate ? 'option_container_one_picked' : ''
          }`}
          onClick={() => {
            toggleExactDate(true);
          }}
        >
          <img src="/icons/form/calendar.svg" alt="Form Step 1" />
          <p>Exact Date</p>
        </div>
        <div
          className={`group ${
            !isExactDate ? 'option_container_one_picked' : ''
          }`}
          onClick={() => {
            toggleExactDate(false);
            // formik.setFieldValue('dateForm.travelDate', null);
          }}
        >
          <img src="/icons/form/calendar.svg" alt="Form Step 1" />
          <p>Decide Later</p>
        </div>
      </div>

      <div className="date_form_container">
        <div>
          {isExactDate ? (
            <>
              <div className="parent_wrapper">
                <div className="date_field_wrapper">
                  <label htmlFor="">Departure Date:</label>
                  <Field
                    name="departure_date"
                    type="date"
                    onChange={(e: any) => {
                      formik.setFieldValue(
                        'dateForm.travelDate',
                        e.target.value
                      );
                    }}
                    value={`${formik.values.dateForm.travelDate?.getFullYear()}-${formik.values.dateForm.travelDate?.getMonth().toString().padStart(2, '0')}-${formik.values.dateForm.travelDate?.getDate()}`}
                  ></Field>
                  <p>
                    <ErrorMessage name="departure_date" />
                  </p>
                </div>
              </div>
            </>
          ) : null}
          <br />
          <button
            className="action-button single_button"
            type="button"
            onClick={() => setPickedStep(2)}
          >
            NEXT
          </button>
        </div>
        {/* </Formik> */}
      </div>
    </div>
  );
}
