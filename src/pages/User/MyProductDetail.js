import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductUpdateForm from "./../../components/pages/user/ProductSubmission/ProductUpdateForm";
import { makeRequest } from "./../../utils/api/httpService";


const MyProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
   async function fetchData() {
           try {
             const response = await makeRequest(`/publications/one/${id}`, 'GET');
             if (response.status !== 200) {
               setIsLoading(false);
                setError(true);
             }else{
               setProduct(response.data);
               setIsLoading(false);
             }
     
           } catch (error) {
             setError(true);
             setIsLoading(false);
             console.error('Erreur lors de recupuration des données ', error);
           }
         }
         fetchData();
  }, [id]);

 

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Product Details</h2>
      {product && <ProductUpdateForm productData={product}  />}
    </div>
  );
};

export default MyProductDetail;