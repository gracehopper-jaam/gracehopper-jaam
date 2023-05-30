import React from 'react';
import './ContactUs.css';

const ContactUs = () => {
  return (
    <div className="contact-us-container">
      <div className="contact-us-header">
        <h1>Contact Us</h1>
      </div>
      <div className="contact-us-content">
        <p className="content-text">
        At JAAM, we take pride in being the first online store that allows you to try your headphones before making a purchase. We are committed to providing exceptional customer service and ensuring your complete satisfaction. If you have any questions, concerns, or feedback, we are here to assist you. Please feel free to reach out to us using any of the methods below.        </p>
        <div className="contact-info">
          <div className="contact-item">
            <h3>Email</h3>
            <p>contact@example.com</p>
          </div>
          <div className="contact-item">
            <h3>Phone</h3>
            <p>+1 123-456-7890</p>
          </div>
          <div className="contact-item">
            <h3>Address</h3>
            <p>123 Main Street, City, Country</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
