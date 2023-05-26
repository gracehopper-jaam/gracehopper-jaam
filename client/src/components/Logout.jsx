import React from 'react';
import { useNavigate } from 'react-router';
import { createNewOrder, createNewOrderItem, deleteOrder } from '../api-client';



  
const Logout = (props) => {
  const navigate = useNavigate();
 const  { setUser, setIsLoggedIn,setToken,setCart,cart,user,token,returnedUserCartId, setReturnedUserCartId} = props;

  const handleClick = async () => {

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