import { dialog } from 'electron';

function showOpenFileDialog() {
  return new Promise((resolve, reject) => {
    const files = dialog.showOpenDialogSync(
      {
        title: 'open',
        properties: ['openFile'],
        filters: [
          { name: 'makrdown file', extensions: ['md'] }
        ]
      }
    );

    if (files && files.length > 0)
      resolve(files[0]);
    else
      reject();
  });
}

export default showOpenFileDialog;
