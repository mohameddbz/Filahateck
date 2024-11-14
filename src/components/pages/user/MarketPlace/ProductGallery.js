import React from 'react';
import ProductCard from './../../../common/ProductCard';


const ProductGallery = ({products}) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
  {products.map((product, index) => (
    <ProductCard key={index} {...product} />
  ))}
</div>
);

export default ProductGallery;
