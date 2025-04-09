import React, { useContext, useState, useEffect } from 'react';
import { TextContext } from './../../../../context/TextContext';
import { useImageData } from './useImageData';
import MapSection from './map';
import { MapIcon, ImageIcon } from 'lucide-react'; // Add icons for better UX
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const IndiqueErreur = () => (
  <div className="flex items-center justify-center h-full p-6 bg-yellow-100 text-yellow-700 rounded-lg shadow">
    <div className="text-center">
      <p>
        Aucune image satellitaire disponible pour cet indice. Veuillez faire une demande pour obtenir l'image en cliquant sur le bouton.
      </p>
      <Link to="/user/ferme-map" className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition">
        Demander l'image
      </Link>
    </div>
  </div>
);


const IndexButtons = ({ parcellId, userId, indices }) => {
  const { updateText } = useContext(TextContext);
  const { imageData, loading, error, fetchImageData } = useImageData();
  const [mapVisible, setMapVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (imageData) {
      setImage(imageData);
      setHasError(false);
    }
  }, [imageData]);

  useEffect(() => {
    fetchImageData(userId, parcellId, 1).catch(() => {
      setHasError(true);
    });
  }, [parcellId, userId]);

  const handleButtonClick = async (indiceId) => {
    const index = indices.find((item) => item.indiceId === indiceId);
    setImage('');
    if (index) {
      const { indiceName, description, legende, recomndation } = index;
      try {
        await fetchImageData(userId, parcellId, indiceId);
        setErrorMessage('');
        setHasError(false);
      } catch {
        setErrorMessage('Erreur lors du chargement de la carte.');
        setHasError(true);
      }

      updateText({
        title: indiceName,
        description,
        legendText1: `${legende?.[0]?.intervalDeb} à ${legende?.[0]?.intervalFin || ''} : ${legende?.[0]?.descriptionLeg || ''}`,
        legendText2: `${legende?.[1]?.intervalDeb} à ${legende?.[1]?.intervalFin || ''} : ${legende?.[1]?.descriptionLeg || ''}`,
        legendText3: `${legende?.[2]?.intervalDeb} à ${legende?.[2]?.intervalFin || ''} : ${legende?.[2]?.descriptionLeg || ''}`,
        legendText4: `${legende?.[3]?.intervalDeb} à ${legende?.[3]?.intervalFin || ''} : ${legende?.[3]?.descriptionLeg || ''}`,
        recommendationText: recomndation,
      });
    } else {
      setErrorMessage('Index non trouvé.');
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 mt-4 w-full">
      {/* Section principale à gauche */}
      <div className="flex-1">
      
        {loading || !image ? (
          <IndiqueErreur />
        ) : (
          <div>
            <img
              src={image.imageUrl}
              alt="Fetched Satellite"
              className="w-full h-auto object-cover rounded-xl shadow-md"
            />
            <div className="bg-gray-100 p-4 rounded-lg shadow-md text-center mt-4">
              <p className="text-lg font-semibold text-gray-700">Période de l'image</p>
              <p className="text-sm text-gray-600">
                <span className="font-bold">Début:</span> {image.dateDebut}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-bold">Fin:</span> {image.dateFin}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Boutons à droite */}
      <div className="flex flex-col items-stretch gap-3 w-full lg:w-60">
        <p className="text-lg font-semibold text-gray-800 mb-2 text-center">Indices disponibles</p>
        {indices.map((index) => (
          <button
            type="button"
            key={index.indiceId}
            onClick={() => handleButtonClick(index.indiceId)}
            className="bg-SidebarColor hover:bg-gray-200 text-gray-800 font-medium rounded-xl p-4 shadow transition text-center"
          >
            {index.indiceName}
          </button>
        ))}
      </div>

      {errorMessage && (
        <p className="text-red-500 mt-4 text-sm">{errorMessage}</p>
      )}
    </div>
  );
};

export default IndexButtons;
