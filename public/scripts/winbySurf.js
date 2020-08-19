

document.addEventListener("DOMContentLoaded", function () {
    var player1 = JSON.stringify(players[0]);
    var player2 = JSON.stringify(players[1]);
    // var h2h = <%- JSON.stringify(h2h)%>;
    console.log(player1);
    console.log(player2);
    // console.log(h2h);


    var myChart = Highcharts.chart("container2", {
        chart: {
            type: "bar",
        },
        title: {
            text: "Winning Percentage by Surface (Data from 2018-2019)",
        },
        xAxis: {
            categories: ['Clay', 'Grass', 'Hard'],
        },
        yAxis: {
            title: {
                text: "Winning Percentage",
            },
        },
        series: [
            {name:player1.name,
            data: player1.data},
            {name:player2.name,
            data: player2.data}

        ],
    });
});
