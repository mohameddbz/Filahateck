import React, { useContext } from 'react';
import { FaSearch, FaFilter } from 'react-icons/fa';
import { LanguageContext } from './../../../../context/LanguageContext';

const SearchBar = ({ onSearch }) => {
  const { isArabic } = useContext(LanguageContext);

  // Define translations within the same file
  const translations = {
    arabic: {
      placeholder: 'البحث بالاسم',
    },
    french: {
      placeholder: 'Rechercher par nom',
    },
  };

  // Determine the current language and placeholder text
  const lang = isArabic ? 'arabic' : 'french';
  const placeholderText = translations[lang].placeholder;

  const handleInputChange = (event) => {
    onSearch(event.target.value);
  };

  return (
    <div
      className="flex mb-2 items-center w-2/3 p-4 bg-gray-100 rounded-md shadow-md"
      style={{ direction: isArabic ? 'rtl' : 'ltr' }}
    >
      <FaSearch className="text-gray-500 mr-2" />
      <input
        type="text"
        placeholder={placeholderText}
        onChange={handleInputChange}
        className="flex-grow outline-none text-gray-600 bg-gray-100"
      />
      <FaFilter className="text-gray-500 ml-2 cursor-pointer" />
    </div>
  );
};

export default SearchBar;
