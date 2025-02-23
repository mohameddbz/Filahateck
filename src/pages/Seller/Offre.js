// import React, { useState, useContext, useEffect } from 'react';
// import Offre from '../../components/pages/home/offer/offer';
// import ButtonConfirm from './../../components/pages/auth/common/ButtonConfirm';
// import { LanguageContext } from './../../context/LanguageContext';
// import { makeRequest } from './../../utils/api/httpService';
// import { useNavigate } from 'react-router-dom';

// const translations = {
//   french: {
//     title: "Vous pouvez consulter nos offres ci-dessous",
//     subtitle: "Choisissez ce qui vous convient",
//     submitButton: "Soumettre",
//     noOfferSelected: "Veuillez sélectionner une offre avant de continuer",
//   },
//   arabic: {
//     title: "\u064A\u0645\u0643\u0646\u0643 \u0627\u0644\u0627\u0637\u0644\u0627\u0639 \u0639\u0644\u0649 \u0639\u0631\u0648\u0636\u0646\u0627 \u0623\u062F\u0646\u0627\u0647",
//     subtitle: "\u0627\u062e\u062a\u0631 \u0645\u0627 \u064a\u0646\u0627\u0633\u0628\u0643",
//     submitButton: "\u0625\u0631\u0633\u0627\u0644",
//     noOfferSelected: "الرجاء اختيار عرض قبل المتابعة",
//   },
// };

// const OffresSeller = () => {
//   const { isArabic } = useContext(LanguageContext);
//   const language = isArabic ? 'arabic' : 'french';
//   const texts = translations[language];

//   const [selectedOffer, setSelectedOffer] = useState(null);
//   const [offersData, setOffersData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [userId, setUserId] = useState(null);
//   const [validationError, setValidationError] = useState('');
//   const navigate = useNavigate();

//   // Récupérer l'ID de l'utilisateur
//   const fetchUserId = async () => {
//     try {
//       const token = localStorage.getItem('Token');
//       if (!token) throw new Error('Token non trouvé, veuillez vous connecter.');

//       const data = await makeRequest('/users/get', 'GET', {}, { headers: { Authorization: `Bearer ${token}` } });
//       setUserId(data.data.data.user_id);
//       return data.data.data.user_id; // Retourner l'ID utilisateur pour le chaînage
//     } catch (error) {
//       setError(error.message);
//       console.error('Erreur lors de la récupération de l\'ID utilisateur:', error);
//       return null;
//     }
//   };

//   // Récupérer les offres (SellerAbonnement)
//   const fetchOffers = async () => {
//     try {
//       const data = await makeRequest('/sellerAbonnement'); // Utiliser la route correcte
//       setOffersData(data.data);
//       console.log('Offres récupérées:', data.data);
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Initialiser les données avec un chargement séquentiel
//   useEffect(() => {
//     const initializeData = async () => {
//       setLoading(true);
//       const userId = await fetchUserId();
//       if (userId) {
//         await fetchOffers();
//       }
//       setLoading(false);
//     };

//     initializeData();
//   }, []); // Tableau de dépendances vide pour le chargement initial uniquement

//   // Effacer l'erreur de validation si une offre est sélectionnée
//   useEffect(() => {
//     if (selectedOffer) {
//       setValidationError('');
//     }
//   }, [selectedOffer]);

//   // Gérer le changement de sélection d'offre
//   const handleCheckboxChange = (index) => {
//     setSelectedOffer(selectedOffer === offersData[index] ? null : offersData[index]);
//   };

//   // Soumettre l'offre sélectionnée
//   const handleSubmit = async () => {
//     if (!selectedOffer) {
//       setValidationError(texts.noOfferSelected);
//       return;
//     }

//     if (!userId) {
//       console.error('ID utilisateur non trouvé.');
//       return;
//     }

//     try {
//       const payload = {
//         sellerAbonnementId: selectedOffer.id, // Utiliser sellerabonnementid au lieu de abn_id
//         userId: userId, // Utiliser userid au lieu de user_id
//         dateDebut: new Date().toISOString().split('T')[0], // Utiliser dateDebut au lieu de date_abonnement
//         dateFin: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0], // Ajouter une date de fin
//         etat: "désactivé", // Utiliser "actif" au lieu de "désactivé"
//       };

