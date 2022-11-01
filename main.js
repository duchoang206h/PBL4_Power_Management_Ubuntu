// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const { WINDOW_SIZE } = require('./config')
const { 
  handleBatterySaveOn,
  handleBatterySleep,
  handleBatteryTurnOff,
  handleBatteryUsage,
  handlePluggedInSleep,
  handlePowerMode,
  handlePluggedInTurnOn
} = require('./handlers')
function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: WINDOW_SIZE.width,
    height: WINDOW_SIZE.height,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  });
  // handle ipcMain
  ipcMain.handle('batteryTurnOff', handleBatteryTurnOff)
  ipcMain.handle('pluggedInTurnOn', handlePluggedInTurnOn)
  ipcMain.handle('batterySleep', handleBatterySleep)
  ipcMain.handle('pluggedInSleep', handlePluggedInSleep)
  ipcMain.handle('powerMode', handlePowerMode)
  ipcMain.handle('batterySaveOn', handleBatterySaveOn)
  ipcMain.handle('batteryUsage', handleBatteryUsage)
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
