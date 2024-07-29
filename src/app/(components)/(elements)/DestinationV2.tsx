import { EnquirySchemaType } from '@/modules/enquiry/enquiryTypes';
import { FormikProps } from 'formik';
import { Dispatch, SetStateAction } from 'react';

const DestinationV2 = ({
  formik,
  setPickedStep,
}: {
  formik: FormikProps<EnquirySchemaType>;
  setPickedStep: Dispatch<SetStateAction<number>>;
}) => {
  return <div>destination</div>;
};

export default DestinationV2;
