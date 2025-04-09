import React, { useState, useContext, useEffect } from 'react';
import Offre from '../../components/pages/home/offer/offer';
import ButtonConfirm from './../../components/pages/auth/common/ButtonConfirm';
import { LanguageContext } from './../../context/LanguageContext';
import { makeRequest } from './../../utils/api/httpService';
import { useNavigate } from 'react-router-dom';

const translations = {
  french: {
    title: "Vous pouvez consulter nos offres ci-dessous",
    subtitle: "Choisissez ce qui vous convient",
    submitButton: "Soumettre",
    noOfferSelected: "Veuillez sélectionner une offre avant de continuer",
    activeSubscriptionTitle: "Votre abonnement actif",
    activeSubscriptionDetails: "Détails de votre abonnement",
    noActiveSubscription: "Vous n'avez pas d'abonnement actif. Veuillez choisir une offre ci-dessous.",
    subscriptionName: "Nom de l'abonnement",
    postCount: "Nombre de publications",
    price: "Prix",
    startDate: "Date de début",
    endDate: "Date de fin",
    renewButton: "Renouveler",
    upgradeButton: "Améliorer"
  },
  arabic: {
    title: "\u064A\u0645\u0643\u0646\u0643 \u0627\u0644\u0627\u0637\u0644\u0627\u0639 \u0639\u0644\u0649 \u0639\u0631\u0648\u0636\u0646\u0627 \u0623\u062F\u0646\u0627\u0647",
    subtitle: "\u0627\u062e\u062a\u0631 \u0645\u0627 \u064a\u0646\u0627\u0633\u0628\u0643",
    submitButton: "\u0625\u0631\u0633\u0627\u0644",
    noOfferSelected: "الرجاء اختيار عرض قبل المتابعة",
    activeSubscriptionTitle: "اشتراكك النشط",
    activeSubscriptionDetails: "تفاصيل اشتراكك",
    noActiveSubscription: "ليس لديك اشتراك نشط. الرجاء اختيار عرض من الأسفل.",
    subscriptionName: "اسم الاشتراك",
    postCount: "عدد المنشورات",
    price: "السعر",
    startDate: "تاريخ البدء",
    endDate: "تاريخ الانتهاء",
    renewButton: "تجديد",
    upgradeButton: "ترقية"
  },
};

