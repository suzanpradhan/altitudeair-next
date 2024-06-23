'use client';

import { Value } from '@/core/types/appTypes';
import DatePicker, { DatePickerProps } from 'react-date-picker';
import './style.css';

type AdditionalDateSelectorProps = {
  id: string;
  className: string;
  isOpen: boolean;
  handleOnChange?: ((value: Date) => void) | undefined;
  onCalendarClose: () => void;
};

export type DateSelectorProps = DatePickerProps & AdditionalDateSelectorProps;

const DateSelector = ({
  id,
  handleOnChange,
  className,
  onCalendarClose,
  isOpen,
  ...props
}: DateSelectorProps) => (
  <DatePicker
    id={id}
    onChange={(value: Value) => {
      if (handleOnChange && value) {
        handleOnChange(value as Date);
      }
    }}
    onCalendarClose={onCalendarClose}
    isOpen={isOpen}
    className={`pl-1 h-11 border bg-white outline-none ${className}`}
    {...props}
  />
);

export default DateSelector;
