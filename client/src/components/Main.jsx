import React, { useState, useEffect } from 'react';
import { Header, Home, Products, About, Cart, Checkout, Login, Register } from './index';
import { Routes, Route } from 'react-router-dom';
import {getAllOrders,getOrdersByUser} from "../api-client"
import { getMe } from '../api-client/auth';
import { fakeOrderItems } from './fakeData';


const Main = () => {

  const [user, setUser] = useState({});
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState(localStorage.getItem("currentCart"));
  
  useEffect(() => {
    const fetchUser = async () => {
      if(token) {
        const fetchedUser = await getMe(token);
        if (fetchedUser) {
          setUser(fetchedUser);
          setIsLoggedIn(true);
        }
      }
    };
    fetchUser();
  }, [token]);
  useEffect(() => {
    console.log(user);
  }, [user]);

  
  // useEffect(() => {
  //   const getInitialData = async () => {
  //     try {
  //        console.log("TOKEN", token);
  //       if (token) {
  //         setIsLoggedIn(true);
  //       }
  //       if(cart)
  //       {
  //         console.log("Entering at Line 28");
  //         setCart(localStorage.getItem("currentCart"));
  //         console.log("Existing Cart",cart );
  //       }
  //       else{
  //         ////TODO NEED TO COMPLETE LOGIC 
  //         if(isLoggedIn) 
  //         {
  //           const {userOrders: [userCart] }  = await getOrdersByUser(currentUser);
  //           console.log("Entering at Line 38");
  //           const cartObject = {
  //             totalamount: userCart.totalamount,
  //             items:[...userCart.items],   
  //             username: currentUser,
  //             persistedCart : true,
  //           }
  //         }
  //         else
  //         {
  //           console.log("Entering at Line 45"); 
  //             //create  a new cart object
  //         const cartObject = {
  //           totalamount:0,
  //           items:[...fakeOrderItems],                  ////VERY IMP : THIS SHOULD BE removed once login has been implemented
  //           username: "guest",
  //           persistedCart : false,
  //         }
  //         setCart(cartObject);
  //         console.log(cart);
  //         console.log("New Cart created",cartObject );
  //         }
        
  //       }

  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   getInitialData();
  // }, []);

  return (
    <div>
      <Header 
      isLoggedIn={isLoggedIn}
      setIsLoggedIn={setIsLoggedIn}
      setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/Shop" element={<Products />}/>
        <Route path="/About" element={<About />}/>
        <Route path="/Register" element={<Register />}/>
        <Route path="/Cart" element={<Cart isLoggedIn={isLoggedIn} user={user} cart = {cart}/>} />
        <Route path="/Checkout" element={<Checkout />} />
        <Route path='/login' element={
                    <Login 
                        token={token} 
                        setToken={setToken} 
                        user={user} 
                        setUser={setUser} 
                        isLoggedIn={isLoggedIn} 
                        setIsLoggedIn={setIsLoggedIn}/>}/>
      </Routes>

    </div>
  )
};


export default Main;