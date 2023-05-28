import React, { useState } from 'react';
import './ProductView.css';


const ProductView = ({ product }) => {
  const [quantity, setQuantity] = useState(0); // Initial quantity is set to 0

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addToCart = () => {
    // Implement your logic to add the item to the cart with the selected quantity
    console.log(`Added ${quantity} ${product.name}(s) to cart.`);
  };

  return (
    <div>
      <h2>{product.name}</h2>
      <div className="product-view-container">
        <div className="image-preview">
          <img src={product.image1x3} alt="Image Preview" />
        </div>
        <div className="large-item-view">
          <img src={product.image1x1} alt="Large Item View" />
        </div>
      </div>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <div>
        <button onClick={decreaseQuantity}>-</button>
        <span>{quantity}</span>
        <button onClick={increaseQuantity}>+</button>
      </div>
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductView;
