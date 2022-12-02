async function initData(){
    const data = await window.system.getBatteryHistory();
    const labels = data.map(({ timestamps}) => new Date(timestamps*1000).toISOString()).slice(data.length - 5);
    const levels = data.map(({ level}) => level).slice(data.length -5)
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