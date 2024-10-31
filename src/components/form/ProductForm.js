import React from 'react';
import FormInput from './FormInput';
import ImageUpload from '../ImageUpload/ImageUpload';

const ProductForm = () => (
  <div className="bg-gray-100 p-6 rounded-md shadow-lg max-w-5xl mx-auto flex flex-col items-center">
    <h3 className="text-xl font-bold text-orange-500 mb-4 text-center">Informations générales sur le produit</h3>
    <form className="space-y-4 w-full flex flex-col items-center">
      <div className=' space-y-4 w-5/6'>
        <FormInput label="Nom du produit" />
        <FormInput label="Quantité" />
        <FormInput label="Prix en DZ" />
        <FormInput label="Localisation" />
        <FormInput label="Téléphone" />
      </div>
      <ImageUpload/>
      <button type="submit" className="w-1/4 bg-orange-500 text-white py-2 rounded mt-4">Publier</button>
    </form>
  </div>
);

export default ProductForm;


