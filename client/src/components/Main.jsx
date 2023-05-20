import React, {useState,useEffect} from 'react';
import Header from './Header';
import {getMe} from "../api-client"
import { Routes, Route } from "react-router-dom";

const Main = () => {

  const [currentUser, setCurrentUser] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState(localStorage.getItem("currentCart"));
  
  
  useEffect(() => {
    const getInitialData = async () => {
      try {
         
        if (token) {
          setIsLoggedIn(true);
        }
        if(cart !== null)
        {
          setCart(localStorage.getItem("currentCart"));
          console.log("Existing Cart",cart );
        }
        else{
          //create  a new cart object
          const cartObject = {
            items:[],
            username: null,
            persistedCart : false,
          }
          setCart(cartObject);
          console.log("New Cart created",cart );
        }

      } catch (error) {
        console.error(error);
      }
    };
    getInitialData();
  }, []);


  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (token) {
          const fetchedUser = await getMe(token);
          setCurrentUser(fetchedUser.username);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, [token]);
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/Home"/>
        <Route path="/Shop"/>
        <Route path="/About"/>
        <Route path="/Register"/>
        <Route path="/Cart"/>
      </Routes>

    </div>
  )
};

export default Main;