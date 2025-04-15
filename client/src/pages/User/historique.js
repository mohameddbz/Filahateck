import React, { useState, useEffect } from 'react';
import Header from './../../components/pages/user/Indice/header';
import Recommendations from './../../components/pages/user/Indice/recomendation';
import MapSection from './../../components/pages/user/Indice/map';
import { TextProvider } from './../../context/TextContext';
import { makeRequest } from './../../utils/api/httpService';
import { useParams } from 'react-router-dom';
import { useImagesData } from './../../components/pages/user/Indice/useImageData';
import Legende from '../../components/pages/user/Indice/Legnde';
import { Legend } from '@headlessui/react';

const Historique = () => {
  const { indexId, parcelId } = useParams(); 
  const [indicesData, setIndicesData] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [userId, setUserId] = useState(null);
  const { imagesData, loadings, errors, fetchImagesData } = useImagesData();

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

        const fetchedUserId = await fetchUserId();
        setUserId(fetchedUserId);

        const fetchedIndices = await fetchIndices(fetchedUserId);
        setIndicesData(fetchedIndices);
        console.log(indexId)
        console.log(fetchedIndices) 
        const selected = fetchedIndices.find(indice => String(indice.indiceId) === indexId);
        console.log(selected)
        setSelectedIndex(selected);
      } catch (error) {
        setError(error.message);
        console.error('Error initializing data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (indexId) {
      initializeData();
    }
  }, [indexId]);

  useEffect(() => {
    if (userId && parcelId && indexId) {
      fetchImagesData(userId, parcelId, indexId)
        .then(() => setErrorMessage(''))
        .catch(() => setErrorMessage('Erreur lors du chargement de la carte.'));
    }
  }, [userId, parcelId, indexId]);

  if (loading) return <div className="text-center mt-10">Chargement en cours...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">Erreur: {error}</div>;

  return (
    <TextProvider>
      <div className="min-h-screen bg-white p-8">
        {selectedIndex ? (
          <>
            <Header title={selectedIndex.indiceName} text={selectedIndex.description} />
            <div className="flex flex-col gap-12 w-full mt-8">
              {imagesData && imagesData.length > 0 ? (
                <div className="flex flex-col gap-10">
                  {imagesData.map((image, index) => (
                    <div key={index} className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-md w-full">
                      <img
                        src={image.imageUrl}
                        alt={`Image ${index + 1}`}
                        className="w-[800px] h-[400px] object-cover rounded-lg"
                      />
                      <div className="text-center mt-3">
                        <p className="text-lg text-gray-800">
                          <span className="font-semibold">Début :</span> {image.dateDebut || 'Non disponible'}
                        </p>
                        <p className="text-lg text-gray-800">
                          <span className="font-semibold">Fin :</span> {image.dateFin || 'Non disponible'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">Aucune image disponible.</p>
              )}

              <div className="flex gap-10 w-full pr-4">
                <Legende indicesData={indicesData} />
                <Recommendations text={selectedIndex.recomndation} />
              </div>
            </div>
          </>
        ) : (
          <div className="text-center text-gray-500">Chargement des données d'indice...</div>
        )}
      </div>
    </TextProvider>
  );
};

export default Historique;
