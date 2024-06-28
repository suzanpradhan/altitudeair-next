import { Hex } from 'iconsax-react';
import { useState } from 'react';
import { classNames } from '.';

export default function EventAction() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center rounded-full p-1.5 text-gray-500 hover:text-gray-600"
      >
        <span className="sr-only">Open options</span>
        <Hex size="32" color="#FF8A65" variant="Bulk" />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 origin-top-right bg-white rounded-md shadow-lg w-36 ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <a
              href="#"
              className={classNames(
                'block px-4 py-2 text-sm',
                'bg-gray-100 text-gray-900'
              )}
            >
              Edit
            </a>
            <a
              href="#"
              className={classNames(
                'block px-4 py-2 text-sm',
                'bg-gray-100 text-gray-900'
              )}
            >
              Cancel
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
