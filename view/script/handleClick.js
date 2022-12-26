const selects = document.querySelectorAll("select");
selects.forEach((select) => {
  select.addEventListener("change", handleClick);
});
async function handleClick(event) {
  const { id, selectedIndex } = event.target;
  const value = event.target.value;
  try {
    let result = false;
    switch (id) {
      case "screenTurnOff":
        result = await handleBatteryTurnOff(+value * 60);
        break;
      // case "screenTurnOff":
      //     result = await handlePluggedInTurnOff(value)
      //     break;
      case "batterySleep":
        result = await handleBatterySleep(+value * 60);
        break;
      case "pluggedInSleep":
        result = await handlePluggedInSleep(+value * 60);
        break;
      case "powerMode":
        result = await handlePowerMode(value);
        break;
      case "thresholdAutoBatterySaver":
        result = await handleBatterySaveOn(+value);
        break;
      case "powerButtonAction":
        result = await handlePowerButtonAction(value);
        break;
      case "batteryChartSelect":
        result = await window.handle.getBatteryHistory(+value);
        await updateChart(result);
      default:
        break;
    }
    if (result) {
      // handle success
    } else {
      // handle fail
    }
  } catch (error) {
    // handle error
  }
}
async function handlePluggedInTurnOff(value) {
  try {
    return await window.handle.setPluggedInTurnOff(value);
  } catch (error) {
    // handle error
  }
}
async function handleBatterySleep(value) {
  try {
    return await window.handle.setBatterySleep(value);
  } catch (error) {}
}
async function handlePluggedInSleep(value) {
  try {
    return await window.handle.setPluggedInSleep(value);
  } catch (error) {}
}
async function handlePowerMode(value) {
  try {
    return await window.handle.setPowerMode(value);
  } catch (error) {}
}
async function handleBatterySaveOn(value) {
  try {
    document.getElementById("powerMode").style.display = "none";
    return await window.handle.setBatterySaveOn(value);
  } catch (error) {}
}
async function handleBatteryTurnOff(value) {
  try {
    return await window.handle.setBatteryTurnOff(value);
  } catch (error) {}
}
async function handleBatteryUsage(value) {
  try {
    return await window.handle.setBatteryUsage(value);
  } catch (error) {}
}
function handleBrightnessChange() {
  const brightness = Number(document.getElementById("brightness_range").value);
  document.getElementById("brightness_value").innerHTML = brightness + "%";
  window.handle.setBrightness(brightness);
}
async function handleTurnOnBatterySaver() {
  const turnOnBatterySaverBTN = document.getElementById("turnOnBatterySaver");
  if (turnOnBatterySaverBTN.innerText === `Turn off now`) {
    await window.handle.turnOnBatterySaver(false);
    document.getElementById("powerMode").style.display = "inline";

    turnOnBatterySaverBTN.innerText = `Turn on now`;
  } else {
    await window.handle.turnOnBatterySaver(true);
    document.getElementById("powerMode").style.display = "none";
    turnOnBatterySaverBTN.innerText = `Turn off now`;
  }
}
async function handleSetLowBrightnessOnBattery() {
  try {
    const value = document.getElementById("lowBrightnessOnBattery").checked;
    return await window.handle.setLowBrightnessOnBattery(value);
  } catch (error) {}
}
async function handleSetTurnOffWifiOnBattery() {
  const value = document.getElementById("turnOffWifiOnBattery").checked;
  return await window.handle.setTurnOffWifiOnBattery(value);
}
async function handleSetTurnOffBluetoothOnBattery() {
  const value = document.getElementById("turnOffBluetoothOnBattery").checked;
  return await window.handle.setTurnOffBluetoothOnBattery(value);
}
async function handlePowerButtonAction(value) {
  try {
    return await window.handle.setPowerButtonAction(value);
  } catch (error) {}
}
async function handleBatteryCloseLid(value) {
  try {
    return await window.handle.setBatteryCloseLid(value);
  } catch (error) {}
}
async function handlePluggedInCloseLid(value) {
  try {
    return await window.handle.setPluggedInCloseLid(value);
  } catch (error) {}
}
