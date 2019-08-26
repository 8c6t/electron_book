import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';

import { useInput } from '../common/customHooks';
import Errors from './Errors';

const FORM_STYLE = {
  margin: "0 auto",
  padding: 30
};

const SIGNUP_LINK_STYLE = {
  display: "inline-block",
  marginLeft: 10
};

const Login = ({ history }) => {
  const [email, onChangeEmail] = useInput(localStorage.userEmail || '');
  const [password, onChangePassword] = useInput(localStorage.userPassword || '');
  const [errors, setErrors] = useState([]);

  const onSubmit = useCallback((e) => {
    const errors = [];
    let isValid = true;
    e.preventDefault();

    if (!email.length) {
      isValid = false;
      errors.push("Email can't be blank");
    }

    if (!password.length) {
      isValid = false;
      errors.push("Password can't be blank");
    }

    if (!isValid) {
      setErrors(errors);
      return;
    }

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        localStorage.userEmail = email;
        localStorage.userPassword = password;
        history.push('/rooms');
      })
      .catch(() => {
        setErrors(["Incorrect email or password"]);
      });
  }, [email, password]);

  return (
    <form style={FORM_STYLE} onSubmit={onSubmit}>
      <Errors errorMessages={errors} />
      <div className="form-group">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="email"
          onChange={onChangeEmail}
          value={email}
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="password"
          onChange={onChangePassword}
          value={password}
        />
      </div>
      <div className="form-group">
        <button className="btn btn-large btn-default">Login</button>
        <div style={SIGNUP_LINK_STYLE}>
          <Link to="/signup">create new account</Link>
        </div>
      </div>
    </form>
  );
};

export default Login;
