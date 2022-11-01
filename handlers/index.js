const { handleBatterySaveOn } = require('./handleBatterySaveOn');
const { handleBatterySleep } = require('./handleBatterySleep');
const { handleBatteryTurnOff } = require('./handleBatteryTurnOff');
const { handleBatteryUsage } = require('./handleBatteryUsage');
const { handlePluggedInSleep } = require('./handlePluggedInSleep');
const { handlePowerMode } = require('./handlePowerMode');
const { handlePluggedInTurnOn } = require('./handlePluggedInTurnOn');
module.exports = {
    handleBatterySaveOn,
    handleBatterySleep,
    handleBatteryTurnOff,
    handleBatteryUsage,
    handlePluggedInSleep,
    handlePowerMode,
    handlePluggedInTurnOn
}