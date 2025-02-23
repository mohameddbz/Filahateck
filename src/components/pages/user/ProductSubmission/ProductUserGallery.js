import React from 'react';
import ProductCard from '../../../common/ProductCard';
import { Link , useLocation } from 'react-router-dom';

const ProductUserGallery = ({ products }) => {
  const location = useLocation();
    const isSellerPage = location.pathname.includes('seller');
  if (!products || !Array.isArray(products)) {
    return null; // ou retourner un message d'erreur ou un composant de chargement
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {products.map((product) => (
        <Link  to={isSellerPage ? `/seller/my-product-details/${product.id}`  : `/user/my-product-details/${product.id}`}>
          <ProductCard {...product} />
        </Link>
      ))}
    </div>
  );
};

export default ProductUserGallery;