import React, { useContext, useState } from 'react';
import FormInput from './../../../ui/FormInput';
import ImageUpload from './ImageUpload';
import { LanguageContext } from './../../../../context/LanguageContext';
import { translations } from './../../../../utils/constant/ProductForm';
import { makeRequest } from './../../../../utils/api/httpService';
import Success from './../../../common/Success';
import Error from './../../../common/Error';

const ProductFormUpdate = ({ productData }) => {
  console.log('productData', productData);
  const { isArabic } = useContext(LanguageContext);
  const lang = isArabic ? 'arabic' : 'french';
  const texts = translations[lang];

  // Construire les URLs des images existantes avec leurs IDs
  const existingImages = productData?.images?.map((image) => {
    return {
      id: image.id, // ID de l'image
      url: `${process.env.REACT_APP_API_URL}${process.env.REACT_APP_BACK_END_STATIC_FOLDER}${process.env.REACT_APP_PUBLICATIONS_FOLDER}${image.imagePath}`,
    };
  }) || [];

  // Initialiser le formulaire avec les données du produit
  const [formData, setFormData] = useState({
    productName: productData?.nomProduit || '',
    quantity: productData?.quantité || '',
    price: productData?.prixUnitaire || '',
    location: productData?.addresse || '',
    phone: productData?.phoneNumber || '',
    disponibility: productData?.etat || 'Disponible',
    images: [], // Pour les nouvelles images téléchargées
    existingImages: existingImages, // Pour les images existantes
  });

  // États pour la gestion des messages de succès et d'erreur
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // État pour stocker les IDs des images supprimées
  const [deletedImageIds, setDeletedImageIds] = useState([]);

  // Gérer les changements des champs du formulaire
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Gérer les nouvelles images téléchargées
  const handleImagesChange = (files) => {
    setFormData({ ...formData, images: files });
  };

  // Gérer la suppression d'une image existante
  const handleRemoveExistingImage = (index) => {
    const imageToRemove = formData.existingImages[index];
    const updatedExistingImages = formData.existingImages.filter((_, i) => i !== index);

    // Ajouter l'ID de l'image supprimée à deletedImageIds
    if (imageToRemove.id) {
      setDeletedImageIds((prevIds) => [...prevIds, imageToRemove.id]);
    }

    // Mettre à jour existingImages
    setFormData({ ...formData, existingImages: updatedExistingImages });
  };

  // Gérer la mise à jour du produit
  const handleUpdate = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('productName', formData.productName);
    data.append('quantity', formData.quantity);
    data.append('price', formData.price);
    data.append('location', formData.location);
    data.append('phone', formData.phone);
    data.append('disponibility', formData.disponibility);

    // Ajouter les nouvelles images
    formData.images.forEach((image) => {
      data.append('images', image);
    });

    // Ajouter les IDs des images supprimées
    deletedImageIds.forEach((id) => {
      data.append('deletedImageIds', id);
    });

    try {
      const response = await makeRequest(`/publications/update/${productData.id}`, 'PUT', data);
      if (response && response.status === 200) {
        setSuccessMessage('Produit mis à jour avec succès');
        setShowSuccess(true);
      }
    } catch (error) {
      setErrorMessage('Erreur lors de la mise à jour du produit');
      setShowError(true);
    }
  };

  // Gérer la suppression du produit
  const handleDelete = async () => {
    try {
      const response = await makeRequest(`/publications/delete/${productData.id}`, 'DELETE');
      if (response && response.status === 200) {
        setSuccessMessage('Produit supprimé avec succès');
        setShowSuccess(true);
      }
    } catch (error) {
      setErrorMessage('Erreur lors de la suppression du produit');
      setShowError(true);
    }
  };

  return (
    <div className="bg-gray-100 p-6 rounded-md shadow-lg max-w-5xl mx-auto flex flex-col items-center" style={{ direction: isArabic ? 'rtl' : 'ltr' }}>
      <h3 className="text-xl font-bold text-orange-500 mb-4 text-center">{texts.updateTitle}</h3>
      <form className="space-y-4 w-full flex flex-col items-center">
        <div className="space-y-4 w-5/6">
          <FormInput name="productName" label={texts.productName} value={formData.productName} handleChange={handleInputChange} />
          <FormInput name="quantity" label={texts.quantity} value={formData.quantity} handleChange={handleInputChange} />
          <FormInput name="price" label={texts.price} value={formData.price} handleChange={handleInputChange} />
          <FormInput name="location" label={texts.location} value={formData.location} handleChange={handleInputChange} />
          <FormInput name="phone" label={texts.phone} value={formData.phone} handleChange={handleInputChange} />

          {/* Sélecteur pour la disponibilité */}
          <div>
            <label className="block text-gray-700 font-semibold">{texts.disponibility}</label>
            <select
              name="disponibility"
              value={formData.disponibility}
              onChange={handleInputChange}
              className="w-full border border-green-500 p-2 rounded"
            >
              <option value="DISPO">{texts.available}</option>
              <option value="NONDISPO">{texts.unavailable}</option>
            </select>
          </div>
        </div>

        {/* Composant d'upload d'images */}
        <ImageUpload
          onImagesChange={handleImagesChange}
          existingImages={formData.existingImages.map((img) => img.url)} // Afficher les URLs
          onRemoveExistingImage={handleRemoveExistingImage}
        />

        {/* Boutons Enregistrer et Supprimer */}
        <div className="flex justify-between w-5/6 mt-4">
          <button onClick={handleUpdate} className="w-1/3 bg-orange-500 text-white py-2 rounded">{texts.saveButton}</button>
          <button onClick={handleDelete} className="w-1/3 bg-red-500 text-white py-2 rounded">{texts.deleteButton}</button>
        </div>
      </form>

      {/* Afficher les messages de succès et d'erreur */}
      {showSuccess && <Success message={successMessage} onClose={() => setShowSuccess(false)} />}
      {showError && <Error message={errorMessage} onClose={() => setShowError(false)} />}
    </div>
  );
};

export default ProductFormUpdate;