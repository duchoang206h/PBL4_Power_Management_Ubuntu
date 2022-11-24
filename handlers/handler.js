const { execCommand } = require("../commands/execCommand");
const {
  changeBright,
  turnOffBluetooth,
  setACPowerSleepAfter,
  setBatteryPowerSleepAfter,
  setScreenTurnOffAfter,
  setPowerMode,
  turnOffWifi,
} = require("../commands/commands");
const { settingService } = require("./setting");
class Handler {
  constructor() {}
  initSetting = async () => {
    try {
      const batteryTurnOff = settingService.getSetting("batteryTurnOff");
      const batterySleep = settingService.getSetting("batterySleep");
      const pluggedInSleep = settingService.getSetting("pluggedInSleep");
      const pluggedInTurnOff = settingService.getSetting("pluggedInTurnOff");
      await Promise.all([
        execCommand(setScreenTurnOffAfter(pluggedInTurnOff)),
        execCommand(setBatteryPowerSleepAfter(batterySleep)),
        execCommand(setACPowerSleepAfter(pluggedInSleep)),
      ]);
    } catch (error) {}
  };
  handleTurnOnBatterySaver = async (event, arg) => {
    try {
      settingService.updateSetting("batterySaver", arg);
      // turn on
      if (arg === true) {
        settingService.getSetting("lowBrightnessOnBatterySaver")
          ? await execCommand(
              changeBright(settingService.getSetting("brightness"))
            )
          : null;
        settingService.getSetting("turnOffBluetooth")
          ? await execCommand(turnOffBluetooth)
          : null;
        settingService.getSetting("turnOffWifi")
          ? await execCommand(turnOffWifi)
          : null;
      } else {
        await execCommand(changeBright(100));
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleBatteryTurnOffScreenAfter = async (event, value) => {
    try {
      settingService.updateSetting("batteryTurnOff", value);
      await execCommand(setScreenTurnOffAfter(value));
    } catch (error) {
      console.log(error);
    }
  };
  handlePluggedInTurnOffScreenAfter = async (event, value) => {
    try {
      console.log(`value:`, value);
      settingService.updateSetting("pluggedInTurnOff", value);
      await execCommand(setScreenTurnOffAfter(value));
    } catch (error) {
      console.log(error);
    }
  };
  handleBatterySleepAfter = async (event, value) => {
    try {
      settingService.updateSetting("batterySleep", value);
      await execCommand(setBatteryPowerSleepAfter(value));
    } catch (error) {
      console.log(error);
    }
  };
  handlePluggedInSleepAfter = async (event, value) => {
    try {
      settingService.updateSetting("pluggedInSleep", value);
      await execCommand(setACPowerSleepAfter(value));
    } catch (error) {
      console.log(error);
    }
  };
  handleSetPowerMode = async (event, value) => {
    try {
      settingService.updateSetting("powerMode", value);
      await execCommand(setPowerMode(value));
    } catch (error) {}
  };
}
module.exports = {
  handler: new Handler(),
};
