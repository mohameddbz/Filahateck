import React, { useContext } from 'react';
import { TextContext } from './../../../../context/TextContext';

const Legende = ({ indicesData }) => {
  const { textData } = useContext(TextContext);
  const matchedObject = indicesData.find(item => item.indiceName === textData.title);

  const getUniqueLegends = (legendes) => {
    const seen = new Map();
    legendes.forEach((legend) => {
      if (!seen.has(legend.legendeId)) {
        seen.set(legend.legendeId, legend);
      }
    });
    return Array.from(seen.values());
  };

  const legendItems = matchedObject ? getUniqueLegends(matchedObject.legende) : [];
  // Légendes par défaut depuis TextContext
  const defaultLegends = [

  ];
  console.log(legendItems)
  // Vérifier si indicesData contient des légendes valides
  const hasData = indicesData && indicesData.legends && indicesData.legends.length > 0;
  const legendsToShow = hasData ? indicesData.legends : defaultLegends;

  return (
    <div className="w-1/2 text-sm">
      <h3 className="font-semibold text-myOrange">Légende de la carte</h3>
      <ul className="mt-2 space-y-1">
        {legendItems.map((legend, index) => (
          <li key={index} className="flex items-center">
                <span
                  className="inline-block w-4 h-4 rounded-full mr-2"
                  style={{ backgroundColor: legend.color || 'gray' }}
                />
                <span>
                  [{legend.intervalDeb} , {legend.intervalFin}] : {legend.descriptionLeg}
                </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Legende;