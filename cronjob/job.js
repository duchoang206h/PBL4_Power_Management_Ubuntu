const CronJob = require('cron').CronJob;
const { powerMonitor } = require('electron');
const battery =  require('battery');
const { settingService } = require('../handlers/setting');
const { execCommand } = require('../commands/execCommand');
const { 
	changeBright,
	turnOffBluetooth,
	turnOffWifi,
	setPowerMode,
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
		console.log(`chargingState`, isCharging);
		const batterySaver = settingService.getSetting('batterySaver');
		if (!isCharging) {
			if (batteryLevel <= settingService.getSetting('batterySaveOn')) {
				// handle batterySaveOn
				if (!batterySaver) {
					
				settingService.getSetting("lowBrightnessOnBatterySaver") ? await new Promise((resolve, reject)=> {
					execCommand(changeBright(settingService.getSetting('brightness'))).then(resolve()).catch(resolve())
				}) : null;
				settingService.getSetting("turnOffBluetooth") ? await new Promise((resolve, reject)=> {
					execCommand(turnOffBluetooth).then(resolve()).catch(resolve())
				}) : null
				settingService.getSetting("turnOffWifi") ? await new Promise((resolve, reject)=> {
					execCommand(turnOffWifi).then(resolve()).catch(resolve())
				}) : null;
				await execCommand(setPowerMode('power-saver'))
				await mainWindow.webContents.send('updateBatterySaver', {
					batterySaver: true,
					chargingState: isCharging
				})
				settingService.updateSetting('batterySaver', true)
				
				}
				
			}
		}
		// handle when on power
		else{
			///
			await mainWindow.webContents.send('updateBatterySaver', {
				batterySaver: false,
				chargingState: isCharging
			})
			settingService.updateSetting('batterySaver', false)
			await execCommand(changeBright(100))
		}
	} catch (error) {
		console.log(error)
	}
}
module.exports = cronJob;