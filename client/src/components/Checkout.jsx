import React from 'react'

const Checkout = () => {
  return (
    <>
    <div style={styles.back}>
      <i className="fa-solid fa-arrow-left"></i><a href='/' className='backToCart' style={styles.back}>Back to Cart</a>
    </div>
    <div className='contact-container' style={styles.all}>
      <h2>Contact Information</h2>
      <div className='contactRoutes' style={styles.contactRoutes}>
        <a style={styles.a} href='/login'>Existing Customer</a>
        <em style={styles.em}>Go straight to login</em>
        <a style={styles.a} href='/register'>Create Account</a>
        <em style={styles.em}>Save your details</em>
        <a style={styles.a} href='/guestCheckout'>Guest Checkout</a>
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
    fontSize: '20px',
    border: '2px solid black',
  },
  em: {
    marginLeft: '100px',
  },

  back: {
    padding: '5px',
    cursor: 'pointer',
    width: 'fit-content',
    fontSize: '20px',
    textDecoration: 'none',
    color: 'black',
  },
}

export default Checkout