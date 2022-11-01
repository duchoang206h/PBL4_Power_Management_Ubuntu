const { MappingIndexToValue } = require('../config');
const selects = document.querySelectorAll('select');
selects.forEach(select => {
    select.addEventListener('change', handleClick)
})
function handleClick (event){
    const { id, selectedIndex } = event.target;
    try {
        switch (id) {
            case "batteryTurnOff":
                handleBatteryTurnOff(MappingIndexToValue.batteryTurnOff[selectedIndex])
                break;
            case "pluggedInTurnOn":
                handlePluggedInTurnOn(MappingIndexToValue.pluggedInTurnOn[selectedIndex])
                break;    
            case "batterySleep":
                handleBatterySleep(MappingIndexToValue.batterySleep[selectedIndex])
                break;    
            case "pluggedInSleep":
                handlePluggedInSleep(MappingIndexToValue.pluggedInSleep[selectedIndex])
                break;    
            case "powerMode":
                handlePowerMode(MappingIndexToValue.powerMode[selectedIndex])
                break;    
            case "batterySaveOn":
                handleBatterySaveOn(MappingIndexToValue.batterySaveOn[selectedIndex])
                break;    
            case "batteryUsage":
                handleBatteryUsage(MappingIndexToValue.batteryUsage[selectedIndex])
                break;    
            default:
                break;
        }
    } catch (error) {
        
    }
}
function handlePluggedInTurnOn (value) {
    try {
        
    } catch (error) {
        
    }
}
function handleBatterySleep (value) {
    try {
        
    } catch (error) {
        
    }
}
function handlePluggedInSleep (value) {
    try {
        
    } catch (error) {
        
    }
}
function handlePowerMode (value) {
    try {
        
    } catch (error) {
        
    }
}
function handleBatterySaveOn (value) {
    try {
        
    } catch (error) {
        
    }
}
function handleBatteryTurnOff (value) {
    try {
        
    } catch (error) {
        
    }
}
function handleBatteryUsage (value) {
    try {
        
    } catch (error) {
        
    }
}