// src/pages/MarketplacePage.js
import React, { useState, useContext, useEffect } from 'react';
import SearchBar from './../../components/pages/user/MarketPlace/SearchBar';
import ProductGallery from '../../components/pages/user/MarketPlace/ProductGallery';
import FilterButton from '../../components/common/FiltreButton';
import translations from './../../utils/constant/marketPlace';
import { LanguageContext } from './../../context/LanguageContext';
import { makeRequest } from './../../utils/api/httpService';

const Marketplace = () => {
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [publications, setPublications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await makeRequest('/publications/all', 'GET');
        if (response.status !== 200) {
          setErrorMessage('Erreur lors de chargement des publications');
          setIsLoading(false);
          setShowError(true);
        } else {
          setPublications(response.data);
          setIsLoading(false);
        }
      } catch (error) {
        setErrorMessage('Erreur lors de chargement des publications');
        setShowError(true);
        setIsLoading(false);
        console.error('Erreur lors de recupuration des données ', error);
      }
    }
    fetchData();
  }, []);

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
    <div className="flex-grow px-2 md:px-4 mt-4 md:mt-12">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4">
        <div className="w-full sm:w-2/3 md:w-1/2">
          <SearchBar placeholder={texts.searchPlaceholder} onSearch={handleSearch} />
        </div>
        <div className="w-full sm:w-auto mr-0 sm:mr-4 md:mr-8 lg:mr-20">
          <FilterButton text={texts.filterButton} options={filterOptions} onSelect={handleFilterSelect} />
        </div>
      </div>

      {!isLoading && <ProductGallery products={filteredProducts} />}
      
      {showError && (
        <div className="flex justify-center p-4 mx-auto text-red-500 text-center">
          {errorMessage || 'Erreur est survenue, veuillez rafraîchir la page svp !'}
        </div>
      )}
    </div>
  );
};

export default Marketplace;