const chart = new Chartist.Line(
  "#chart",
  {
    labels: [],
    series: [],
  },
  {
    low: 0,
    showArea: true,
  }
);
async function updateChart(update = null){
      const data = update ? update: await window.system.getBatteryHistory();
      const labels = data.map(({ timestamps}) => new Date(timestamps*1000).getHours() + "h" + new Date(timestamps*1000).getMinutes() + "m");
      const levels = data.map(({ level}) => level)
      chart.update({ labels, series: [levels]})
}
updateChart()
