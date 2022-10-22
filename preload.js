const { ipcMain, contextBridge, ipcRenderer } = require('electron');
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
});
// expose ipMain
contextBridge.exposeInMainWorld('handle', {
  setBatteryTurnOff : (minute) => ipcRenderer.invoke('batteryTurnOff', minute),
  setPluggedInTurnOn: (minute) => ipcRenderer.invoke('pluggedInTurnOn', minute),
  setBatterySleep: (minute) => ipcRenderer.invoke('batterySleep', minute),
  setPluggedInSleep: (minute) => ipcRenderer.invoke('pluggedInSleep', minute),
  setPowerMode: (mode) => ipcRenderer.invoke('powerMode', mode),
  setBatterySaveOne: (minute) => ipcRenderer.invoke('batterySaveOn', minute),
  setBatteryUsage: (mode) => ipcRenderer.invoke('batteryUsage', mode)
})