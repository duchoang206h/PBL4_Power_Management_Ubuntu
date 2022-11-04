window.onload = async () => {
    const {
        batterySaver,
        brightness,
        powerMode, 
        lowBrightBatterySaver,
        batterySaveOn
    } = await window.system.getAllSetting();
    const batterySaveOnSelect = document.getElementById("batterySaveOn");
    for (const [key, value] of Object.entries(MappingIndexToValue.batterySaveOn)) {
        if (value == batterySaveOn) {

            batterySaveOnSelect.selectedIndex = key;
        }
    }
    document.getElementById('lowBrightnessOnBattery').checked = lowBrightBatterySaver
    document.getElementById('brightness_range').value = brightness;
    document.getElementById('brightness_value').innerHTML = brightness;
    if(batterySaver === true){
        document.getElementById('turnOnBatterySaver').innerHTML = 'Turn off now';
    }
    window.handle.updateBatterySaver((event, batterySaver) => {
        console.log(`-----------batterySaver`, batterySaver)
        const batterySaverBtn = document.getElementById('turnOnBatterySaver');
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
        console.log({
            batteryLevel,
        chargingState,
        remainingTime 
        })
        const batteryLevelDiv = document.getElementById('batteryLevel')
        const batteryRemainingTime = document.getElementById('batteryRemainingTime')
        const chargingStateDiv = document.getElementById('chargingState')
        //
        batteryLevelDiv.innerHTML = batteryLevel;
        const minutes = Math.round(remainingTime%1 * 60);
        const hours = Math.floor(remainingTime);
        batteryRemainingTime.innerHTML = `${hours} hours ${minutes} minutes remaining`;
        if(!chargingState){
            chargingStateDiv.style.display = "none";
        }
    })
   
}
