
import React, { useState } from 'react';
const ImageUpload = ({ onImagesChange, existingImages = [], onRemoveExistingImage }) => {
  const [images, setImages] = useState([]); // Pour les nouvelles images

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const imageUrls = files.map(file => URL.createObjectURL(file));

    setImages((prevImages) => [...prevImages, ...imageUrls]);
    onImagesChange(files); // Transmettre les fichiers au parent
  };

  const handleRemoveImage = (index, isExisting) => {
    return (e) => {
      e.stopPropagation();
      e.preventDefault();

      if (isExisting) {
        // Supprimer une image existante
        onRemoveExistingImage(index); // Appeler la fonction du parent
      } else {
        // Supprimer une nouvelle image
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
        onImagesChange((prevFiles) => prevFiles.filter((_, i) => i !== index));
      }
    };
  };

  return (
    <div
      className="flex flex-col w-5/6 bg-gray-200 items-center justify-center border-2 border-dashed border-gray-400 rounded h-32 cursor-pointer text-gray-600"
      onClick={() => document.getElementById('imageUploadInput').click()}
    >
      <input
        type="file"
        id="imageUploadInput"
        accept="image/*"
        multiple
        onChange={handleImageChange}
        style={{ display: 'none' }}
      />
      {(existingImages.length > 0 || images.length > 0) ? (
        <div className="grid grid-cols-3 gap-2 p-2">
          {/* Afficher les images existantes */}
          {existingImages.map((image, index) => (
            <div key={`existing-${index}`} className="relative">
              <img src={image} alt={`Existing ${index}`} className="h-20 w-20 rounded object-cover" />
              <button
                className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1"
                onClick={handleRemoveImage(index, true)}
              >
                X
              </button>
            </div>
          ))}
          {/* Afficher les nouvelles images */}
          {images.map((image, index) => (
            <div key={`new-${index}`} className="relative">
              <img src={image} alt={`New ${index}`} className="h-20 w-20 rounded object-cover" />
              <button
                className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1"
                onClick={handleRemoveImage(index, false)}
              >
                X
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>Ajoutez des photos</p>
      )}
    </div>
  );
};

export default ImageUpload;