import { app } from 'electron';

import setAppMenu from './setAppMenu';
import menuOptions from './menuOptions';

import createMainWindow from './createMainWindow';
import createFileManager from './createFileManager';

export let mainWindow = null;
export let fileManager = null;

app.on('ready', () => {
  mainWindow = createMainWindow();
  fileManager = createFileManager();
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
