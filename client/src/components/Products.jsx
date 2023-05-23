import React, { useState, useEffect } from 'react';
import './Products.css';
import { getAllProducts } from '../api/products';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
    <div className="container">
      {products.map(product => (
        <div className="product" key={product.id}>
          <h3 className="product-name">{product.name}</h3>
          <p className="product-description">{product.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Products;
