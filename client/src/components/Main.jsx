
import { Header, Home, Products, About,Cart } from './index';
import { Routes, Route } from 'react-router-dom';

import React, {useState,useEffect} from 'react';
import {getMe, getAllOrders,getOrdersByUser} from "../api-client"
import { fakeOrderItems } from './fakeData';


const Main = () => {

  const [currentUser, setCurrentUser] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState(localStorage.getItem("currentCart"));
  
  
  useEffect(() => {
    const getInitialData = async () => {
      try {
         console.log("TOKEN", token);
        if (token) {
          setIsLoggedIn(true);
        }
        if(cart)
        {
          console.log("Entering at Line 28");
          setCart(localStorage.getItem("currentCart"));
          console.log("Existing Cart",cart );
        }
        else{
          ////TODO NEED TO COMPLETE LOGIC 
          if(isLoggedIn) 
          {
            const {userOrders: [userCart] }  = await getOrdersByUser(currentUser);
            console.log("Entering at Line 38");
            const cartObject = {
              totalamount: userCart.totalamount,
              items:[...userCart.items],   
              username: currentUser,
              persistedCart : true,
            }
          }
          else
          {
            console.log("Entering at Line 45"); 
              //create  a new cart object
          const cartObject = {
            totalamount:0,
            items:[...fakeOrderItems],                  ////VERY IMP : THIS SHOULD BE removed once login has been implemented
            username: "guest",
            persistedCart : false,
          }
          setCart(cartObject);
          console.log(cart);
          console.log("New Cart created",cartObject );
          }
        
        }

      } catch (error) {
        console.error(error);
      }
    };
    getInitialData();
  }, []);


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
      <Route path="/Home" path="/" element={<Home />} />
        <Route path="/Products" element={<Products />}/>
        <Route path="/About"/>
        <Route path="/Register"/>
        <Route path="/Cart" element={<Cart isLoggedIn={isLoggedIn} currentUser={currentUser} cart = {cart}/>} />
      </Routes>

    </div>
  )
};


export default Main;