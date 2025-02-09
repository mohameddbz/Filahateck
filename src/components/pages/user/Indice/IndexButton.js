import React, { useContext, useState } from 'react';
import { TextContext } from './../../../../context/TextContext';
import { useImageData } from './useImageData'; // Import custom hook
import MapSection from './map';

const IndexButtons = ({ userId,indices }) => {
  const { updateText } = useContext(TextContext);
  const { imageData, loading, error, fetchImageData } = useImageData();
  const [mapVisible, setMapVisible] = useState(false); // Controls map visibility
  const [errorMessage, setErrorMessage] = useState('');

  const handleButtonClick = (indiceId) => {
    const index = indices.find((item) => item.indiceId === indiceId);

    if (index) {
      const { indiceName, description, legende, recomndation } = index;

      fetchImageData(userId, 1, indiceId)
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
          <p className="text-red-600">
            {errorMessage || 'Veuillez cliquer sur un bouton pour afficher la carte.'}
          </p>
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
    </div>
  );
};

export default IndexButtons;
