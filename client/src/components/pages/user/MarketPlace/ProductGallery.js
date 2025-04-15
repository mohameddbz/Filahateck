import { Link, useLocation } from 'react-router-dom';
import ProductCard from './../../../common/ProductCard';

const ProductGallery = ({ products }) => {
  const location = useLocation();
  const isSellerPage = location.pathname.includes('seller');

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
      {products.map((product, index) => (
        <Link to={isSellerPage ? `/seller/product-details/${product.id}` : `/user/product-details/${product.id}`} key={index}>
          <ProductCard {...product} />
        </Link>
      ))}
    </div>
  );
};

export default ProductGallery;