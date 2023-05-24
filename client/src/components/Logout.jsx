import React from 'react';
import { useNavigate } from 'react-router';



  
const Logout = (props) => {
  const navigate = useNavigate();
 const  { setUser, setIsLoggedIn,setToken,setCart } = props;

  const handleClick = () => {
    localStorage.removeItem("token");
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentCart');
    setIsLoggedIn(false);
    setUser(null);
    setToken("");
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