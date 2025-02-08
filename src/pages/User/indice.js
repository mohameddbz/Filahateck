import React, { useState, useEffect } from 'react';
import Header from './../../components/pages/user/Indice/header';
import MapSection from './../../components/pages/user/Indice/map';
import Legend from './../../components/pages/user/Indice/legend';
import IndexButtons from './../../components/pages/user/Indice/IndexButton';
import Recommendations from './../../components/pages/user/Indice/recomendation';
import { TextProvider } from './../../context/TextContext';
import RequestForm from './../../components/pages/user/Indice/RequestForm'; // Import the form component
import { makeRequest } from './../../utils/api/httpService';

const Indice = () => {
  const [indicesData, setIndicesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const [showForm, setShowForm] = useState(false); // Toggle form visibility

  const fetchIndices = async () => {
    try {
      if (!userId) throw new Error('User ID non trouvé.');
      const token = localStorage.getItem('Token');
      if (!token) throw new Error('Token non trouvé.');

      const data = await makeRequest(`/indice/${userId}/indices`, 'GET', {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setIndicesData(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchUserId = async () => {
      const token = localStorage.getItem('Token');
      if (!token) throw new Error('Token non trouvé.');
      const data = await makeRequest('/users/get', 'GET', {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserId(data.data.userId);
    };
    fetchUserId();
  }, []);

  useEffect(() => {
    if (userId) fetchIndices();
  }, [userId]);

  if (loading) return <div className="text-center mt-10">Chargement en cours...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">Erreur: {error}</div>;

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
            <IndexButtons userId={userId} indices={indicesData} />
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
