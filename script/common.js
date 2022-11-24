
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
        chargingState,
        turnOffWifi,
        turnOffBluetooth
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
    const powerModeSelect = document.getElementById('powerMode');
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
    /* for(const [key, value] of Object.entries(MappingIndexToValue.batteryTurnOff)){
        if(value == batteryTurnOff) batteryTurnOffSelect.selectedIndex = key;
        
    } */
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

    for(const [key, value] of Object.entries(MappingIndexToValue.powerMode)){
        if(value === powerMode) powerModeSelect.selectedIndex = key;
    }
    document.getElementById('lowBrightnessOnBattery').checked = lowBrightBatterySaver
    document.getElementById('brightness_range').value = brightness;
    document.getElementById('brightness_value').innerHTML = brightness +'%';
    if(batterySaver === true && chargingState === false){
        document.getElementById('turnOnBatterySaver').innerHTML = 'Turn off now';
    }
    document.getElementById("turnOffWifiOnBattery").checked = turnOffWifi;
    document.getElementById("turnOffBluetoothOnBattery").checked = turnOffBluetooth
    window.handle.updateBatterySaver((event, { batterySaver, chargingState}) => {
        console.log(`-----------batterySaver`, batterySaver)
        
        if (batterySaver === true && chargingState === false) {
            batterySaverBtn.innerHTML = 'Turn off now';
        } else if( batterySaver === false && chargingState === false ) {
            batterySaverBtn.innerHTML = 'Turn on now';
        }else if(hargingState === true){
            batterySaverBtn.innerHTML = 'Turn on now';
            batterySaverBtn.disabled  = true;
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
        }else {
            chargingStateDiv.style.display = "inline";
        }
    })
    window.handle.updateChargingState((event, value) => {
        batterySaverBtn.disabled  = value;
    })
   
}
