import React, { useState, useEffect } from 'react';
import { Header, Home, Products, About, Cart, Checkout, Login, Register } from './index';
import { Routes, Route } from 'react-router-dom';
import {getAllOrders,getOrdersByUser} from "../api-client"
import { getMe } from '../api-client/auth';
import { fakeOrderItems } from './fakeData';
import CartWithAccountView from './CartWithAccountView';


const Main = () => {

  const [user, setUser] = useState({});
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
            const {userOrders: [userCart] }  = await getOrdersByUser(user.username);//need to change to user.username
            console.log("Entering at Line 38");
            const cartObject = {
              totalamount: userCart.totalamount,
              items:[...userCart.items],   
              username: user.username,
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

  /**************************/
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
        <Route path="/CartWithAccountView" element = {<CartWithAccountView isLoggedIn={isLoggedIn} user={user} cart = {cart} /> }/>
        <Route path="/Cart" element={<Cart isLoggedIn={isLoggedIn} user={user} cart = {cart} setCart = {setCart}/>} />
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