import React, { useState, useEffect } from 'react';
import { getProductsByCategoryName } from '../api-client';
import SingleProductView from './SingleProductView';
import './Products.css';

const CategoryView = (props) => {
  const {selectedCategory, setCart, isLoggedIn} = props;
const [productsByCategory, setProductsByCategory] = useState([]);

  useEffect(() => { 
    const fetchProductsByCategory = async () => {
    try {

   // fetch products by category view
   const products = await getProductsByCategoryName(selectedCategory);
   setProductsByCategory(products);

    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
    fetchProductsByCategory();
  }, []);


  return (
    <div className="products-container">
      <h2>{selectedCategory}</h2>
      {
      productsByCategory.length ? 
        productsByCategory.map((product, index) => {
        return (
          <div key={index}>
            <SingleProductView
              selectedProduct={product}
              setCart={setCart}
              isLoggedIn={isLoggedIn}
            />
          </div>
        );
      })
      
      :<></>
    
      }
    </div>
  );
};

 export default CategoryView;
