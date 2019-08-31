import { mainWindow, fileManager } from './index';

import showSaveAsNewFileDialog from "./showSaveAsNewFileDialog";
import showOpenFileDialog from './showOpenFileDialog';

function openFile() {
  showOpenFileDialog()
    .then(filePath => fileManager.readFile(filePath))
    .then(text => mainWindow.sendText(text))
    .catch(error => console.error(error));
}

function saveFile() {
  if (!fileManager.filePath) {
    saveAsNewFile();
    return;
  }

  mainWindow.requestText()
    .then(text => {
      console.log(text);
      fileManager.overWriteFile(text)
    })
    .catch(error => console.error(error));
}

function saveAsNewFile() {
  Promise.all([ showSaveAsNewFileDialog(), mainWindow.requestText() ])
    .then(([filePath, text]) => fileManager.saveFile(filePath, text))
    .catch(error => console.error(error));
}

function exportPDF() {
  console.log('exportPDF');
}

export default {
  openFile,
  saveFile,
  saveAsNewFile,
  exportPDF,
};
