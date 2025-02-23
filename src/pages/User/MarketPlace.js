// src/pages/MarketplacePage.js

import React, { useState, useContext, useEffect } from 'react';
import SearchBar from './../../components/pages/user/MarketPlace/SearchBar';
import ProductGallery from '../../components/pages/user/MarketPlace/ProductGallery';
import { products } from "./../../data/user/productList";
import FilterButton from '../../components/common/FiltreButton';
import translations from './../../utils/constant/marketPlace';
import { LanguageContext } from './../../context/LanguageContext';
import { makeRequest } from './../../utils/api/httpService';

const Marketplace = () => {

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [publications, setPublications] = useState([]);
  const  [isLoading , setIsLoading] =useState(true)
  useEffect( () => {
    async function fetchData() {
      try {
        const response = await makeRequest('/publications/all', 'GET');
        if (response.status !== 200) {
          setErrorMessage('Erreur lors de chargement des publications');
          setIsLoading(false)
          setShowError(true);
        }else{
          setPublications(response.data);
          setIsLoading(false)
        }

      } catch (error) {
        setErrorMessage('Erreur lors de chargement des publications');
        setShowError(true);
        console.error('Erreur lors de recupuration des données ', error);
      }
    }
    fetchData();
  
  },[]);


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

  const filteredProducts = publications.filter((product) =>
    product.nomProduit.toLowerCase().includes(searchQuery.toLowerCase())
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
      {!isLoading  &&  <ProductGallery products={filteredProducts} />}  
      {showError &&  <div className="flex mx-auto text-red-500">Erreur est servenue , veuillez refresher la page svp !</div> }
    </div>  
  );
};

export default Marketplace;
