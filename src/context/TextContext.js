// src/context/TextContext.js
import React, { createContext, useState } from 'react';

export const TextContext = createContext();

export const TextProvider = ({ children }) => {
  const [textData, setTextData] = useState({
    title: 'Indice NDWI',
    description: 'Vous pouvez surveiller ci-dessous les changements dans la teneur en eau des feuilles et pour surveiller les changements liés à la teneur en eau dans les plans d eau.',
    legendText1: 'Surface de l’eau',
    legendText2: 'Inondation, haute humidité',
    legendText3: 'Sécheresse modérée, surfaces non aqueuses',
    legendText4: 'Sécheresse, surfaces non aqueuses',
    recommendationText: 'Utilisez des systèmes d irrigation économes en eau, comme le goutte-à-goutte ou les asperseurs basse pression, pour réduire la consommation d eau tout en maximisant l apport aux cultures.',
  });

  const updateText = (newTexts) => {
    setTextData((prevData) => ({
      ...prevData,
      ...newTexts,  // Merge new text values with the existing state
    }));
  };

  return (
    <TextContext.Provider value={{ textData, updateText }}>
      {children}
    </TextContext.Provider>
  );
};
