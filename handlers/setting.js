const fs = require("fs");
const path = require("path");
const defaultSettings = require("./config");
const { app } = require("electron");
class SettingService {
  constructor() {
    console.log(fs.existsSync(app.getAppPath("userData") + "/settings.json"));
    if (fs.existsSync(app.getAppPath("userData") + "/settings.json")) {
      this.settings = JSON.parse(
        fs.readFileSync(app.getAppPath("userData") + "/settings.json", {
          encoding: "utf-8",
        })
      );
    } else this.settings = defaultSettings;
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
      fs.writeFileSync(
        app.getAppPath("userData") + "/settings.json",
        JSON.stringify(this.settings),
        { encoding: "utf-8" }
      );
      fs.close();
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
