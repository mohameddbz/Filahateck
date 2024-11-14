// src/pages/MainLayout.js

import React, { useState, useContext } from 'react';
import { LanguageContext } from '../../context/LanguageContext';
import Suggestions from '../../components/pages/user/Ami/Suggestions';
import FilterButton from '../../components/common/FiltreButton';
import translations from '../../utils/constant/Ami';

const Ami = () => {
  const [selectedFilter, setSelectedFilter] = useState('');
  const { isArabic } = useContext(LanguageContext);
  const lang = isArabic ? 'arabic' : 'french';
  const texts = translations[lang];
  const filterOptions = ['Agriculteur', 'Fournisseur', 'Entreprise'];

  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
  };

  return (
    <div
      className={`flex-grow p-6 overflow-y-auto space-y-4 ${isArabic ? 'text-right' : 'text-left'}`}
      style={isArabic ? { direction: 'rtl' } : { direction: 'ltr' }}
    >
      <div className="mb-6">
        <p
          className="text-xl font-semibold mt-8"
          dangerouslySetInnerHTML={{ __html: texts.suggestionsTitle }}
        />
        <p>{texts.addToFriends}</p>
        <div className="mt-4 flex justify-end mr-10">
          <FilterButton text={texts.filterButton} options={filterOptions} onSelect={handleFilterSelect} />
        </div>
      </div>
      <Suggestions filter={selectedFilter} />
    </div>
  );
};

export default Ami;
