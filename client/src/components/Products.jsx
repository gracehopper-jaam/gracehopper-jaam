// import React, { useState, useEffect } from 'react';
// import './Products.css';
// import { getAllProducts } from '../api/products';

// const Products = () => {
//   const [products, setProducts] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       setIsLoading(true);
//       // Fetch products from the API
//       const { products } = await getAllProducts();
//       setProducts(products);
//       setIsLoading(false);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     }
//   };

//   if (isLoading) {
//     return <div>Loading...</div>
//   }

//   return (
//     <div className="container">
//       {products.map(product => (
//         <div className="product" key={product.id}>
//           <h3 className="product-name">{product.name}</h3>
//           <p className="product-description">{product.description}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Products;
import React, { useEffect, useState } from 'react';
import './Products.css';
import { useNavigate } from 'react-router-dom';

import { getAllCategories } from './../api-client'

const Products = () => {
    const history = useNavigate();

    const [categoriesArray, setCategoriesArray] = useState([]);
    const getCategories = async () => {
        try {
            const response = await getAllCategories();
            if (response.code === "SUCCESS") {
                const { categories } = response;
                setCategoriesArray(categories);
            } else {
                console.log('something went wrong');
            }
        } catch (error) {
            console.log('something went wrong');
        }
    };

    const gotoCategory = async (categoryId) => {
        history(`/category-details/${categoryId}`)
    };

    useEffect(() => {
        getCategories();
    }, []);
    return (
        <div className="container">
            {categoriesArray.length ? (
                <>
                    {categoriesArray?.map((record, key) => {
                        return (
                            <React.Fragment key={key}>
                                <div className="product" onClick={() => {
                                    gotoCategory(record.id);
                                }}>
                                    <h3 className="product-name">{record.name}</h3>
                                    <p className="product-description">{record.description}</p>
                                </div>
                            </React.Fragment>
                        )
                    })}
                </>
            ) : null}
            {/* {productsArray.length ? (
        <>
          {productsArray?.map((record, key) => {
            return (
              <React.Fragment key={key}>
                <div className="product" onClick={() => {
                  gotoProduct(record.id);
                }}>
                  <h3 className="product-name">{record.name}</h3>
                  <p className="product-description">{record.description}</p>
                  <p className="product-description">{record.price}</p>
                </div>
              </React.Fragment>
            )
          })}
        </>
      ) : null} */}
            {/* <h2 className="category">Headphones</h2>
      <div className="product">
        <h3 className="product-name">Over-ear</h3>
        <p className="product-description">Description for Over-ear headphones</p>
      </div>
      <div className="product">
        <h3 className="product-name">In-ear</h3>
        <p className="product-description">Description for In-ear headphones</p>
      </div>

      <h2 className="category">Speakers</h2>
      <div className="product">
        <h3 className="product-name">Portable</h3>
        <p className="product-description">Description for Portable speakers</p>
      </div>
      <div className="product">
        <h3 className="product-name">Outdoor</h3>
        <p className="product-description">Description for Outdoor speakers</p>
      </div>

      <h2 className="category">Home/Office</h2>

      <h2 className="category">Accessories</h2>
      <div className="product">
        <h3 className="product-name">Headphone cases</h3>
        <p className="product-description">Description for Headphone cases</p>
      </div>
      <div className="product">
        <h3 className="product-name">Adapters</h3>
        <p className="product-description">Description for Adapters</p>
      </div>
      <div className="product">
        <h3 className="product-name">Chargers</h3>
        <p className="product-description">Description for Chargers</p>
      </div> */}
        </div>
    );
};

export default Products;