import React, { useState } from "react";
import Images from "../media";

const CartItem = (props) =>
{
const {item,cart,isLoggedIn, setCart,position } = props;
const [qty, setQty] = useState(item.qty);

const handleDelete = () => {
    let newTotalAmt = 0;
  let tempCart = JSON.parse(localStorage.getItem("currentCart"));

  let filteredItems = [...tempCart.items];
  filteredItems.splice(position,1);

  filteredItems.map((tempItem) => {
    newTotalAmt += tempItem.qty * tempItem.priceperunit;
  });

  const cartObject = {
    totalamount: newTotalAmt,
    items: [...filteredItems], 
    username: tempCart.username,
    persistedCart:false,
  };

  localStorage.setItem("currentCart", JSON.stringify(cartObject));
  setCart(cartObject);
};

const handleQtyChange =(event) =>
{
  const newQty = event.target.value;
  let newTotalAmt = 0;
  setQty(newQty);
  let tempCart = JSON.parse(localStorage.getItem("currentCart"));
  let updatedCartArr = tempCart.items.map((tempItem) => {
    if (tempItem.id === item.id) {
      tempItem.qty = newQty;
    }
    return tempItem;
  });

  updatedCartArr.map((tempItem) => {
    newTotalAmt += tempItem.qty * tempItem.priceperunit;
  });

  const cartObject = {
    totalamount: newTotalAmt,
    items: [...updatedCartArr], 
    username: tempCart.username,
    persistedCart: false,
  };

  localStorage.setItem("currentCart", JSON.stringify(cartObject));
  setCart(cartObject);
}

return (
<>
    <div id='item-container-1'>
    <img
          src={Images[item.id]}
          alt={item.name}
          className="product-image"/>
        <p><b></b>{item.name}</p>
        <input value = {qty} type ="number" min="1" max="5"
        onChange={(event) => {handleQtyChange(event)}}
        required/>
        <p>${item.priceperunit}</p>
        <button id='remove-button' onClick ={() =>{handleDelete()}}> remove</button>
    </div>

</>
      );
}

export default CartItem;