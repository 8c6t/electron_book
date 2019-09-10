import { ipcRenderer } from 'electron';
import React, { Component } from 'react';
import classnames from 'classnames/bind';

import Editor from './Editor';
import Previewer from './Previewer';

import style from './MarkdownEditorUI.module.css';

const cx = classnames.bind(style);

class MarkdownEditorUI extends Component {
  state = {
    text: '',
  }
  
  componentDidMount() {
    ipcRenderer.on("REQUEST_TEXT", () => {
      ipcRenderer.send('REPLY_TEXT', this.state.text);
    });

    ipcRenderer.on("SEND_TEXT", (_e, text) => {
      this.setState({ text });
    });
  }

  componentWillUnmount() {
    ipcRenderer.removeAllListeners();
  }

  onChangeText = (e) => {
    this.setState({ text: e.target.value });
  }

  render() {
    const { text } = this.state;
    return (
      <div className={cx('markdownEditor')}>
        <Editor
          className={cx('editorArea')}
          value={text}
          onChange={this.onChangeText}
        />
        <Previewer
          className={cx('previewerArea')}
          value={text}
        />
      </div>
    );
  };
}

export default MarkdownEditorUI;
