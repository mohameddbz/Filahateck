// src/pages/MarketplacePage.js

import React, { useState } from 'react';
import SidebarLayout from './../../components/layout/SidebarLayout';
import SearchBar from './../../components/common/search/searchBar';
import ProductGallery from '../../components/common/Gallery/ProductGallery';
import { products } from "./../../utils/constant/productsList";
import ButtonLang from '../../components/common/Button/ButtonLang';
import Header from '../../components/layout/Header'; // Import if not already imported
import FilterButton from '../../components/common/filtre/FiltreButton';

const MarketplacePage = () => {
  const [selectedFilter, setSelectedFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const filterOptions = ['Agriculteur', 'Fournisseur', 'Entreprise'];

  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
    console.log(`Selected filter: ${filter}`);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <SidebarLayout Header={Header} ButtonLang={ButtonLang}>
      <div className="flex-grow mt-4">
        <div className="flex items-center justify-between mb-4">
          <SearchBar onSearch={handleSearch} />
          <div className="mr-20">
            <FilterButton text={"list des materielles"} options={filterOptions} onSelect={handleFilterSelect} />
          </div>
        </div>
        <ProductGallery products={filteredProducts} />
      </div>
    </SidebarLayout>
  );
};

export default MarketplacePage;
