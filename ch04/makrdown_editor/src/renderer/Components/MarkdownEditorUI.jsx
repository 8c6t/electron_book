import React, { useState, useCallback } from 'react';
import classnames from 'classnames/bind';

import Editor from './Editor';
import Previewer from './Previewer';

import style from './MarkdownEditorUI.module.css';

const cx = classnames.bind(style);

const MarkdownEditorUI = () => {
  const [text, setText] = useState('');

  const onChangeText = useCallback((e) => {
    setText(e.target.value);
  }, []);

  return (
    <div className={cx('markdownEditor')}>
      <Editor
        className={cx('editorArea')}
        value={text}
        onChange={onChangeText}
      />
      <Previewer
        className={cx('previewerArea')}
        value={text}
      />
    </div>
  );
}

export default MarkdownEditorUI;
