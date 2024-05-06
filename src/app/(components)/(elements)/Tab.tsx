import React, { useState } from 'react';

/* eslint-disable @next/next/no-img-element */
interface TabProps {
  selectedHandler: (position: number) => void;
}

const Tab: React.FC<TabProps> = ({ selectedHandler }) => {
  const [active, setActive] = useState<number>(0);

  const setActiveHandler = (position: number) => {
    setActive(position);
    selectedHandler(position);
  };

  return (
    <div className="tab_wrapper">
      <div
        className={`clickable ${active === 0 ? 'tab_clicked' : 'tab_deactive'}`}
        onClick={() => {
          setActiveHandler(0);
        }}
      >
        <img src="./images/icons/ring.svg" alt="List Decorator" />
      </div>
      <div
        className={`clickable ${active === 1 ? 'tab_clicked' : 'tab_deactive'}`}
        onClick={() => {
          setActiveHandler(1);
        }}
      >
        <img src="./images/icons/ring.svg" alt="List Decorator" />
      </div>
      <div
        className={`clickable ${active === 2 ? 'tab_clicked' : 'tab_deactive'}`}
        onClick={() => {
          setActiveHandler(2);
        }}
      >
        <img src="./images/icons/ring.svg" alt="List Decorator" />
      </div>
      <div
        className={`clickable ${active === 3 ? 'tab_clicked' : 'tab_deactive'}`}
        onClick={() => {
          setActiveHandler(3);
        }}
      >
        <img src="./images/icons/ring.svg" alt="List Decorator" />
      </div>
      <div
        className={`clickable ${active === 4 ? 'tab_clicked' : 'tab_deactive'}`}
        onClick={() => {
          setActiveHandler(4);
        }}
      >
        <img src="./images/icons/ring.svg" alt="List Decorator" />
      </div>
      <div className="line" />
    </div>
  );
};

export default Tab;
