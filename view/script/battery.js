window.onload = async () => {
  try {
    const batteryDetail = await window.handle.getBatteryDetail();
    for (const [key, value] of Object.entries(batteryDetail)) {
      document.getElementById(key).innerHTML = value;
    }
  } catch (error) {
    console.log(error);
  }
};
