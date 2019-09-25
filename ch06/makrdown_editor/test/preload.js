require("electron").ipcMain.once("SAVE_AS_NEW_FILE_TEST", (_e) => {
  const saveAsMenu = require("electron")
    .Menu.getApplicationMenu()
    .items.find(item => item.label === "File")
    .submenu.items.find(item => item.label === "Save as...");
  saveAsMenu.click();
});

function mockShowSaveDialog() {
  return "sandbox/test.md";
};

const { dialog } = require("electron");
dialog.showSaveDialogSync = mockShowSaveDialog;
