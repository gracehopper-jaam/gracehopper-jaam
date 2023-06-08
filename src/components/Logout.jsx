import React from 'react';
import { useNavigate } from 'react-router';
import { createNewOrder, createNewOrderItem, deleteOrder } from '../api-client';



  
const Logout = (props) => {
  const navigate = useNavigate();
  const {
    setUser,
    setIsLoggedIn,
    setToken,
    setCart,
    cart,
    user,
    token,
    returnedUserCartId,
    setReturnedUserCartId,
    orderPlaced,
    setCount
  } = props;

  const handleClick = async () => {
    let tempCart = JSON.parse(localStorage.getItem("currentCart"));
    if (tempCart) {
    // if (tempCart && tempCart.persistedCart === false) {
      // if (returnedUserCartId !== null && returnedUserCartId > -1) {
      //   //now delete the usercart that was retreived before creating a new one ?
      //   try {
      //     console.log("returnedUserCartId", returnedUserCartId);
      //     let result = await deleteOrder(token, returnedUserCartId);
      //     console.log("DELETE", result);
      //   } catch (error) {
      //     console.log(error);
      //   }
      // }
      console.log("Need to save this cart to the database if there are items in the shopping cart");
      if(tempCart.items.length > 0)
      {
        const currDate = new Date().toISOString().split("T")[0];
        const orderObj = {
          orderdate: currDate,
          totalamount: cart.totalamount,
          isProcessed: false,
        };
        try {
          const newOrder = await createNewOrder(token, orderObj);
          console.log("order created at logout ", newOrder);
          if (newOrder !== null) {
            cart.items.map(async (item) => {
              let orderItem = {
                productId: item.id,
                priceperunit: item.priceperunit,
                qty: item.qty,
              };
              const newItem = await createNewOrderItem(
                token,
                orderItem,
                newOrder.id
              );
            });
          }
        } catch (error) {
          console.log(error);
        }
      }

    } else {
      console.log(" Dont Need to save this cart to the database");
    }

    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("currentCart");
    setIsLoggedIn(false);
    setUser(null);
    setToken("");
    setReturnedUserCartId(-1);
    setCart({});
    setCount(0);
    navigate("/");
  };

  return (
    <button className="logoutButton" onClick={handleClick}>
      LOGOUT
    </button>
  );
};

export default Logout