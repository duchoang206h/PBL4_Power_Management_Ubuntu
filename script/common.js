
window.onload = async () => {
    const {
        batterySaver,
        brightness,
        powerMode, 
        lowBrightBatterySaver,
        batterySaveOn,
        batteryTurnOff,
        batterySleep,
        pluggedInTurnOff,
        pluggedInSleep,
        batteryLevel,
        remainingTime,
        chargingState
    } = await window.system.getAllSetting();
    const batteryLevelDiv = document.getElementById('batteryLevel')
    const batteryRemainingTime = document.getElementById('batteryRemainingTime')
    const chargingStateDiv = document.getElementById('chargingState')
    const batteryLevelRangeDiv = document.getElementById('batteryLevelRange');
    const batterySaveOnSelect = document.getElementById("batterySaveOn");
    const batteryTurnOffSelect = document.getElementById("batteryTurnOff");
    const batterySleepSelect = document.getElementById("batterySleep");
    const pluggedInSleepSelect = document.getElementById("pluggedInSleep");

    const pluggedInTurnOffSelect = document.getElementById("pluggedInTurnOff");

    const batterySaverBtn = document.getElementById('turnOnBatterySaver');
    //
    console.log(`batteryLevel`, batteryLevel);
    batteryLevelRangeDiv.style.width = batteryLevel + '%';
    batteryLevelDiv.innerHTML = batteryLevel + '%';
    const minutes = Math.round(remainingTime % 1 * 60) || 0;
    const hours = Math.floor(remainingTime) || 10;
    batteryRemainingTime.innerHTML = `${hours} hours ${minutes} minutes remaining`;
    batterySaverBtn.disabled  = chargingState;
    if (!chargingState) {
        chargingStateDiv.style.display = "none";
    }
    for(const [key, value] of Object.entries(MappingIndexToValue.batterySleep)){
        if(value == batterySleep) batterySleepSelect.selectedIndex = key;
    }
    for(const [key, value] of Object.entries(MappingIndexToValue.batteryTurnOff)){
        if(value == batteryTurnOff) batteryTurnOffSelect.selectedIndex = key;
        
    }
    for(const [key, value] of Object.entries(MappingIndexToValue.pluggedInTurnOff)){
        if(value == pluggedInTurnOff) pluggedInTurnOffSelect.selectedIndex = key;
        
    }
    for(const [key, value] of Object.entries(MappingIndexToValue.pluggedInSleep)){
        if(value == pluggedInSleep) pluggedInSleepSelect.selectedIndex = key;
        
    }


    for (const [key, value] of Object.entries(MappingIndexToValue.batterySaveOn)) {
        if (value == batterySaveOn) {

            batterySaveOnSelect.selectedIndex = key;
        }
    }
    document.getElementById('lowBrightnessOnBattery').checked = lowBrightBatterySaver
    document.getElementById('brightness_range').value = brightness;
    document.getElementById('brightness_value').innerHTML = brightness +'%';
    if(batterySaver === true){
        document.getElementById('turnOnBatterySaver').innerHTML = 'Turn off now';
    }
    window.handle.updateBatterySaver((event, batterySaver) => {
        console.log(`-----------batterySaver`, batterySaver)
        
        if (batterySaver === true) {
            batterySaverBtn.innerHTML = 'Turn off now';
        } else {
            batterySaverBtn.innerHTML = 'Turn on now';
        }
    })
    window.handle.updateCurrentBattery((event, { batteryLevel,
        chargingState,
        remainingTime }) => {
            // do update battery
        const batteryLevelDiv = document.getElementById('batteryLevel')
        const batteryRemainingTime = document.getElementById('batteryRemainingTime')
        const chargingStateDiv = document.getElementById('chargingState')
        const batteryLevelRangeDiv = document.getElementById('batteryLevelRange');
        //
        batteryLevelDiv.innerHTML = batteryLevel + "%";
        const minutes = Math.round(remainingTime % 1 * 60) || 0;
        const hours = Math.floor(remainingTime) || 10;
        batteryRemainingTime.innerHTML = `${hours} hours ${minutes} minutes remaining`;
        if(!chargingState){
            chargingStateDiv.style.display = "none";
        }
    })
    window.handle.updateChargingState((event, value) => {
        batterySaverBtn.disabled  = value;
    })
   
}
