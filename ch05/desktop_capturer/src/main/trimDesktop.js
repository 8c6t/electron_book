import { screen, ipcMain, BrowserWindow } from 'electron';
import path from 'path';

function trimDesktop() {
  const displays = screen.getAllDisplays();
  return new Promise((resolve, reject) => {
    const windows = displays.map((display, i) => {
      const { x, y, width, height } = display.bounds;
      display.name = "Screen " + (i + 1);
      const win = new BrowserWindow({
        frame: false,
        transparent: true,
        alwaysOnTop: true,
        x, y, width, height,
        webPreferences: {
          nodeIntegration: true
        }
      });
      win.loadFile(path.join(__dirname, '..', '..', 'index.html'));
      return { win, display };
    });

    ipcMain.once("SEND_BOUNDS", (e, { trimmedBounds }) => {
      const sourceDisplay = windows.find(w => w.win.webContents.id === e.sender.id).display;
      const profile = { sourceDisplay, trimmedBounds };
      windows.forEach(w => w.win.close());
      resolve(profile);
    });
  });
}

export default trimDesktop;
