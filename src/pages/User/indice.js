import React, { useState, useEffect } from 'react';
import Header from './../../components/pages/user/Indice/header';
import Legend from './../../components/pages/user/Indice/legend';
import IndexButtons from './../../components/pages/user/Indice/IndexButton';
import Recommendations from './../../components/pages/user/Indice/recomendation';
import { TextProvider } from './../../context/TextContext';
import RequestForm from './../../components/pages/user/Indice/RequestForm';
import { makeRequest } from './../../utils/api/httpService';
import { useParams } from 'react-router-dom';

const Indice = () => {
  const { parcelId } = useParams();
  const [indicesData, setIndicesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchUserId = async () => {
    try {
      const token = localStorage.getItem('Token');
      if (!token) throw new Error('Token non trouvé.');

      const response = await makeRequest('/users/get', 'GET', {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const fetchedUserId = response.data?.data?.user_id;
      if (!fetchedUserId) throw new Error('ID utilisateur non trouvé.');
      
      return fetchedUserId;
    } catch (error) {
      throw new Error(`Erreur lors de la récupération de l'ID utilisateur: ${error.message}`);
    }
  };

  const fetchIndices = async (userId) => {
    try {
      const token = localStorage.getItem('Token');
      if (!token) throw new Error('Token non trouvé.');

      const response = await makeRequest(`/indice/${userId}/indices`, 'GET', {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.data) throw new Error('Aucune donnée d\'indices reçue.');

      return response.data;
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des indices: ${error.message}`);
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      try {
        setLoading(true);

        // Fetch userId first
        const fetchedUserId = await fetchUserId();
        setUserId(fetchedUserId);

        // Fetch indices only if userId is valid
        const fetchedIndices = await fetchIndices(2);
        setIndicesData(fetchedIndices);
      } catch (error) {
        setError(error.message);
        console.error('Error initializing data:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeData();
  }, []); // Initial fetch on component load

  if (loading) {
    return <div className="text-center mt-10">Chargement en cours...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">Erreur: {error}</div>;
  }

  return (
    <TextProvider>
      <div className="min-h-screen bg-white p-8">
        <Header />
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 m-4"
        >
          {showForm ? 'Cacher le formulaire' : 'Afficher le formulaire'}
        </button>

        {showForm && (
          <RequestForm indicesData={indicesData} userId={userId} />
        )}

        <div className="flex flex-col gap-12 mt-8">
          <div className="flex gap-10 w-full pr-4">
            <IndexButtons parcellId={parcelId} userId={userId} indices={indicesData} />
          </div>
          <div className="flex gap-10 w-full pr-4">
            <Legend />
            <Recommendations />
          </div>
        </div>
      </div>
    </TextProvider>
  );
};

export default Indice;
