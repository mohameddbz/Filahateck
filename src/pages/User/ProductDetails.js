import React, { useState , useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { makeRequest } from '../../utils/api/httpService';
import { useNavigate } from 'react-router-dom'; // Importez useNavigate

import { FaMapMarkerAlt, FaPhoneAlt, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Error from '../../components/common/Error';
import Loading from '../../components/common/Loading';
const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showError,setShowError]= useState(false);
  const [isLoading,setIsLoading]= useState(true);
  const navigate = useNavigate(); 

   useEffect( () => {
    console.log("the id is --> ",id);
      async function fetchData() {
        try {
          const response = await makeRequest(`/publications/${id}`, 'GET');
          if (response.status !== 200) {
            // setErrorMessage('Erreur lors de chargement des publications');
            setIsLoading(false);
             setShowError(true);
          }else{
            setProduct(response.data);
            setIsLoading(false);
          }
  
        } catch (error) {
          // setErrorMessage('Erreur lors de chargement des publications');
          setShowError(true);
          setIsLoading(false);
          console.error('Erreur lors de recupuration des données ', error);
        }
      }
      fetchData();
    
    },[]);
    if(isLoading){
      return <Loading/>;
        }
  // Fonction pour afficher l'image précédente
  const showPreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  // Fonction pour afficher l'image suivante
  const showNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };

   const handleGoBack = () => {
    navigate(-1); // Retourne à la page précédente
  };

  return (
    <div className='relative flex justify-center items-center'>
 {/* Bouton Retour */}
      <button
        onClick={handleGoBack}
        className="absolute top-4 left-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition duration-300 z-10"
      >
        <FaArrowLeft />
      </button>
   
    <div className="bg-white rounded-lg shadow-md overflow-hidden p-6 max-w-4xl mx-auto relative">
     

      {/* Galerie d'images */}
      <div className="relative">
        <img
          src={`${process.env.REACT_APP_API_URL}${process.env.REACT_APP_BACK_END_STATIC_FOLDER}${process.env.REACT_APP_PUBLICATIONS_FOLDER}${product.images[currentImageIndex].imagePath}`}
          alt={product.nomProduit}
          className="w-full h-96 object-cover rounded-lg"
        />

        {product.images.length > 1 && (
          <button
            onClick={showPreviousImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition duration-300"
          >
            <FaArrowLeft />
          </button>
        )}

        {product.images.length > 1 && (
          <button
            onClick={showNextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition duration-300"
          >
            <FaArrowRight />
          </button>
        )}

        {product.images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
            {`${currentImageIndex + 1} / ${product.images.length}`}
          </div>
        )}
      </div>

      {/* Détails du produit */}
      <div className="mt-6">
        <h2 className="text-2xl font-bold text-gray-800">{product.nomProduit}</h2>
        <p className="text-red-600 text-xl font-bold mt-2">{product.prixUnitaire} DZ</p>

        {/* Adresse */}
        <div className="flex items-center text-gray-600 mt-4">
          <FaMapMarkerAlt className="mr-2" />
          <span>{product.addresse}</span>
        </div>

        {/* Numéro de téléphone */}
        <div className="flex items-center text-gray-600 mt-2">
          <FaPhoneAlt className="mr-2" />
          <span>{product.phoneNumber}</span>
        </div>
      </div>

      {/* Affichage des erreurs */}
      {showError && <Error message="Erreur, veuillez réessayer plus tard" />}
    </div>
    </div> 

  );
};

export default ProductDetails;