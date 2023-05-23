
import { Header, Home, Products, About,Cart } from './index';
import { Routes, Route } from 'react-router-dom';

import React, {useState,useEffect} from 'react';
import {getMe, getAllOrders,getOrdersByUser} from "../api-client"
import { fakeOrderItems } from './fakeData';
import CartWithAccountView from './CartWithAccountView';


const Main = () => {

  const [currentUser, setCurrentUser] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState(localStorage.getItem("currentCart"));
  const [allOrders, setAllOrders] = useState([]);
  
  
  
  useEffect(() => {
    const getInitialData = async () => {
      try {

        let orders = await getAllOrders();
        setAllOrders(orders);
         console.log("TOKEN", token);
        if (token) {
          setIsLoggedIn(true);
        }
        if(cart)
        {
          console.log("Entering at Line 28");
          let tempCart = localStorage.getItem(("currentCart"));
          setCart(JSON.parse(tempCart));
         // console.log("Existing Cart",cart );
        }
        else{
          ////TODO NEED TO COMPLETE LOGIC ...right now getting multiple order????
          if(isLoggedIn) 
          {
            const {userOrders: [userCart] }  = await getOrdersByUser(currentUser);//need to change to user.username
            console.log("Entering at Line 38");
            const cartObject = {
              totalamount: userCart.totalamount,
              items:[...userCart.items],   
              username: currentUser,
              persistedCart : true,
            }
            localStorage.setItem("currentCart",JSON.stringify(cartObject)); 
            setCart(cartObject);
          }
          else
          {
            console.log("Entering at Line 45"); 
              //create  a new cart object
          const cartObject = {
            totalamount:'', 
            items:[...fakeOrderItems],                  ////VERY IMP : THIS SHOULD BE removed once login has been implemented
            username: "guest",
            persistedCart : false,
          }
          setCart(cartObject);
          localStorage.setItem("currentCart",JSON.stringify(cartObject));
         // console.log("New Cart created",cartObject );
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
        <Route path="/" element ={<Home/>}/>
        <Route path="/Shop"/>
        <Route path="/About"/>
        <Route path="/Register"/>
        <Route path="/CartWithAccountView" element = {<CartWithAccountView isLoggedIn={isLoggedIn} currentUser={currentUser} cart = {cart} /> }/>
        <Route path="/Cart" element={<Cart isLoggedIn={isLoggedIn} currentUser={currentUser} cart = {cart} setCart = {setCart}/>} />
      </Routes>

    </div>
  )
};


export default Main;