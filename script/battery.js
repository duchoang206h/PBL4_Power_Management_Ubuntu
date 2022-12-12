window.onload = async () => {
    try {
        const batteryDetail = await window.system.getBatteryDetail();
        console.log(batteryDetail)
    } catch (error) {
        console.log(error)
    }
} 