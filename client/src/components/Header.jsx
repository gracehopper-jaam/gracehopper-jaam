import React from 'react';
import { NavLink} from "react-router-dom";


const Header = () => {
  return (
    <header style={styles.header}>
      <h1 style={styles.logo}>JAAM</h1>
      <nav style={styles.nav}>

        <NavLink style={styles.link} to='/'>HOME</NavLink>
        <NavLink style={styles.link} to='/Categories'>SHOP</NavLink>
        <NavLink style={styles.link} to='/about'>ABOUT</NavLink>
        <NavLink style={styles.link} to='/cart'>CART</NavLink>
        

      </nav>
      <i className="fa-solid fa-cart-shopping"></i>
    </header>

  );
};

const styles = {
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1rem',
    backgroundColor: '#f2f2f2',
    fontFamily: 'Arial',
    width: '100vw',
  },
  logo: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#333',
    textDecoration: 'none',
  },
  nav: {
    display: 'flex',
    gap: '1rem',
  },
  link: {
    color: '#555',
    textDecoration: 'none',
    fontSize: '1.2rem',
  },
  i: {
    marginRight: '35px',
  },
};

export default Header;

