import React, { useState, useContext, useEffect } from 'react';
import Offre from '../../../components/pages/home/offer/offer';
import ButtonConfirm from '../../../components/pages/auth/common/ButtonConfirm';
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

  const [selectedOffer, setSelectedOffer] = useState(null); // Store the full offer object
  const [offersData, setOffersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/abonnementFonctionnality/detailed');
        if (!response.ok) {
          throw new Error('Une erreur est survenue lors de la récupération des offres.');
        }
        const data = await response.json();
        console.log(data)
        setOffersData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  const handleCheckboxChange = (index) => {
    // Update the selected offer object instead of just the index
    setSelectedOffer(selectedOffer === offersData[index] ? null : offersData[index]);
  };

  const handleSubmit = async () => {
    if (selectedOffer) {
      try {
        // Sending POST request with the selected offer's data
        const response = await fetch('http://localhost:5000/api/abonnementUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            abn_id: selectedOffer.id, 
            user_id: 1,
            date_abonnement: "2025-02-03",
            durée: 12,
            etat: "désactivé",
          }),
        });

        if (!response.ok) {
          throw new Error('Une erreur est survenue lors de l\'envoi de l\'offre.');
        }

        const result = await response.json();
        console.log('Offer submitted successfully:', result);
      } catch (error) {
        console.error('Error submitting offer:', error);
      }
    } else {
      console.log('No offer selected');
    }
  };

  if (loading) return <div className="text-center mt-10">Chargement en cours...</div>;

  if (error) return <div className="text-center mt-10 text-red-500">Erreur: {error}</div>;

  return (
    <div className="min-h-screen flex flex-col gap-10">
      <div className="ml-32 mr-32 mt-14 mb-6" style={isArabic ? { direction: 'rtl' } : { direction: 'ltr' }}>
        <p className="text-2xl font-bold">{texts.title}</p>
        <p className="text-lg">{texts.subtitle}</p>
      </div>

      <div className="flex flex-col gap-10 justify-center items-center">
        {offersData.map((offer, index) => (
          <Offre
            key={offer.id || index}
            text={offer.name}
            titre={offer.description}
            functionalities={offer.fonctionnalities}  // Pass functionalities array
            price={offer.prices && offer.prices[0]}  // Assuming prices is an array, adjust if needed
            isChecked={selectedOffer === offer}
            onCheckboxChange={() => handleCheckboxChange(index)}
          />
        ))}
      </div>

      <div className="w-28 h-8 ml-[70%] mb-[10%]">
        <button onClick={handleSubmit}>
          <ButtonConfirm text={texts.submitButton} />
        </button>
      </div>
    </div>
  );
};

export default OffresPage;
