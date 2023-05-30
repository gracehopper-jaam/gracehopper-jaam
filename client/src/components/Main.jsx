import React, { useState, useEffect } from 'react';
import { Header, Home, Products, About, Cart, Checkout, Login, Register, Logout, CategoryDetails, ProductDetails, Footer, ContactUs, ProfilePage } from './index';
import { Routes, Route } from 'react-router-dom';
import { getCartByUser } from "../api-client"
import { getMe } from '../api-client/auth';
import CartWithAccountView from './CartWithAccountView';

const Main = () => {
  const [user, setUser] = useState({});
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState({});
  const [returnedUserCartId, setReturnedUserCartId] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);

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
          let tempCart = JSON.parse(localStorage.getItem("currentCart"));

          if (tempCart) {
            let tempItems = [...tempCart.items];
            let userCartItems = [...userCart.items];
            let newArr = tempItems.concat(userCartItems);
            let newTotalAmt = 0;

            newArr.forEach((tempItem) => {
              newTotalAmt += tempItem.qty * tempItem.priceperunit;
            });

            const cartObject = {
              orderdate: tempCart.orderdate,
              totalamount: newTotalAmt,
              items: newArr,
              username: userCart.buyerName,
              persistedCart: true,
            };

            localStorage.setItem("currentCart", JSON.stringify(cartObject));
            setCart(cartObject);
            setReturnedUserCartId(userCart.id);
          } else {
            const cartObject = {
              username: userCart.buyerName,
              orderdate: userCart.orderdate,
              totalamount: userCart.totalamount,
              items: [...userCart.items],
              persistedCart: true,
            };

            localStorage.setItem("currentCart", JSON.stringify(cartObject));
            setCart(cartObject);
            setReturnedUserCartId(userCart.id);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    getInitialData();
  }, [token]);

  return (
    <div>
      <Header
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        setUser={setUser}
        setToken={setToken}
        setCart={setCart}
        cart={cart}
        user={user}
        token={token}
        returnedUserCartId={returnedUserCartId}
        setReturnedUserCartId={setReturnedUserCartId}
        orderPlaced={setOrderPlaced}
      />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/Shop"
          element={<Products setCart={setCart} isLoggedIn={isLoggedIn} />}
        />
        <Route path="/category-details/:id" element={<CategoryDetails />} />
        <Route path="/product-details/:id" element={<ProductDetails />} />

        <Route path="/About" element={<About />} />

        <Route
          path="/CartWithAccountView"
          element={
            <CartWithAccountView
              isLoggedIn={isLoggedIn}
              user={user}
              cart={cart}
              token={token}
              setCart={setCart}
              returnedUserCartId={returnedUserCartId}
              setOrderPlaced={setOrderPlaced}
              setReturnedUserCartId={setReturnedUserCartId}
            />
          }
        />

        <Route
          path="/Register"
          element={<Register setIsLoggedIn={setIsLoggedIn} cart={cart} />}
        />

        <Route
          path="/Cart"
          element={
            <Cart
              isLoggedIn={isLoggedIn}
              user={user}
              cart={cart}
              setCart={setCart}
            />
          }
        />
        <Route
          path="/Checkout"
          element={<Checkout isLoggedIn={isLoggedIn} />}
        />
        <Route
          path="/login"
          element={
            <Login
              token={token}
              setToken={setToken}
              user={user}
              setUser={setUser}
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
            />
          }
        />
        <Route
          path="/logout"
          element={
            <Logout
              setUser={setUser}
              setIsLoggedIn={setIsLoggedIn}
              setToken={setToken}
              setCart={setCart}
            />
          }
        />
        <Route
          path="/contactUs"
          element={<ContactUs />}
        />
        <Route
          path="/profilePage"
          element={<ProfilePage />}
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default Main;
