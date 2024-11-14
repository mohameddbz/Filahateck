import React, { useContext } from 'react';
import { LanguageContext } from './../../../../context/LanguageContext';

const translations = {
  french: {
    date: "Aujourd'hui 30/09",
    description: "Vous pouvez toujours consulter vos achats, vos ventes...",
    entries: "Entrées",
    exits: "Sorties",
    difference: "Différence",
  },
  arabic: {
    date: "اليوم 30/09",
    description: "يمكنك دائمًا استعراض مشترياتك و مبيعاتك...",
    entries: "الدخل",
    exits: "الخروج",
    difference: "الفرق",
  },
};

function HeaderStock() {
  const { isArabic } = useContext(LanguageContext);
  const lang = isArabic ? 'arabic' : 'french';
  const texts = translations[lang];

  return (
    <div className="bg-gray-200 p-4 ml-4 mr-4 mt-4 rounded-lg shadow-md flex items-center justify-between" >
      <div>
        <p className="text-xl font-semibold">{texts.date}</p>
        <p className="text-sm text-gray-500">{texts.description}</p>
      </div>
      <div className="flex space-x-8">
        <div className="text-center">
          <p className="text-xl font-bold text-green-600">25 000 DZ</p>
          <p className="text-lg text-gray-600">{texts.entries}</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold text-red-600">17 000 DZ</p>
          <p className="text-lg text-gray-600">{texts.exits}</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold text-yellow-600">8 000 DZ</p>
          <p className="text-lg text-gray-600">{texts.difference}</p>
        </div>
      </div>
    </div>
  );
}

export default HeaderStock;
