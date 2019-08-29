import React from 'react';
import { Link } from 'react-router-dom';

const LINK_STYLE = {
  color: 'inherit',
  textDecoration: 'none'
};

const RoomItem = ({ url, room, selected, onClickRoomItem }) => {
  const { description, key } = room;
  return (
    <div className={selected ? "list-group-item selected" : "list-group-item"} onClick={() => onClickRoomItem(key)} >
      <Link to={`${url}/${key}`} style={LINK_STYLE}>
        <div className="media-body">
          <strong>{description}</strong>
        </div>
      </Link>
    </div>
  )
};

export default RoomItem;
