'use client';
import { useState } from 'react';

export default function Enquiry({ children }: { children: React.ReactNode }) {
  const [opened, setOpened] = useState(false);

  const openHandler = () => {
    setOpened((prevState) => {
      return !prevState;
    });
  };

  return (
    <>
      <div
        className={!opened ? 'enquiry_wrapper' : 'enquiry_wrapper open-util'}
      >
        <div className="enquiry" onClick={openHandler}>
          <h5>ENQUIRY</h5>
        </div>
        {children}
      </div>
    </>
  );
}
