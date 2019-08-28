import { BrowserWindow } from 'electron';
import os from 'os';
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
  
  BrowserWindow.addDevToolsExtension(
    path.join(os.homedir(), "AppData/Local/Google/Chrome/User Data/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.0.6_0")
  );

  // win.loadURL(`file://${__dirname}/../../index.html`);
  win.loadFile(path.join(__dirname, '..', '..', 'index.html'));

  win.on('close', () => {
    win = null;
  });
}

export default createWindow;
