async function initData(){
    const data = await window.system.getBatteryHistory();
    console.log(data);
}