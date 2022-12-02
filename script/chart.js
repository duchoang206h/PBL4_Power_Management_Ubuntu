async function initData(){
    const data = await window.system.getBatteryHistory();
    console.log(data);
}
new Chartist.Line(
    "#chart",
    {
        labels: ['24h', '22h', '20h', '18h', '16h', '14h', '12h', '10h', '8h', '6h' ,'4h' ,'2h', 'now'],
        series: [[0,50, 90, 100, 80, 50, 100, 50, 40, 60, 100 ,80, 60 ]],
    },
    {
        low: 0,
        showArea: true,
    }
);