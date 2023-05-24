import React, { useState } from "react";
import CartItem from "./CartItem";


const Cart = (props) => {
  const { isLoggedIn, currentUser, cart } = props;
  const [cartItems, setCartItems] = useState([]);

  return (
    <div>
      <h2> Your cart total is $ {cart?.totalAmount}</h2>
      {cart?.items != null && cart?.items.length > 0 ? (
        cart?.items.map((item) => {
          return (<CartItem item={item} />);
        })
      ) :
        (
          <h2> Shopping Cart Empty </h2>
        )}
    </div>
  );
};

export default Cart;
