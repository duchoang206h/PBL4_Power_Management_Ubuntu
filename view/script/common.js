window.onload = async () => {
  const {
    batterySaver,
    brightness,
    powerMode,
    lowBrightBatterySaver,
    thresholdAutoBatterySaver,
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
    powerButtonAction,
  } = await window.handle.getAllSetting();
  const batteryLevelDiv = document.getElementById("batteryLevel");
  const batteryRemainingTime = document.getElementById("batteryRemainingTime");
  const chargingStateDiv = document.getElementById("chargingState");
  const batteryLevelRangeDiv = document.getElementById("batteryLevelRange");
  const batterySaveOnSelect = document.getElementById(
    "thresholdAutoBatterySaver"
  );
  const batteryTurnOffSelect = document.getElementById("screenTurnOff");
  const batterySleepSelect = document.getElementById("batterySleep");
  const pluggedInSleepSelect = document.getElementById("pluggedInSleep");
  const batteryCloseLidSelect = document.getElementById("batteryCloseLid");
  const pluggedInCloseLidSelet = document.getElementById("pluggedInCloseLid");
  const powerButtonActionSelect = document.getElementById("powerButtonAction");
  const pluggedInTurnOffSelect = document.getElementById("screenTurnOff");
  const powerModeSelect = document.getElementById("powerMode");
  const batterySaverBtn = document.getElementById("turnOnBatterySaver");
  //
  batteryLevelRangeDiv.style.width = batteryLevel + "%";
  batteryLevelDiv.innerHTML = batteryLevel + "%";
  const minutes = Math.round((remainingTime % 1) * 60) || 0;
  const hours = Math.floor(remainingTime) || 10;
  batteryRemainingTime.innerHTML = `${hours} hours ${minutes} minutes remaining`;
  batterySaverBtn.disabled = chargingState;
  powerModeSelect.style.display = batterySaver ? "none" : "block";
  if (!chargingState) {
    chargingStateDiv.style.display = "none";
  }
  handleUpdateState(batterySleepSelect, batterySleep / 60);
  handleUpdateState(pluggedInTurnOffSelect, screenTurnOff / 60);
  handleUpdateState(pluggedInSleepSelect, pluggedInSleep / 60);
  handleUpdateState(batterySaveOnSelect, thresholdAutoBatterySaver);
  handleUpdateState(powerModeSelect, powerMode);
  handleUpdateState(powerButtonActionSelect, powerButtonAction);

  document.getElementById("lowBrightnessOnBattery").checked =
    lowBrightBatterySaver;
  document.getElementById("brightness_range").value = brightness;
  document.getElementById("brightness_value").innerHTML = brightness + "%";
  if (batterySaver === true) {
    powerModeSelect.style.display = "none";
  }
  if (batterySaver === true && chargingState === false) {
    batterySaverBtn.innerHTML = "Turn off now";
  } else if (batterySaver === false && chargingState === false) {
    batterySaverBtn.innerHTML = "Turn on now";
  } else if (chargingState === true) {
    batterySaverBtn.innerHTML = "Turn on now";
    batterySaverBtn.disabled = true;
  }

  document.getElementById("turnOffWifiOnBattery").checked = turnOffWifi;
  document.getElementById("turnOffBluetoothOnBattery").checked =
    turnOffBluetooth;
  window.handle.updateBatterySaver((event, { batterySaver, chargingState }) => {
    if (batterySaver === true) {
      powerModeSelect.style.display = "none";
    }
    if (batterySaver === true && chargingState === false) {
      batterySaverBtn.innerHTML = "Turn off now";
    } else if (batterySaver === false && chargingState === false) {
      batterySaverBtn.innerHTML = "Turn on now";
    } else if (chargingState === true) {
      powerModeSelect.style.display = "block";
      batterySaverBtn.innerHTML = "Turn on now";
      batterySaverBtn.disabled = true;
    }
  });
  window.handle.updateCurrentBattery(
    (event, { batteryLevel, chargingState, remainingTime }) => {
      // do update battery
      const batteryLevelDiv = document.getElementById("batteryLevel");
      const batteryRemainingTime = document.getElementById(
        "batteryRemainingTime"
      );
      const chargingStateDiv = document.getElementById("chargingState");
      const batteryLevelRangeDiv = document.getElementById("batteryLevelRange");
      //
      batteryLevelDiv.innerHTML = batteryLevel + "%";
      const minutes = Math.round((remainingTime % 1) * 60) || 0;
      const hours = Math.floor(remainingTime) || 10;
      batteryRemainingTime.innerHTML = `${hours} hours ${minutes} minutes remaining`;
      if (!chargingState) {
        chargingStateDiv.style.display = "none";
      } else {
        chargingStateDiv.style.display = "inline";
      }
    }
  );
  window.handle.updateChargingState((event, value) => {
    batterySaverBtn.disabled = value;
  });
};
async function openBatteryDetail(event) {
  try {
    event.preventDefault();
    const data = await window.handle.getBatteryDetail();
    await window.handle.openBatteryDetailWindow();
  } catch (error) {
    console.log(error);
  }
}
function handleUpdateState(selectDiv, value) {
  for (let i = 0; i < selectDiv.options.length; i++) {
    if (selectDiv.options[i].value == value) selectDiv.selectedIndex = i;
  }
}
