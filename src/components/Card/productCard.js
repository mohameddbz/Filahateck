// ProductCard.js
import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';

const ProductCard = ({ image, title, price, location, phone }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <img src={image} alt={title} className="w-full h-50 object-cover" />
    <div className="p-2 bg-gray-300 flex flex-col items-center">
      <h4 className="font-semibold text-xl text-gray-800">{title}</h4>
      <p className="text-red-600 text-base font-bold">{price} DZ</p>
      <div className="flex items-center text-gray-500 text-base my-2">
        <FaMapMarkerAlt />
        <span>{location}</span>
      </div>
      <button className="flex items-center bg-green-600 text-white py-1 px-2 rounded-full">
        <FaPhoneAlt className="mr-1" />
        {phone}
      </button>
    </div>
  </div>
);

export default ProductCard;
