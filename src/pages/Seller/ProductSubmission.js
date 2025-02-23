import React, { useContext, useEffect } from 'react';
import ProductForm from '../../components/pages/user/ProductSubmission/ProductForm';
import ProductUserGallery from '../../components/pages/user/ProductSubmission/ProductUserGallery';
import {translations} from './../../utils/constant/ProductSubmission'
import { LanguageContext } from './../../context/LanguageContext';
import { useState } from 'react';
import { makeRequest } from '../../utils/api/httpService';
import Loading from '../../components/common/Loading';
import Error from '../../components/common/Error';
import SubscriptionMessage from '../../components/common/SubscriptionMessage';
import { text } from 'd3';

// j'ai dupliqué la page par que je pens qu'il ya des changement 
// mchi kima argeculteur remise w bezef 3feyes


const ProductSubmissionSeller = () => {
  const { isArabic } = useContext(LanguageContext);
  const lang = isArabic ? 'arabic' : 'french';
  const texts = translations[lang];

  const [publication,setPublication] = useState([]);
  const [isLoading,setIsLoading] = useState(true);
  const [error,setError] = useState(false);
  const [hasActiveSubscription,setHasActiveSubscription] = useState(false);
  const [isAbonnementLoading,setIsAbonnementLoading] = useState(true);
  const [abonement,setAbonement] = useState([]);
 useEffect(() => {
    const fetchAbonnement = async () => {
     try {
        const response = await makeRequest('/sellerAbonnementUser/current', 'GET');
         if (response.status === 200 ) {
           setPublication(response.data);
          if(response.data.hasActiveSubscription){
            setHasActiveSubscription(true);
            setAbonement(response.data.data);
            console.log('abonnement',response.data.data);
          }else{
            setHasActiveSubscription(false);
          }
         }
         console.log(response.data);
        
        setIsAbonnementLoading(false);

     } catch (error) {
       setIsAbonnementLoading(false);
       setError(true);
       console.error('Erreur lors de recupuration des données d abonnement ', error);
     }
    } 
    fetchAbonnement();
 },[1]);

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
     {
        isAbonnementLoading && <Loading />
     }  
     {
        !isAbonnementLoading && hasActiveSubscription && <ProductForm isAgreculteur={false} hasAbonnement={hasActiveSubscription} abonnement={abonement} />
     }
     {!hasActiveSubscription && <SubscriptionMessage noSubscriptionTitle={texts.noSubscriptionTitle} noSubscriptionMessage={texts.noSubscriptionMessage} subscribeNow={texts.subscribeNow} linkToSubscription={"hahaha"} />}
        <div className="mb-6 pl-6 space-y-1" style={{ direction: isArabic ? 'rtl' : 'ltr' }}>
          <p className="text-xl font-semibold mt-8">{texts.viewPublishedTitle}</p>
        </div>
        { isLoading && <Loading /> }
        { !isLoading && publication &&  <ProductUserGallery products={publication} /> }
        { error && <Error message="Erreur lors de recupuration des publications" onClose={() => setError(false)} /> }
      </div>
  );
};

export default ProductSubmissionSeller;
