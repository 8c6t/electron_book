import React from 'react';
import { Link, Route } from 'react-router-dom';
import Room from './Room';

const Rooms = ({ match }) => {
  return (
    <div>
      <h2>Rooms</h2>
      <ul>
        <li><Link to={`${match.url}/1`}>Room 1</Link></li>
        <li><Link to={`${match.url}/2`}>Room 2</Link></li>
      </ul>
      <div>
        <Route exact path={`${match.url}`} render={() => (<div>Choose room</div>)} />
        <Route path={`${match.url}/:roomId`} component={Room} />
      </div>
    </div>
  );
}

export default Rooms;
