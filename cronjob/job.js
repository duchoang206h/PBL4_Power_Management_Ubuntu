const CronJob = require('cron').CronJob;
const { powerMonitor } = require('electron');
const battery =  require('battery');
const { settingService } = require('../handlers/setting');
const { execCommand } = require('../commands/execCommand');
let running = false;
const job = new CronJob(
	'*/5 * * * * *', //repeat 5s
	async function() {
		console.log('hello')
        // handle here
        await check()
       
	},
	null,
	true,
	'utc'
);
async function check (){
	try {
		const { level, charging } = await battery()
		// handle when on battery
		console.log(`powerMonitor.isOnBatteryPower()`, charging)
		if(powerMonitor.isOnBatteryPower()){
			if(level <= settingService.getSetting('batterySaveOn')){
				// handle batterySaveOn
				await execCommand()
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