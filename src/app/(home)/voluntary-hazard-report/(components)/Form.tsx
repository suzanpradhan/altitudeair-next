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
      firstName: null,
      lastName: null,
      email: null,
      tel: null,
      date: null,
      details: null,
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
          <label htmlFor="email">Email</label>
          <input
            id="email"
            placeholder="Email"
            type="text"
            value={formik.values.email ?? ''}
            onChange={(e) => formik.setFieldValue('email', e.target.value || null)}
            onBlur={formik.handleBlur}
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
            value={formik.values.tel ?? ''}
            onChange={(e) => formik.setFieldValue('tel', e.target.value || null)}
            onBlur={formik.handleBlur}
          />
        </div>
        {!!formik.errors.tel && (
          <div className="text-red-500 text-sm">{formik.errors.tel}</div>
        )}
        <div className="form-field">
          <label htmlFor="date">Date of Occurrence /<br /> Hazard</label>
          <input
            type="date"
            value={formik.values.date ? formik.values.date.toISOString().split('T')[0] : ''}
            onChange={(e) => {
              const value = e.target.value;
              formik.setFieldValue('date', value ? new Date(value) : null);
            }}
          />
        </div>
        {!!formik.errors.date && (
          <div className="text-red-500 text-sm">{formik.errors.date}</div>
        )}

        <div className="form-field">
          <label htmlFor="details">Details of Occurrence /<br /> Hazard</label>
          <textarea
            id="details"
            value={formik.values.details ?? ''}
            onChange={(e) => formik.setFieldValue('details', e.target.value || null)}
            onBlur={formik.handleBlur}
          />
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
