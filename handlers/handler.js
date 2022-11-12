const { execCommand } = require('../commands/execCommand');
const { 
    changeBright,
    turnOffBluetooth,
    setACPowerSleepAfter,
    setBatteryPowerSleepAfter,
    setScreenTurnOffAfter
} = require('../commands/commands');
const { settingService } = require('./setting')
class Handler {
    constructor(){

    }
    handleTurnOnBatterySaver = async (event, arg) => {
        try {
            settingService.updateSetting("batterySaver", arg);
            // turn on
            if (arg === true) {
                
                settingService.getSetting("lowBrightnessOnBatterySaver") ? await execCommand(changeBright(settingService.getSetting("brightness"))) : null;
                await execCommand(turnOffBluetooth)
                
            }else{
                await execCommand(changeBright(100))

            }
        } catch (error) {
            console.log(error)
        }
    }

    handleBatteryTurnOffAfter = async(event, value) => {
        try {
            settingService.updateSetting("batteryTurnOff", value);
            //await execCommand(setBatteryPowerSleepAfter(value))
        } catch (error) {
            
        }
    }
    handlePluggedInTurnOffAfter = async (event, value) => {
        try {
            settingService.updateSetting("pluggedInTurnOff", value);
            //await execCommand(setACPowerSleepAfter(value))
        } catch (error) {
            
        }
    }
    handleSBatterySleep = async (event, value) => {
        try {
            
            settingService.updateSetting("batterySleep", value);
            // await execCommand(setACPowerSleepAfter(value))
        } catch (error) {
            
        }
    }
    handlePluggedInSleep = async (event, value) => {
        try {
            
            settingService.updateSetting("pluggedInSleep", value);
            // await execCommand(setACPowerSleepAfter(value))
        } catch (error) {
            
        }
    }
}
module.exports = {
    handler: new Handler()
}