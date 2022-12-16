const fs = require("fs");
const path = require("path");
const defaultSettings = require("./config");
const { app } = require("electron");
const Store = require('electron-store');
const store = new Store();
class SettingService {
  constructor() {
    for(const [key, value] of Object.entries(defaultSettings)){
      if(!store.has(key)) store.set(key, value)
    }
  }
  initSetting() {
    try {
      for (const [key, value] of Object.entries(this.settings)) {
      }
    } catch (error) {}
  }
  getSetting(field) {
    return store.get(field)
  }
  /**
   *
   * @returns { Promise<Boolean> }
   */
  updateSetting = async (field, value) => {
    try {
      if (store.has(field)) {
       store.set(field, value);
      }
      // after handle update setting
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
}
module.exports = {
  settingService: new SettingService(),
};
