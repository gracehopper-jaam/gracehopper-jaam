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
          For any inquiries or support, please feel free to reach out to us using the contact information below:
        </p>
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
