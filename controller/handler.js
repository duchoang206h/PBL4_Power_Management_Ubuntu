const { execCommand } = require("../commands/execCommand");
const {
  changeBright,
  turnOffBluetooth,
  setACPowerSleepAfter,
  setBatteryPowerSleepAfter,
  setScreenTurnOffAfter,
  setPowerMode,
  turnOffWifi,
  setPowerButtonAction,
  setCloseLidOnBattery,
  setCloseLidOnPluggedIn,
} = require("../commands/commands");
const { settingService } = require("./setting");
class Handler {
  constructor() {}
  initSetting = async () => {
    try {
      const batterySleep = settingService.getSetting("batterySleep");
      const pluggedInSleep = settingService.getSetting("pluggedInSleep");
      const screenTurnOff = settingService.getSetting("screenTurnOff");
      await Promise.all([
        execCommand(setScreenTurnOffAfter(screenTurnOff)),
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
        await execCommand(setPowerMode("power-saver"));
      } else {
        await execCommand(setPowerMode(settingService.getSetting("powerMode")));
        await execCommand(changeBright(100));
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleBatteryTurnOffScreenAfter = async (event, value) => {
    try {
      settingService.updateSetting("screenTurnOff", value);
      await execCommand(setScreenTurnOffAfter(value));
    } catch (error) {
      console.log(error);
    }
  };
  handlePluggedInTurnOffScreenAfter = async (event, value) => {
    try {
      console.log(`value:`, value);
      settingService.updateSetting("screenTurnOff", value);
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
  handleSetPowerButtonAction = async (event, value) => {
    try {
      console.log("handleSetPowerButtonAction", value);
      settingService.updateSetting("powerButtonAction", value);
      await execCommand(setPowerButtonAction(value));
    } catch (error) {
      console.log(error);
    }
  };
  handleSetBatteryCloseLid = async (event, value) => {
    try {
      settingService.updateSetting("batteryCloseLid", value);
      await execCommand(setCloseLidOnBattery(value));
    } catch (error) {}
  };

  handleSetPluggedInCloseLid = async (event, value) => {
    try {
      console.log(`handleSetPluggedInCloseLid`, value);
      settingService.updateSetting("pluggedInCloseLid", value);
      await execCommand(setCloseLidOnPluggedIn(value));
    } catch (error) {}
  };
}
module.exports = {
  handler: new Handler(),
};
