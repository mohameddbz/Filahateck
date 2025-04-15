import React, { useContext } from 'react';
import { TextContext } from './../../../../context/TextContext';

const Legend = ({ indicesData }) => {
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

  return (
    <div className="w-full text-sm">
      <h3 className="font-semibold text-myOrange mb-2">Légende de la carte</h3>

      {legendItems.length > 0 ? (
        <div className="mb-4">
          <h4 className="font-medium text-gray-700 mb-1">{matchedObject.indiceName}</h4>
          <ul className="space-y-1">
            {legendItems.map((legend, i) => (
              <li key={i} className="flex items-center">
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
      ) : (
        <p className="text-gray-500">Aucune légende disponible pour cet indice.</p>
      )}
    </div>
  );
};

export default Legend;
