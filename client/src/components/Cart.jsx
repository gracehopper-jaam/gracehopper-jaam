import React, { useState } from "react";
import CartItem from "./CartItem";
import "./Cart.css";
import {useNavigate} from "react-router-dom";

const Cart = (props) => {
  const { isLoggedIn, currentUser, cart, setCart } = props;
  const navigate = useNavigate();
  console.log("INSIDE CART", cart);
  console.log("ISLOGGED IN", isLoggedIn);

 
  const handleSubmit = async (event) => {
    event.preventDefault();
    navigate('/CartWithAccountView');
  };
  return (
    <>
      <form onSubmit={handleSubmit} id="cart-container">
        <h2> Your cart total is $ {cart.totalamount}</h2>
        {cart.items != null && cart.items.length > 0 ? (
          cart.items.map((item, index) => {
            return <CartItem key ={index} item={item} cart = {cart} isLoggedIn = {isLoggedIn} setCart = {setCart}/>;
          })
        ) : (
          <div>
            <h2> Shopping Cart Empty </h2>
          <button> Continue Shopping</button>
          </div>
          
        )}
       { cart.items != null && cart.items.length > 0 ? <button id="checkoutButton"> Checkout </button>: <></>}
        
      </form>
    </>
  );
};

export default Cart;
