const { contextBridge, ipcRenderer } = require("electron");
// expose ipMain
contextBridge.exposeInMainWorld("handle", {
  setBatteryTurnOff: (seconds) =>
    ipcRenderer.invoke("handle:turnOffScreenAfter", seconds),
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
  setPowerButtonAction: (value) =>
    ipcRenderer.invoke("handle:setPowerButtonAction", value),
  setBatteryCloseLid: (value) =>
    ipcRenderer.invoke("handle:setBatteryCloseLid", value),
  setPluggedInCloseLid: (value) =>
    ipcRenderer.invoke("handle:setPluggedInCloseLid", value),
  openBatteryDetailWindow: () => ipcRenderer.invoke("openBatteryDetailWindow"),
  getCurrentBrightness: () => ipcRenderer.invoke("handle:getCurrentBrightness"),
  getAllSetting: () => ipcRenderer.invoke("handle:getAllSetting"),
  getBatteryHistory: (value) =>
    ipcRenderer.invoke("handle:getBatteryHistory", value),
  getBatteryDetail: () => ipcRenderer.invoke("handle:getBatteryDetail"),
});
