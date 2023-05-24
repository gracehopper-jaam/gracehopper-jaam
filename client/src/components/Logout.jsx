import React from 'react';
import { useNavigate } from 'react-router';


const logOut = (setUser, setIsLoggedIn) => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUser(null);
};
  
const Logout = ({ setUser, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    logOut(setUser, setIsLoggedIn);
    navigate("/");
  };

  return (
    <button className="logoutButton" onClick={handleClick}>
      LOGOUT
    </button>
  );
};

export default Logout