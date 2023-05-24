import React from 'react';
import { NavLink } from "react-router-dom";
import { Logout } from './'


const Header = ({ isLoggedIn, setIsLoggedIn, setUser }) => {
  return (
    <header style={styles.header}>
      <h1 style={styles.logo}>JAAM</h1>
      <nav style={styles.nav}>
        <NavLink style={styles.link} to='/'>HOME</NavLink>
        <NavLink style={styles.link} to='/Shop'>SHOP</NavLink>
        <NavLink style={styles.link} to='/About'>ABOUT</NavLink>
        <NavLink style={styles.cartLink} to="/Cart">
          <i className="fa-solid fa-cart-shopping fa-lg"></i>
        </NavLink>
        
      </nav>
      <div className='loginLogoutButtons'>
                {isLoggedIn ? (
                    <Logout setUser={setUser} setIsLoggedIn={setIsLoggedIn} />
                ) : (
                    <NavLink to="/login" className="authButton">LOGIN</NavLink>
                )}
            </div>
    </header>

  );
};

const styles = {
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '.1rem',
    backgroundColor: '#f2f2f2',
    fontFamily: 'Arial',
    width: '100%',
    overflowX: 'auto',
  },
  logo: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#333',
    textDecoration: 'none',
    textShadow: '1px 1px 5px #889aa0'
  },
  nav: {
    display: 'flex',
    gap: '1rem',
    overflowX: 'auto',
  },
  link: {
    color: '#555',
    textDecoration: 'none',
    fontSize: '1.2rem',
    whiteSpace: 'nowrap',
  },
  cartLink: {
    color: '#889aa0',
  },
};

export default Header;