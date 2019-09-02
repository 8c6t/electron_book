import { ipcRenderer } from 'electron';
import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';

import Previewer from './Previewer';

const PDFUI = () => {
  const [text, setText] = useState('');
  const isMountedRef = useRef(false);

  useEffect(() => {
    if (isMountedRef.current) {
      const text = ipcRenderer.sendSync("REQUEST_TEXT");
      setText(text);
    } else {
      isMountedRef.current = true;
      syncImageRenderered().then(() => {
        ipcRenderer.send("RENDERED_CONTENTS");
      }); 
    }
  });

  const syncImageRenderered = () => {
    const images = Array.prototype.slice.call(document.querySelectorAll('img'));
    const loadingImages = images.filter(img => !img.complete);
  
    if (loadingImages.length === 0) {
      return Promise.resolve();
    }
  
    return Promise.all(loadingImages.map(img => {
      new Promise(resolve => img.onload = () => resolve());
    }));
  }

  return (
    <Previewer value={text} />
  );
}

export default PDFUI;