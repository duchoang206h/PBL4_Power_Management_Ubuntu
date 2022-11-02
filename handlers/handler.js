const { execCommand } = require('../commands/execCommand');
const { 

    
} = require('../commands/commands');
class Handler {
    constructor(){

    }
    async handleBatterySaveOn (event, value){
        
    }
    handleBatterySleep(value){

    }
    async handleBatteryTurnOff(value){
        try {
            const data = await execCommand('ls -la');
        } catch (error) {
            
        }
    }
    handleBatteryUsage(value){

    }
    handlePluggedInSleep(value){

    }
    handlePluggedInTurnOn(value){

    }
    handlePowerMode(value){

    }
}
module.exports = {
    handler: new Handler()
}