import React from 'react';
import { useNavigate } from 'react-router';

const Checkout = ({isLoggedIn}) => {
  let navigate = useNavigate('');

  return (
    <>
    <div style={styles.back}>
      <i className="fa-solid fa-arrow-left"></i><button onClick={() => navigate("/cart")} className='backToCart' style={styles.back}>Back to Cart</button>
    </div>
    <div className='contact-container' style={styles.all}>
      <h2>Contact Information</h2>
      <div className='contactRoutes' style={styles.contactRoutes}>
      {isLoggedIn ? (
          <>
            <button style={styles.a} onClick={() => navigate("/cartWithAccountView")}>
              Existing Customer
            </button>
            <em style={styles.em}>Go straight to checkout</em>
          </>
        ) : (
          <>
            <button style={styles.a} onClick={() => navigate("/login")}>
              Existing Customer
            </button>
            <em style={styles.em}>Go straight to login</em>
          </>
        )}
        <button style={styles.a} onClick={() => navigate("/register")}>Create Account</button>
        <em style={styles.em}>Save your details</em>
        <button style={styles.a} onClick={() => navigate("/guestCheckout")}>Guest Checkout</button>
        <em style={styles.em}>Proceed without registering</em>
      </div>
      <br></br>
      <hr></hr>
    </div>
    </>
    
    
  )
};

const styles = {
  all: {
    fontFamily: 'Arial',
  },
  a: {
    display: 'flex',
    flexDirection: 'columm',
    marginLeft: '50px',
    padding: '10px',
    cursor: 'pointer',
    width: 'fit-content',
    textDecoration: 'none',
    color: 'black',
    fontSize: '15px',
    border: '2px solid black',
    letterSpacing: '1px'
  },
  em: {
    marginLeft: '100px',
  },

  back: {
    marginTop: '15px',
    marginLeft: '10px',
    padding: '3px',
    cursor: 'pointer',
    width: 'fit-content',
    fontSize: '15px',
    textDecoration: 'none',
    color: 'black',
  },
}

export default Checkout