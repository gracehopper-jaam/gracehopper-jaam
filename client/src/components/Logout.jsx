import React from 'react';
import { useNavigate } from 'react-router';
import { createNewOrder, createNewOrderItem, deleteOrder } from '../api-client';



  
const Logout = (props) => {
  const navigate = useNavigate();
 const  { setUser, setIsLoggedIn,setToken,setCart,cart,user,token,returnedUserCartId, setReturnedUserCartId, orderPlaced} = props;

  const handleClick = async () => {


      let tempCart = JSON.parse(localStorage.getItem("currentCart"));
      if (tempCart && tempCart.persistedCart === false) {
        console.log("Need to save this cart to the database", cart);
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
      } else {
        console.log(" Dont Need to save this cart to the database", cart);
      }
    

    localStorage.removeItem("token");
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentCart');
    setIsLoggedIn(false);
    setUser(null);
    setToken("");
    setReturnedUserCartId("");
    setCart({});
    navigate("/");
  };

  return (
    <button className="logoutButton" onClick={handleClick}>
      LOGOUT
    </button>
  );
};

export default Logout