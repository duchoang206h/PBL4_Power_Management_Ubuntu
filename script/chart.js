async function initData(){
    const data = await window.system.getBatteryHistory();
    console.log(data)
    const labels = data.map(({ timestamps}) => new Date(timestamps*1000).getHours() + "h" + new Date(timestamps*1000).getMinutes() + "m");
    const levels = data.map(({ level}) => level)
    console.log(levels)
    new Chartist.Line(
        "#chart",
        {
          labels: labels,
          series: [levels],
        },
        {
          low: 0,
          showArea: true,
        }
      );
}
initData()
