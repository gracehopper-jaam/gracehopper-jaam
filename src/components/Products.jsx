import React, { useState, useEffect } from 'react';
import './Products.css';
import { getAllProducts } from '../api-client';
import SingleProductView from './SingleProductView';
import Images from '../media';

const Products = (props) => {
  const {setCart,isLoggedIn} = props;
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [selectedProduct,setSelectedProduct] = useState()

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      // Fetch products from the API
      const { products } = await getAllProducts();
      setProducts(products);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="products-container">
   
      <h2>All Products</h2>
       {products.map((product, index) => {
                return (
                  <div key={index}>
                    <SingleProductView selectedProduct = {product} setCart = {setCart} isLoggedIn ={isLoggedIn}/>
                  </div>
                );
              })}
    </div>
  );
};

 export default Products;
