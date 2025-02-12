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

  const fetchParcels = async () => {
    try {
      const token = localStorage.getItem('Token');
      if (!token) throw new Error('Token non trouvé.');

      const response = await makeRequest('/parcelle', 'GET', {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (!response.data) throw new Error('Aucune donnée de parcelle reçue.');

      const formattedParcels = response.data.map((parcel) => ({
        id: parcel.id.toString(),
        nomPercel: parcel.identifiantU,
        coordinates: parcel.geom ? parcel.geom.coordinates : [],
      }));
      console.log([response.data[0].geom.coordinates])
      return formattedParcels;
    } catch (error) {
      console.error('Erreur Parcelles:', error);
      return [];
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      setLoading(true);
      try {
        const fetchedUserId = await fetchUserId();
        if (!fetchedUserId) throw new Error("ID utilisateur non trouvé.");
        setUserId(fetchedUserId);

        const fetchedIndices = await fetchIndices(fetchedUserId);
        setIndicesData(fetchedIndices);

        const fetchedParcels = await fetchParcels();
        setParcels(fetchedParcels);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    initializeData();
  }, []);

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
