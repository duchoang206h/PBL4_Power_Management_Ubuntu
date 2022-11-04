const { execCommand} = require('../commands/execCommand')
const { 
    getChargingState,
    getBatteryLevel,
    getPowerMode
 } = require('../commands/commands')
const { settingService } = require('../handlers/setting')
const getBatteryLevelRegex = /\d+/g;
class System {
    constructor(){
        console.log(this)
    }
    getCurrentPowerMode = async () => {
        try {
            const result = await execCommand(getPowerMode);
            console.log(result)
            if(result.includes("performance")) return "performance";
            if(result.includes("balanced")) return "balanced";
            if(result.includes("power-saver")) return "power-saver";
            return "balanced";
        } catch (error) {
            return "balanced";
        }
    }
    getCurrentBrightness (){
        return settingService.getSetting('brightness')
    }
    
    getChargingState = async () => {
        try {
            const result = await execCommand(getChargingState);
            if(result.includes('discharging')){
                return false;
            }
            return true;
        } catch (error) {
            return false
        }
    }
    getBatteryLevel = async () => {
        try {
            const result = await execCommand(getBatteryLevel);
            const match = result.match(getBatteryLevelRegex)
            if(match){
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
    setPowerMode(event, value){
        try {
            return settingService.updateSetting('powerMode', value)
        } catch (error) {
            
        }
    }
    setBatterySaveOn(event, value){
        try {
            console.log(value)
            return settingService.updateSetting('batterySaveOn', value)
        } catch (error) {
            
        }
    }
    setBatterySaver(event, value){
        try {
            return settingService.updateSetting('batterySaver', value)
        } catch (error) {
            
        }
    }
    getAllSetting = async () => {
       try {
        const batterySaver = settingService.getSetting('batterySaver');
        const brightness = await this.getCurrentBrightness();
        const powerMode = await this.getCurrentPowerMode();
        const lowBrightBatterySaver = settingService.getSetting('lowBrightnessOnBatterySaver');
        const batterySaveOn = settingService.getSetting('batterySaveOn');
            /// more here
        return {
            batterySaver,
            brightness,
            powerMode, 
            lowBrightBatterySaver,
            batterySaveOn
        }
       } catch (error) {
        console.log("------------", error);
       }
    }
    setLowBrightnessOnBatterySaver(event, value) {
        try {
            console.log(`lowBrightnessOnBatterySaver`,value)
            return  settingService.updateSetting('lowBrightnessOnBatterySaver', value)
        } catch (error) {
            
        }
    }
}
module.exports = {
    system: new System()
}