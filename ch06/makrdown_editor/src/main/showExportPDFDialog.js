import { dialog } from 'electron';

const showExportPDFDialog = () => {
  return new Promise((resolve, reject) => {
    const file = dialog.showSaveDialogSync({
      title: 'export as PDF',
      filters: [
        { name: 'pdf file', extensions: [ 'pdf' ] }
      ]
    });

    if (file)  resolve(file);
    else       reject();
  });
}

export default showExportPDFDialog;
