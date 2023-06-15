import React, { useState, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getProductsByCategoryName } from '../api-client';
import SingleProductView from './SingleProductView';
import './Products.css';
import Images from '../media';

const CategoryView = (props) => {
  const { selectedCategory, setCart, isLoggedIn, count, setCount,setSelectedCategory } = props;
  const [productsByCategory, setProductsByCategory] = useState([]);
  const uri = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        //if link is clicked
        if (selectedCategory.length > 0) {
          console.log("REACHED USE EFFECT 1");
          const products = await getProductsByCategoryName(selectedCategory);
          setProductsByCategory(products);
        } else {
          //if user entered the url 
          console.log("REACHED USE EFFECT 2");
          let parts = uri.pathname.split("/");
          const categoryName = parts[1];

          // fetch products by category view
          if (
            categoryName.toLowerCase === "Headphones".toLowerCase ||
            categoryName.toLowerCase  === "Speakers".toLowerCase ||
            categoryName.toLowerCase  === "Accessories".toLowerCase 
          ) {
           
            const dbCategoryName = categoryName.charAt(0).toUpperCase() + categoryName.slice(1); //the category name has uppercase first letter
            setSelectedCategory(dbCategoryName);
            const products = await getProductsByCategoryName(dbCategoryName);
            setProductsByCategory(products);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchProductsByCategory();
  }, [selectedCategory]);


  return (
    <div className="products-container">
      <div className="icons-container">
        <div className="icon-container">
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
          <h3 className="banner-caption">HEADPHONES</h3>
        </div>
        <div className="icon-container">
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
          <h3 className="banner-caption">SPEAKERS</h3>
        </div>
        <div className="icon-container">
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
          <h3 className="banner-caption">ACCESSORIES</h3>
        </div>
      </div>
      <h2 id="category-title">{selectedCategory}</h2>
      {productsByCategory.length ? (
        productsByCategory.map((product, index) => {
          return (
            <div key={index}>
              <SingleProductView
                selectedProduct={product}
                setCart={setCart}
                isLoggedIn={isLoggedIn}
                setCount={setCount}
                count={count}
              />
            </div>
          );
        })
      ) : (
        <></>
      )}
    </div>
  );
};

 export default CategoryView;
