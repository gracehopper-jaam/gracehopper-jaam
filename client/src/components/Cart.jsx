import React, { useState } from "react";
import CartItem from "./CartItem";
import "./Cart.css";
import {useNavigate} from "react-router-dom";

const Cart = (props) => {
  const { isLoggedIn, currentUser, cart, setCart } = props;
  const navigate = useNavigate();
  // console.log("INSIDE CART", cart);
  //console.log("ISLOGGED IN", isLoggedIn);

  const handleCheckout = () => {
    if (isLoggedIn) {
      navigate("/CartWithAccountView");
    } else {
      window.alert("Please Login and checkout");
      navigate("/Login");
    }
  };

  const handleClick = () => {
    navigate("/");
  };
  return (
    <>
      <div  id="cart-container">  
        <h2> Your cart total is $ {cart.totalamount}</h2>
        {cart.items != null && cart.items.length > 0 ? (
          cart.items.map((item, index) => {
            return <CartItem key ={index} item={item} cart = {cart} isLoggedIn = {isLoggedIn} setCart = {setCart} position = {index}/>;
          })
        ) : (
          <div>
            <h2> Shopping Cart Empty </h2>
          <button onClick={handleClick}> Continue Shopping</button>
          </div>
          
        )}
       { cart.items != null && cart.items.length > 0 ? <button onClick ={handleCheckout} id="checkoutButton"> Checkout </button>: <></>}
        
      </div>
    </>
  );
};

export default Cart;
