window.onload = async () => {
    const {
        batterySaver,
        brightness,
        powerMode, 
        lowBrightBatterySaver,
        batterySaveOn
    } = await window.system.getAllSetting();
    
    document.getElementById('lowBrightnessOnBattery').checked = lowBrightnessOnBattery
    document.getElementById('brightness_range').value = brightness;
    document.getElementById('brightness_value').innerHTML = brightness;
    if(batterySaver === true){
        document.getElementById('turnOnBatterySaver').innerHTML = 'Turn off now';
    }
}