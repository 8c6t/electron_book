import { mainWindow, fileManager } from './index';

import showSaveAsNewFileDialog from "./showSaveAsNewFileDialog";
import showOpenFileDialog from './showOpenFileDialog';
import createPDFWindow from './createPDFWindow';
import showExportPDFDialog from './showExportPDFDialog';

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
  Promise.all([ showExportPDFDialog(), mainWindow.requestText() ])
    .then(([filePath, text]) => {
      const pdfWindow = createPDFWindow(text);
      pdfWindow.on('RENDERED_CONTENTS', () => {
        pdfWindow.generatePDF()
          .then(pdf => fileManager.writePDF(filePath, pdf))
          .then(() => pdfWindow.close())
          .catch(error => {
            console.error(error);
            pdfWindow.close();
          });
      });
    })
    .catch(error => {
      console.error(error);
    });
}

export default {
  openFile,
  saveFile,
  saveAsNewFile,
  exportPDF,
};
