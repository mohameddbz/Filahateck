import React, { useState, useContext, useEffect } from 'react';
import Offre from '../../../components/pages/home/offer/offer';
import ButtonConfirm from '../../../components/pages/auth/common/ButtonConfirm';
import { LanguageContext } from '../../../context/LanguageContext';
import { makeRequest } from '../../../utils/api/httpService';
import { useNavigate } from 'react-router-dom';

const translations = {
  french: {
    title: "Vous pouvez consulter nos offres ci-dessous",
    subtitle: "Choisissez ce qui vous convient",
    submitButton: "Soumettre",
    noOfferSelected: "Veuillez sélectionner une offre avant de continuer",
  },
  arabic: {
    title: "\u064A\u0645\u0643\u0646\u0643 \u0627\u0644\u0627\u0637\u0644\u0627\u0639 \u0639\u0644\u0649 \u0639\u0631\u0648\u0636\u0646\u0627 \u0623\u062F\u0646\u0627\u0647",
    subtitle: "\u0627\u062e\u062a\u0631 \u0645\u0627 \u064a\u0646\u0627\u0633\u0628\u0643",
    submitButton: "\u0625\u0631\u0633\u0627\u0644",
    noOfferSelected: "الرجاء اختيار عرض قبل المتابعة",
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
  const [validationError, setValidationError] = useState('');
  const navigate = useNavigate();

  
  const fetchUserId = async () => {
    try {
      const token = localStorage.getItem('Token');
      if (!token) throw new Error('Token non trouvé, veuillez vous connecter.');

      const data = await makeRequest('/users/get', 'GET', {}, { headers: { Authorization: `Bearer ${token}` } });
      setUserId(data.data.data.user_id);
      return data.data.data.user_id; // Return the userId for chaining
    } catch (error) {
      setError(error.message);
      console.error('Error fetching user ID:', error);
      return null;
    }
  };

  const fetchOffers = async () => {
    try {
      const data = await makeRequest('/abonnementFonctionnality/detailed');
      setOffersData(data.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Initialize data with sequential fetching
  useEffect(() => {
    const initializeData = async () => {
      setLoading(true);
      const userId = await fetchUserId();
      if (userId) {
        await fetchOffers();
      }
      setLoading(false);
    };

    initializeData();
  }, []); // Empty dependency array for initial load only

  useEffect(() => {
    if (selectedOffer) {
      setValidationError('');
    }
  }, [selectedOffer]);

  const handleCheckboxChange = (index) => {
    setSelectedOffer(selectedOffer === offersData[index] ? null : offersData[index]);
  };

  const handleSubmit = async () => {
    if (!selectedOffer) {
      setValidationError(texts.noOfferSelected);
      return;
    }

    if (!userId) {
      console.error('ID utilisateur non trouvé.');
      return;
    }

    try {
      const payload = {
        abn_id: selectedOffer.id,
        user_id: userId,
        date_abonnement: new Date().toISOString().split('T')[0],
        durée: 12,
        etat: "désactivé",
      };

      const result = await makeRequest('/abonnementUser', 'POST', payload);
      console.log('Offer submitted successfully:', result);
      navigate('/user/marketplace');
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'offre:', error);
      setError(error.message);
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

      <div className="flex flex-col items-end mr-[30%] mb-[10%] gap-2">
        {validationError && (
          <div className="text-red-500 text-sm">
            {validationError}
          </div>
        )}
        <div className="w-28 h-8">
          <ButtonConfirm 
            text={texts.submitButton}
            onClick={() => handleSubmit()}  
          />
        </div>
      </div>
    </div>
  );
};

export default OffresPage;