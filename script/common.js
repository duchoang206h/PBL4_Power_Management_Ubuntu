
window.onload = async () => {
    const {
        batterySaver,
        brightness,
        powerMode, 
        lowBrightBatterySaver,
        batterySaveOn,
        screenTurnOff,
        batterySleep,
        pluggedInSleep,
        batteryLevel,
        remainingTime,
        chargingState,
        turnOffWifi,
        turnOffBluetooth,
        batteryCloseLid,
        pluggedInCloseLid,
        powerButtonAction
    } = await window.system.getAllSetting();
    console.log({ screenTurnOff})
    const batteryLevelDiv = document.getElementById('batteryLevel')
    const batteryRemainingTime = document.getElementById('batteryRemainingTime')
    const chargingStateDiv = document.getElementById('chargingState')
    const batteryLevelRangeDiv = document.getElementById('batteryLevelRange');
    const batterySaveOnSelect = document.getElementById("batterySaveOn");
    const batteryTurnOffSelect = document.getElementById("screenTurnOff");
    const batterySleepSelect = document.getElementById("batterySleep");
    const pluggedInSleepSelect = document.getElementById("pluggedInSleep");
    const batteryCloseLidSelect = document.getElementById("batteryCloseLid");
    const pluggedInCloseLidSelet = document.getElementById("pluggedInCloseLid");
    const powerButtonActionSelect = document.getElementById("powerButtonAction");
    const pluggedInTurnOffSelect = document.getElementById("screenTurnOff");
    const powerModeSelect = document.getElementById('powerMode');
    const batterySaverBtn = document.getElementById('turnOnBatterySaver');
    //
    console.log(`chargin`, chargingState);
    batteryLevelRangeDiv.style.width = batteryLevel + '%';
    batteryLevelDiv.innerHTML = batteryLevel + '%';
    const minutes = Math.round(remainingTime % 1 * 60) || 0;
    const hours = Math.floor(remainingTime) || 10;
    batteryRemainingTime.innerHTML = `${hours} hours ${minutes} minutes remaining`;
    batterySaverBtn.disabled = chargingState;
    powerModeSelect.style.display = batterySaver ? 'none' : 'block';
    if (!chargingState) {
        chargingStateDiv.style.display = "none";
    }
    for(const [key, value] of Object.entries(MappingIndexToValue.batterySleep)){
        if(value == batterySleep) batterySleepSelect.selectedIndex = key;
    }
    /* for(const [key, value] of Object.entries(MappingIndexToValue.screenTurnOff)){
        if(value == screenTurnOff) batteryTurnOffSelect.selectedIndex = key;
        
    } */
    for(const [key, value] of Object.entries(MappingIndexToValue.screenTurnOff)){
        if(value == screenTurnOff) pluggedInTurnOffSelect.selectedIndex = key;
        
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
    console.log({
        powerButtonAction,
        batteryCloseLid,
        pluggedInCloseLid
    })
    /* for(const [key, value] of Object.entries(MappingIndexToValue.batteryCloseLid)){
        if(value === batteryCloseLid) batteryCloseLidSelect.selectedIndex = key
    }

    for(const [key, value] of Object.entries(MappingIndexToValue.pluggedInCloseLid)){
        if(value === pluggedInCloseLid) pluggedInCloseLidSelet.selectedIndex = key
    } */
    for(const [key, value] of Object.entries(MappingIndexToValue.powerButtonAction)){
        if(value === powerButtonAction) powerButtonActionSelect.selectedIndex = key
    }
    console.log("lowBrightBatterySaver", lowBrightBatterySaver)
    document.getElementById('lowBrightnessOnBattery').checked = lowBrightBatterySaver
    document.getElementById('brightness_range').value = brightness;
    document.getElementById('brightness_value').innerHTML = brightness +'%';
    if (batterySaver === true) {
        powerModeSelect.style.display = "none";
    }
    if (batterySaver === true && chargingState === false) {
        batterySaverBtn.innerHTML = 'Turn off now';
    } else if (batterySaver === false && chargingState === false) {
        batterySaverBtn.innerHTML = 'Turn on now';
    } else if (chargingState === true) {
        batterySaverBtn.innerHTML = 'Turn on now';
        batterySaverBtn.disabled = true;
    }
    console.log(`chargingState`, chargingState);
    console.log(`batterySaver`, batterySaver);

    document.getElementById("turnOffWifiOnBattery").checked = turnOffWifi;
    document.getElementById("turnOffBluetoothOnBattery").checked = turnOffBluetooth
    window.handle.updateBatterySaver((event, { batterySaver, chargingState}) => {
        console.log(`-----------batterySaver`, batterySaver)
        if (batterySaver === true) {
            powerModeSelect.style.display = "none";
        }
        if (batterySaver === true && chargingState === false) {
            batterySaverBtn.innerHTML = 'Turn off now';
        } else if( batterySaver === false && chargingState === false ) {
            batterySaverBtn.innerHTML = 'Turn on now';
        }else if(chargingState === true){
            powerModeSelect.style.display = "block";
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
async function openBatteryDetail (event){
    try {
        event.preventDefault();
        const data = await window.system.getBatteryDetail();
        await window.handle.openBatteryDetailWindow();
    } catch (error) {
        console.log(error);
    }
}
