const { execCommand } = require('../commands/execCommand');
const { 
    changeBright,
    turnOffBluetooth,
    
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
    
}
module.exports = {
    handler: new Handler()
}