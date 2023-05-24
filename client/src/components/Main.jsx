import React, { useState, useEffect } from 'react';
import { Header, Home, Products, About, Cart, Checkout, Login, Register, Logout, CategoryDetails, ProductDetails } from './index';
import { Routes, Route } from 'react-router-dom';
import { getCartByUser } from "../api-client"
import { getMe } from '../api-client/auth';
import CartWithAccountView from './CartWithAccountView';


const Main = () => {

  const [user, setUser] = useState({});
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        const fetchedUser = await getMe(token);
        if (fetchedUser) {
          setUser(fetchedUser);
          setIsLoggedIn(true);
          localStorage.setItem("currentUser", fetchedUser.username);

        }
      }

    };
    fetchUser();
  }, [token]);


  useEffect(() => {

    const getInitialData = async () => {
      try {

        if (token) {
          setIsLoggedIn(true);
        }

        if (token) {
          const [userCart] = await getCartByUser(token, localStorage.getItem("currentUser"));

          console.log("Entering at Line 38", userCart);

          const cartObject = {
            username: userCart.buyerName,
            orderdate: userCart.orderdate,
            totalamount: userCart.totalamount,
            items: [...userCart.items],
            persistedCart: true,
          }
          localStorage.setItem("currentCart", JSON.stringify(cartObject));
          setCart(cartObject);
        }


      } catch (error) {
        console.error(error);
      }
    };
    getInitialData();
  }, [token]);

  /**************************/

  // useEffect(() => {
  //   console.log(user);
  // }, [user]);


  return (
    <div>
      <Header
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        setUser={setUser} setToken={setToken} setCart={setCart} />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/Shop" element={<Products setCart ={setCart}/>} />
        <Route path="/category-details/:id" element={<CategoryDetails />} />
        <Route path="/product-details/:id" element={<ProductDetails />} />

        <Route path="/About" element={<About />} />


        <Route path="/CartWithAccountView" element={<CartWithAccountView isLoggedIn={isLoggedIn} user={user} cart={cart} token={token} setCart={setCart} />} />

        <Route path="/Register" element={<Register setIsLoggedIn={setIsLoggedIn} />} />

        <Route path="/Cart" element={<Cart isLoggedIn={isLoggedIn} user={user} cart={cart} setCart={setCart} />} />
        <Route path="/Checkout" element={<Checkout />} />
        <Route path='/login' element={
          <Login
            token={token}
            setToken={setToken}
            user={user}
            setUser={setUser}
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn} />} />
        <Route path='/logout' element={<Logout setUser={setUser} setIsLoggedIn={setIsLoggedIn} setToken={setToken} setCart={setCart} />} />

      </Routes>

    </div>
  )
};


export default Main;



//   else
        //   {
        //     console.log("Entering at Line 45");
        //       //create  a new cart object
        //    const cartObject = {
        //     orderdate:'',
        //     totalamount:'',
        //     items:[],
        //     username: "guest",
        //     persistedCart : false,
        //   }
        //   setCart(cartObject);
        //   localStorage.setItem("currentCart",JSON.stringify(cartObject));
        //  // console.log("New Cart created",cartObject );
        //   }