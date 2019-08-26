import React from 'react';
import { HashRouter, Route } from 'react-router-dom';

import Login from './Login';
import Signup from './Signup';
import Rooms from './Rooms';

const App = () => {
  return (
    <>
      <HashRouter>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/rooms" component={Rooms} />
      </HashRouter>
    </>
  );
};

export default App;
