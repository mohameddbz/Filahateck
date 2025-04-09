import React, { createContext, useState, useEffect } from 'react';
import { makeRequest } from './../utils/api/httpService'; // Import your makeRequest function

export const TextContext = createContext();

export const TextProvider = ({ children }) => {
  const [textData, setTextData] = useState({});
  const [indicesData, setIndicesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);

  const fetchIndices = async () => {
    try {
      if (!userId) throw new Error('User ID non trouvé.');

      const token = localStorage.getItem('Token');
      if (!token) throw new Error('Token non trouvé, veuillez vous connecter.');

      const data = await makeRequest(`/indice/${userId}/indices`, 'GET', {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setIndicesData(data.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch user ID
  const fetchUserId = async () => {
    try {
      const token = localStorage.getItem('Token');
      if (!token) throw new Error('Token non trouvé, veuillez vous connecter.');

      const data = await makeRequest('/users/get', 'GET', {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserId(data.data.data.user_id);
    } catch (error) {
      setError(error.message);
    }
  };

  // UseEffect to fetch the user ID first, then fetch indices data
  useEffect(() => {
    fetchUserId();
  }, []);

  useEffect(() => {
    if (userId) fetchIndices(); // Fetch indices only after userId is set
  }, [userId]);

  // Handle the initial text data setup when the indices are available
  useEffect(() => {
    if (indicesData.length > 0) {
      // Trouver l'indice NDVI par défaut, sinon prendre le premier disponible
      const ndviIndex = indicesData.find((indice) => indice.indiceName === 'NDVI') || indicesData[0];
      if (ndviIndex) {
        setTextData({
          title: ndviIndex.indiceName,
          description: ndviIndex.description,
          legendText1: `${ndviIndex.legende[0]?.intervalDeb || ''} à ${ndviIndex.legende[0]?.intervalFin || ''} : ${ndviIndex.legende[0]?.descriptionLeg || ''}`,
          legendText2: `${ndviIndex.legende[1]?.intervalDeb || ''} à ${ndviIndex.legende[1]?.intervalFin || ''} : ${ndviIndex.legende[1]?.descriptionLeg || ''}`,
          legendText3: `${ndviIndex.legende[2]?.intervalDeb || ''} à ${ndviIndex.legende[2]?.intervalFin || ''} : ${ndviIndex.legende[2]?.descriptionLeg || ''}`,
          legendText4: `${ndviIndex.legende[3]?.intervalDeb || ''} à ${ndviIndex.legende[3]?.intervalFin || ''} : ${ndviIndex.legende[3]?.descriptionLeg || ''}`,
          recommendationText: ndviIndex.recomndation,
        });
      }
    }
  }, [indicesData]);

  // Update the context with new text data when an index is clicked
  const updateText = (newTexts) => {
    
    if (typeof newTexts !== 'object' || newTexts === null) {
      console.error('Invalid data passed to updateText. Expected an object.');
      return;
    }
  
    setTextData((prevData) => {
      const updatedData = {
        ...prevData,
        ...newTexts,
      };
  
      // Only merge `legende` if it exists in newTexts
      if (newTexts.legende) {
        updatedData.legende = {
          ...prevData.legende,
          ...newTexts.legende,
        };
      }
      return updatedData;
    });
  };
  

  if (loading) return <div className="text-center mt-10">Chargement en cours...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">Erreur: {error}</div>;

  return (
    <TextContext.Provider value={{ textData, updateText, indicesData }}>
      {children}
    </TextContext.Provider>
  );
};
