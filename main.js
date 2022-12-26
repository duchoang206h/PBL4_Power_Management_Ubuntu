// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const job = require("./model/job");
const { WINDOW_SIZE } = require("./config/constant");
const { controller } = require("./controller/controller");
let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: WINDOW_SIZE.width,
    height: WINDOW_SIZE.height,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),

      /*  nodeIntegration: true,
      contextIsolation: false */
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile("./view/index.html");

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
  // handle ipcMain
  ipcMain.handle(
    "handle:turnOffScreenAfter",
    controller.handleTurnOffScreenAfter
  );
  ipcMain.handle(
    "handle:setBatterySleepAfter",
    controller.handleBatterySleepAfter
  );
  ipcMain.handle(
    "handle:setPluggedInSleepAfter",
    controller.handlePluggedInSleepAfter
  );
  /* ipcMain.handle('handle:batteryUsage', controller.handleBatteryUsage) */
  ipcMain.handle("handle:powerMode", controller.handleSetPowerMode);
  ipcMain.handle("handle:setBatterySaveOn", controller.handleSetBatterySaveOn);
  ipcMain.handle(
    "handle:turnOnBatterySaver",
    controller.handleTurnOnBatterySaver
  );
  ipcMain.handle(
    "handle:setLowBrightnessOnBattery",
    controller.handleSetLowBrightnessOnBatterySaver
  );
  ipcMain.handle(
    "handle:setTurnOffWifiOnBattery",
    controller.handleSetTurnOffWifiOnBattery
  ),
    ipcMain.handle(
      "handle:setTurnOffBluetoothOnBattery",
      controller.handleSetTurnOffBluetoothOnBattery
    ),
    // handle
    ipcMain.handle("handle:getAllSetting", controller.handleGetAllSetting);
  ipcMain.handle(
    "handle:getCurrentBrightness",
    controller.handleGetCurrentBrightness
  );
  ipcMain.handle(
    "handle:getBatteryHistory",
    controller.handleGetBatteryHistory
  );
  ipcMain.handle("handle:setBrightness", controller.handleSetBrightness);

  ipcMain.handle(
    "handle:setPowerButtonAction",
    controller.handleSetPowerButtonAction
  );
  ipcMain.handle("handle:getBatteryDetail", controller.handleGetBatteryDetail);
  ipcMain.handle("openBatteryDetailWindow", (event) => {
    return openBatteryDetailWindow();
  });
  return mainWindow;
}
function openBatteryDetailWindow() {
  const batteryWindow = new BrowserWindow({
    width: WINDOW_SIZE.width / 2,
    height: WINDOW_SIZE.height / 2,
    parent: mainWindow,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      /*  nodeIntegration: true,
      contextIsolation: false */
    },
  });
  batteryWindow.loadFile("./view/battery-details.html");
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  const mainWindow = createWindow();
  // init setting when startup
  // cronjob
  job(mainWindow);
  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function (event) {
  if (process.platform !== "darwin") {
    event.preventDefault();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
