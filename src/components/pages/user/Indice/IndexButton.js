import React, { useContext, useState, useEffect } from 'react';
import { TextContext } from './../../../../context/TextContext';
import { useImageData } from './useImageData'; // Import custom hook
import MapSection from './map';
import { makeRequest } from './../../../../utils/api/httpService'; 

const IndexButtons = ({ parcellId, userId, indices }) => {
  const { updateText } = useContext(TextContext);
  const { imageData, loading, error, fetchImageData } = useImageData();
  const [mapVisible, setMapVisible] = useState(false);
  const [image, setImage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // API request on component mount
  useEffect(() => {
    const fetchInitialImage = async (userId, parcelleId, indiceId) => {
      try {
          const response = await makeRequest(
            '/request/image',
            'GET',
            {},
            { userId, parcelleId, indiceId }
          );
      
          if (response.data?.imageUrl) {
            console.log('Image successfully fetched.');
            setImage(response.data.imageUrl);
            return response.data.imageUrl;
          } else {
            throw new Error('No image data returned from the request.');
          }
        } catch (error) {
          alert(`Erreur lors de la récupération de l'image: ${error.message}`);
          console.error('Error fetching image:', error);
          window.history.back(); // Go to the previous page
        }
    };

    fetchInitialImage(userId, parcellId, 1);
  }, [parcellId, userId, updateText]);

  const handleButtonClick = (indiceId) => {
    const index = indices.find((item) => item.indiceId === indiceId);

    if (index) {
      const { indiceName, description, legende, recomndation } = index;

      fetchImageData(userId, parcellId, indiceId)
        .then(() => {
          setMapVisible(true);
          setErrorMessage('');
        })
        .catch(() => {
          setMapVisible(false);
          setErrorMessage('Erreur lors du chargement de la carte.');
        });

      updateText({
        title: indiceName,
        description,
        legendText1: `${legende?.[0]?.intervalDeb || ''} à ${legende?.[0]?.intervalFin || ''} : ${legende?.[0]?.descriptionLeg || ''}`,
        legendText2: `${legende?.[1]?.intervalDeb || ''} à ${legende?.[1]?.intervalFin || ''} : ${legende?.[1]?.descriptionLeg || ''}`,
        legendText3: `${legende?.[2]?.intervalDeb || ''} à ${legende?.[2]?.intervalFin || ''} : ${legende?.[2]?.descriptionLeg || ''}`,
        legendText4: `${legende?.[3]?.intervalDeb || ''} à ${legende?.[3]?.intervalFin || ''} : ${legende?.[3]?.descriptionLeg || ''}`,
        recommendationText: recomndation,
      });
    } else {
      setErrorMessage('Index non trouvé.');
    }
  };

  return (
    <div className="flex items-start space-x-4 mt-4">
      {/* Map Section on the Left */}
      <div className="flex-1">
        {mapVisible ? (
          <MapSection imageData={imageData} loading={loading} error={error} />
        ) : (
          <img
            src={image}
            alt="Fetched Satellite Image"
            className="w-full h-full object-cover rounded-lg"
          />
        )}
      </div>

      {/* Buttons Section on the Right */}
      <div className="flex flex-col space-y-4">
        {indices.map((index) => (
          <button
            key={index.indiceId}
            onClick={() => handleButtonClick(index.indiceId)}
            className="bg-SidebarColor justify-center items-center w-36 rounded-3xl flex p-4 gap-4 h-24 shadow hover:bg-gray-300"
          >
            <p className="text-xl">{index.indiceName}</p>
          </button>
        ))}
      </div>

      {errorMessage && (
        <p className="text-red-500 mt-4">{errorMessage}</p>
      )}
    </div>
  );
};

export default IndexButtons;
