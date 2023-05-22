import React, { useState } from "react";
import CartItem from "./CartItem";
import { fakeOrderItems } from "./fakeData";

const Cart = (props) => {
  const { isLoggedIn, currentUser, cart } = props;
  const [cartItems, setCartItems] = useState([]);

  return (
    <div>
      {cart.items != null && cart.items.length > 0 ? (
        cart.items.map((item) => {
          <CartItem item={item} />;
        })
      ) : (
        <div>
          <h2>Fake Data </h2>
          {fakeOrderItems.map((item) => {
          return(<CartItem item={item} />); 
        })}
        </div>
      )}
    </div>
  );
};

export default Cart;
