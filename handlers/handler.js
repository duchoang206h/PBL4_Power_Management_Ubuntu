const { execCommand } = require('../commands/execCommand');
const { 
    changeBright
    
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
            const data = await execCommand(`command`);
        } catch (error) {
            
        }
    }
    async handleBatteryUsage(value){
        try {
            const data = await execCommand(changeBright);
        } catch (error) {
            
        }
    }
    handlePluggedInSleep(value){

    }
    handlePluggedInTurnOn(value){

    }
    async handlePowerMode(value){
        try {
            const data = await execCommand(changeBright);
        } catch (error) {
            
        }
    }
}
module.exports = {
    handler: new Handler()
}