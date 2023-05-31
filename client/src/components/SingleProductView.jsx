import React, { useState } from 'react';
import Images from '../media';
import "./SingleProductView.css"
const SingleProductView = (props) => {

const {selectedProduct, setCart,isLoggedIn} = props;
const [qty, setQty] = useState(1);
const handleClick = () => {
    const tempUserName = isLoggedIn? localStorage.getItem("currentUser") : "guest";
    let tempCart = JSON.parse(localStorage.getItem("currentCart"));
    if(tempCart)
    {
        console.log("tempcart exits");
        const tempItem = { id:selectedProduct.id, name: selectedProduct.name, priceperunit: selectedProduct.price, description: selectedProduct.description,qty:qty};
        let tempCartArr = [...tempCart.items];
        tempCartArr.push(tempItem);
        const cartObject = {
            orderdate:tempCart.orderdate,
            totalamount:tempCart.totalamount + (qty * selectedProduct.price),
            items:[...tempCartArr],
            username: tempUserName,
            persistedCart : false,
          }
          console.log("reached here new cart",cartObject, "compared to old cart",tempCart);
          localStorage.setItem("currentCart",JSON.stringify(cartObject));
          setCart(cartObject);
    }
    else
    {
        console.log("tempcart does not exits");
        const tempItem = { id:selectedProduct.id, name: selectedProduct.name, priceperunit: selectedProduct.price, description: selectedProduct.description,qty:qty};
        const currDate = new Date().toISOString().split('T')[0];
        let tempItems = [];
        tempItems.push(tempItem);
       // create  a new cart object
           const cartObject = {
            orderdate:currDate,
            totalamount:qty * selectedProduct.price,
            items:[...tempItems],
            username: tempUserName,
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
          <img
          src={Images[selectedProduct.id]}
          alt={selectedProduct.name}
          className="product-image"/>
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
