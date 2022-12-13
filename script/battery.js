window.onload = async () => {
    try {
        const batteryDetail = await window.system.getBatteryDetail();
        ["vendor", "capacity", "charge-cycles", "percentage", "energy-full-design", "energy-full", "energy", "state", "serial", "model"].forEach(property => {
            document.getElementById(property).innerHTML = batteryDetail[property]
        })
        console.log(batteryDetail)
    } catch (error) {
        console.log(error)
    }
} 