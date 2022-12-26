const CronJob = require("cron").CronJob;
const { settingService } = require("./setting");
const { execCommand } = require("./execCommand");
const {
  changeBright,
  turnOffBluetooth,
  turnOffWifi,
  setPowerMode,
} = require("../commands/commands");
const { systemService } = require("./system");
const cronJob = (mainWindow) => {
  const job = new CronJob(
    "*/5 * * * * *", //repeat 5s
    () => handleBatterySaverOn(mainWindow),
    null,
    true,
    "utc"
  );
  job.start();
};

async function handleBatterySaverOn(mainWindow) {
  try {
    const [batteryLevel, isCharging, remainingTime] = await Promise.all([
      systemService.getBatteryLevel(),
      systemService.getChargingState(),
      systemService.getBatteryRemainingTime(),
    ]);
    await new Promise((resolve, _) => {
      try {
        mainWindow.webContents.send("currentBattery", {
          batteryLevel,
          chargingState: isCharging,
          remainingTime,
        });
        resolve();
      } catch (error) {
        resolve();
      }
    });
    await new Promise((resolve, _) => {
      try {
        mainWindow.webContents.send("updateChargingState", isCharging);
        resolve();
      } catch (error) {
        resolve();
      }
    });
    // handle when on battery
    const batterySaver = settingService.getSetting("batterySaver");
    if (!isCharging) {
      if (
        batteryLevel <= settingService.getSetting("thresholdAutoBatterySaver")
      ) {
        // handle thresholdAutoBatterySaver
        if (!batterySaver) {
          settingService.getSetting("lowBrightnessOnBatterySaver")
            ? await new Promise((resolve, _) => {
                execCommand(
                  changeBright(settingService.getSetting("brightness"))
                )
                  .then(resolve())
                  .catch(resolve());
              })
            : null;
          settingService.getSetting("turnOffBluetooth")
            ? await new Promise((resolve, _) => {
                execCommand(turnOffBluetooth).then(resolve()).catch(resolve());
              })
            : null;
          settingService.getSetting("turnOffWifi")
            ? await new Promise((resolve, _) => {
                execCommand(turnOffWifi).then(resolve()).catch(resolve());
              })
            : null;
          await new Promise((resolve, _) => {
            execCommand(setPowerMode("power-saver")).then(() => resolve());
          });
          await new Promise((resolve, _) => {
            try {
              mainWindow.webContents.send("updateBatterySaver", {
                batterySaver: true,
                chargingState: isCharging,
              });
              resolve();
            } catch (error) {
              resolve();
            }
          });
          settingService.updateSetting("batterySaver", true);
        }
      }
    }
    // handle when on power
    else {
      ///
      await new Promise((resolve, _) => {
        try {
          mainWindow.webContents.send("updateBatterySaver", {
            batterySaver: false,
            chargingState: isCharging,
          });
          resolve();
        } catch (error) {
          resolve();
        }
      });
      settingService.updateSetting("batterySaver", false);
      await new Promise((resolve, _) => {
        execCommand(changeBright(100))
          .then(() => resolve())
          .catch(() => resolve());
      });
    }
  } catch (error) {
    console.log(error);
  }
}
module.exports = cronJob;
