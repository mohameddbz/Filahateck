import { useState } from 'react';
import { makeRequest } from '../../../../utils/api/httpService';

export const useImageData = () => {
  const [imageData, setImageData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchImageData = async (userId, parcelleId, indiceId) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('Token');
      if (!token) throw new Error('Token non trouvé, veuillez vous connecter.');
      const data = await makeRequest(
        `/request/image?userId=${userId}&parcelleId=${parcelleId}&indiceId=${indiceId}`,
        'GET',  
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
        console.log(data.data)
      if (data.data && data.data.imageUrl) {
        setImageData(data.data);
      } else {
        setError('No valid image URL found.');
      }
    } catch (error) {
      setError(error.message || 'Error fetching image.');
      console.error('Error fetching image data:', error);
    } finally {
      setLoading(false);
    }
  };

  return { imageData, loading, error, fetchImageData };
};


export const useImagesData = () => {
  const [imagesData, setImagesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchImagesData = async (userId, parcelleId, indiceId) => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('Token');
      if (!token) throw new Error('Token non trouvé, veuillez vous connecter.');
      const response = await makeRequest(
        `/request/images?userId=${userId}&parcelleId=${parcelleId}&indiceId=${indiceId}`,
        'GET',
        {},
        {  headers: { Authorization: `Bearer ${token}` }, }
      );
      if (response.data && response.data.images.length > 0) {
        console.log('Images fetched successfully:::', response.data.images);
        setImagesData(response.data.images);
      } else {
        throw new Error('Aucune image trouvée.');
      }
    } catch (err) {
      console.error('Erreur lors de la récupération des images:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { imagesData, loading, error, fetchImagesData };
};
