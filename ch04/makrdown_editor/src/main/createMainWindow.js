import { BrowserWindow, ipcMain, shell } from 'electron';
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

    this.window.webContents.on('will-navigate', (e, url) => {
      e.preventDefault();
      shell.openExternal(url);
    })
  }

  requestText() {
    return new Promise(resolve => {
      this.window.webContents.send("REQUEST_TEXT");
      ipcMain.once("REPLY_TEXT", (_e, text) => {
        console.log("reply:", text);
        resolve(text)
      });
    });
  }

  sendText(text) {
    this.window.webContents.send('SEND_TEXT', text);
  }
}

const createMainWindow = () => {
  BrowserWindow.addDevToolsExtension(
    path.join(os.homedir(), "AppData/Local/Google/Chrome/User Data/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.0.6_0")
  );
  return new MainWindow();
}

export default createMainWindow;