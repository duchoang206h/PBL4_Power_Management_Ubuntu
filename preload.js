const { contextBridge, ipcRenderer } = require('electron');
// expose ipMain
contextBridge.exposeInMainWorld('handle', {
  setBatteryTurnOff : (minute) => ipcRenderer.invoke('handle:batteryTurnOff', minute),
  setPluggedInTurnOn: (minute) => ipcRenderer.invoke('handle:pluggedInTurnOn', minute),
  setBatterySleep: (minute) => ipcRenderer.invoke('handle:batterySleep', minute),
  setPluggedInSleep: (minute) => ipcRenderer.invoke('handle:pluggedInSleep', minute),
  setPowerMode: (mode) => ipcRenderer.invoke('handle:powerMode', mode),
  setBatterySaveOn: (minute) => ipcRenderer.invoke('handle:setBatterySaveOn', minute),
  setBatteryUsage: (mode) => ipcRenderer.invoke('handle:batteryUsage', mode),
  setBrightness: (value) => ipcRenderer.invoke('handle:setBrightness', value),
  setLowBrightnessOnBattery: (value) => ipcRenderer.invoke('handle:setLowBrightnessOnBattery', value),
  turnOnBatterySaver: (value) => ipcRenderer.invoke('handle:turnOnBatterySaver', value),
  updateBatterySaver: (callback) => ipcRenderer.on('updateBatterySaver', callback)
})
contextBridge.exposeInMainWorld('system', {
  getCurrentBrightness : () => ipcRenderer.invoke('system:getCurrentBrightness'),
  getAllSetting : () => ipcRenderer.invoke('system:getAllSetting'),
  
})
