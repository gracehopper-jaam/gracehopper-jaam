// import React, { useState, useEffect } from 'react';
// import './Products.css';
// import { getAllProducts } from 'db/products.js';

// const Products = () => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       // Fetch products from the database
//       const data = await getAllProducts();
//       setProducts(data);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     }
//   };

//   return (
//     <div className="container">
//       {products.map((product) => (
//         <div className="product" key={product.id}>
//           <h3 className="product-name">{product.name}</h3>
//           <p className="product-description">{product.description}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Products;
