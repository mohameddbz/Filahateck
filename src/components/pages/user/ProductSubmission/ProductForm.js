import React, { useContext } from 'react';
import FormInput from './../../../ui/FormInput';
import ImageUpload from './ImageUpload';
import { LanguageContext } from './../../../../context/LanguageContext';
import {translations} from './../../../../utils/constant/ProductForm'

const ProductForm = () => {
  const { isArabic } = useContext(LanguageContext);
  const lang = isArabic ? 'arabic' : 'french';
  const texts = translations[lang];

  return (
    <div className="bg-gray-100 p-6 rounded-md shadow-lg max-w-5xl mx-auto flex flex-col items-center" style={{ direction: isArabic ? 'rtl' : 'ltr' }}>
      <h3 className="text-xl font-bold text-orange-500 mb-4 text-center">{texts.title}</h3>
      <form className="space-y-4 w-full flex flex-col items-center">
        <div className="space-y-4 w-5/6">
          <FormInput label={texts.productName} />
          <FormInput label={texts.quantity} />
          <FormInput label={texts.price} />
          <FormInput label={texts.location} />
          <FormInput label={texts.phone} />
        </div>
        <ImageUpload />
        <button type="submit" className="w-1/4 bg-orange-500 text-white py-2 rounded mt-4">{texts.submitButton}</button>
      </form>
    </div>
  );
};

export default ProductForm;
