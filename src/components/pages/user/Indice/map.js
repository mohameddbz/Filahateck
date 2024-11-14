// import React from 'react';

// const MapSection = () => (
//   <div className="relative w-3/4 bg-blue-500 mt-8 h-64 rounded-lg flex items-center justify-center">
//     <div className="bg-blue-300 w-3/4 h-48 relative text-white p-4 rounded-lg">
//       <div className="absolute bottom-4 right-4 bg-white text-black p-2 rounded-md shadow">
//         <p>NDWI: -0.2</p>
//         <p>Récolte: Pomme de terre</p>
//       </div>
//     </div>
//   </div>
// );

// export default MapSection;

import React, { useEffect, useState } from 'react';

const MapSection = () => {
  const [imageData, setImageData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch('http://localhost:5000/sentinel-image', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setImageData(imageUrl);
      } catch (error) {
        console.error('Error fetching the image:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, []);

  if (loading) {
    return <p>Loading image...</p>;
  }

  return (
    <div>
      {imageData ? (
        <img src={imageData} alt="Fetched from backend" style={{ maxWidth: '100%', height: 'auto' }} />
      ) : (
        <p>Error loading image.</p>
      )}
    </div>
  );
};

export default MapSection;