//       const result = await makeRequest('/sellerAbonnementUser', 'POST', payload); // Utiliser la route correcte
//       console.log('Offre soumise avec succès:', result);
//       navigate('/seller/marketplace');
//     } catch (error) {
//       console.error('Erreur lors de la soumission de l\'offre:', error);
//       setError(error.message);
//     }
//   };

//   if (loading) return <div className="text-center mt-10">Chargement en cours...</div>;

//   if (error) return <div className="text-center mt-10 text-red-500">Erreur: {error}</div>;

//   return (
//     <div className="min-h-screen flex flex-col gap-10">
//       <div className="ml-32 mr-32 mt-14 mb-6" style={isArabic ? { direction: 'rtl' } : { direction: 'ltr' }}>
//         <p className="text-2xl font-bold">{texts.title}</p>
//         <p className="text-lg">{texts.subtitle}</p>
//       </div>

//       <div className="flex flex-col gap-10 justify-center items-center">
//         {offersData &&  offersData.map((offer, index) => (
//           <Offre
//             key={offer.id || index}
//             text={offer.nameAbonnement} // Utiliser nameAbonnement au lieu de name
//             titre={offer.description} // Utiliser description si disponible
//             functionalities={offer.fonctionnalities} // Utiliser fonctionnalities si disponible
//             price={offer.price} // Utiliser price au lieu de prices[0]
//             isChecked={selectedOffer === offer}
//             onCheckboxChange={() => handleCheckboxChange(index)}
//           />
//         ))}
//       </div>

//       <div className="flex flex-col items-end mr-[30%] mb-[10%] gap-2">
//         {validationError && (
//           <div className="text-red-500 text-sm">
//             {validationError}
//           </div>
//         )}
//         <div className="w-28 h-8">
//           <ButtonConfirm 
//             text={texts.submitButton}
//             onClick={() => handleSubmit()}  
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OffresSeller;
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
  },
  arabic: {
    title: "\u064A\u0645\u0643\u0646\u0643 \u0627\u0644\u0627\u0637\u0644\u0627\u0639 \u0639\u0644\u0649 \u0639\u0631\u0648\u0636\u0646\u0627 \u0623\u062F\u0646\u0627\u0647",
    subtitle: "\u0627\u062e\u062a\u0631 \u0645\u0627 \u064a\u0646\u0627\u0633\u0628\u0643",
    submitButton: "\u0625\u0631\u0633\u0627\u0644",
    noOfferSelected: "الرجاء اختيار عرض قبل المتابعة",
    activeSubscriptionTitle: "اشتراكك النشط",
    activeSubscriptionDetails: "تفاصيل اشتراكك",
    noActiveSubscription: "ليس لديك اشتراك نشط. الرجاء اختيار عرض من الأسفل.",
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
  const [activeSubscription, setActiveSubscription] = useState(null); // État pour stocker l'abonnement actif
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

  if (loading) return <div className="text-center mt-10">Chargement en cours...</div>;

  if (error) return <div className="text-center mt-10 text-red-500">Erreur: {error}</div>;

  return (
    <div className="min-h-screen flex flex-col gap-10">
      <div className="ml-32 mr-32 mt-14 mb-6" style={isArabic ? { direction: 'rtl' } : { direction: 'ltr' }}>
        <p className="text-2xl font-bold">{texts.title}</p>
        <p className="text-lg">{texts.subtitle}</p>
      </div>

      {/* Afficher les détails de l'abonnement actif s'il existe */}
      {activeSubscription ? (
        <div className="ml-32 mr-32 mt-14 mb-6">
          <h2 className="text-xl font-bold">{texts.activeSubscriptionTitle}</h2>
          <p className="text-lg">{texts.activeSubscriptionDetails}</p>
          <div className="mt-4">
            <p><strong>Nom de l'abonnement:</strong> {activeSubscription.SellerAbonnement.nameAbonnement}</p>
            <p><strong>Nombre de publication:</strong> {activeSubscription.nbPost}</p>
            <p><strong>Prix:</strong> {activeSubscription.SellerAbonnement.price}</p>
            <p><strong>Date de début:</strong> {activeSubscription.dateDebut}</p>
            <p><strong>Date de fin:</strong> {activeSubscription.dateFin}</p>
          </div>
        </div>
      ) : (
        // Afficher les offres disponibles si aucun abonnement actif
        <>
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
        </>
      )}
    </div>
  );
};

export default OffresSeller;