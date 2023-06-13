import React, { useState, useEffect } from 'react';
import { Header, Home, Products, About, Cart, Checkout, Login, Register, Logout, CategoryDetails, ProductDetails, ContactUs, ProfilePage, Footer, CategoryView,UserProfile } from './index';
import { Routes, Route } from 'react-router-dom';
import { getCartByUser,deleteOrder} from "../api-client"
import { getMe } from '../api-client/auth';
import CartWithAccountView from './CartWithAccountView';


const Main = () => {

  const [user, setUser] = useState({});
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState({});
  const [returnedUserCartId, setReturnedUserCartId] = useState(-1);
  const[orderPlaced,setOrderPlaced] = useState(false);
  const[selectedCategory,setSelectedCategory] = useState('');
  const [count, setCount] = useState(0);

  useEffect(() => {
    const calCount = () => {
      let newTotalCount = 0;
      let tempCart = JSON.parse(localStorage.getItem("currentCart"));
      if (tempCart && tempCart.items && tempCart.items.length > 0) {
        let items = [...tempCart.items];
        items.map((tempItem) => {
          newTotalCount += +tempItem.qty;
        });
        setCount(newTotalCount);
      }
    };
    calCount();
  }, []);
   

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
          //once you retreive the user cart at initial login then delete from database 
          if(userCart.id)
          {
            let result = await deleteOrder(token, userCart.id);
            console.log("DELETE", result);
          }
          console.log("Entering at Line 45", userCart);
          let tempCart = JSON.parse(localStorage.getItem("currentCart"));
          //if cart already exits in the locastorage then we need to merge contents 
          if(tempCart && userCart.id)
          {
            let tempItems = [...tempCart.items]; //hold the items already in the cart
            let userCartItems =  [...userCart.items];
            let newArr = tempItems.concat(userCartItems); //concat previous items with new items

            //get the new total amount
            let newTotalAmt = 0;
            let newCount = 0;
            newArr.map((tempItem) => {
              newTotalAmt += tempItem.qty * tempItem.priceperunit;
              newCount += tempItem.qty;
            });
            const cartObject = {
              orderdate:tempCart.orderdate,
              totalamount:newTotalAmt ,
              items:[...newArr],
              username: userCart.buyerName, //update the name to the logged in username
              persistedCart : false,
            }
            localStorage.setItem("currentCart", JSON.stringify(cartObject));
            setCart(cartObject);
            setReturnedUserCartId(userCart.id);
            setCount(newCount);
          }
          else
          {
            console.log("Entering at Line 62", userCart);
            const cartObject = {
              username: userCart.buyerName,
              orderdate: userCart.orderdate,
              totalamount: userCart.totalamount,
              items: [...userCart.items],
              persistedCart: true,
            }
            localStorage.setItem("currentCart", JSON.stringify(cartObject));
            setCart(cartObject);
            setReturnedUserCartId(userCart.id);
            let userCartItems =  [...userCart.items];
            let newCount = 0;
            userCartItems.map((tempItem) => {
              newCount += tempItem.qty;
            });
            setCount(newCount);
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
        count={count}
        setCount = {setCount}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              setSelectedCategory={setSelectedCategory}
              setCart={setCart}
              isLoggedIn={isLoggedIn}
            />
          }
        />

        <Route
          path="/Shop"
          element={
            <Products
              setCart={setCart}
              isLoggedIn={isLoggedIn}
              setSelectedCategory={setSelectedCategory}
              setCount = {setCount}
              count ={count}
            />
          }
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
              count={count}
              setCount={setCount}
            />
          }
        />

        <Route
          path="/register"
          element={
            <Register
              setIsLoggedIn={setIsLoggedIn}
              setCart={setCart}
              setToken={setToken}
            />
          }
        />

        <Route
          path="/Cart"
          element={
            <Cart
              isLoggedIn={isLoggedIn}
              user={user}
              cart={cart}
              setCart={setCart}
              setCount={setCount}
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
              setCount={setCount}
            />
          }
        />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/profilePage" element={<ProfilePage />} />

        <Route
          path="/category/Headphones"
          element={
            <CategoryView
              setSelectedCategory={setSelectedCategory}
              selectedCategory={selectedCategory}
              setCart={setCart}
              isLoggedIn={isLoggedIn}
              setCount = {setCount}
              count ={count}
            />
          }
        />
         <Route
          path="/category/Speakers"
          element={
            <CategoryView
              setSelectedCategory={setSelectedCategory}
              selectedCategory={selectedCategory}
              setCart={setCart}
              isLoggedIn={isLoggedIn}
              setCount = {setCount}
              count ={count}
            />
          }
        />
         <Route
          path="/category/Accessories"
          element={
            <CategoryView
              setSelectedCategory={setSelectedCategory}
              selectedCategory={selectedCategory}
              setCart={setCart}
              isLoggedIn={isLoggedIn}
              setCount = {setCount}
              count ={count}
            />
          }
        />
        <Route path = "/Me" element = {<UserProfile isLoggedIn ={isLoggedIn} user = {user}/>} />
      </Routes>
      <Footer />
    </div>
  );
};


export default Main;


