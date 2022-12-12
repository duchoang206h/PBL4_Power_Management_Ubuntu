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
            case "pluggedInTurnOff":
                result = await handlePluggedInTurnOff(MappingIndexToValue.pluggedInTurnOff[selectedIndex])
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
            case "powerButtonAction":
                result = await handlePowerButtonAction(MappingIndexToValue.powerButtonAction[selectedIndex])

            case "batteryCloseLid":
                result = await handleBatteryCloseLid(MappingIndexToValue.batteryCloseLid[selectedIndex])

            case "pluggedInCloseLid":
                result = await handlePluggedInCloseLid(MappingIndexToValue.pluggedInCloseLid[selectedIndex])
            case "batteryChartSelect":
                result = await window.system.getBatteryHistory(MappingIndexToValue.batteryDetail[selectedIndex]) 
                console.log(result)
                await updateChart(result)  
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
async function handlePluggedInTurnOff (value) {
    try {
        console.log(`handlePluggedInTurnOff`, value);
       return await window.handle.setPluggedInTurnOff(value)
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
        console.log(value);
        document.getElementById('powerMode').style.display = 'none';
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
    document.getElementById('brightness_value').innerHTML = brightness +'%'
    window.handle.setBrightness(brightness)
}
async function handleTurnOnBatterySaver (){
    const turnOnBatterySaverBTN = document.getElementById('turnOnBatterySaver')
    if(turnOnBatterySaverBTN.innerText === `Turn off now` ){
        await window.handle.turnOnBatterySaver(false);
        document.getElementById('powerMode').style.display = 'inline';

        turnOnBatterySaverBTN.innerText = `Turn on now`
    }else{
        await window.handle.turnOnBatterySaver(true);
        document.getElementById('powerMode').style.display  = 'none';
        turnOnBatterySaverBTN.innerText = `Turn off now`
    }

}
async function handleSetLowBrightnessOnBattery() {
    try {
        const value = document.getElementById('lowBrightnessOnBattery').checked
        return await window.handle.setLowBrightnessOnBattery(value);
    } catch (error) {
        
    }
}
async function handleSetTurnOffWifiOnBattery() {
    const value = document.getElementById("turnOffWifiOnBattery").checked;
    return await window.handle.setTurnOffWifiOnBattery(value);
}
async function handleSetTurnOffBluetoothOnBattery() {
    const value = document.getElementById("turnOffBluetoothOnBattery").checked;
    return await window.handle.setTurnOffBluetoothOnBattery(value);
}
async function hadlePowerButtonAction(value){
    try {
        return await window.handle.setPowrButtonAction(value)
    } catch (error) {
        
    }
}
async function handleBatteryCloseLid(value){
    try {
        return await window.handle.setBatteryCloseLid(value)
    } catch (error) {
        
    }
}
async function handlePluggedInCloseLid(value){
    console.log(`handlePluggedCloseLid`, value)
    try {
        return await window.handle.setPluggedInCloseLid(value)
    } catch (error) {
        
    }
}