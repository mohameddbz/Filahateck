import React, { createContext, useState, useEffect } from 'react';
import { makeRequest } from './../utils/api/httpService'; // Import your makeRequest function

export const TextContext = createContext();

export const TextProvider = ({ children }) => {
  const [textData, setTextData] = useState({});
  const [indicesData, setIndicesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);

  // Fetch indices data
  const fetchIndices = async () => {
    try {
      if (!userId) throw new Error('User ID non trouvé.');

      const token = localStorage.getItem('Token');
      if (!token) throw new Error('Token non trouvé, veuillez vous connecter.');

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

  // Fetch user ID
  const fetchUserId = async () => {
    try {
      const token = localStorage.getItem('Token');
      if (!token) throw new Error('Token non trouvé, veuillez vous connecter.');

      const data = await makeRequest('/users/get', 'GET', {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserId(data.data.userId);
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
      const firstIndex = indicesData[0];
      setTextData({
        title: firstIndex.indiceName,
        description: firstIndex.description,
        legendText1: `${firstIndex.legende[0]?.intervalDeb} à ${firstIndex.legende[0]?.intervalFin} : ${firstIndex.legende[0]?.descriptionLeg}`,
        legendText2: `${firstIndex.legende[1]?.intervalDeb || ''} à ${firstIndex.legende[1]?.intervalFin || ''} : ${firstIndex.legende[1]?.descriptionLeg || ''}`,
        legendText3: `${firstIndex.legende[2]?.intervalDeb || ''} à ${firstIndex.legende[2]?.intervalFin || ''} : ${firstIndex.legende[2]?.descriptionLeg || ''}`,
        legendText4: `${firstIndex.legende[3]?.intervalDeb || ''} à ${firstIndex.legende[3]?.intervalFin || ''} : ${firstIndex.legende[3]?.descriptionLeg || ''}`,
        recommendationText: firstIndex.recomndation,
      });
    }
  }, [indicesData]);

  // Update the context with new text data when an index is clicked
  const updateText = (newTexts) => {
    if (typeof newTexts !== 'object' || newTexts === null) {
      console.error('Invalid data passed to updateText. Expected an object.');
      return;
    }

    setTextData((prevData) => ({
      ...prevData,
      ...newTexts,
      legende: {
        ...prevData.legende,
        ...newTexts.legende,
      },
    }));
  };

  if (loading) return <div className="text-center mt-10">Chargement en cours...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">Erreur: {error}</div>;

  return (
    <TextContext.Provider value={{ textData, updateText, indicesData }}>
      {children}
    </TextContext.Provider>
  );
};
