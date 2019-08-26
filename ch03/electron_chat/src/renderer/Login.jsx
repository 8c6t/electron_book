import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div>
      <h2>Login</h2>
      <Link to="/rooms">Login</Link>
      <br />
      <Link to="/signup">Create new account</Link>
    </div>
  );
};

export default Login;
