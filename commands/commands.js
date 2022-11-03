/**
 * 
 * @param { Number } value 
 * @returns { String }
 */
const changeBright = (value) => `gdbus call --session --dest org.gnome.SettingsDaemon.Power --object-path /org/gnome/SettingsDaemon/Power --method org.freedesktop.DBus.Properties.Set org.gnome.SettingsDaemon.Power.Screen Brightness "<int32 ${value}>"`

const turnOffBluetooth = `rfkill block bluetooth`

const turnOffWifi = `nmcli radio wifi off`

/**
 * 
 * @param { Number } mode 
 * @returns { String }
 */
const setPowerMode = (mode) => `powerprofilesctl set ${mode}`

const getChargingState = `upower -i $(upower -e | grep 'BAT') | grep -E "state"`
const getBatteryLevel = `upower -i $(upower -e | grep 'BAT') | grep -E "percentage"`
const getPowerMode = `gdbus introspect --system --dest net.hadess.PowerProfiles --object-path /net/hadess/PowerProfiles | grep -E "ActiveProfile = "`
module.exports = {
    changeBright,
    getBatteryLevel,
    getChargingState,
    setPowerMode,
    turnOffBluetooth,
    turnOffWifi,
    getPowerMode
}