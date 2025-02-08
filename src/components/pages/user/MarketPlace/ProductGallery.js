import React from 'react';
import ProductCard from './../../../common/ProductCard';
import { Link } from 'react-router-dom';



const ProductGallery = ({products}) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
  {products.map((product, index) => (
    <Link to={`/user/product-details/${product.id}`} > <ProductCard key={index} {...product} /></Link>
  ))}
</div>
);

export default ProductGallery;
