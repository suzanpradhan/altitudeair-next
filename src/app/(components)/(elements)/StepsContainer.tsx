import { Dispatch, SetStateAction } from 'react';

const stepsDetails = [
  { iconUrl: '/icons/form/group.svg' },
  { iconUrl: '/icons/form/calendar.svg' },
  { iconUrl: '/icons/form/placeholder.svg' },
  { iconUrl: '/icons/form/money.svg' },
  { iconUrl: '/icons/form/user.svg' },
];

export default function StepsContainer({
  pickedStep,
  setPickedStep,
  //   filledState,
  //   setFilledState,
  //   removeCompleted,
}: {
  pickedStep: number;
  setPickedStep: Dispatch<SetStateAction<number>>;
  //   filledState: any;
  //   setFilledState: Dispatch<SetStateAction<FillStateType>>;
  //   removeCompleted: (index: any) => void;
}) {
  //   const pickLowerStep = (step: any) => {
  //     if (step >= pickedStep) {
  //       return;
  //     }
  //     removeCompleted(step);
  //     setPickedStep(step);
  //   };

  return (
    <ul className="steps_container_ul">
      {stepsDetails.map((item, index) => (
        <li
          key={index}
          className={`steps_container_li 
          ${pickedStep > index ? 'li_after_filled' : 'li_after_not_filled'}
          ${pickedStep === index ? 'li_picked' : ''}
          `}
          onClick={() => {
            setPickedStep((prevState) =>
              index < pickedStep ? index : prevState
            );
          }}
        >
          <img src={item.iconUrl} alt="Form Step 1" />
        </li>
      ))}
      {/* <li
        className={`steps_container_li 
          ${filledState.travelDate ? 'li_after_filled' : 'li_after_not_filled'}
          ${pickedStep === 1 ? 'li_picked' : ''}
          `}
        onClick={() => {
          pickLowerStep(1);
          setFilledState((prevState) => {
            return {
              ...prevState,
              travelDate: false,
            };
          });
        }}
      >
        <img src="/icons/form/calendar.svg" alt="Form Step 1" />
      </li>

      <li
        className={`steps_container_li 
          ${filledState.destination ? 'li_after_filled' : 'li_after_not_filled'}
          ${pickedStep === 2 ? 'li_picked' : ''}
          `}
        onClick={() => {
          pickLowerStep(2);
        }}
      >
        <img src="/icons/form/placeholder.svg" alt="Form Step 1" />
      </li>

      <li
        className={`steps_container_li 
          ${filledState.budget ? 'li_after_filled' : 'li_after_not_filled'}
          ${pickedStep === 3 ? 'li_picked' : ''}
          `}
        onClick={() => {
          pickLowerStep(3);
        }}
      >
        <img src="/icons/form/money.svg" alt="Form Step 1" />
      </li>

      <li
        className={`steps_container_li 
          ${filledState.personalInfo ? 'li_after_filled' : 'li_after_not_filled'}
          ${pickedStep === 4 ? 'li_picked' : ''}
          `}
        onClick={() => {
          pickLowerStep(4);
        }}
      >
        <img src="/icons/form/user.svg" alt="Form Step 1" />
      </li> */}
    </ul>
  );
}
