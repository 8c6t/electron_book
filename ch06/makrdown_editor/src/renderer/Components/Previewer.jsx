import React from 'react';
import marked from 'marked';
import classnames from 'classnames/bind';
import emojione from 'emojione';

import style from './Previewer.module.css';

const cx = classnames.bind(style);

marked.setOptions({ sanitize: true });

const renderer= new marked.Renderer();
renderer.text = (text) => {
  return emojione.shortnameToImage(text);
}

const Previewer = ({ className, value }) => {
  return (
    <div
      id="previewer"
      className={cx(className, 'previewer')}
    >
    <span
      dangerouslySetInnerHTML={{ __html: marked(value, { renderer }) }}
    />
    </div>
  )
}

export default Previewer;
