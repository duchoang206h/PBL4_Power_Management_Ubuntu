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
		const [batteryLevel, isCharging, remainingTime] = await Promise.all([
			system.getBatteryLevel(),
			system.getChargingState(),
			system.getBatteryRemainingTime()
		])
		await mainWindow.webContents.send('currentBattery', { 
			batteryLevel,
			chargingState: isCharging,
			remainingTime
		})
		await mainWindow.webContents.send('updateChargingState', isCharging)
		// handle when on battery
		console.log(`batteryLevel`, batteryLevel)
		console.log(`chargingState`, isCharging)
		if (!isCharging) {
			if (batteryLevel <= settingService.getSetting('batterySaveOn')) {
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
			///
			await execCommand(changeBright(100))
		}
	} catch (error) {
		console.log(error)
	}
}
module.exports = cronJob;