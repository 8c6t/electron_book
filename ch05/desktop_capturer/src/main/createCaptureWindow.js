import { BrowserWindow, ipcMain, nativeImage } from 'electron';
import path from 'path';

class CaptureWindow {
  constructor() {
    this.win = new BrowserWindow({
      show: false,
      webPreferences: {
        nodeIntegration: true
      }
    });
    this.win.loadFile(path.join(__dirname, '..', '..', 'captureWindow.html'));
  }
  
  capture(clippingProfile) {
    return new Promise((resolve, reject) => {
      ipcMain.on('REPLY_CAPTURE', (_, { error, dataURL }) => {
        if (error)  reject(error);
        resolve(nativeImage.createFromDataURL(dataURL));
      });
      this.win.webContents.send('CAPTURE', clippingProfile);
    })
  }

  close() {
    this.win.close();
  }
}

function createCaptureWindow() {
  return new CaptureWindow();
}

export default createCaptureWindow;
