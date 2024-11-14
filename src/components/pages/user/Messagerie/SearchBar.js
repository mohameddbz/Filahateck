import React from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ onSearch }) => {
  const handleInputChange = (event) => {
    onSearch(event.target.value);
  };

  return (
    <div className="flex mx-3 my-1 items-center gap-2  p-2 bg-white rounded-md shadow-md">
      <FaSearch className="text-gray-500 " />
      <input
        type="text"
        placeholder="Recherche"
        onChange={handleInputChange}
        className="flex-grow outline-none text-gray-600 bg-white"
      />
    </div>
  );
};

export default SearchBar;
