'use client';
import axiosInstance from '@/core/utils/axoisInst';
import { hazardFormSchema, HazardFormType } from '@/modules/hazard/hazardType';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { toast } from 'react-toastify';
import { toFormikValidate } from 'zod-formik-adapter';

const Forms = () => {
  async function formSubmitHandler(values: HazardFormType, resetForm: any) {
    let obj = {
      ...values,
      isContact: false,
      date: `${values.date?.getFullYear()}-${values.date?.getMonth()}-${values.date?.getDate()}`,
    };
    let res;
    try {
      res = await axiosInstance.post('/contactUs', obj);
      toast.success(
        'Your request has been submitted. Check your email or phone for verification.'
      );
    } catch (error) {
      toast.error('Error submitting form!');
      return;
    }
    resetForm();
  }
  return (
    <div>
      {' '}
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          tel: '',
          date: new Date(),
          details: '',
          isContact: false,
        }}
        validate={toFormikValidate(hazardFormSchema)}
        onSubmit={async (values, { resetForm }) => {
          formSubmitHandler(values, resetForm);
        }}
      >
        {({ setFieldValue, values }) => (
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
              {/* <Field id="date" type="date" name="date" /> */}
              {/* <input type="date" id="date" name="date" /> */}
              {/* <FormikDatePicker name="date" /> */}
              {/* <Field name="date" component={FormikDatePicker} />
               */}
              <Field name="date">
                {({ field }: { field: any }) => (
                  <input
                    type="date"
                    {...field}
                    value={
                      values.date instanceof Date
                        ? values.date.toISOString().substring(0, 10)
                        : values.date
                    }
                    onChange={(event) => {
                      setFieldValue(field.name, new Date(event.target.value));
                    }}
                  />
                )}
              </Field>
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
        )}
      </Formik>
    </div>
  );
};

export default Forms;
