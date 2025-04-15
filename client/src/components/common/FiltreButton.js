
import React, { useState } from 'react';

const FilterButton = ({ text , options = [], onSelect }) => { // Default options to empty array
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="bg-myYellow text-white text-lg px-4 py-2 rounded shadow flex items-center space-x-2"
      >
        <span>{text}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 5h18M3 12h18m-7 7h7"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 bg-white rounded shadow-lg z-10">
          <ul className="py-1">
            {options.map((option) => (
              <li key={option} className="hover:bg-SidebarColor">
                <button
                  onClick={() => {
                    onSelect(option);
                    setIsOpen(false); // Close dropdown after selection
                  }}
                  className="block px-4 py-2 text-sm text-black w-full text-left"
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FilterButton;
