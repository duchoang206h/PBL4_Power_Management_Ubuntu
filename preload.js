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
<<<<<<< HEAD
=======
  setPowerButtonAction: (value) => ipcRenderer.invoke("handle:setPowerButtonAction", value),
  setBatteryCloseLid: (value) => ipcRenderer.invoke("handle:setBatteryCloseLid", value),
  setPluggedInCloseLid: (value) => ipcRenderer.invoke("handle:setPluggedInCloseLid", value),
  openBatteryDetailWindow: () => ipcRenderer.invoke("openBatteryDetailWindow")
>>>>>>> f2f8e64e393f419603455b45a1ceb473ae3bd18a
});
contextBridge.exposeInMainWorld("system", {
  getCurrentBrightness: () => ipcRenderer.invoke("system:getCurrentBrightness"),
  getAllSetting: () => ipcRenderer.invoke("system:getAllSetting"),
<<<<<<< HEAD
  getBatteryHistory: () => ipcRenderer.invoke("system:getBatteryHistory"),
  getCloseLidOnBattery: () => ipcRenderer.invoke("system:getCloseLidOnBattery"),
  getCloseLidOnPluggedIn: () => ipcRenderer.invoke("system:getCloseLidOnPluggedIn"),
  setCloseLidOnBattery: (value) => ipcRenderer.invoke("system:setCloseLidOnBattery", value),
  setCloseLidOnPluggedIn: (value) => ipcRenderer.invoke("system:setCloseLidOnPluggedIn", value),
  setPowerButtonAction: (value) => ipcRenderer.invoke("system:setPowerButtonAction", value),

});
=======
  getBatteryHistory: (value) => ipcRenderer.invoke("system:getBatteryHistory", value),
  getBatteryDetail: () => ipcRenderer.invoke("system:getBatteryDetail")
});
>>>>>>> f2f8e64e393f419603455b45a1ceb473ae3bd18a
