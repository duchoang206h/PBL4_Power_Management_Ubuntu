const fs = require("fs");
const path = require("path");
const settings = require("./config");
class SettingService {
  constructor() {
    this.settings = settings;
  }
  initSetting() {
    try {
      for (const [key, value] of Object.entries(this.settings)) {
      }
    } catch (error) {}
  }
  getSetting(field) {
    return this.settings[field];
  }
  /**
   *
   * @returns { Promise<Boolean> }
   */
  updateSetting = async (field, value) => {
    try {
      if (this.settings.hasOwnProperty(field)) {
        this.settings[field] = value;
      }
      // after handle update setting
      await fs.promises.writeFile(
        path.resolve(__dirname, "config.js"),
        "module.exports =" + JSON.stringify(this.settings)
      );
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
