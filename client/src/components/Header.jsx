import React from 'react';


const Header = () => {
  return (
    <header style={styles.header}>
      <h1 style={styles.logo}>JAAM</h1>
      <nav style={styles.nav}>
        <a style={styles.link}>HOME</a>
        <a style={styles.link}>SHOP</a>
        <a style={styles.link}>ABOUT</a>
      </nav>
      <i class="fa-solid fa-magnifying-glass fa-bounce fa-lg"></i>
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
};

export default Header;
