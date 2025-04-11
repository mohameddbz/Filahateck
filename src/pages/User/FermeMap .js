import React, { useState, useEffect, useContext } from 'react';
import FarmVisualization from '../../components/pages/user/FermeMap/FarmVisualization';
import { LanguageContext } from './../../context/LanguageContext';
import { translations } from './../../utils/constant/FermeMap';
import RequestForm from './../../components/pages/user/Indice/RequestForm';
import { makeRequest } from './../../utils/api/httpService';
import SubscriptionPage from '../../components/pages/user/FermeMap/SubscribePage';
import SubscriptionDisabled from '../../components/pages/user/FermeMap/SubscriptionDisabled';

const FermeMap = () => {
  const { isArabic } = useContext(LanguageContext);
  const [indicesData, setIndicesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [parcels, setParcels] = useState([]);
  const [hasAbonnement, setHasAbonnement] = useState(false);
  const [checkingAbonnement, setCheckingAbonnement] = useState(true);
  const [abonnementEtat, setAbonnementEtat] = useState(null); // "actif" or "désactivé"

  const lang = isArabic ? 'arabic' : 'french';
  const texts = translations[lang];

  const fetchUserId = async () => {
    try {
      const token = localStorage.getItem('Token');
      if (!token) throw new Error('Token non trouvé.');
      const response = await makeRequest('/users/get', 'GET', {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data?.data?.user_id || null;
    } catch (error) {
      console.error('Erreur User ID:', error);
      return null;
    }
  };

  const fetchAbonnement = async (userId) => {
    try {
      const token = localStorage.getItem('Token');
      if (!token) throw new Error('Token non trouvé.');
      const response = await makeRequest(`/abonnementUser/user/${userId}/status`, 'GET', {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.length > 0) {
        const abonnement = response.data[0];
        setAbonnementEtat(abonnement.etat); // Store "actif" or "désactivé"
        return true;
      }

      return false;
    } catch (error) {
      console.error('Erreur Abonnement:', error);
      return false;
    }
  };

  const fetchIndices = async (userId) => {
    try {
      const token = localStorage.getItem('Token');
      if (!token) throw new Error('Token non trouvé.');
      const response = await makeRequest(`/indice/${userId}/indices`, 'GET', {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data || [];
    } catch (error) {
      console.error('Erreur Indices:', error);
      return [];
    }
  };

  const fetchParcels = async (userId) => {
    try {
      if (!userId) return [];
      const token = localStorage.getItem('Token');
      if (!token) throw new Error('Token non trouvé.');
      const response = await makeRequest(`/parcelle/user/${userId}`, 'GET', {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.map((parcel) => ({
        id: parcel.id.toString(),
        nomPercel: parcel.identifiantU,
        coordinates: parcel.geom ? parcel.geom.coordinates : [],
      }));
    } catch (error) {
      console.error('Erreur Parcelles:', error);
      return [];
    }
  };

  // Fetch user ID
  useEffect(() => {
    const initializeData = async () => {
      setLoading(true);
      try {
        const fetchedUserId = await fetchUserId();
        if (!fetchedUserId) throw new Error("ID utilisateur non trouvé.");
        setUserId(fetchedUserId);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    initializeData();
  }, []);

  // Check abonnement
  useEffect(() => {
    if (userId) {
      const checkAbonnement = async () => {
        const abonnementStatus = await fetchAbonnement(userId);
        setHasAbonnement(abonnementStatus);
        setCheckingAbonnement(false);
      };
      checkAbonnement();
    }
  }, [userId]);

  // Fetch parcels and indices only if abonnement is actif
  useEffect(() => {
    if (userId && hasAbonnement && abonnementEtat === "actif") {
      const loadData = async () => {
        const [fetchedIndices, fetchedParcels] = await Promise.all([
          fetchIndices(userId),
          fetchParcels(userId)
        ]);
        setIndicesData(fetchedIndices);
        setParcels(fetchedParcels);
      };
      loadData();
    }
  }, [userId, hasAbonnement, abonnementEtat]);

  if (loading || checkingAbonnement) {
    return <p className="text-center text-lg">{texts.checkingAbonnement}</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 text-lg">{error}</p>;
  }

  if (!hasAbonnement) {
    return <SubscriptionPage />;
  }

  if (abonnementEtat === "désactivé") {
    return (
     <SubscriptionDisabled/>
    );
  }

  return (
    <div className="flex flex-col py-3 px-16 w-full items-center justify-center">
      <p className={`w-full flex ${isArabic ? "justify-end" : "justify-start"} mb-6 font-semibold text-myOrange text-3xl`}>
        <h1>{texts.farmMapTitle}</h1>
      </p>

      <div className="w-full mb-6">
        <p className="text-lg text-gray-700">
          {texts.instructions}
        </p>
      </div>

      <div className="w-5/6 bg-white p-8 rounded-xl shadow-lg">
        <div className="mb-6 text-center">
          <p className="text-lg text-gray-700 mb-4">{texts.buttonDescription}</p>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
          >
            {showForm ? texts.hideForm : texts.showForm}
          </button>
        </div>

        <div className="steps-container bg-gray-50 p-4 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            {texts.stepsTitle || "Étapes à suivre"}
          </h2>
          <ol className="list-decimal pl-6 text-gray-800 space-y-2">
            <li>{texts.step1}</li>
            <li>{texts.step2}</li>
            <li>{texts.step3}</li>
          </ol>
        </div>

        {showForm && (
          <div className="mb-6">
            <RequestForm indicesData={indicesData} userId={userId} />
          </div>
        )}

        <div className="border-2 rounded-2xl border-myOrange w-full max-w-screen-xl h-fit overflow-scroll scrollbar-hide">
          <p className="text-center text-lg text-gray-700 mb-4">
            {texts.farmMapDescription}
          </p>
          <FarmVisualization parcels={parcels} />
        </div>
      </div>
    </div>
  );
};

export default FermeMap;
