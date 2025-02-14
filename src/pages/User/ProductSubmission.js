import React, { useContext, useEffect } from 'react';
import ProductForm from '../../components/pages/user/ProductSubmission/ProductForm';
import ProductUserGallery from '../../components/pages/user/ProductSubmission/ProductUserGallery';
import { products } from "./../../data/user/productList";
import {translations} from './../../utils/constant/ProductSubmission'
import { LanguageContext } from './../../context/LanguageContext';
import { useState } from 'react';
import { makeRequest } from '../../utils/api/httpService';
import Loading from '../../components/common/Loading';
import Error from '../../components/common/Error';


const ProductSubmission = () => {
  const { isArabic } = useContext(LanguageContext);
  const lang = isArabic ? 'arabic' : 'french';
  const texts = translations[lang];

  const [publication,setPublication] = useState([]);
  const [isLoading,setIsLoading] = useState(true);
  const [error,setError] = useState(false);




  useEffect(() => {
     const fetchData = async () => {
      try {
         const response = await makeRequest('/publications/my-publications', 'GET');
          if (response.status === 200 ) {
            setPublication(response.data);
            console.log('response',response.data);
          }
         
         setIsLoading(false);

      } catch (error) {
        setIsLoading(false);
        setError(true);
        console.error('Erreur lors de recupuration des données ', error);
      }
     } 
     fetchData();
  },[]);

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
        { isLoading && <Loading /> }
        { !isLoading &&  <ProductUserGallery products={publication} /> }
        { error && <Error message="Erreur lors de recupuration des publications" onClose={() => setError(false)} /> }
      </div>
  );
};

export default ProductSubmission;
