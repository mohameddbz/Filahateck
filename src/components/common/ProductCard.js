import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';

const ProductCard = (product) => (
  <div className="bg-white hover:scale-105 transition duration-300 rounded-xl shadow-xl drop-shadow-xl overflow-hidden flex flex-col h-full">
    {/* Conteneur d'image avec hauteur adaptative */}
    <div className="w-full h-40 sm:h-48 md:h-56 lg:h-64 overflow-hidden">
      <img 
        src={`${process.env.REACT_APP_API_URL}${process.env.REACT_APP_BACK_END_STATIC_FOLDER}${process.env.REACT_APP_PUBLICATIONS_FOLDER}${product.images[0].imagePath}`} 
        alt={product.nomProduit} 
        className="object-cover w-full h-full"
      />
    </div>

    {/* Contenu textuel */}
    <div className="p-2 bg-myGrayy flex flex-col items-center flex-grow">
      <h4 className="font-bold text-sm sm:text-base md:text-lg lg:text-xl text-center text-gray-800 line-clamp-1">{product.nomProduit}</h4>
      <p className="text-myRed text-sm sm:text-base font-semibold">{product.prixUnitaire} DZ</p>
      <div className="flex items-center text-black text-xs sm:text-sm my-1 sm:my-2">
        <FaMapMarkerAlt className="mr-1 flex-shrink-0" />
        <span className="truncate max-w-full">{product.addresse}</span>
      </div>
      <button className="flex items-center bg-myGreen text-white py-1 px-2 rounded-lg text-xs sm:text-sm">
        <FaPhoneAlt className="mr-1 flex-shrink-0" />
        <span className="truncate">{product.phoneNumber}</span>
      </button>
    </div>
  </div>
);

export default ProductCard;