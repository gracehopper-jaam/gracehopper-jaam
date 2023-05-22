import React, { useState, useEffect } from 'react';
import { Header, Home, Products, About, Cart, Checkout, Login } from './index';
import { Routes, Route } from 'react-router-dom';
import { getMe, getAllOrders } from "../api-client";


const Main = () => {

  const [currentUser, setCurrentUser] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState({});
  
  
  // useEffect(() => {
  //   const getInitialData = async () => {
  //     try {
  //        console.log("TOKEN", token);
  //       if (token) {
  //         setIsLoggedIn(true);
  //       }

  //       if(cart)
  //       {
  //         setCart(localStorage.getItem("currentCart"));
  //         console.log("Existing Cart",cart );
  //       }
  //       else{
  //         ////TODO
  //         if(isLoggedIn)
  //         {
  //          //maybe get the users cart???
  //         }
  //         else
  //         {
  //             //create  a new cart object
  //         const cartObject = {
  //           items:[],
  //           username: null,
  //           persistedCart : false,
  //         }
  //         setCart(cartObject);
  //         console.log("New Cart created",cart );
  //         }
        
  //       }

  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   getInitialData();
  // }, []);


  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       if (token) {
  //         const fetchedUser = await getMe(token);
  //         setCurrentUser(fetchedUser.username);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchUser();
  // }, [token]);

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/Shop" element={<Products />}/>
        <Route path="/About" element={<About />}/>
        <Route path="/Register"/>
        <Route path="/Cart" element={<Cart isLoggedIn={isLoggedIn} currentUser={currentUser} cart = {cart}/>} />
        <Route path="/Checkout" element={<Checkout />} />
        <Route path="/Login" element={<Login />} />
      </Routes>

    </div>
  )
};


export default Main;