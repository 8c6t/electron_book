import { BrowserWindow, ipcMain, nativeImage } from 'electron';
import path from 'path';

class CaptureWindow {
  constructor() {
    this.win = new BrowserWindow({
      webPreferences: {
        nodeIntegration: true
      }
    });
    this.win.loadFile(path.join(__dirname, '..', '..', 'captureWindow.html'));
  }
  
  close() {
    this.win.close();
  }
}

function createCaptureWindow() {
  return new CaptureWindow();
}

export default createCaptureWindow;
