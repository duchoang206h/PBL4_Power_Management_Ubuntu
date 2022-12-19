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
async function updateChart(update = null) {
  const data = update ? update : await window.system.getBatteryHistory(1);
  console.log(data);
  const labels = data.map(
    ({ timestamps }) =>
      new Date(timestamps * 1000).getHours() +
      "h" +
      new Date(timestamps * 1000).getMinutes() +
      "m"
  );
  const levels = data.map(({ level }) => level);
  chart.update({ labels, series: [levels] });
}
updateChart();
setInterval(async () => {
  const time =
    MappingIndexToValue.batteryDetail[
      document.getElementById("batteryChartSelect").selectedIndex
    ];
  console.log(time);
  const updatesData = await window.system.getBatteryHistory(time);
  await updateChart(updatesData);
}, 30000); // update chart data every 30 seconds
