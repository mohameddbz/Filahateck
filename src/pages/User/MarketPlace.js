// src/pages/MarketplacePage.js

import React, { useState, useContext } from 'react';
import SearchBar from './../../components/pages/user/MarketPlace/SearchBar';
import ProductGallery from '../../components/pages/user/MarketPlace/ProductGallery';
import { products } from "./../../data/user/productList";
import FilterButton from '../../components/common/FiltreButton';
import translations from './../../utils/constant/marketPlace';
import { LanguageContext } from './../../context/LanguageContext';

const Marketplace = () => {
  const [selectedFilter, setSelectedFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const { isArabic } = useContext(LanguageContext);
  const lang = isArabic ? 'arabic' : 'french';
  const texts = translations[lang];

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
    <div className="flex-grow mt-4" >
      <div className="flex items-center justify-between mb-4">
        <SearchBar placeholder={texts.searchPlaceholder} onSearch={handleSearch} />
        <div className="mr-20">
          <FilterButton text={texts.filterButton} options={filterOptions} onSelect={handleFilterSelect} />
        </div>
      </div>
      <ProductGallery products={filteredProducts} />
    </div>  
  );
};

export default Marketplace;
