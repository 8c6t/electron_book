import React, { useState } from 'react';

const FORM_STYLE = {
  display: 'flex'
};

const BUTTON_STYLE = {
  marginLeft: 10
};

const NewMessage = ({ onMessagePost }) => {
  const [message, setMessage] = useState('');

  const onChangeMessage = (e) => {
    setMessage(e.target.value);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (!onMessagePost || !message.length) {
      return;
    }

    onMessagePost(message);
    setMessage('');
  }

  return (
    <form style={FORM_STYLE} onSubmit={onSubmit}>
      <input
        type="text"
        className="form-control"
        onChange={onChangeMessage}
        value={message}
      />
      <button className="btn btn-large btn-primary" style={BUTTON_STYLE}>POST</button>
    </form>
  )
}

export default NewMessage;
