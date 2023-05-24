import React, { useState } from 'react';

const SingleProductView = (props) => {

const {selectedProduct, setCart} = props;
const [qty, setQty] = useState(1);
const handleClick = () => {

    let tempCart = JSON.parse(localStorage.getItem("currentCart"));
    if(tempCart)
    {
            console.log("tempcart exits");
    }
    else
    {
        console.log("tempcart does not exits");
        const currDate = new Date().toISOString().split('T')[0];
        let tempItems = [];
        tempItems.push(selectedProduct);
       // create  a new cart object
           const cartObject = {
            orderdate:currDate,
            totalamount:0,
            items:[...tempItems],
            username: "guest",
            persistedCart : false,
          }
          localStorage.setItem("currentCart",JSON.stringify(cartObject));
          setCart(cartObject);
    }
};
return (

    <>
     <div className="product" key={selectedProduct.id}>
          <h3 className="product-name">{selectedProduct.name}</h3>
          <p className="product-description">{selectedProduct.description}</p>
          <p>{selectedProduct.price}</p>
          <input 
          value ={qty} 
          type ="number" 
          min="1" 
          onChange={(event) => setQty(event.target.value)}
          required/>
          <button onClick ={() =>{handleClick(selectedProduct.id)}}>Add To Cart</button>
          <hr></hr>
        </div>
    </>
);

}

export default SingleProductView;