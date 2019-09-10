import { dialog } from 'electron';

function showSaveAsNewFileDialog() {
  return new Promise((resolve, reject) => {
    const file = dialog.showSaveDialogSync({
      title: 'save',
      filters: [{
        name: 'markdown file',
        extensions: [ 'md' ],
      }]
    });

    if (file)
      resolve(file);
    else
      reject();
  });
}

export default showSaveAsNewFileDialog;
