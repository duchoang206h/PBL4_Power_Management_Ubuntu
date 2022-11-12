const { execCommand } = require('../commands/execCommand')
const {
    getChargingState,
    getBatteryLevel,
    getPowerMode,
    getRemainingTime
} = require('../commands/commands')
const { settingService } = require('../handlers/setting')
const getBatteryLevelRegex = /\d+/g;
const getBatteryRemainingTimeRegex = /\d+,\d+/g;
class System {
    constructor() {
        console.log(this)
    }
    getCurrentPowerMode = async () => {
        try {
            const result = await execCommand(getPowerMode);
            console.log(result)
            if (result.includes("performance")) return "performance";
            if (result.includes("balanced")) return "balanced";
            if (result.includes("power-saver")) return "power-saver";
            return "balanced";
        } catch (error) {
            return "balanced";
        }
    }
    getCurrentBrightness() {
        return settingService.getSetting('brightness')
    }

    getChargingState = async () => {
        try {
            const result = await execCommand(getChargingState);
            if (result.includes('discharging')) {
                return false;
            }
            return true;
        } catch (error) {
            return false
        }
    }
    getBatteryRemainingTime = async () => {
        try {
            const result = await execCommand(getRemainingTime);
            const match = result.match(getBatteryRemainingTimeRegex);
            console.log(match);
            if (match) return Number(match[0].replace(",", "."))
            // default
            return 10
        } catch (error) {
            return 10
        }
    }
    getBatteryLevel = async () => {
        try {
            const result = await execCommand(getBatteryLevel);
            const match = result.match(getBatteryLevelRegex)
            if (match) {
                return Number(match[0])
            }
            return 100;
        } catch (error) {
            return 100
        }
    }
    setBrightness(event, value) {
        try {
            return settingService.updateSetting('brightness', value)
        } catch (error) {

        }
    }
    setLowBrightnessOnBatterySaver(event, value) {
        try {
            return settingService.updateSetting('lowBrightnessOnBatterySaver', value)
        } catch (error) {

        }
    }
    setPowerMode(event, value) {
        try {
            return settingService.updateSetting('powerMode', value)
        } catch (error) {

        }
    }
    setBatterySaveOn(event, value) {
        try {
            console.log(value)
            return settingService.updateSetting('batterySaveOn', value)
        } catch (error) {

        }
    }
    setBatterySaver(event, value) {
        try {
            return settingService.updateSetting('batterySaver', value)
        } catch (error) {

        }
    }
    getAllSetting = async (event, value) => {
       try {
        const batterySaver = settingService.getSetting('batterySaver');
        const brightness = await this.getCurrentBrightness();
        const powerMode = await this.getCurrentPowerMode();
        const lowBrightBatterySaver = settingService.getSetting('lowBrightnessOnBatterySaver');
        const batterySaveOn = settingService.getSetting('batterySaveOn');
        const batteryTurnOff = settingService.getSetting('batteryTurnOff');
        const pluggedInTurnOff = settingService.getSetting('pluggedInTurnOff');
        const batterySleep = settingService.getSetting('batterySleep');
        const pluggedInSleep = settingService.getSetting('pluggedInSleep');
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
            pluggedInTurnOff
        }
    }catch(error){
        console.log(error)
    }
    }
    setLowBrightnessOnBatterySaver = (event, value) => {
        try {
            console.log(`lowBrightnessOnBatterySaver`, value)
            return settingService.updateSetting('lowBrightnessOnBatterySaver', value)
        } catch (error) {

        }
    }
    setTurnOffWifiOnBattery = (event, value) => {
        try {
            return settingService.updateSetting('turnOffWifi', value)
            
        } catch (error) {
            
        }
    }
    setTurnOffBluetoothOnBattery = (event, value) => {
        try {
            return settingService.updateSetting('turnOffBluetooth', value)
            
        } catch (error) {
            
        }
    }
}
module.exports = {
    system: new System()
}