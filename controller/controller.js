const { execCommand } = require("../model/execCommand");
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
const { settingService } = require("../model/setting");
const { systemService } = require("../model/system");
class Controller {
  constructor() {}
  handleTurnOnBatterySaver = async (event, arg) => {
    try {
      systemService.setBatterySaver(value);
      // turn on
      if (arg === true) {
        settingService.getSetting("lowBrightnessOnBatterySaver")
          ? await systemService.changeBright(
              settingService.getSetting("brightness")
            )
          : null;
        settingService.getSetting("turnOffBluetooth")
          ? await systemService.turnOffBluetooth()
          : null;
        settingService.getSetting("turnOffWifi")
          ? await systemService.turnOffWifi()
          : null;
        await systemService.setPowerMode("power-saver");
      } else {
        await systemService.setPowerMode(
          settingService.getSetting("powerMode")
        );
        await systemService.changeBright(100);
      }
    } catch (error) {
      return false;
    }
  };

  handleTurnOffScreenAfter = async (event, value) =>
    await systemService.setScreenTurnOffAfter(value);

  handleBatterySleepAfter = async (event, value) =>
    await systemService.setBatterySleepAfter(value);

  handlePluggedInSleepAfter = async (event, value) =>
    await systemService.setPluggedInSleepAfter(value);

  handleSetPowerMode = async (event, value) =>
    await systemService.setPowerMode(value);

  handleSetPowerButtonAction = async (event, value) =>
    await systemService.setPowerButtonAction(value);

  handleSetBatterySaveOn = async (event, value) =>
    await systemService.setBatterySaveOn(value);
  handleSetLowBrightnessOnBatterySaver = async (event, value) =>
    await systemService.setLowBrightnessOnBatterySaver(value);
  handleSetTurnOffWifiOnBattery = async (event, value) =>
    await systemService.setTurnOffWifiOnBattery(value);
  handleSetTurnOffBluetoothOnBattery = async (event, value) =>
    await systemService.setTurnOffBluetoothOnBattery(value);
  handleGetAllSetting = async (event, value) =>
    await systemService.getAllSetting();
  handleGetCurrentBrightness = async (event, value) =>
    await systemService.getCurrentBrightness();
  handleGetBatteryHistory = async (event, value) =>
    await systemService.getBatteryHistory(value);
  handleSetBrightness = async (event, value) =>
    await systemService.setBrightness(value);
  handleGetBatteryDetail = async (event, value) =>
    await systemService.getBatteryDetail();
}
module.exports = {
  controller: new Controller(),
};
