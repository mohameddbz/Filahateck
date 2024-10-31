import React from 'react';
import { FaSearch, FaFilter } from 'react-icons/fa';

const SearchBar = ({ onSearch }) => {
  const handleInputChange = (event) => {
    onSearch(event.target.value);
  };

  return (
    <div className="flex mb-2 items-center w-2/3 p-4 bg-gray-100 rounded-md shadow-md">
      <FaSearch className="text-gray-500 mr-2" />
      <input
        type="text"
        placeholder="Rechercher par nom"
        onChange={handleInputChange}
        className="flex-grow outline-none text-gray-600 bg-gray-100"
      />
      <FaFilter className="text-gray-500 ml-2 cursor-pointer" />
    </div>
  );
};

export default SearchBar;
