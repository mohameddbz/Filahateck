import React, { useState, useContext } from 'react';
import PublicOffre from '../../../components/pages/home/offer/PublicOffert';
import { LanguageContext } from '../../../context/LanguageContext';
import { offersDataFrench, offersDataArabic } from '../../../data/home/offerData';

const PublicOffers = () => {
  const { isArabic } = useContext(LanguageContext);
  const [selectedOffer, setSelectedOffer] = useState(null);

  const handleCheckboxChange = (index) => {
    setSelectedOffer(selectedOffer === index ? null : index);
  };

  return (
    <div className="min-h-screen flex flex-col gap-6 px-4 md:px-8 lg:px-12">
      <div className="mt-8 md:mt-14 mb-4 md:mb-6 md:ml-8 lg:ml-16">
        <p className="text-xl md:text-2xl font-bold text-center md:text-left">
          {isArabic ? "يمكنك الاطلاع على عروضنا أدناه" : "Vous pouvez consulter nos offres ci-dessous"}
        </p>
      </div>
      
      <div className="flex flex-col gap-6 md:gap-10 items-center w-full">
        {isArabic
          ? offersDataArabic.map((offer, index) => (
              <div key={index} className="w-full max-w-3xl">
                <PublicOffre
                  text={offer.text}
                  titre={offer.titre}
                  description={offer.description}
                  price={offer.price}
                  isChecked={selectedOffer === index}
                  onCheckboxChange={() => handleCheckboxChange(index)}
                />
              </div>
            ))
          : offersDataFrench.map((offer, index) => (
              <div key={index} className="w-full max-w-3xl">
                <PublicOffre
                  text={offer.text}
                  titre={offer.titre}
                  description={offer.description}
                  price={offer.price}
                  isChecked={selectedOffer === index}
                  onCheckboxChange={() => handleCheckboxChange(index)}
                />
              </div>
            ))}
      </div>
    </div>
  );
};

export default PublicOffers;