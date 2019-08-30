import { BrowserWindow } from 'electron';
import os from 'os';
import path from 'path';

class MainWindow {
  constructor() {
    this.window = new BrowserWindow({
      width: 800, 
      height: 600,
      webPreferences: {
        nodeIntegration: true
      }
    });

    this.window.loadFile(path.join(__dirname, '..', '..', 'index.html'));

    this.window.on('closed', () => {
      this.window =- null;
    });
  }
}

const createMainWindow = () => {
  BrowserWindow.addDevToolsExtension(
    path.join(os.homedir(), "AppData/Local/Google/Chrome/User Data/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.0.6_0")
  );
  return new MainWindow();
}

export default createMainWindow;