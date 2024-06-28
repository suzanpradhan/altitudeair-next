'use client';
import { useState } from 'react';

const CalenderPage = () => {
  const [isOpen, toggleOpen] = useState(true);
  return (
    <div className="h-[1000px] w-full bg-slate-300 flex items-center justify-center">
      {/* <CalenderPicker /> */}
    </div>
  );
};

export default CalenderPage;
