const { contextBridge, ipcRenderer } = require("electron");
// expose ipMain
contextBridge.exposeInMainWorld("handle", {
  setBatteryTurnOff: (seconds) =>
    ipcRenderer.invoke("handle:setBatteryTurnOffScreenAfter", seconds),
  setPluggedInTurnOff: (seconds) =>
    ipcRenderer.invoke("handle:setPluggedInTurnOffScreenAfter", seconds),
  setBatterySleep: (seconds) =>
    ipcRenderer.invoke("handle:setBatterySleepAfter", seconds),
  setPluggedInSleep: (seconds) =>
    ipcRenderer.invoke("handle:setPluggedInSleepAfter", seconds),
  setPowerMode: (mode) => ipcRenderer.invoke("handle:powerMode", mode),
  setBatterySaveOn: (minute) =>
    ipcRenderer.invoke("handle:setBatterySaveOn", minute),
  setBatteryUsage: (mode) => ipcRenderer.invoke("handle:batteryUsage", mode),
  setBrightness: (value) => ipcRenderer.invoke("handle:setBrightness", value),
  setLowBrightnessOnBattery: (value) =>
    ipcRenderer.invoke("handle:setLowBrightnessOnBattery", value),
  turnOnBatterySaver: (value) =>
    ipcRenderer.invoke("handle:turnOnBatterySaver", value),
  updateBatterySaver: (callback) =>
    ipcRenderer.on("updateBatterySaver", callback),
  updateCurrentBattery: (callback) =>
    ipcRenderer.on("currentBattery", callback),
  updateChargingState: (callback) =>
    ipcRenderer.on("updateChargingState", callback),
  setTurnOffWifiOnBattery: (value) =>
    ipcRenderer.invoke("handle:setTurnOffWifiOnBattery", value),
  setTurnOffBluetoothOnBattery: (value) =>
    ipcRenderer.invoke("handle:setTurnOffBluetoothOnBattery", value),
});
contextBridge.exposeInMainWorld("system", {
  getCurrentBrightness: () => ipcRenderer.invoke("system:getCurrentBrightness"),
  getAllSetting: () => ipcRenderer.invoke("system:getAllSetting"),
  getBatteryHistory: () => ipcRenderer.invoke("system:getBatteryHistory"),
});
