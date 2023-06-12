import React, { useState,useEffect } from "react";
import CartItem from "./CartItem";
import "./Cart.css";
import {useNavigate} from "react-router-dom";

const Cart = (props) => {
  const { isLoggedIn, currentUser, cart, setCart,setCount } = props;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      //setCart to localstorage cart if one already exists x`
      let tempCart = JSON.parse(localStorage.getItem("currentCart"));
      if (tempCart) {
        setCart(tempCart);
      }
    };
    fetchCart();
  }, []);



  const handleCheckout = () => {
    if (isLoggedIn) {
      navigate("/CartWithAccountView");
    } else {
      window.alert("Please Login and checkout");
      navigate("/Login");
    }
  };

  const handleClick = () => {
    navigate("/Shop");
  };

  const handleClear = ()=>{
    localStorage.removeItem("currentCart");
    setCart({});
    setCount(0);

  }
  return (
    <>
      <div  id="cart-container">          
        <h2 id='cart-message'> Your cart total is $ {cart.totalamount? cart.totalamount:0}</h2>
        {cart.items != null && cart.items.length > 0 ? <button id ="clear-button" onClick = {handleClear}>Remove All Items</button>: <></>}
        {cart.items != null && cart.items.length > 0 ? ( 
          cart.items.map((item, index) => {
            return <CartItem key ={index} item={item} cart = {cart} isLoggedIn = {isLoggedIn} setCart = {setCart} position = {index} setCount ={setCount}/>;
          })
        ) : (
          <div>
            <h2 id='cart-message'> Your Shopping Cart is Empty </h2>
          <button id='continue-shop-button' onClick={handleClick}> Continue Shopping</button>
          </div>
          
        )}
       { cart.items != null && cart.items.length > 0 ? <button onClick ={handleCheckout} id="checkoutButton"> Checkout </button>: <></>}
        
      </div>
    </>
  );
};

export default Cart;
