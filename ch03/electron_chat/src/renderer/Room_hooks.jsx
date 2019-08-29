import React, { useState, useEffect, useRef, useCallback } from 'react';
import firebase from 'firebase/app';

import Message from './Message';
import NewMessage from './NewMessage';

const ROOM_STYLE = {
  padding: "10px 30px"
};

const Room = ({ match: { params: { roomId } }}) => {
  const [description, setDescription] = useState('');
  const [messages, setMessages] = useState([]);
  
  const db = useRef(firebase.database());
  const user = useRef(firebase.auth().currentUser);

  const stream = useRef();
  const fbChatRoomRef = useRef();
  const room = useRef();

  // componentDidMMount + Update(roomId)
  useEffect(() => {
    if (stream.current) {
      stream.current.off();
    }

    setMessages([]);
    // setMessages(_ => []);
    fetchRoom(roomId);
  }, [roomId]);

  // componentDidUpdate
  useEffect(() => {
    setTimeout(() => {
      room.current.parentNode.scrollTop = room.current.parentNode.scrollHeight;
    }, 0);
  });

  // componentWillUnmount
  useEffect(() => {
    return () => {
      if (stream.current) {
        stream.current.off();
      }
    };
  }, []);

  const fetchRoom = (roomId) => {
    fbChatRoomRef.current = db.current.ref('/chatrooms/' + roomId);
    fbChatRoomRef.current.once('value')
      .then(snapshot => {
        const { description } = snapshot.val();
        setDescription(description);
        window.document.title = description;
    });

    stream.current = fbChatRoomRef.current.child('messages').limitToLast(10);
    stream.current.on('child_added', item => {
      const msg = messages || [];
      msg.push(Object.assign({ key: item.key }, item.val()));
      setMessages(msg);
    });
  };

  const handleMessagePost = (message) => {
    const newItemRef = fbChatRoomRef.current.child('messages').push();
    const { uid, displayName, photoURL } = user.current;
    return newItemRef.update({
      writtenBy: { uid, displayName, photoURL },
      time: Date.now(),
      text: message
    });
  }

  return (
    <div style={ROOM_STYLE} ref={room}>
      <div className="list-group">
        {messages.map(m => <Message key={m.key} message={m} /> )}
      </div>
      <NewMessage onMessagePost={handleMessagePost} />
    </div>
  );
}

export default Room;
