import { EnquirySchemaType } from '@/modules/enquiry/enquiryTypes';
import { ErrorMessage, Field, FormikProps } from 'formik';
import { Dispatch, SetStateAction } from 'react';

export default function BudgetRange({
  formik,
  setPickedStep,
}: {
  formik: FormikProps<EnquirySchemaType>;
  setPickedStep: Dispatch<SetStateAction<number>>;
}) {
  console.log(formik.values.budgetForm);
  return (
    <div className="budget_step_section">
      <h2>What about your budget?</h2>
      <p>Your Budget Range:</p>
      <div className="input_wrapper">
        <div>
          <div className="parent_wrapper">
            <div className="budget_field_wrapper">
              <label htmlFor="budgetForm.minbudget">Minimum Budget:</label>
              <Field
                id="budgetForm.minbudget"
                name="budgetForm.minbudget"
                type="number"
                min={0}
                max={1500000}
                onChange={(e: any) => {
                  formik.setFieldValue('budgetForm.minbudget', e.target.value);
                }}
                value={formik.values.budgetForm.minbudget}
              ></Field>
              <p>
                <ErrorMessage name="budgetForm.minbudget" />
              </p>
            </div>

            <div className="budget_field_wrapper">
              <label htmlFor="budgetForm.maxbudget">Maximum Budget:</label>
              <Field
                id="budgetForm.maxbudget"
                name="budgetForm.maxbudget"
                type="number"
                min={0}
                max={150000}
                onChange={(e: any) => {
                  formik.setFieldValue('budgetForm.maxbudget', e.target.value);
                }}
                value={formik.values.budgetForm.maxbudget}
              ></Field>
              <p>
                <ErrorMessage name="max_budget" />
              </p>
            </div>
          </div>
          <br />
          <button
            className="action-button single_button"
            type="button"
            onClick={() => {
              if (
                formik.values.budgetForm.maxbudget <=
                formik.values.budgetForm.minbudget
              ) {
                console.log(
                  'codition check',
                  formik.values.budgetForm.maxbudget <=
                    formik.values.budgetForm.minbudget,
                  formik.values.budgetForm.maxbudget,
                  formik.values.budgetForm.minbudget
                );
                alert('Invalid values entered');
              } else {
                setPickedStep(4);
              }
            }}
          >
            NEXT
          </button>
        </div>
      </div>
    </div>
  );
}
