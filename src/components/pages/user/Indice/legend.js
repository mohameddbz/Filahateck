import React, { useContext } from 'react';
import { TextContext } from './../../../../context/TextContext';

const Legend = ({ indicesData }) => {
  const { textData } = useContext(TextContext);

  // Légendes par défaut depuis TextContext
  const defaultLegends = [
    { color: '#1E40AF', text: textData?.legendText1 }, // Bleu foncé
    { color: '#60A5FA', text: textData?.legendText2 }, // Bleu moyen
    { color: '#BFDBFE', text: textData?.legendText3 }, // Bleu clair
    { color: '#DBEAFE', text: textData?.legendText4 }, // Bleu très clair
  ];

  // Vérifier si indicesData contient des légendes valides
  const hasData = indicesData && indicesData.legends && indicesData.legends.length > 0;
  const legendsToShow = hasData ? indicesData.legends : defaultLegends;

  return (
    <div className="w-1/2 text-sm">
      <h3 className="font-semibold text-myOrange">Légende de la carte</h3>
      <ul className="mt-2 space-y-1">
        {legendsToShow.map((legend, index) => (
          <li key={index} className="flex items-center">
            <span 
              className="inline-block w-4 h-4 rounded-full mr-2" 
              style={{ backgroundColor: legend.color || 'transparent' }} // ✅ Fixed color application
            />
            {legend.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Legend;
