import { ipcRenderer } from 'electron';
import React, { Component } from 'react';

import Previewer from './Previewer';

class PDFUI extends Component {
  state = {
    text: ''
  }

  componentDidMount() {
    const text = ipcRenderer.sendSync("REQUEST_TEXT");
    this.setState({ text });
  }

  componentDidUpdate() {
    this.syncImageRenderered().then(() => {
      ipcRenderer.send("RENDERED_CONTENTS");
    });
  }

  syncImageRenderered = () => {
    const images = Array.prototype.slice.call(document.querySelectorAll('img'));
    const loadingImages = images.filter(img => !img.complete);
  
    if (loadingImages.length === 0) {
      return Promise.resolve();
    }
  
    return Promise.all(loadingImages.map(img => {
      new Promise(resolve => img.onload = () => resolve());
    }));
  }

  render() {
    return (
      <Previewer value={this.state.text} />
    );
  }

}

export default PDFUI;
