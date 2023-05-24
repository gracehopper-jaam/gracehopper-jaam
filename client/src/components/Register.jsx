import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { registerUser } from '../api-client/auth';
import './Register.css';


const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [addressline1, setAddress1] = useState('');
    const [addressline2, setAddress2] = useState('');
    const [error, setError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    let navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoggedIn(true);
        const result = await registerUser({ username, password, firstname, lastname, phone, email, addressline1, addressline2 });

        if(phone.length !== 10) {
          window.alert("Please use 10 digits for your phone number!")
          return;
        }

        if (password.length < 8) {
            window.alert("Please use at least 8 characters to register!");
            return;
        } else {
            window.alert('Congratulations! You are now registered!');
            navigate('/');
        }
    }



    return (
        <div className="register-container">
          <h1 id="registerHeader">Register</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username (Email)"
              id="username"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              id="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="text"
              placeholder="First Name"
              id="firstName"
              value={firstname}
              required
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              id="lastName"
              value={lastname}
              required
              onChange={(e) => setLastName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Phone Number (10 Digits)"
              id="phone"
              value={phone}
              required
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              id="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Address One"
              id="address1"
              value={addressline1}
              required
              onChange={(e) => setAddress1(e.target.value)}
            />
            <input
              type="text"
              placeholder="City, State, Zip"
              id="address2"
              value={addressline2}
              required
              onChange={(e) => setAddress2(e.target.value)}
            />
            <button type="submit" id="registerButt">Register</button>
          </form>
          <p>
              Have an account? <a href="/login">Login</a>
            </p>
        </div>
      );
}

export default Register