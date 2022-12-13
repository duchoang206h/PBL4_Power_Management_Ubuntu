/**
 *
 * @param { Number } value
 * @returns { String }
 */
const changeBright = (value) =>
  `gdbus call --session --dest org.gnome.SettingsDaemon.Power --object-path /org/gnome/SettingsDaemon/Power --method org.freedesktop.DBus.Properties.Set org.gnome.SettingsDaemon.Power.Screen Brightness "<int32 ${value}>"`;

const turnOffBluetooth = `rfkill block bluetooth`;

const turnOffWifi = `nmcli radio wifi off`;

/**
 *
 * @param { Number } mode
 * @returns { String }
 */
const setPowerMode = (mode) => `powerprofilesctl set ${mode}`;

const getChargingState = `upower -i $(upower -e | grep 'BAT') | grep -E "state"`;
const getBatteryLevel = `upower -i $(upower -e | grep 'BAT') | grep -E "percentage"`;
const getPowerMode = `gdbus introspect --system --dest net.hadess.PowerProfiles --object-path /net/hadess/PowerProfiles | grep -E "ActiveProfile = "`;
const getRemainingTime = `upower -i $(upower -e | grep 'BAT') | grep -E "time to empty"`;
const setBatteryPowerSleepAfter = (
  time
) => `gsettings set org.gnome.settings-daemon.plugins.power sleep-inactive-battery-type 'suspend'
gsettings set org.gnome.settings-daemon.plugins.power sleep-inactive-battery-timeout ${time}`;
const setACPowerSleepAfter = (
  time
) => `gsettings set org.gnome.settings-daemon.plugins.power sleep-inactive-ac-type 'suspend'
gsettings set org.gnome.settings-daemon.plugins.power sleep-inactive-ac-timeout ${time}`;
const setScreenTurnOffAfter = (time) =>
  `gsettings set org.gnome.desktop.session idle-delay ${time}`;
const getPowerButtonAction = `gsettings get org.gnome.settings-daemon.plugins.power power-button-action`;
const setPowerButtonAction = (action) =>
  `gsettings set org.gnome.settings-daemon.plugins.power power-button-action ${action}`;
const getCloseLidOnBattery = `gsettings get org.gnome.settings-daemon.plugins.power lid-close-battery-action`;
const getCloseLidOnPluggedIn = `gsettings get org.gnome.settings-daemon.plugins.power lid-close-battery-action `;
const setCloseLidOnBattery = (action) =>
  `gsettings set org.gnome.settings-daemon.plugins.power lid-close-battery-action ${action}`;
const setCloseLidOnPluggedIn = (action) =>
  `gsettings set org.gnome.settings-daemon.plugins.power lid-close-battery-action ${action}`;
const getBatteryDetail = (attribute) =>
  `upower -i $(upower -e | grep 'BAT') | grep -E "${attribute}"`;
const getBatteryHistory = (time, points = 12) =>
  `dbus-send --print-reply --system --dest=org.freedesktop.UPower /org/freedesktop/UPower/devices/battery_BAT0 org.freedesktop.UPower.Device.GetHistory string:charge uint32:${time} uint32:${points}`;
module.exports = {
  changeBright,
  getBatteryLevel,
  getChargingState,
  setPowerMode,
  turnOffBluetooth,
  turnOffWifi,
  getPowerMode,
  getRemainingTime,
  setACPowerSleepAfter,
  setBatteryPowerSleepAfter,
  setScreenTurnOffAfter,
  getPowerButtonAction,
  setPowerButtonAction,
  getCloseLidOnBattery,
  getCloseLidOnPluggedIn,
  getBatteryDetail,
  getBatteryHistory,
  setCloseLidOnBattery,
  setCloseLidOnPluggedIn,
};
