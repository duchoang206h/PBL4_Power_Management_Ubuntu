async function initData(){
    let data = await window.system.getBatteryHistory();
    data = data.reverse()
    const timestamps = data.map(({ timestamps }) => new Date(timestamps * 1000).getHours() + "h" + new Date(timestamps * 1000).getMinutes() + "m").slice(data.length - 5);
    const levels = data.map(({ level }) => level).slice(data.length - 5);
    new Chartist.Line(
        "#chart",
        {
            labels: timestamps,//['24h', '22h', '20h', '18h', '16h', '14h', '12h', '10h', '8h', '6h', '4h', '2h', 'now'],

            series: [levels]//[[0, 50, 90, 100, 80, 50, 100, 50, 40, 60, 100, 80, 60]],
        },
        {
            low: 0,
            showArea: true,
        }
    );
}
initData()
// new Chartist.Line(
//     "#chart",
//     {
//         labels: ['24h', '22h', '20h', '18h', '16h', '14h', '12h', '10h', '8h', '6h' ,'4h' ,'2h', 'now'],
//         series: [[0,50, 90, 100, 80, 50, 100, 50, 40, 60, 100 ,80, 60 ]],
//     },
//     {
//         low: 0,
//         showArea: true,
//     }
// );