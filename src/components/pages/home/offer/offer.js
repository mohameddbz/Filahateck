import React, { useContext, useRef, useEffect, useState } from 'react';
import { LanguageContext } from './../../../../context/LanguageContext';

const Offre = ({ text, titre, functionalities, price, isChecked, onCheckboxChange }) => {
  const { isArabic } = useContext(LanguageContext);
  const textDirection = isArabic ? { direction: 'rtl' } : { direction: 'ltr' };

  const containerRef = useRef(null);
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        setContainerHeight(containerRef.current.offsetHeight);
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  return (
    <div className="bg-gray-200 rounded-3xl w-[90%] mb-6" ref={containerRef}>
      <div className="flex flex-col md:flex-row items-start relative">
        {/* Mobile version of the left badge */}
        <div className="md:hidden bg-myGreen w-full h-24 rounded-t-3xl flex items-center justify-center text-white font-bold text-center p-2">
          <p>{text}</p>
        </div>

        {/* Desktop version of the left badge */}
        <div
          className="hidden md:flex w-32 items-center justify-center text-white font-bold relative z-10"
          style={{ height: containerHeight > 0 ? `${containerHeight}px` : 'auto' }}
        >
          <div
            className="absolute left-0 top-0 bg-myGreen rounded-tl-3xl rounded-bl-3xl clip-path-polygon"
            style={{ width: '100%', height: '100%' }}
          ></div>
          <div className="w-24 text-center relative z-10 px-2">
            <p>{text}</p>
          </div>
        </div>

        {/* Middle section with title + functionalities */}
        <div className="flex-1 p-4 md:ml-4 w-full">
          <h2 className="text-myOrange-50 font-bold text-lg md:text-xl text-center md:text-left">{titre}</h2>
          <ul className="list-disc ml-4 md:ml-6 mt-2 text-sm md:text-base">
            {functionalities && functionalities.map((func, index) => (
              <li key={func.id || index}>{func.name}</li>
            ))}
          </ul>
        </div>

        {/* Price and checkbox */}
        <div className="flex items-center justify-center gap-4 p-4 w-full md:w-auto">
          <div className="bg-myYellow w-full md:w-32 h-10 rounded-lg flex items-center justify-center text-red-600">
            <p>{price} DA</p>
          </div>
          <div className="ml-2">
            <input 
              type="checkbox" 
              className="w-6 h-6 border-SidebarColor rounded" 
              checked={isChecked} 
              onChange={onCheckboxChange} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offre;
