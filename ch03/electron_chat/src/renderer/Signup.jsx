import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import * as firebase from 'firebase/app';

import { useInput } from '../common/customHooks';
import Errors from './Errors';

const SIGNUP_FORM_STYLE = {
  margin: "0 auto",
  padding: 30,
}

const CANCEL_BUTTON_STYLE = {
  marginLeft: 10
}

const Signup = ({ history }) => {
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [name, onChangeName] = useInput('');
  const [photoURL, onChangePhotoURL] = useInput('');
  const [errors, setErrors] = useState([]);

  const onSubmit = useCallback((e) => {
    const errors = [];
    let isValid = true;
    e.preventDefault();

    if (!email.length) {
      isValid = false;
      errors.push("Email address can't be blank");
    }

    if (!password.length) {
      isValid = false;
      errors.push("Password can't be blank");
    }

    if (!name.length) {
      isValid = false;
      errors.push("Name can't be blank");
    }

    if (!isValid) {
      setErrors(errors)
      return;
    }

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        return user.updateProfile({
          displayName: name,
          photoURL,
        });
      })
      .then(() => {
        history.push('/rooms');
      })
      .catch(err => {
        setErrors([err.message]);
      });
  }, [email, password, name, photoURL]);

  return (
    <form style={SIGNUP_FORM_STYLE} onSubmit={onSubmit}>
      <Errors errorMessages={errors} />
      <div className="form-group">
        <label>Email address*</label>
        <input
          type="email"
          className="form-control"
          placeholder="email"
          value={email}
          onChange={onChangeEmail}
        />
      </div>
      <div className="form-group">
        <label>Password*</label>
        <input
          type="password"
          className="form-control"
          placeholder="password"
          value={password}
          onChange={onChangePassword}
        />
      </div>
      <div className="form-group">
        <label>User name*</label>
        <input
          type="text"
          className="form-control"
          placeholder="user name"
          value={name}
          onChange={onChangeName}
        />
      </div>
      <div className="form-group">
        <label>Photo URL*</label>
        <input
          type="text"
          className="form-control"
          placeholder="photo URL"
          value={photoURL}
          onChange={onChangePhotoURL}
        />
      </div>
      <div className="form-group">
        <button className="btn btn-large btn-primary">Create new account</button>
        <Link to="/login">
          <button
            type="button"
            style={CANCEL_BUTTON_STYLE}
            className="btn btn-large btn-default"
          >
            Cancel
          </button>
        </Link>
      </div>
    </form>
  );
}

export default Signup;
