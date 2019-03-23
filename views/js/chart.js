$(document).ready(function () {
    $.getJSON('/chart/data', function (data) {
        if (data) {
            var titles = [], incomes = [], outcomes = [];

            data.forEach(function (row) {
                titles.push(row.title);
                incomes.push(row.income);
                outcomes.push(row.outcome);
            });

            var chartData = {
                labels: titles,
                datasets: [
                    {
                        label: "Income",
                        fillColor: "rgba(201,230,177,0.2)",
                        strokeColor: "rgba(201,230,177,1)",
                        pointColor: "rgba(201,230,177,1)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(201,230,177,1)",
                        data: incomes
                    },
                    {
                        label: "Outcome",
                        fillColor: "rgba(225,184,172,0.2)",
                        strokeColor: "rgba(225,184,172,1)",
                        pointColor: "rgba(225,184,172,1)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(225,184,172,1)",
                        data: outcomes
                    }
                ]
            };
            var ctx = chart.getContext("2d");
            var lineChart = new Chart(ctx).Line(chartData, {});
        }
    });
});