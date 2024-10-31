

import React from 'react';
import SidebarLayout from './../../components/layout/SidebarLayout'; // Import the SidebarLayout
import Header from '../../components/layout/Header';
import ProductForm from '../../components/form/ProductForm';
import ProductGallery from '../../components/common/Gallery/ProductGallery';
import ButtonLang from '../../components/common/Button/ButtonLang';
import { products } from "./../../utils/constant/productsList";

const ProductSubmissionPage = () => {
  return (
    <SidebarLayout Header={Header} ButtonLang={ButtonLang}>
      <div className="flex-grow p-6 mt-4">
        <div className="mb-6 pl-6 space-y-1">
          <p className="text-xl font-semibold mt-8">
            Vous pouvez maintenant ajouter vos produits que vous voulez offrir au public
          </p>
          <p>
            Veuillez remplir le formulaire ci-dessous pour ajouter un produit à publier
          </p>
        </div>
        <ProductForm />
        <div className="mb-6 pl-6 space-y-1">
          <p className="text-xl font-semibold mt-8">
            Vous pouvez consulter ci-dessous les produits que vous avez publiés préalablement
          </p>
        </div>
        <ProductGallery products={products} />
      </div>
    </SidebarLayout>
  );
};

export default ProductSubmissionPage;
