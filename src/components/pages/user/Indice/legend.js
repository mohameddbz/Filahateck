import React from 'react';

const Legend = () => (
  <div className="w-1/2 text-sm">
    <h3 className="font-semibold text-myOrange">Légende de la carte</h3>
    <ul className="mt-2 space-y-1">
      <li><span className="inline-block w-4 h-4 bg-blue-800 rounded-full mr-2"></span>0,2 à 1   Surface de l’eau</li>
      <li><span className="inline-block w-4 h-4 bg-blue-400 rounded-full mr-2"></span>0,0 à 0,2   Inondation, haute humidité</li>
      <li><span className="inline-block w-4 h-4 bg-blue-200 rounded-full mr-2"></span>-0,3 à 0,0  Sécheresse modérée, surfaces non aqueuses</li>
      <li><span className="inline-block w-4 h-4 bg-blue-100 rounded-full mr-2"></span>-1 à 0,3   Sécheresse, surfaces non aqueuses</li>
    </ul>
  </div>
);

export default Legend;
