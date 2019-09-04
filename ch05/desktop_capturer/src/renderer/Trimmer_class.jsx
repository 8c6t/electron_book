import { ipcRenderer } from 'electron'
import React, { Component } from 'react';
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

class Trimmer extends Component {
  state = {
    isClipping: false,
    clientPosition: {},
    screenPosition: {},
  }

  // 드래그 시작
  handleOnMouseDown = (e) => {
    const clientPosition = {
      x1: e.clientX, y1: e.clientY,
      x2: e.clientX, y2: e.clientY
    };
    const screenPosition = {
       x1: e.screenX, y1: e.screenY,
       x2: e.screenX, y2: e.screenY
    }

    this.setState({
      isClipping: true,
      clientPosition,
      screenPosition
    })
  }

  // 드래그 종료
  handleOnMouseUp = (e) => {
    this.setState({ isClipping: false });
    const trimmedBounds = position2Bounds(this.state.screenPosition);
    if (trimmedBounds.width > 100 && trimmedBounds.height > 100) {
      // 자를 대상 위치 정보를 Main 프로세스에 전달
      ipcRenderer.send('SEND_BOUNDS', { trimmedBounds });
    }
  }

  // 드래그 중
  handleOnMouseMove = (e) => {
    if (!this.state.isClipping) return;
    const clientPosition = this.state.clientPosition;
    clientPosition.x2 = e.clientX;
    clientPosition.y2 = e.clientY;

    const screenPosition = this.state.screenPosition;
    screenPosition.x2 = e.screenX;
    screenPosition.y2 = e.screenY;

    this.setState({
      clientPosition,
      screenPosition
    });
  }

  // 사각형 영역에 테두리를 그리는 처리
  handleOnMouseEnter = (e) => {
    if (!e.buttons) {
      this.setState({ isClipping: false });
    }
  }

  renderRect = () => {
    const bounds = position2Bounds(this.state.clientPosition);
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
  
  render() {
    return (
      <div
        className={cx('root')}
        onMouseDown={this.handleOnMouseDown}
        onMouseUp={this.handleOnMouseUp}
        onMouseMove={this.handleOnMouseMove}
        onMouseEnter={this.handleOnMouseEnter}
      >
        { this.state.isClipping ? this.renderRect() : <div /> }
      </div>
    )
  }
}

export default Trimmer;
