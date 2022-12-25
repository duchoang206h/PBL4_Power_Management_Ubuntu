window.onload = async () => {
    try {
        const batteryDetail = await window.system.getBatteryDetail();
        for(const [key, value] of Object.entries(batteryDetail)){
            document.getElementById(key).innerHTML = value
        }
        console.log(batteryDetail)
    } catch (error) {
        console.log(error)
    }
} 