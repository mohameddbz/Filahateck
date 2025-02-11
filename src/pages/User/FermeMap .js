import React , { useContext } from 'react';
import FarmVisualization from '../../components/pages/user/FermeMap/FarmVisualization';
import { LanguageContext } from './../../context/LanguageContext';
import {translations} from './../../utils/constant/FermeMap'

const FermeMap = () => {
  const { isArabic } = useContext(LanguageContext);
    const lang = isArabic ? 'arabic' : 'french';
    const texts = translations[lang];
  const parcels = [
    
     {
      id: "1",
      nomPercel: "Parcelle A",
      coordinates: [
       [  [3.25676,36.522881],[3.34671,36.458293],[3.276672,36.408573],[3.190842,36.487557],[3.25676,36.522881]]
      ]
    },
    {
      id: "percel23",
      nomPercel: "Parcelle B",
      coordinates: [
        [[3.247147,36.394757],[3.162689,36.473755],[2.991028,36.41631],[3.045273,36.362693],[3.084412,36.384254],[3.155136,36.312912],[3.247147,36.394757]]
      ]
    },
    {
      id: "percel24",
      nomPercel: "Parcelle C",
      coordinates: [
        [ [2.98871,36.415066],[3.045101,36.355642],[2.993774,36.332828],[3.065872,36.254794],[3.028793,36.235412],[2.903824,36.378726],[2.98871,36.415066] ]
      ]
    },

   
  ];

  return (
   
  
      <div className='flex flex-col py-3 px-2 w-full items-center justify-center'>
       <p className={`w-full flex ${isArabic ? "justify-end" : "justify-start"}  font-semibold text-myOrange text-3xl`}>
       <h1 >{texts.farmMapTitle}</h1>
        </p> 
        <div className='my-3  border-2 rounded-2xl border-myOrange w-fit max-w-screen-xl  h-fit    overflow-scroll scrollbar-hide' >
        <FarmVisualization parcels={parcels} />
        </div>
      </div>
  );

};

export default FermeMap;