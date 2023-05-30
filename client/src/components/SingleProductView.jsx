import React, { useState } from 'react';
import Images from '../media';
import "./SingleProductView.css"

const SingleProductView = (props) => {
  const { selectedProduct, setCart, isLoggedIn } = props;
  const [qty, setQty] = useState(1);

  const handleClick = () => {
    // Add your logic here for handling the click event
  };

  return (
    <>
      <div className="hero-image">
        {<img className="hero-image" src="/Users/aubreylittle/Desktop/2303-ftb-et-web-ft/course-work/graceshopper-jaam/client/src/media/InEarHeadPhoneBlack.jpg" />
}
      </div>
      <div className="product" key={selectedProduct.id}>
        <h3 className="product-name">{selectedProduct.name}</h3>
        <img
          src={Images[selectedProduct.id]}
          alt={selectedProduct.name}
          className="product-image"
        />
        <p className="product-description">{selectedProduct.description}</p>
        <p>{selectedProduct.price}</p>
        <input
          value={qty}
          type="number"
          min="1"
          onChange={(event) => setQty(event.target.value)}
          required
        />
        <button onClick={() => handleClick(selectedProduct.id)}>Add To Cart</button>
        <hr />
      </div>
    </>
  );
}

export default SingleProductView;
