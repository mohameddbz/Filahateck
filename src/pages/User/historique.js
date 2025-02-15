import React, { useState, useEffect } from 'react';
import Header from './../../components/pages/user/Indice/header';
import Legend from './../../components/pages/user/Indice/legend';
import Recommendations from './../../components/pages/user/Indice/recomendation';
import MapSection from './../../components/pages/user/Indice/map';
import { TextProvider } from './../../context/TextContext';
import { makeRequest } from './../../utils/api/httpService';
import { useParams } from 'react-router-dom';
import { useImagesData } from './../../components/pages/user/Indice/useImageData';

const Historique = () => {
  const { indexId, parcelId } = useParams(); 
  const [indicesData, setIndicesData] = useState(null);
  const [legendsData, setLegendsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [userId, setUserId] = useState(null);
  const { imagesData, loadings, errors, fetchImagesData } = useImagesData();

  // Récupération des légendes
  const fetchLegends = async () => {
    try {
      const token = localStorage.getItem('Token');
      if (!token) throw new Error('Token non trouvé.');

      if (!indexId) throw new Error("Aucun indexId reçu dans les paramètres.");

      const response = await makeRequest(`/legende/legendes/${indexId}`, 'GET', {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.data) throw new Error("Aucune donnée de légende reçue.");
      console.log("Légendes reçues:", response.data);
      setLegendsData(response.data);
    } catch (error) {
      setError(error.message);
      console.error("Erreur lors de la récupération des légendes:", error);
    }
  };

  // Récupération de l'ID utilisateur
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const token = localStorage.getItem('Token');
        if (!token) throw new Error('Token non trouvé.');

        const response = await makeRequest('/users/get', 'GET', {}, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const fetchedUserId = response.data?.data?.user_id;
        if (!fetchedUserId) throw new Error('ID utilisateur non trouvé.');

        setUserId(fetchedUserId); // ✅ Définir userId une fois récupéré
      } catch (error) {
        setError(`Erreur lors de la récupération de l'ID utilisateur: ${error.message}`);
      }
    };

    fetchUserId();
  }, []); // ✅ Exécuter une seule fois au montage

  // Récupération des indices
  useEffect(() => {
    const fetchIndices = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('Token');
        if (!token) throw new Error('Token non trouvé.');

        if (!indexId) throw new Error("Aucun indexId reçu dans les paramètres.");

        const response = await makeRequest(`/indice/${indexId}`, 'GET', {}, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.data) throw new Error("Aucune donnée d'indices reçue.");
        setIndicesData(response.data);

        await fetchLegends(); // ✅ Récupérer les légendes après avoir obtenu les indices
      } catch (error) {
        setError(error.message);
        console.error("Erreur lors de la récupération des indices:", error);
      } finally {
        setLoading(false);
      }
    };

    if (indexId) {
      fetchIndices();
    }
  }, [indexId]);

  // Récupération des images uniquement lorsque userId est défini
  useEffect(() => {
    if (userId && parcelId && indexId) {
      fetchImagesData(userId, parcelId, indexId)
        .then(() => {
          setErrorMessage('');
        })
        .catch(() => {
          setErrorMessage('Erreur lors du chargement de la carte.');
        });
    }
  }, [userId, parcelId, indexId]); // ✅ Exécuter uniquement lorsque userId est défini

  if (loading) {
    return <div className="text-center mt-10">Chargement en cours...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">Erreur: {error}</div>;
  }

  return (
    <TextProvider>
        <div className="min-h-screen bg-white p-8">
            <Header title={indicesData?.indiceName} text={indicesData?.description} />
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
                <Legend data={legendsData} />
                <Recommendations text={indicesData?.recomndation} />
            </div>
            </div>
        </div>
    </TextProvider>


  );
};

export default Historique;
