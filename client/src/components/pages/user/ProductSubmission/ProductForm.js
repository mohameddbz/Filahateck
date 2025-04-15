import React, { useContext, useState } from 'react';
import FormInput from './../../../ui/FormInput';
import ImageUpload from './ImageUpload';
import { LanguageContext } from './../../../../context/LanguageContext';
import { translations } from './../../../../utils/constant/ProductForm';
import { makeRequest } from './../../../../utils/api/httpService';
import Success from './../../../common/Success'; 
import Error from './../../../common/Error';

const ProductForm = ({isAgreculteur,hasAbonnement,abonnement}) => {
  const { isArabic } = useContext(LanguageContext);
  const lang = isArabic ? 'arabic' : 'french';
  const texts = translations[lang];

  console.log('abonnement',abonnement);
console.log('hasAbonnement',hasAbonnement);

  const endpoint = isAgreculteur ? "/publications/add" : "/publications/add";

  // État du formulaire
  const [formData, setFormData] = useState({
    productName: '',
    quantity: '',
    price: '',
    location: '',
    phone: '',
    images: [],
  });

  // État pour afficher ou masquer le composant Success
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // État pour afficher ou masquer le composant Error
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Gérer la saisie des champs du formulaire
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Récupérer les images de ImageUpload
  const handleImagesChange = (files) => {
    setFormData({ ...formData, images: files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('productName', formData.productName);
    data.append('quantity', formData.quantity);
    data.append('price', formData.price);
    data.append('location', formData.location);
    data.append('phone', formData.phone);

    // Ajouter les images à FormData
    formData.images.forEach((image, index) => {
      data.append(`images`, image);
    });

    if(!isAgreculteur){
      if(hasAbonnement) {
         console.log('abonnement',abonnement);
        data.append('sellerAbonnementUserId',abonnement.id);
      }
    }

    try {
      const response = await makeRequest(endpoint, 'POST', data);
      console.log("la reponse de serveur est la suivante --->",response.status);
      if (response && response.status === 200) {
        // Afficher le composant Success
        setSuccessMessage('Publication créée avec succès');
        setShowSuccess(true);
      }
      else if (response.status === 401) {
        console.log("wsh reni nkteb est ----->",response.data.message);
        setErrorMessage(response.data.message);
        setShowError(true);
      }
      console.log('Produit ajouté:', response);
    } catch (error) {
      // Afficher le composant Error en cas d'erreur
      setErrorMessage('Erreur lors de la création de la publication');
      setShowError(true);
      console.error('Erreur lors de l\'ajout du produit:', error);
    }
  };

  // Fermer le composant Success
  const handleCloseSuccess = () => {
    setShowSuccess(false);
  };

  // Fermer le composant Error
  const handleCloseError = () => {
    setShowError(false);
  };

  return (
    <div className="bg-gray-100 p-6 rounded-md shadow-lg max-w-5xl mx-auto flex flex-col items-center" style={{ direction: isArabic ? 'rtl' : 'ltr' }}>
      <h3 className="text-xl font-bold text-orange-500 mb-4 text-center">{texts.title}</h3>
      <form className="space-y-4 w-full flex flex-col items-center">
        <div className="space-y-4 w-5/6">
          <FormInput name="productName" label={texts.productName} value={formData.productName} handleChange={handleInputChange} />
          <FormInput name="quantity" label={texts.quantity} value={formData.quantity} handleChange={handleInputChange} />
          <FormInput name="price" label={texts.price} value={formData.price} handleChange={handleInputChange} />
          <FormInput name="location" label={texts.location} value={formData.location} handleChange={handleInputChange} />
          <FormInput name="phone" label={texts.phone} value={formData.phone} handleChange={handleInputChange} />
        </div>
        <ImageUpload onImagesChange={handleImagesChange} />
        <button onClick={handleSubmit} className="w-1/4 bg-orange-500 text-white py-2 rounded mt-4">{texts.submitButton}</button>
      </form>

      {/* Afficher le composant Success si showSuccess est true */}
      {showSuccess && (
        <Success message={successMessage} onClose={handleCloseSuccess} />
      )}

      {/* Afficher le composant Error si showError est true */}
      {showError && (
        <Error message={errorMessage} onClose={handleCloseError} />
      )}
    </div>
  );
};

export default ProductForm;