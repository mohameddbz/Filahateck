import React, { useRef, useEffect, useState } from 'react';

const PublicOffre = ({ text, titre, description, price, isChecked, onCheckboxChange }) => {
  const containerRef = useRef(null);
  const [containerHeight, setContainerHeight] = useState(0);
  
  // Mettre à jour la hauteur du conteneur quand le composant est monté ou redimensionné
  useEffect(() => {
    if (containerRef.current) {
      const updateHeight = () => {
        const height = containerRef.current.offsetHeight;
        setContainerHeight(height);
      };
      
      updateHeight();
      window.addEventListener('resize', updateHeight);
      return () => window.removeEventListener('resize', updateHeight);
    }
  }, []);

  return (
    <div className="bg-gray-200 rounded-3xl w-full" ref={containerRef}>
      <div className="flex flex-col md:flex-row items-start relative">
        {/* Version mobile: rectangle standard */}
        <div className="md:hidden bg-green-500 w-full h-24 rounded-t-3xl flex items-center justify-center text-white font-bold p-2 text-center">
          <p>{text}</p>
        </div>
        
        {/* Version desktop: forme triangulaire en position absolue */}
        <div 
          className="hidden md:flex w-32 items-center justify-center text-white font-bold relative z-10"
          style={{ height: containerHeight > 0 ? `${containerHeight}px` : 'auto' }}
        >
          {/* Fond triangulaire */}
          <div 
            className="absolute left-0 top-0 bg-green-500 clip-path-polygon rounded-tl-3xl rounded-bl-3xl"
            style={{ width: '100%', height: '100%' }}
          ></div>
          
          {/* Texte centré */}
          <div className="w-24 text-center relative z-10">
            <p>{text}</p>
          </div>
        </div>
        
        
        <div className="flex-1 p-4 md:ml-4 w-full">
          <h2 className="text-orange-500 font-bold text-lg md:text-xl text-center md:text-left">{titre}</h2>
          <ul className="list-disc ml-4 md:ml-6 mt-2 text-sm md:text-base">
            {description.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        
        <div className="flex items-center justify-center gap-4 p-4 w-full md:w-auto">
          <div className="bg-yellow-400 w-full md:w-32 h-10 rounded-lg flex items-center justify-center text-red-600">
            <p>{price}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicOffre;