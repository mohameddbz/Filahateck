import React, { useState } from 'react';

const ImageUpload = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
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
        onChange={handleImageChange} 
        style={{ display: 'none' }} 
      />
      {image ? (
        <img src={image} alt="Uploaded" className="h-full rounded object-cover" />
      ) : (
        <p>Ajoutez une photo</p>
      )}
    </div>
  );
};

export default ImageUpload;
