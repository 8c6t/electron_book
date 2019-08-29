import React, { useState, useEffect, useRef } from 'react';
import { Route } from 'react-router-dom';
import firebase from 'firebase/app';

import Room from './Room';
import RoomItem from './RoomItem';

const ICON_CHAT_STYLE = {
  fontSize: 120,
  color: '#DDD',
};

const FORM_STYLE = {
  display: 'flex',
};

const BUTTON_STYLE = {
  marginLeft: 20,
};

const Rooms = ({ match, history }) => {
  const [roomName, setRoomName] = useState('');
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState('');

  const db = useRef(firebase.database());

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = () => {
    return db.current.ref('/chatrooms').limitToLast(20).once('value')
      .then(snapshot => {
        const rooms = [];
        snapshot.forEach(item => {
          rooms.push(Object.assign({ key: item.key }, item.val()));
        });
        setRooms(rooms);
      });
  }

  const handleOnClickRoomItem = (key) => {
    setSelectedRoom(key);
  }

  const handleOnChangeRoomName = (e) => {
    setRoomName(e.target.value);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (!roomName.length) {
      return;
    }

    const newRoomRef = db.current.ref('/chatrooms').push();
    const newRoom = {
      description: roomName
    };

    newRoomRef.update(newRoom)
      .then(() => {
        setRoomName('');
        return fetchRooms().then(() => {
          setSelectedRoom(newRoomRef.key);
          history.push(`/rooms/${newRoomRef.key}`)
        });
      });
  }

  const renderRoomList = () => {
    return (
      <div className="list-group">
        {rooms.map(r =>
          <RoomItem
            url={`${match.url}`}
            room={r}
            key={r.key}
            selected={r.key === selectedRoom}
            onClickRoomItem={handleOnClickRoomItem}
          />) 
        }
        <div className="list-group-header">
          <form style={FORM_STYLE} onSubmit={onSubmit}>
            <input
              type="text"
              className="form-control"
              placeholder="New room"
              onChange={handleOnChangeRoomName}
              value={roomName}
            />
            <button className="btn btn-default" style={BUTTON_STYLE}>
              <span className="icon icon-plus" />
            </button>
          </form>
        </div>
      </div>
    );
  }

  const renderRoom = () => (
    <>
      <Route exact path={`${match.url}`} render={() => (
        <div className="text-center">
          <div style={ICON_CHAT_STYLE}>
            <span className="icon icon-chat" />
          </div>
          <p>
            Join a chat room from the sidebar or create your chat room
          </p>
        </div>
      )}/>
      <Route path={`${match.url}/:roomId`} component={Room} />
    </>
  );

  return (
    <div className="pane-group">
      <div className="pane-sm sidebar">{renderRoomList()}</div>
      <div className="pane">{renderRoom()}</div>
    </div>
  )

}

export default Rooms;
