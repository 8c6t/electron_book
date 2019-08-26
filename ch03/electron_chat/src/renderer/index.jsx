import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase/app';
import "firebase/auth";
import dotenv from 'dotenv';

dotenv.config();

import App from './App';

if (!location.hash.length) {
  location.hash = "#login";
}

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DB_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
