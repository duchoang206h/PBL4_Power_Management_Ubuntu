const defaultSettings = require("../config/config");
const Store = require("electron-store");
const store = new Store();
class SettingService {
  constructor() {
    for (const [key, value] of Object.entries(defaultSettings)) {
      if (!store.has(key)) store.set(key, value);
    }
  }
  getSetting(field) {
    return store.get(field);
  }
  updateSetting = async (field, value) => {
    try {
      if (store.has(field)) {
        store.set(field, value);
      }
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
