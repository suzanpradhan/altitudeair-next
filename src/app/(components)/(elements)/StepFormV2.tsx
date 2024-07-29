import { useAppDispatch } from '@/core/redux/hooks';
import enquiryApi from '@/modules/enquiry/enquiryApi';
import {
  enquirySchema,
  EnquirySchemaType,
} from '@/modules/enquiry/enquiryTypes';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import { ZodError } from 'zod';
import BudgetRange from './BudgetRange';
import Destination from './Destination';
import PeopleCount from './PeopleCount';
import PersonalInfo from './PersonalInfo';
import StepsContainer from './StepsContainer';
import TravelDate from './TravelDate';

export interface FillStateType {
  peopleCount: boolean;
  travelDate: boolean;
  destination: boolean;
  budget: boolean;
  personalInfo: boolean;
}

const StepFormV2 = () => {
  const initialValues: EnquirySchemaType = {
    countForm: {
      count: 1,
    },
    dateForm: {
      travelDate: new Date(),
    },
    destinationForm: {
      currentLatitude: '',
      currentLongitude: '',
      destinationLatitude: '',
      destinationLongitude: '',
      service: '',
    },
    budgetForm: {
      maxbudget: 0,
      minbudget: 0,
    },
    infosForm: {
      firstName: '',
      lastName: '',
      email: '',
      details: '',
      phone: '',
    },
  };

  const [pickedStep, setPickedStep] = useState(0);
  const dispatch = useAppDispatch();

  const formSubmitHandler = (values: EnquirySchemaType) => {
    const submitresponse = dispatch(
      enquiryApi.endpoints.postEnquiry.initiate(values)
    );
    submitresponse
      ?.then((res) => {
        const errorMessage = (res as any).error;
        if (errorMessage) {
          // toast.error(`Error: Please enter all required value`);
          throw errorMessage;
        }
        // toast.success('Successfully updated');
        //   cardAction === 'create' &&
        //     router.push(`/dashboard/builder/?cardId=${cardId}&action=update`);
        //   togglePublishLoading(false);
      })
      .catch((err) => {
        // toast.error('Something went wrong');
        //   togglePublishLoading(false);
        throw err;
      });
  };

  const validateForm = (values: EnquirySchemaType) => {
    try {
      enquirySchema.parse(values);
    } catch (error) {
      if (error instanceof ZodError) {
        return error.formErrors.fieldErrors;
      }
    }
  };

  return (
    <div className="step_form_container">
      <StepsContainer
        pickedStep={pickedStep}
        setPickedStep={setPickedStep}
        // filledState={filledState}
        // setFilledState={setFilledState}
        // removeCompleted={removeCompleted}
      />
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          formSubmitHandler(values);
        }}
        validate={validateForm}
        validateOnChange
        // validationSchema={enquirySchema}
      >
        {(formik) => {
          return (
            <Form>
              {pickedStep === 0 ? (
                <PeopleCount formik={formik} setPickedStep={setPickedStep} />
              ) : null}
              {pickedStep === 1 ? (
                <TravelDate formik={formik} setPickedStep={setPickedStep} />
              ) : null}
              {pickedStep === 2 ? (
                <Destination formik={formik} setPickedStep={setPickedStep} />
              ) : null}
              {pickedStep === 3 ? (
                <BudgetRange formik={formik} setPickedStep={setPickedStep} />
              ) : null}
              {pickedStep === 4 ? (
                <PersonalInfo
                  formik={formik}
                  setPickedStep={setPickedStep}
                  formSubmitHandler={formSubmitHandler}
                />
              ) : null}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default StepFormV2;
