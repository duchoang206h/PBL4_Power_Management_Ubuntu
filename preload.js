const { contextBridge, ipcRenderer } = require('electron');
// expose ipMain
contextBridge.exposeInMainWorld('handle', {
  setBatteryTurnOff : (minute) => ipcRenderer.invoke('handle:batteryTurnOff', minute),
  setPluggedInTurnOn: (minute) => ipcRenderer.invoke('pluggedInTurnOn', minute),
  setBatterySleep: (minute) => ipcRenderer.invoke('batterySleep', minute),
  setPluggedInSleep: (minute) => ipcRenderer.invoke('pluggedInSleep', minute),
  setPowerMode: (mode) => ipcRenderer.invoke('powerMode', mode),
  setBatterySaveOne: (minute) => ipcRenderer.invoke('batterySaveOn', minute),
  setBatteryUsage: (mode) => ipcRenderer.invoke('batteryUsage', mode)
})
