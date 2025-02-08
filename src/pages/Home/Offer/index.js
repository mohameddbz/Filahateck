import React, { useState, useContext, useEffect } from 'react';
import Offre from '../../../components/pages/home/offer/offer';
import ButtonConfirm from '../../../components/pages/auth/common/ButtonConfirm';
import { LanguageContext } from '../../../context/LanguageContext';
import { makeRequest } from '../../../utils/api/httpService';

const translations = {
  french: {
    title: "Vous pouvez consulter nos offres ci-dessous",
    subtitle: "Choisissez ce qui vous convient",
    submitButton: "Soumettre",
  },
  arabic: {
    title: "\u064A\u0645\u0643\u0646\u0643 \u0627\u0644\u0627\u0637\u0644\u0627\u0639 \u0639\u0644\u0649 \u0639\u0631\u0648\u0636\u0646\u0627 \u0623\u062F\u0646\u0627\u0647",
    subtitle: "\u0627\u062e\u062a\u0631 \u0645\u0627 \u064a\u0646\u0627\u0633\u0628\u0643",
    submitButton: "\u0625\u0631\u0633\u0627\u0644",
  },
};

const OffresPage = () => {
  const { isArabic } = useContext(LanguageContext);
  const language = isArabic ? 'arabic' : 'french';
  const texts = translations[language];

  const [selectedOffer, setSelectedOffer] = useState(null);
  const [offersData, setOffersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);

  const fetchOffers = async () => {
    try {
      const data = await makeRequest('/abonnementFonctionnality/detailed');
      setOffersData(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserId = async () => {
    try {
      const token = localStorage.getItem('Token');
      if (!token) throw new Error('Token non trouv\u00e9, veuillez vous connecter.');

      const data = await makeRequest('/users/get', 'GET', {}, { headers: { Authorization: `Bearer ${token}` } });
      console.log(data.data.userId)
      setUserId(data.data.userId);
    } catch (error) {
      setError(error.message);
      console.error('Error fetching user ID:', error);
    }
  };
  
  useEffect(() => {
    fetchOffers();
  }, []);

  const handleCheckboxChange = (index) => {
    setSelectedOffer(selectedOffer === offersData[index] ? null : offersData[index]);
  };

  const handleSubmit = async () => {
    await fetchUserId();
    if (!userId) {
      console.error('ID utilisateur non trouv\u00e9.');
      return;
    }

    if (selectedOffer) {
      try {
        const payload = {
          abn_id: selectedOffer.id,
          user_id: userId,
          date_abonnement: new Date().toISOString().split('T')[0], // Today's date
          dur\u00e9e: 12,
          etat: "d\u00e9sactiv\u00e9",
        };

        const result = await makeRequest('/abonnementUser', 'POST', payload);
        console.log('Offer submitted successfully:', result);
      } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'offre:', error);
      }
    } else {
      console.log('Aucune offre s\u00e9lectionn\u00e9e');
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
            functionalities={offer.fonctionnalities}
            price={offer.prices && offer.prices[0]}
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
