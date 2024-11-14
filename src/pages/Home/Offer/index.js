import React, { useState, useContext } from 'react';
import Offre from '../../../components/pages/home/offer/offer';
import { offersDataFrench , offersDataArabic } from '../../../data/home/offerData';
import ButtonConfirm from '../../../components/pages/auth/common/ButtonConfirm';
import { Link } from 'react-router-dom';
import { LanguageContext } from './../../../context/LanguageContext';

const translations = {
  french: {
    title: "Vous pouvez consulter nos offres ci-dessous",
    subtitle: "Choisissez ce qui vous convient",
    submitButton: "Soumettre",
  },
  arabic: {
    title: "يمكنك الاطلاع على عروضنا أدناه",
    subtitle: "اختر ما يناسبك",
    submitButton: "إرسال",
  },
};

const OffresPage = () => {
  const { isArabic } = useContext(LanguageContext);
  const language = isArabic ? 'arabic' : 'french';
  const texts = translations[language];
  const offersData = isArabic ? offersDataArabic : offersDataFrench;
  const [selectedOffer, setSelectedOffer] = useState(null);

  const handleCheckboxChange = (index) => {
    setSelectedOffer(selectedOffer === index ? null : index);
  };

  return (
    <div
      className={'min-h-screen flex flex-col gap-10'}
    >
      <div className="ml-32 mr-32 mt-14 mb-6" style={isArabic ? { direction: 'rtl' } : { direction: 'ltr' }} >
        <p className="text-2xl font-bold">{texts.title}</p>
        <p className="text-lg">{texts.subtitle}</p>
      </div>
      <div className="flex flex-col gap-10 justify-center items-center"
        >
        {offersData.map((offer, index) => (
          <Offre
            key={index}
            text={offer.text}
            titre={offer.titre}
            description={offer.description}
            price={offer.price}
            isChecked={selectedOffer === index}
            onCheckboxChange={() => handleCheckboxChange(index)}
          />
        ))}
      </div>
      <div className="w-28 h-8 ml-[70%] mb-[10%]">
        <Link to="/user/indice">
          <ButtonConfirm text={texts.submitButton} />
        </Link>
      </div>
    </div>
  );
};

export default OffresPage;