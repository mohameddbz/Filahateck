import React from 'react';

const MapSection = ({ imageData, loading, error }) => {
  if (error && !imageData ) {
    return <img
    src='./../../../../../image.png'
    alt="Fetched Satellite Image"
    className="w-full h-full object-cover rounded-lg"
  />;
  }

  return (
    <div className="w-full h-full relative text-white p-4 rounded-lg">
      {imageData ? (
        <>
          <img
            src={imageData}
            alt="Fetched Satellite Image"
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute bottom-4 right-4 bg-white text-black p-2 rounded-md shadow">
            <p>NDWI: -0.2</p>
            <p>Récolte: Pomme de terre</p>
          </div>
        </>
      ) : (
        <img
            src='./../../../../../image.png'
            alt="Fetched Satellite Image"
            className="w-full h-full object-cover rounded-lg"
          />
      )}
    </div>

  );
};

export default MapSection;