const OffresSeller = () => {
  const { isArabic } = useContext(LanguageContext);
  const language = isArabic ? 'arabic' : 'french';
  const texts = translations[language];

  const [selectedOffer, setSelectedOffer] = useState(null);
  const [offersData, setOffersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [validationError, setValidationError] = useState('');
  const [activeSubscription, setActiveSubscription] = useState(null);
  const navigate = useNavigate();

  // Récupérer les offres (SellerAbonnement)
  const fetchOffers = async () => {
    try {
      const data = await makeRequest('/sellerAbonnement');
      setOffersData(data.data);
    } catch (error) {
      setError(error.message);
    }
  };

  // Récupérer l'abonnement actif de l'utilisateur
  const fetchActiveSubscription = async () => {
    try {
      const data = await makeRequest(`/sellerAbonnementUser/current/`);
      console.log("data returned is -----> ",data.data);
      if (data.data.hasActiveSubscription===true) {
        setActiveSubscription(data.data.data)
        setLoading(false)
      }else{
         setActiveSubscription(false);
        setLoading(false)
      }
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'abonnement actif:', error);
    }
  };

  // Initialiser les données avec un chargement séquentiel
  useEffect(() => {
    const initializeData = async () => {
      setLoading(true);
  
        await fetchActiveSubscription(); // Vérifier l'abonnement actif
        await fetchOffers();

      setLoading(false);
    };

    initializeData();
  }, []);

  // Effacer l'erreur de validation si une offre est sélectionnée
  useEffect(() => {
    if (selectedOffer) {
      setValidationError('');
    }
  }, [selectedOffer]);

  // Gérer le changement de sélection d'offre
  const handleCheckboxChange = (index) => {
    setSelectedOffer(selectedOffer === offersData[index] ? null : offersData[index]);
  };

  // Soumettre l'offre sélectionnée
  const handleSubmit = async () => {
    if (!selectedOffer) {
      setValidationError(texts.noOfferSelected);
      return;
    }

    try {
      const payload = {
        sellerAbonnementId: selectedOffer.id,
        dateDebut: new Date().toISOString().split('T')[0],
        dateFin: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
        etat: "actif", // Mettre l'état à "actif" lors de la soumission
      };

      const result = await makeRequest('/sellerAbonnementUser', 'POST', payload);
      console.log('Offre soumise avec succès:', result);
      navigate('/seller/marketplace');
    } catch (error) {
      console.error('Erreur lors de la soumission de l\'offre:', error);
      setError(error.message);
    }
  };

  // Calculer les jours restants pour l'abonnement
  const calculateRemainingDays = (endDate) => {
    const end = new Date(endDate);
    const today = new Date();
    const diffTime = Math.abs(end - today);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // Formater la date pour l'affichage
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="text-center mt-10 p-4 bg-red-100 text-red-700 rounded-lg shadow">
      <p className="font-bold">Erreur:</p>
      <p>{error}</p>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col gap-10 bg-gray-50">
     

      {/* Afficher les détails de l'abonnement actif s'il existe */}
      {activeSubscription ? (
        <div className={`mx-8 md:mx-16 lg:mx-32 ${isArabic ? 'rtl' : 'ltr'}`}>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-xl">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 py-6 px-8">
              <h2 className="text-2xl font-bold text-white">{texts.activeSubscriptionTitle}</h2>
              <p className="text-blue-100 mt-1">{texts.activeSubscriptionDetails}</p>
            </div>
            
            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">{texts.subscriptionName}</p>
                    <p className="text-lg font-semibold text-gray-800">{activeSubscription.SellerAbonnement.nameAbonnement}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">{texts.postCount}</p>
                    <div className="flex items-center">
                      <span className="text-lg font-semibold text-gray-800">{activeSubscription.nbPost}</span>
                      <span className="ml-2 px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">Publications disponibles</span>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">{texts.price}</p>
                    <p className="text-lg font-semibold text-gray-800">{activeSubscription.SellerAbonnement.price} DA</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex flex-col md:items-end">
                    <p className="text-sm text-gray-500">{texts.startDate}</p>
                    <p className="text-lg font-semibold text-gray-800">{formatDate(activeSubscription.dateDebut)}</p>
                  </div>
                  
                  <div className="flex flex-col md:items-end">
                    <p className="text-sm text-gray-500">{texts.endDate}</p>
                    <p className="text-lg font-semibold text-gray-800">{formatDate(activeSubscription.dateFin)}</p>
                  </div>
                  
                  <div className="flex flex-col md:items-end">
                    <p className="text-sm text-gray-500">Jours restants</p>
                    <div className="mt-1">
                      <span className="px-4 py-2 bg-green-100 text-green-800 rounded-lg font-medium">
                        {calculateRemainingDays(activeSubscription.dateFin)} jours
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end space-x-4">
                <button className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-all duration-200">
                  {texts.renewButton}
                </button>
                <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200">
                  {texts.upgradeButton}
                </button>
              </div> */}
            </div>
          </div>
        </div>
      ) : (
        // Afficher les offres disponibles si aucun abonnement actif
        <>
          <div className={`mx-8 md:mx-16 lg:mx-32 mt-14 mb-6 ${isArabic ? 'rtl text-right' : 'ltr text-left'}`}>
            <h1 className="text-3xl font-bold text-gray-800">{texts.title}</h1>
            <p className="text-lg text-gray-600 mt-2">{texts.subtitle}</p>
          </div>
          <div className="flex flex-col gap-10 justify-center items-center">
            {offersData.map((offer, index) => (
              <Offre
                key={offer.id || index}
                text={offer.nameAbonnement}
                titre={offer.description}
                functionalities={offer.fonctionnalities}
                price={offer.price}
                isChecked={selectedOffer === offer}
                onCheckboxChange={() => handleCheckboxChange(index)}
              />
            ))}
          </div>

          <div className="flex flex-col items-end mr-8 md:mr-16 lg:mr-32 mb-16 gap-2">
            {validationError && (
              <div className="text-red-500 text-sm bg-red-50 px-4 py-2 rounded-lg">
                {validationError}
              </div>
            )}
            <div className="w-32">
              <ButtonConfirm 
                text={texts.submitButton}
                onClick={() => handleSubmit()}  
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OffresSeller;