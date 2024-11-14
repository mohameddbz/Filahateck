import React, { useContext } from 'react';
import ProductForm from '../../components/pages/user/ProductSubmission/ProductForm';
import ProductGallery from '../../components/pages/user/MarketPlace/ProductGallery';
import { products } from "./../../data/user/productList";
import {translations} from './../../utils/constant/ProductSubmission'
import { LanguageContext } from './../../context/LanguageContext';


const ProductSubmission = () => {
  const { isArabic } = useContext(LanguageContext);
  const lang = isArabic ? 'arabic' : 'french';
  const texts = translations[lang];

  return (
      <div className="flex-grow p-6 mt-4" >
        <div className="mb-6 pl-6 space-y-1" style={{ direction: isArabic ? 'rtl' : 'ltr' }}>
          <p className="text-xl font-semibold mt-8">{texts.addProductTitle}</p>
          <p>{texts.addProductInstruction}</p>
        </div>
        <ProductForm />
        <div className="mb-6 pl-6 space-y-1" style={{ direction: isArabic ? 'rtl' : 'ltr' }}>
          <p className="text-xl font-semibold mt-8">{texts.viewPublishedTitle}</p>
        </div>
        <ProductGallery products={products} />
      </div>
  );
};

export default ProductSubmission;
