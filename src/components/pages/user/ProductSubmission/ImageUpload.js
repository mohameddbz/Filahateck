import React, { useState } from 'react';

const ImageUpload = ({onImagesChange}) => {
  const [images, setImages] = useState([]);

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files); 
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setImages(prevImages => [...prevImages, ...imageUrls]); 


    onImagesChange(files); 
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
      {images.length > 0 ? (
        <div className="grid grid-cols-3 gap-2 p-2">
          {images.map((image, index) => (
            <img key={index} src={image} alt={`Uploaded ${index}`} className="h-20 w-20 rounded object-cover" />
          ))}
        </div>
      ) : (
        <p>Ajoutez des photos</p>
      )}
    </div>
  );
};

export default ImageUpload;
