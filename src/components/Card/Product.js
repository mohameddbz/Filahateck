import React from 'react';

const Product = ({ src }) => (
  <div className="rounded-md overflow-hidden shadow-lg">
    <img src={src} alt="Product" className="w-full h-32 object-cover" />
  </div>
);

export default Product;
