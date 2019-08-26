import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

if (!location.hash.length) {
  location.hash = "#login";
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
