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
const setting = require('../handlers/setting');
let running = false;
const cronJob = (mainWindow) => {
	const job = new CronJob(
		'*/5 * * * * *', //repeat 5s
		() => handleBatterySaveOn(mainWindow),
		null,
		true,
		'utc'
	);
	job.start()
}

async function handleBatterySaveOn(mainWindow){
	try {
		const [batteryLevel, isCharging] = await Promise.all([
			system.getBatteryLevel(),
			system.getChargingState()
		])
		// handle when on battery
		console.log(`batteryLevel`, batteryLevel)
		console.log(`chargingState`, isCharging)
		if (!isCharging) {
			console.log(`--------------------------------`, batteryLevel)
			console.log(`--------------------------------`, settingService.getSetting('batterySaveOn'))
			if (batteryLevel <= settingService.getSetting('batterySaveOn')) {
				
				console.log(`--------------------------------`, batteryLevel)
				console.log(`--------------------------------`, settingService.getSetting('batterySaveOn'))
				console.log(settingService.getSetting("lowBrightnessOnBatterySaver"));
				// handle batterySaveOn
				if (!settingService.getSetting('batterySaver')) {
					
					settingService.getSetting("lowBrightnessOnBatterySaver") ? await execCommand(changeBright(settingService.getSetting('brightness'))) : null;
				await execCommand(turnOffBluetooth)
				await execCommand(turnOffWifi)
				await mainWindow.webContents.send('updateBatterySaver', true)
					settingService.updateSetting('batterySaver', true)
				}
				
			}
		}
		// handle when on power
		else{
			
		}
	} catch (error) {
		console.log(error)
	}
}
module.exports = cronJob;