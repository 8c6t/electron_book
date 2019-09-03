import { ipcRenderer } from 'electron'
import React, { useState } from 'react';
import classnames from 'classnames/bind';

import styles from './Trimmer.module.css';

const cx = classnames.bind(styles);

function position2Bounds({ x1, x2, y1, y2 }) {
  const x = Math.min(x1, x2);
  const y = Math.min(y1, y2);
  const width = Math.abs(x2 - x1);
  const height = Math.abs(y2 - y1);

  return { x, y, width, height };
}

const Trimmer = () => {
  const [isClipping, setIsClipping] = useState(false);
  const [clientPosition, setClientPosition] = useState({});
  const [screenPosition, setScreenPosition] = useState({});

  // 드래그 시작
  const handleOnMouseDown = (e) => {
    const clientPosition = {
      x1: e.clientX, y1: e.clientY,
      x2: e.clientX, y2: e.clientY
    };
    const screenPosition = {
       x1: e.screenX, y1: e.screenY,
       x2: e.screenX, y2: e.screenY
    }
    setIsClipping(true);
    setClientPosition(clientPosition);
    setScreenPosition(screenPosition);
  }

  // 드래그 종료
  const handleOnMouseUp = (e) => {
    setIsClipping(false);
    const trimmedBounds = position2Bounds(screenPosition);
    if (trimmedBounds.width > 100 && trimmedBounds.height > 100) {
      // 자를 대상 위치 정보를 Main 프로세스에 전달
      ipcRenderer.send('SEND_BOUNDS', { trimmedBounds });
    }
  }

  // 드래그 중
  const handleOnMouseMove = (e) => {
    if (!isClipping) return;
    const cp = clientPosition;
    cp.x2 = e.clientX;
    cp.y2 = e.clientY;

    const sp = screenPosition;
    sp.x2 = e.screenX;
    sp.y2 = e.screenY;

    setClientPosition(cp);
    setScreenPosition(sp);
  }

  // 사각형 영역에 테두리를 그리는 처리
  const handleOnMouseEnter = (e) => {
    if (!e.buttons) {
      setIsClipping(false);
    }
  }

  const renderRect = () => {
    const bounds = position2Bounds(clientPosition);
    const inlineStyle = {
      left:   bounds.x,
      top:    bounds.y,
      width:  bounds.width,
      height: bounds.height,
    };
    return (
      <div className={cx('rect')} style={inlineStyle} />
    )
  }
  
  return (
    <div
      className={cx('root')}
      onMouseDown={handleOnMouseDown}
      onMouseUp={handleOnMouseUp}
      onMouseMove={handleOnMouseMove}
      onMouseEnter={handleOnMouseEnter}
    >
      { isClipping ? renderRect() : <div /> }
    </div>
  )
}

export default Trimmer;
