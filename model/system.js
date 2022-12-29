const delay = require("delay");
const { execCommand } = require("./execCommand");
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
  getBatteryPowerSleepAfter,
  getACPowerSleepAfter,
  getScreenTurnOffAfter,
  changeBright,
  setPowerButtonAction,
  setBatteryPowerSleepAfter,
  setACPowerSleepAfter,
  setScreenTurnOffAfter,
  turnOffBluetooth,
  turnOffWifi,
} = require("../commands/commands");
const { settingService } = require("./setting");
const getBatteryLevelRegex = /\d+/g;
const batteryDetailRegex = /:\s*.*/g;
const getBatteryRemainingTimeRegex = /\d+,\d+/g;
const batteryHistoryRegex =
  /(struct\s*{\s*uint32\s*\d+\s*double\s*\d.*\s*uint32\s*\d+\s*})/g;
const digitsRegex = /\s+\d+/g;
class SystemService {
  constructor() {}
  getCurrentPowerMode = async () => {
    try {
      const result = await execCommand(getPowerMode);
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
      if (match) return Number(match[0].replace(",", "."));
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
  setBrightness = async (value) => {
    try {
      await new Promise((resolve, reject) => {
        execCommand(changeBright(Number(value)))
          .then(resolve())
          .catch(resolve());
      });
      await delay(1000);
      if (
        !(
          settingService.getSetting("batterySaver") &&
          settingService.getSetting("lowBrightnessOnBatterySaver")
        )
      ) {
        await new Promise((resolve, reject) => {
          execCommand(changeBright(100)).then(resolve()).catch(resolve());
        });
      }
      return settingService.updateSetting("brightness", value);
    } catch (error) {}
  };
  setLowBrightnessOnBatterySaver(value) {
    try {
      return settingService.updateSetting("lowBrightnessOnBatterySaver", value);
    } catch (error) {}
  }
  setPowerMode = async (value) => {
    try {
      return await execCommand(setPowerMode(value));
    } catch (error) {
      return false;
    }
  };
  setBatterySaveOn(value) {
    try {
      return settingService.updateSetting("thresholdAutoBatterySaver", value);
    } catch (error) {}
  }
  setBatterySaver(value) {
    try {
      return settingService.updateSetting("batterySaver", value);
    } catch (error) {}
  }
  getBatterySleep = async () => {
    try {
      const data = await execCommand(getBatteryPowerSleepAfter);
      return Number(data);
    } catch (error) {
      return 0;
    }
  };
  getPluggedInSleep = async () => {
    try {
      const data = await execCommand(getACPowerSleepAfter);
      return Number(data);
    } catch (error) {
      return 0;
    }
  };
  getScreenTurnOff = async () => {
    try {
      let data = await execCommand(getScreenTurnOffAfter);
      return Number(data.split(" ")[1].trim().replaceAll("/\n", ""));
    } catch (error) {
      return 0;
    }
  };
  getAllSetting = async (value) => {
    try {
      const batterySaver = settingService.getSetting("batterySaver");
      const [
        batteryLevel,
        brightness,
        powerMode,
        screenTurnOff,
        batterySleep,
        pluggedInSleep,
        chargingState,
        powerButtonAction,
      ] = await Promise.all([
        this.getBatteryLevel(),
        this.getCurrentBrightness(),
        this.getCurrentPowerMode(),
        this.getScreenTurnOff(),
        this.getBatterySleep(),
        this.getPluggedInSleep(),
        this.getChargingState(),
        this.getPowerButtonAction(),
      ]);
      const lowBrightBatterySaver = settingService.getSetting(
        "lowBrightnessOnBatterySaver"
      );
      const thresholdAutoBatterySaver = settingService.getSetting(
        "thresholdAutoBatterySaver"
      );
      const turnOffBluetooth = settingService.getSetting("turnOffBluetooth");
      const turnOffWifi = settingService.getSetting("turnOffWifi");
      /// more here
      return {
        batterySaver,
        brightness,
        powerMode,
        lowBrightBatterySaver,
        thresholdAutoBatterySaver,
        batterySleep,
        screenTurnOff,
        pluggedInSleep,
        batteryLevel,
        turnOffBluetooth,
        turnOffWifi,
        chargingState,
        powerButtonAction,
      };
    } catch (error) {
      console.log(error);
    }
  };
  setLowBrightnessOnBatterySaver = (value) => {
    try {
      return settingService.updateSetting("lowBrightnessOnBatterySaver", value);
    } catch (error) {}
  };
  setTurnOffWifiOnBattery = (value) => {
    try {
      return settingService.updateSetting("turnOffWifi", value);
    } catch (error) {}
  };
  setTurnOffBluetoothOnBattery = (value) => {
    try {
      return settingService.updateSetting("turnOffBluetooth", value);
    } catch (error) {}
  };
  getBatteryHistory = async (value) => {
    try {
      let data;
      switch (Number(value)) {
        case 24:
          data = await execCommand(getBatteryHistory(24 * 3600, 10));
          break;
        case 12:
          data = await execCommand(getBatteryHistory(12 * 3600, 10));
          break;
        case 6:
          data = await execCommand(getBatteryHistory(6 * 3600, 10));
          break;
        case 3:
          data = await execCommand(getBatteryHistory(3 * 3600, 10));
          break;
        case 1:
          data = await execCommand(getBatteryHistory(1 * 3600, 10));
          break;
        default:
          data = await execCommand(getBatteryHistory(24 * 3600, 10));
          break;
      }
      let result = [];
      data.match(batteryHistoryRegex).forEach((element) => {
        const struct = element.match(digitsRegex).map((e) => e.trim());
        result.push({
          timestamps: Number(struct[0]),
          level: Number(struct[1]),
          state: Number(struct[2]),
        });
      });
      result.sort((a, b) => a.timestamps - b.timestamps);
      result = result.filter(({ level }) => level > 0);

      if (result.length > 8) {
        let newArr = [result[0]];
        let n = result.length;
        for(let i =1; i<=6;i++){
          let x = n/7;
          let index = Math.ceil(i*x) -1;
          newArr.push(result[index])
        }
        newArr.push(result[result.length - 1])
        result = newArr
      }
      return result;
    } catch (error) {
      console.log(error);
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
      const properties = [
        "vendor",
        "capacity",
        "charge-cycles",
        "percentage",
        "energy-full-design",
        "energy-full",
        "energy",
        "state",
        "serial",
        "model",
        "technology",
      ];
      const result = {};
      const data = await Promise.all(
        properties.map(async (property) => {
          return {
            property: property,
            data: await new Promise((resolve, _) => {
              execCommand(getBatteryDetail(property))
                .then((data) => resolve(data))
                .catch(() => resolve("N/A"));
            }),
          };
        })
      );
      data.forEach((d) => {
        result[d.property] = d.data.match(batteryDetailRegex)
          ? d.data
              .match(batteryDetailRegex)[0]
              .replaceAll(":", "")
              .replaceAll(" ", "")
          : "N/A";
      });
      result["time-to-empty"] = await this.getBatteryRemainingTime();
      return result;
    } catch (error) {
      return {};
    }
  };
  setPowerButtonAction = async (value) => {
    try {
      return await execCommand(setPowerButtonAction(value));
    } catch (error) {
      return false;
    }
  };
  setPluggedInSleepAfter = async (value) => {
    try {
      return await execCommand(setACPowerSleepAfter(value));
    } catch (error) {
      return false;
    }
  };
  setBatterySleepAfter = async (value) => {
    try {
      return await execCommand(setBatteryPowerSleepAfter(value));
    } catch (error) {
      return false;
    }
  };
  setScreenTurnOffAfter = async (value) => {
    try {
      return await execCommand(setScreenTurnOffAfter(value));
    } catch (error) {
      return false;
    }
  };
  changeBright = async (value) => {
    try {
      return await execCommand(changeBright(value));
    } catch (error) {
      return false;
    }
  };
  turnOffBluetooth = async () => {
    try {
      return await execCommand(turnOffBluetooth);
    } catch (error) {}
  };
  turnOffWifi = async () => {
    try {
      return await execCommand(turnOffWifi);
    } catch (error) {
      return false;
    }
  };
}
module.exports = {
  systemService: new SystemService(),
};
