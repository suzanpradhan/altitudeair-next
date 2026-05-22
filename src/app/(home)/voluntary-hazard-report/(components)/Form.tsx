'use client';
import { useAppDispatch } from '@/core/redux/hooks';
import hazardApi from '@/modules/hazard/hazardApi';
import { hazardFormSchema, HazardFormType } from '@/modules/hazard/hazardType';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { ZodError } from 'zod';

const Forms = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const validateForm = (values: HazardFormType) => {
    try {
      hazardFormSchema.parse(values);
    } catch (error) {
      if (error instanceof ZodError) {
        console.log(error.errors);
        return error.formErrors.fieldErrors;
      }
    }
  };

  const onSubmit = async (values: HazardFormType) => {
    if (isLoading) return;
    setIsLoading(true);

    const response = await dispatch(
      hazardApi.endpoints.postHazard.initiate(values)
    );

    setIsLoading(false);

    if (response.error) {
      const errorMessage =
        (response.error as any)?.data?.message ||
        (response.error as any)?.error ||
        'Error submitting form!';
      toast.error(errorMessage);
      return;
    }

    const successMessage =
      (response.data as any)?.message || 'Message submitted successfully!';
    toast.success(successMessage);
    formik.resetForm();
  };

  const formik = useFormik<HazardFormType>({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      tel: '',
      date: new Date(),
      details: '',
      isContact: false,
    },
    validate: validateForm,
    validateOnChange: true,
    onSubmit,
  });

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit(e);
        }}
      >
        <div className="form-field">
          <label htmlFor="given-name">First Name</label>
          <input
            id="firstName"
            placeholder="First Name"
            type="text"
            {...formik.getFieldProps('firstName')}
          />
        </div>
        {!!formik.errors.firstName && (
          <div className="text-red-500 text-sm">{formik.errors.firstName}</div>
        )}
        <div className="form-field">
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            placeholder="Last Name"
            type="text"
            {...formik.getFieldProps('lastName')}
          />
        </div>
        {!!formik.errors.lastName && (
          <div className="text-red-500 text-sm">{formik.errors.lastName}</div>
        )}
        <div className="form-field">
          <label htmlFor="email" className="required">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            placeholder="Email"
            type="text"
            {...formik.getFieldProps('email')}
          />
        </div>
        {!!formik.errors.email && (
          <div className="text-red-500 text-sm">{formik.errors.email}</div>
        )}

        <div className="form-field">
          <label htmlFor="tel">Contact Number</label>
          <input
            id="tel"
            placeholder="Contact Number"
            type="text"
            {...formik.getFieldProps('tel')}
          />
        </div>
        {!!formik.errors.tel && (
          <div className="text-red-500 text-sm">{formik.errors.tel}</div>
        )}
        <div className="form-field">
          <label htmlFor="date" className="required">
            Date of Occurrence /<br /> Hazard
          </label>
          <input
            type="date"
            value={
              formik.values.date
                ? formik.values.date.toISOString().split('T')[0]
                : ''
            }
            onChange={(e) => {
              const newDate = new Date(e.target.value);
              formik.setFieldValue('date', newDate);
            }}
          />
        </div>
        {!!formik.errors.date && (
          <div className="text-red-500 text-sm">Date required</div>
        )}

        <div className="form-field">
          <label htmlFor="details" className="required">
            Details of Occurrence /<br /> Hazard
          </label>
          <textarea id="details" {...formik.getFieldProps('details')} />
        </div>
        {!!formik.errors.details && (
          <div className="text-red-500 text-sm">{formik.errors.details}</div>
        )}

        <div className="form-field">
          <div />
          <button
            className={`button-outline-light bg-red-500 text-white rounded transition duration-200 ease-in-out h-10 px-4 ${
              isLoading ? 'cursor-not-allowed opacity-60' : 'hover:bg-custom-blue hover:text-white'
            }`}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Forms;
