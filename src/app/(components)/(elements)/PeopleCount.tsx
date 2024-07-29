import { EnquirySchemaType } from '@/modules/enquiry/enquiryTypes';
import { Field, FormikProps } from 'formik';
import { Dispatch, SetStateAction } from 'react';

export default function PeopleCount({
  formik,
  setPickedStep,
}: {
  formik: FormikProps<EnquirySchemaType>;
  setPickedStep: Dispatch<SetStateAction<number>>;
}) {
  return (
    <div className="people_count_container">
      <h2>Number of people travelling</h2>
      <div className="option_container_one mt-4">
        <div
          className={`single ${
            formik.values.countForm.count === 1
              ? 'option_container_one_picked'
              : ''
          }`}
          onClick={() => {
            // setCount(1);
            formik.setFieldValue('countForm.count', 1);
            // formik.setFormikState((prevState) => prevState)
          }}
        >
          <img src="/icons/form/user.svg" alt="Form Step 1" />
          <p>Single</p>
        </div>
        <div
          className={`group ${
            formik.values.countForm.count > 1
              ? 'option_container_one_picked'
              : ''
          }`}
          onClick={() => {
            formik.setFieldValue('countForm.count', 2);
            console.log(
              'formik.values.countForm.count',
              formik.values.countForm.count
            );
          }}
        >
          <img src="/icons/form/user.svg" alt="Form Step 1" />
          <p>Group</p>
        </div>
      </div>
      <div className="form_container">
        <div>
          {formik.values.countForm.count >= 2 ? (
            <>
              <label htmlFor="">Traveller count:</label>
              <Field name="traveller_count" as="select">
                <option value="2">2 Person</option>
                <option value="3">3 Person</option>
                <option value="4">4 Person</option>
                <option value="5">5 Person</option>
                <option value="6">5+ Person</option>
              </Field>
            </>
          ) : (
            <div className="input_wrapper">
              <Field name="traveller_count" type="text" />
            </div>
          )}
          <br />
          <button
            className="action-button single_button"
            type="button"
            onClick={() => setPickedStep(1)}
          >
            NEXT
          </button>
        </div>
      </div>
    </div>
  );
}
