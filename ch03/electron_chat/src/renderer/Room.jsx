import React, { Component } from "react";
import firebase from "firebase/app";

import Message from "./Message";
import NewMessage from "./NewMessage";

const ROOM_STYLE = {
  padding: "10px 30px"
};

class Room extends Component {
  state = {
    description: "",
    messages: [],
  }

  db = firebase.database();

  fbChatRoomRef;
  stream;
  user;

  componentDidMount() {
    const { roomId } = this.props.match.params;
    this.fetchRoom(roomId);
  }

  componentDidUpdate(prevProps) {
    const { roomId } = this.props.match.params;
    if (roomId !== prevProps.match.params.roomId) {
      if (this.stream) {
        this.stream.off();
      }
      this.setState({ messages: [] });
      this.fetchRoom(roomId);
    }

    setTimeout(() => {
      this.room.parentNode.scrollTop = this.room.parentNode.scrollHeight;
    }, 0);
  }

  componentWillUnmount() {
    if (this.stream) {
      this.stream.off();
    }
  }

  handleMessagePost = (message) => {
    const newItemRef = this.fbChatRoomRef.child("messages").push();
    this.user = this.user || firebase.auth().currentUser;
    const { uid, displayName, photoURL } = this.user;
    return newItemRef.update({
      writtenBy: { uid, displayName, photoURL },
      time: Date.now(),
      text: message,
    });
  }

  fetchRoom(roomId) {
    this.fbChatRoomRef = this.db.ref("/chatrooms/" + roomId);
    this.fbChatRoomRef.once("value")
      .then(snapshot => {
        const { description } = snapshot.val();
        this.setState({ description });
        window.document.title = description;
      });
    this.stream = this.fbChatRoomRef.child("messages").limitToLast(10);
    this.stream.on("child_added", item => {
      const { messages } = this.state || [];
      messages.push(Object.assign({ key: item.key }, item.val()));
      this.setState({ messages });
    });
  }

  render() {
    const { messages } = this.state;
    return (
      <div style={ROOM_STYLE} ref={room => this.room = room}>
        <div className="list-group">
          {messages.map(m => <Message key={m.key} message={m} /> )}
        </div>
        <NewMessage onMessagePost={this.handleMessagePost} />
      </div>
    );
  }
}

export default Room;
