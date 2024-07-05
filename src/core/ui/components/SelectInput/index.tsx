import { useEffect, useRef, useState } from 'react';

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  onChange: (selectedOption: Option) => void;
}

const SelectInput: React.FC<CustomSelectProps> = ({ options, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const selectRef = useRef<HTMLDivElement>(null);

  const handleSelectClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    onChange(option);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      selectRef.current &&
      !selectRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div ref={selectRef} onClick={handleSelectClick}>
      <p className="text-xs sm:text-base text-custom-blue capitalize font-normal">
        Travelers
      </p>
      <p className="text-sm sm:text-xl text-custom-blue capitalize font-bold">
        {selectedOption ? selectedOption.label : 'Select'}
      </p>

      <div
        className={`origin-bottom-right absolute right-0 left-0 top-0 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none ${isOpen ? '' : 'hidden'}`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabIndex={-1}
      >
        <div className="px-2 bg-custom-gray" role="none">
          <p className="text-base px-4 pt-3">Options</p>
          <div className="max-h-60 overflow-y-auto">
            {options.map((option) => (
              <p
                key={option.value}
                className="text-custom-blue text-lg font-medium px-4 py-2 bg-custom-gray"
                // role="menuitem"
                tabIndex={-1}
                onClick={() => handleOptionClick(option)}
              >
                {option.label}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectInput;
