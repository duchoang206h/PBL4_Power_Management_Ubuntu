const selects = document.querySelectorAll('select');
selects.forEach(select => {
    select.addEventListener('change', handleClick)
})
async function handleClick (event){
    const { id, selectedIndex } = event.target;
    try {
        console.log(id)
        let result = false;
        switch (id) {
            case "batteryTurnOff":
                result = await handleBatteryTurnOff(MappingIndexToValue.batteryTurnOff[selectedIndex])
                break;
            case "pluggedInTurnOn":
                result = await handlePluggedInTurnOn(MappingIndexToValue.pluggedInTurnOn[selectedIndex])
                break;    
            case "batterySleep":
                result = await handleBatterySleep(MappingIndexToValue.batterySleep[selectedIndex])
                break;    
            case "pluggedInSleep":
                result = await handlePluggedInSleep(MappingIndexToValue.pluggedInSleep[selectedIndex])
                break;    
            case "powerMode":
                result = await handlePowerMode(MappingIndexToValue.powerMode[selectedIndex])
                break;    
            case "batterySaveOn":
                result = await handleBatterySaveOn(MappingIndexToValue.batterySaveOn[selectedIndex])
                break;    
            case "batteryUsage":
                result = await handleBatteryUsage(MappingIndexToValue.batteryUsage[selectedIndex])
                break;    
            default:
                break;
        }
    if(result){
        // handle success
    }else{
        // handle fail 
    }    
    } catch (error) {
         // handle error 
    }
}
async function handlePluggedInTurnOn (value) {
    try {
       return await window.handle.setPluggedInTurnOn(value)
    } catch (error) {
      // handle error  
    }
}
async function handleBatterySleep (value) {
    try {
        console.log(`value`, value)
       return await window.handle.setBatterySleep(value)
    } catch (error) {
        
    }
}
async function handlePluggedInSleep (value) {
    try {
        return await window.handle.setPluggedInSleep(value)
    } catch (error) {
        
    }
}
async function handlePowerMode (value) {
    try {
        return await window.handle.setPowerMode(value)
    } catch (error) {
        
    }
}
async function handleBatterySaveOn (value) {
    try {
        console.log(value)
        return await window.handle.setBatterySaveOn(value)
    } catch (error) {
        
    }
}
async function handleBatteryTurnOff (value) {
    try {
        return await window.handle.setBatteryTurnOff(value)
    } catch (error) {
        
    }
}
async function handleBatteryUsage (value) {
    try {
        return await window.handle.setBatteryUsage(value)
    } catch (error) {
        
    }
}
function handleBrightnessChange (){
    console.log(`onchange`);
    const brightness = Number(document.getElementById('brightness_range').value)
    document.getElementById('brightness_value').innerHTML = brightness
    window.handle.setBrightness(brightness)
}
async function handleTurnOnBatterySaver (){
    const turnOnBatterySaverBTN = document.getElementById('turnOnBatterySaver')
    if(turnOnBatterySaverBTN.innerText === `Turn off now` ){
        await window.handle.turnOnBatterySaver(false);
        turnOnBatterySaverBTN.innerText = `Turn on now`
    }else{
        await window.handle.turnOnBatterySaver(true);
        turnOnBatterySaverBTN.innerText = `Turn off now`
    }

}