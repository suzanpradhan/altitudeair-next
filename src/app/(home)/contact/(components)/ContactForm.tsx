import { useAppDispatch } from '@/core/redux/hooks';
import bookingApi from '@/modules/bookings/bookingApi';
import {
  BookingDetailSchemaType,
  bookingDetailSchema,
} from '@/modules/bookings/bookingType';
import { useFormik } from 'formik';
import { useState } from 'react';
import { toFormikValidate } from 'zod-formik-adapter';

const ContactForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const onSubmit = async (values: BookingDetailSchemaType) => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    try {
      await Promise.resolve(
        dispatch(bookingApi.endpoints.createBooking.initiate(values))
      );
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const formik = useFormik<BookingDetailSchemaType>({
    enableReinitialize: true,
    initialValues: {
      slug: '',
      fullName: '',
      email: '',
      phone: '',
      requirement: '',
      noOfTravelers: 1,
      package: 1,
      departureDate: undefined,
      totalPrice: '',
    },
    validate: toFormikValidate(bookingDetailSchema),
    onSubmit,
  });
  return (
    <form onSubmit={formik.handleSubmit} className="py-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <input
            type="text"
            placeholder="Your Name"
            {...formik.getFieldProps('fullName')}
            className="w-full h-16 px-2 border border-custom-gray-light rounded placeholder:font-light outline-none focus-visible:ring-2"
          />
          {!!formik.errors.fullName && (
            <div className="text-red-500 text-sm">{formik.errors.fullName}</div>
          )}
        </div>
        <div>
          <input
            type="email"
            placeholder="eg: example@email.com"
            {...formik.getFieldProps('fullName')}
            className="w-full h-16 px-2 border border-custom-gray-light rounded placeholder:font-light outline-none focus-visible:ring-2"
          />
          {!!formik.errors.fullName && (
            <div className="text-red-500 text-sm">{formik.errors.fullName}</div>
          )}
        </div>
      </div>
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <input
            type="text"
            placeholder="Your phone number"
            {...formik.getFieldProps('lastName')}
            className="w-full h-16 px-2 border border-custom-gray-light rounded placeholder:font-light outline-none focus-visible:ring-2"
          />
          {!!formik.errors.lastName && (
            <div className="text-red-500 text-sm">{formik.errors.lastName}</div>
          )}
        </div>
        <div>
          <input
            type="text"
            placeholder="Subject"
            {...formik.getFieldProps('lastName')}
            className="w-full h-16 px-2 border border-custom-gray-light rounded placeholder:font-light outline-none focus-visible:ring-2"
          />
          {!!formik.errors.lastName && (
            <div className="text-red-500 text-sm">{formik.errors.lastName}</div>
          )}
        </div>
      </div> */}
      <div className="mb-4">
        <textarea
          className="w-full p-2 border border-custom-gray-light rounded outline-none focus-visible:ring-2"
          rows={5}
          placeholder="Type your message here"
          {...formik.getFieldProps('requirement')}
        ></textarea>
        {!!formik.errors.requirement && (
          <div className="text-red-500 text-sm">
            {formik.errors.requirement}
          </div>
        )}
      </div>
      <button
        type="submit"
        className={`text-white font-bold bg-custom-blue hover:bg-opacity-95 hover:shadow-lg h-16 px-10 rounded`}
      >
        Send Message
      </button>
    </form>
  );
};

export default ContactForm;
