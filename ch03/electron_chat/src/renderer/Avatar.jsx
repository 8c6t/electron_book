import React from 'react';

const AVATAR_STYLE = {
  width: 32,
  textAlign: "center",
  fontSize: 24
};

const Avatar = ({ user }) => {
  const { photoURL } = user;
  if (photoURL) {
    return <img className="img-rounded" src={photoURL} style={AVATAR_STYLE} />
  } else {
    return (
      <div style={AVATAR_STYLE}>
        <span className="icon icon-user" />
      </div>
    );
  }
}

export default Avatar;
