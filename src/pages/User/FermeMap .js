import React, { useState, useEffect, useContext } from 'react';
import FarmVisualization from '../../components/pages/user/FermeMap/FarmVisualization';
import { LanguageContext } from './../../context/LanguageContext';
import { translations } from './../../utils/constant/FermeMap';
import RequestForm from './../../components/pages/user/Indice/RequestForm';
import { makeRequest } from './../../utils/api/httpService';

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

  // Fetch the abonnement status for the user
  const fetchAbonnement = async (userId) => {
    try {
      const token = localStorage.getItem('Token');
      if (!token) throw new Error('Token non trouvé.');
      const response = await makeRequest(`/abonnementUser/user/${userId}/status`, 'GET', {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("===",response)
      if (response.data.length > 0) {return response.data || false;}
      else {return false}
    } catch (error) {
      console.error('Erreur Abonnement:', error);
      return false;
    }
  };

  // Fetch indices only if user has abonnement
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

  // Fetch parcels only if user has abonnement
  const fetchParcels = async (userId) => {
    try {
      if (!userId) return []; // S'assurer que userId est défini avant l'appel
      const token = localStorage.getItem('Token');
      if (!token) throw new Error('Token non trouvé.');
      const response = await makeRequest(`/parcelle/user/${userId}`, 'GET', {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.data) throw new Error('Aucune donnée de parcelle reçue.');
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

  // First useEffect: Get the userId and check abonnement
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

  // Second useEffect: Check abonnement status once userId is available
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

  // Third useEffect: Fetch indices and parcels only if the user has an abonnement
  useEffect(() => {
    if (userId && hasAbonnement) {
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
  }, [userId, hasAbonnement]);

  // Render loading state, error state, or the abonnement message if necessary
  if (loading || checkingAbonnement) {
    return <p className="text-center text-lg">Vérification de votre abonnement...</p>;
  }
  
  if (error) {
    return <p className="text-center text-red-500 text-lg">{error}</p>;
  }
  
  if (!hasAbonnement) {
    return <p className="text-center text-red-500 text-lg">Vous devez avoir un abonnement pour accéder à cette page.</p>;
  }

  return (
    <div className='flex flex-col py-3 px-2 w-full items-center justify-center'>
      <p className={`w-full flex ${isArabic ? "justify-end" : "justify-start"} font-semibold text-myOrange text-3xl`}>
        <h1>{texts.farmMapTitle}</h1>
      </p> 
      <div className='my-3 border-2 rounded-2xl border-myOrange w-fit max-w-screen-xl h-fit overflow-scroll scrollbar-hide'>
        <FarmVisualization parcels={parcels} />
      </div>
      <div className="min-h-screen w-4/6 bg-white p-8">
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 m-4"
        >
          {showForm ? 'Cacher le formulaire' : 'Afficher le formulaire'}
        </button>
        {showForm && <RequestForm indicesData={indicesData} userId={userId} />}
      </div>
    </div>
  );
};

export default FermeMap;
