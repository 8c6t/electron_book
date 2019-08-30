import { app } from 'electron';
import createMainWindow from './createMainWindow';
import setAppMenu from './setAppMenu';
import menuOptions from './menuOptions';

let mainWindow = null;

app.on('ready', () => {
  mainWindow = createMainWindow();
  setAppMenu(menuOptions);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin')  app.quit();
});

app.on('activate', (_e, hasVisibleWindows) => {
  if (!hasVisibleWindows) {
    mainWindow = createMainWindow();
  }
});
