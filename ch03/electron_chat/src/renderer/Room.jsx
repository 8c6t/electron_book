import React from 'react';

const Room = ({ match }) => {
  return (
    <div>
      <h3>{`Room ${match.params.roomId}`}</h3>
    </div>
  );
}

export default Room;
