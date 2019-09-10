import React from 'react';
import marked from 'marked';
import classnames from 'classnames/bind';

import style from './Previewer.module.css';

const cx = classnames.bind(style);

marked.setOptions({ sanitize: true });

const Previewer = ({ className, value }) => {
  return (
    <div
      id="previewer"
      className={cx(className, 'previewer')}
    >
    <span
      dangerouslySetInnerHTML={{ __html: marked(value) }}
    />
    </div>
  )
}

export default Previewer;
