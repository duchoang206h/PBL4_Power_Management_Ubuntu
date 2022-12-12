const { execCommand } = require("../commands/execCommand");
const {
  getChargingState,
  getBatteryLevel,
  getPowerMode,
  getRemainingTime,
  getBatteryHistory,
  getPowerButtonAction,
  getCloseLidOnBattery,
  getCloseLidOnPluggedIn,
  getBatteryDetail,
} = require("../commands/commands");
const { settingService } = require("../handlers/setting");
const getBatteryLevelRegex = /\d+/g;
const batteryDetailRegex = /:\s*.*/g;
const getBatteryRemainingTimeRegex = /\d+,\d+/g;
const batteryHistoryRegex =
  /(struct\s*{\s*uint32\s*\d+\s*double\s*\d+\s*uint32\s*\d+\s*})/g;
const digitsRegex = /\s+\d+/g;
class System {
  constructor() {
    console.log(this);
  }
  getCurrentPowerMode = async () => {
    try {
      const result = await execCommand(getPowerMode);
      console.log(result);
      if (result.includes("performance")) return "performance";
      if (result.includes("balanced")) return "balanced";
      if (result.includes("power-saver")) return "power-saver";
      return "balanced";
    } catch (error) {
      return "balanced";
    }
  };
  getCurrentBrightness() {
    return settingService.getSetting("brightness");
  }

  getChargingState = async () => {
    try {
      const result = await execCommand(getChargingState);
      if (result.includes("discharging")) {
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  };
  getBatteryRemainingTime = async () => {
    try {
      const result = await execCommand(getRemainingTime);
      const match = result.match(getBatteryRemainingTimeRegex);
      console.log(match);
      if (match) return Number(match[0].replace(",", "."));
      // default
      return 10;
    } catch (error) {
      return 10;
    }
  };
  getBatteryLevel = async () => {
    try {
      const result = await execCommand(getBatteryLevel);
      const match = result.match(getBatteryLevelRegex);
      if (match) {
        return Number(match[0]);
      }
      return 100;
    } catch (error) {
      return 100;
    }
  };
  setBrightness(event, value) {
    try {
      return settingService.updateSetting("brightness", value);
    } catch (error) {}
  }
  setLowBrightnessOnBatterySaver(event, value) {
    try {
      return settingService.updateSetting("lowBrightnessOnBatterySaver", value);
    } catch (error) {}
  }
  setPowerMode(event, value) {
    try {
      return settingService.updateSetting("powerMode", value);
    } catch (error) {}
  }
  setBatterySaveOn(event, value) {
    try {
      console.log(value);
      return settingService.updateSetting("batterySaveOn", value);
    } catch (error) {}
  }
  setBatterySaver(event, value) {
    try {
      return settingService.updateSetting("batterySaver", value);
    } catch (error) {}
  }
  getAllSetting = async (event, value) => {
    try {
      const batterySaver = settingService.getSetting("batterySaver");
      const batteryLevel = await this.getBatteryLevel();
      const brightness = await this.getCurrentBrightness();
      const powerMode = await this.getCurrentPowerMode();
      const lowBrightBatterySaver = settingService.getSetting(
        "lowBrightnessOnBatterySaver"
      );
      const batterySaveOn = settingService.getSetting("batterySaveOn");
      const batteryTurnOff = settingService.getSetting("batteryTurnOff");
      const pluggedInTurnOff = settingService.getSetting("pluggedInTurnOff");
      const batterySleep = settingService.getSetting("batterySleep");
      const pluggedInSleep = settingService.getSetting("pluggedInSleep");
      const turnOffBluetooth = settingService.getSetting("turnOffBluetooth");
      const turnOffWifi = settingService.getSetting("turnOffWifi");
      const chargingState = await this.getChargingState();
      const powerButtonAction = await this.getPowerButtonAction();
      const batteryCloseLid = await this.getCloseLidOnBattery();
      const pluggedInCloseLid = await this.getCloseLidOnPluggedIn();
      /// more here
      return {
        batterySaver,
        brightness,
        powerMode,
        lowBrightBatterySaver,
        batterySaveOn,
        batterySleep,
        batteryTurnOff,
        pluggedInSleep,
        pluggedInTurnOff,
        batteryLevel,
        turnOffBluetooth,
        turnOffWifi,
        chargingState,
        powerButtonAction,
        batteryCloseLid,
        pluggedInCloseLid,
      };
    } catch (error) {
      console.log(error);
    }
  };
  setLowBrightnessOnBatterySaver = (event, value) => {
    try {
      console.log(`lowBrightnessOnBatterySaver`, value);
      return settingService.updateSetting("lowBrightnessOnBatterySaver", value);
    } catch (error) {}
  };
  setTurnOffWifiOnBattery = (event, value) => {
    try {
      return settingService.updateSetting("turnOffWifi", value);
    } catch (error) {}
  };
  setTurnOffBluetoothOnBattery = (event, value) => {
    try {
      return settingService.updateSetting("turnOffBluetooth", value);
    } catch (error) {}
  };
  getBatteryHistory = async (event, value) => {
    try {
      let data;
      switch (value) {
        case 24:
          data = await execCommand(getBatteryHistory(24 * 3600, 24));
          break;
        case 12:
          data = await execCommand(getBatteryHistory(12 * 3600, 12));
          break;
        case 6:
          data = await execCommand(getBatteryHistory(6 * 3600, 6));
          break;
        default:
          data = await execCommand(getBatteryHistory(24 * 3600, 24));
          break;
      }
      console.log(data)
      const result = [];
      data.match(batteryHistoryRegex).forEach((element) => {
        const struct = element.match(digitsRegex).map((e) => e.trim());
        result.push({
          timestamps: Number(struct[0]),
          level: Number(struct[1]),
          state: Number(struct[2]),
        });
      });
      return result;
    } catch (error) {
      console.log(error)
      return [];
    }
  };
  getPowerButtonAction = async () => {
    try {
      const data = await execCommand(getPowerButtonAction);
      return String(data.replaceAll("'", "")).trim();
    } catch (error) {
      return "nothing";
    }
  };
  getCloseLidOnBattery = async () => {
    try {
      const data = await execCommand(getCloseLidOnBattery);
      return String(data.replaceAll("'", "")).trim();
    } catch (error) {
      return "nothing";
    }
  };
  getCloseLidOnPluggedIn = async () => {
    try {
      const data = await execCommand(getCloseLidOnPluggedIn);
      return String(data.replaceAll("'", "")).trim();
    } catch (error) {
      return "nothing";
    }
  };
  getBatteryDetail = async () => {
    try {
      const properties = ["vendor", "capacity", "charge-cycles", "percentage", "energy-full-design", "energy-full", "energy", "state", "serial", "model"]
      const result = {};
      const data = await Promise.all(properties.map( async (property) => {
        return { property: property, data: await execCommand(getBatteryDetail(property))}
      }));
      data.forEach(d => {
        result[d.property] = d.data.match(batteryDetailRegex)[0].replaceAll(":", "").replaceAll(" ", "");
      })
      result["time-to-empty"] = await this.getBatteryRemainingTime()
      console.log(result)
      return result;
    } catch (error) {
      console.log(error);
      return {}
    }
  }
}
module.exports = {
  system: new System(),
};
