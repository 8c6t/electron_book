import { BrowserWindow } from 'electron';
import path from 'path';

let win;
function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // win.loadURL(`file://${__dirname}/../../index.html`);
  win.loadFile(path.join(__dirname, '..', '..', 'index.html'));
  
  // win.webContents.openDevTools();

  win.on('close', () => {
    win = null;
  });
}

export default createWindow;
