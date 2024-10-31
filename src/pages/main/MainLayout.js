// src/pages/MainLayout.js

import React, { useState } from 'react';
import SidebarLayout from './../../components/layout/SidebarLayout';
import Suggestions from './suggestions';
import Header from '../../components/layout/Header'; // Import if not already imported
import ButtonLang from '../../components/common/Button/ButtonLang'; // Import if not already imported
import FilterButton from '../../components/common/filtre/FiltreButton';

const MainLayout = () => {
  const [selectedFilter, setSelectedFilter] = useState('');
  const filterOptions = ['Agriculteur', 'Fournisseur', 'Entreprise'];

  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
  };

  return (
    <SidebarLayout Header={Header} ButtonLang={ButtonLang}>
      <div className="mb-6 space-y-2">
        <p className="text-xl font-semibold mt-8">
          Vous pouvez retrouver ci-dessous des suggestions d'amitié entre vous et d'autres agriculteurs, fournisseurs, et entreprises !
        </p>
        <p>
          Vous pouvez ajouter quelqu'un à votre liste d'amis, ou bien supprimer la suggestion immédiatement.
        </p>
        <div className="mt-4 flex justify-end mr-10">
          <FilterButton text={"List des amis"} options={filterOptions} onSelect={handleFilterSelect} />
        </div>
      </div>
      <Suggestions filter={selectedFilter} />
    </SidebarLayout>
  );
};

export default MainLayout;
