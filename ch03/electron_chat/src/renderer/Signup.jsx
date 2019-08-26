import React from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
  return (
    <div>
      <h2>Signup</h2>
      <Link to="/rooms">Create new account</Link>
      <br/>
      <Link to="/login">cancel</Link>
    </div>
  );
}

export default Signup;
