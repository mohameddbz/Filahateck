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

      if (data.data && data.data.imageUrl) {
        setImageData(data.data.imageUrl);
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
