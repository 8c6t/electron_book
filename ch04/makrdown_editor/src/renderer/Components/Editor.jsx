import React from 'react';
import classNames from 'classnames/bind';
import style from './Editor.module.css';

const cx = classNames.bind(style);

const Editor = ({ value, className, onChange }) => {
  return (
    <textarea
      id="editor"
      className={cx('editor', className)}
      value={value}
      onChange={onChange}
    />
  )
}

export default Editor;
