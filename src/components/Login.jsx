import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';
import { loginUser } from '../api-client/auth';

const Login = ({ setIsLoggedIn, setToken, setUser }) => {
  
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
      event.preventDefault();
      const userToAuth = { username: username, password: password };
      const data = await loginUser(userToAuth);
      // console.log(data);
      if (data.token) {
          setIsLoggedIn(true);
          setUsername('');
          setPassword('');
          setUser(data.user)
          setToken(data.token)
          localStorage.setItem("currentUser", data.user.username);
          localStorage.setItem("token", data.token);
          navigate("/")
      }

      if(!data.token) {
        window.alert('Please register!')
        navigate("/register")
      }

  }


  return (
    <>
      <div className="login-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="Email"
              id="username"
              value={username}
              required
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              id="password"
              value={password}
              required
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button type="submit" id="loginButt">LOGIN</button>
        </form>
        <p>Don't have an account?
        <Link to="/register">
        Register
      </Link>
      
        </p>
      </div>
    </>
  )
}

export default Login