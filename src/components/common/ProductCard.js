import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';

const ProductCard = (product) => (
  <div className="bg-white hover:scale-105 transition duration-300 rounded-xl  shadow-xl drop-shadow-xl overflow-hidden flex flex-col h-full">
    {/* Conteneur d'image avec hauteur fixe */}
    <div className="w-full h-64 overflow-hidden"> {/* Hauteur fixe de 16rem (h-64) */}
      <img 
        src={`${process.env.REACT_APP_API_URL}${process.env.REACT_APP_BACK_END_STATIC_FOLDER}${process.env.REACT_APP_PUBLICATIONS_FOLDER}${product.images[0].imagePath}`} 
        alt={product.nomProduit} 
        className="object-cover w-full h-full" /* object-cover pour remplir l'espace */
      />
    </div>

    {/* Contenu textuel */}
    <div className="p-2 bg-myGrayy flex flex-col items-center flex-grow">
      <h4 className="font-bold text-xl text-center text-gray-800">{product.nomProduit}</h4>
      <p className="text-myRed text-base font-semibold">{product.prixUnitaire} DZ</p>
      <div className="flex items-center text-black text-base my-2">
        <FaMapMarkerAlt />
        <span>{product.addresse}</span>
      </div>
      <button className="flex items-center bg-myGreen text-white py-1 px-2 rounded-lg">
        <FaPhoneAlt className="mr-1" />
        {product.phoneNumber}
      </button>
    </div>
  </div>
);

export default ProductCard;