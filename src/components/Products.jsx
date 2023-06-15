import React, { useState, useEffect } from 'react';
import './Products.css';
import { getAllProducts, getProductsByCategoryName } from '../api-client';
import SingleProductView from './SingleProductView';
import Images from '../media';
import { useNavigate } from 'react-router';

const Products = (props) => {
  const {setCart,isLoggedIn,setSelectedCategory,setCount,count} = props;
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [selectedProduct,setSelectedProduct] = useState()
  const navigate = useNavigate();

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
      <div className="icons-container">
        <div className='icon-container'>
          <img
          className="icons-image"
          src={Images.CategoryOverEar}
          alt="headphone"
          title="Headphones"
          onClick={() => {
            setSelectedCategory("Headphones");
            console.log("Headphones");
            navigate("/Headphones");
          }}
        />
        <img
          className="icons-image"
          src={Images.CategorySpeaker}
          alt="speaker"
          title="Speakers"
          onClick={() => {
            setSelectedCategory("Speakers");
            console.log("Speakers");
            navigate("/Speakers");
          }}
        />
        <img
          className="icons-image"
          src={Images.CategoryAccessories}
          alt="accessories"
          title="Accessories"
          onClick={() => {
            setSelectedCategory("Accessories");
            console.log("Accessories");
            navigate("/Accessories");
          }}
        />
      </div>
      <h2 id= "product-title">All Products</h2>
      {products.map((product, index) => {
        return (
          <div key={index}>
            <SingleProductView
              selectedProduct={product}
              setCart={setCart}
              isLoggedIn={isLoggedIn}
              setCount = {setCount}
              count ={count}
            />
          </div>
        );
      })}
    </div>
  );
};

 export default Products;
