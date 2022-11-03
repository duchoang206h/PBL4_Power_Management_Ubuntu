const CronJob = require('cron').CronJob;
const { powerMonitor } = require('electron');
const battery =  require('battery');
const { settingService } = require('../handlers/setting');
const { execCommand } = require('../commands/execCommand');
const { 
	changeBright,
	turnOffBluetooth,
	turnOffWifi
 } = require('../commands/commands');
const { system } = require('../handlers/system');
let running = false;
const job = new CronJob(
	'*/5 * * * * *', //repeat 5s
	async function() {
        // handle here
        await handleBatterySaveOn()
       
	},
	null,
	true,
	'utc'
);
async function handleBatterySaveOn (){
	try {
		const [batteryLevel, isCharging] = await Promise.all([
			system.getBatteryLevel(),
			system.getChargingState()
		])
		// handle when on battery
		console.log(`batteryLevel`, batteryLevel)
		console.log(`chargingState`, isCharging)
		if(isCharging){
			if(batteryLevel <= settingService.getSetting('batterySaveOn')){
				// handle batterySaveOn
				await execCommand(changeBright(settingService.getSetting('brightness')))
				await execCommand(turnOffBluetooth)
				await execCommand(turnOffWifi)
				
			}
		}
		// handle when on power
		else{
			
		}
	} catch (error) {
		console.log(error)
	}
}
module.exports = job;