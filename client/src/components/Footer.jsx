import React from 'react';
import Images from '../media';
import './Footer.css';
import { useNavigate } from 'react-router';

const Footer = () => {
  let navigate = useNavigate('');

  return (
    <footer className='footer-container'>
      <div className='footer-column'>
        <img className="logo" src={Images.JAAMLOGO} alt='Logo' />
      </div>
      <div className='footer-column'>
        <p className='text-placeholder'>JAAM - The First Online Store to Let You Try Your Headphones Before You Buy</p>
      </div>
      <div className='footer-column footer-right'>
        <button onClick={() => { navigate("/ContactUs") }} className='contact-button'>Contact Us</button>
        <button onClick={() => { navigate("/ProfilePage") }} className='checkout-button'>Checkout the Creators</button>
        <p className='small-text'>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
