// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const job = require('./cronjob/job')
const { WINDOW_SIZE } = require('./config')
const { 
  system,
  handler
} = require('./handlers')
function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: WINDOW_SIZE.width,
    height: WINDOW_SIZE.height,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
     /*  nodeIntegration: true,
      contextIsolation: false */
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  mainWindow.webContents.openDevTools()
  // handle ipcMain
  /* ipcMain.handle('handle:batteryTurnOff', handler.handleBatteryTurnOff)
  ipcMain.handle('handle:pluggedInTurnOn', handler.handlePluggedInTurnOn)
  ipcMain.handle('handle:batterySleep', handler.handleBatterySleep)
  ipcMain.handle('handle:pluggedInSleep', handler.handlePluggedInSleep) */
  ipcMain.handle('handle:powerMode', system.setPowerMode)
  ipcMain.handle('handle:setBatterySaveOn', system.setBatterySaveOn)
  /* ipcMain.handle('handle:batteryUsage', handler.handleBatteryUsage) */
  ipcMain.handle('handle:turnOnBatterySaver', handler.handleTurnOnBatterySaver)
  // system
  ipcMain.handle('system:getAllSetting', system.getAllSetting)
  ipcMain.handle('system:getCurrentBrightness', system.getCurrentBrightness)
  ipcMain.handle('handle:setBrightness', system.setBrightness)
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()
  job.start()
  app.on('activate', function () {
   
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  });
  
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function (event) {
  if (process.platform !== 'darwin') {
    event.preventDefault();
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
