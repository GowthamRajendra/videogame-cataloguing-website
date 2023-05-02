import { useLocation } from 'react-router-dom'

// chart of ratings on each game page
export default function GameChart() {
    const info = useLocation();
    const chart_data = ["a", "b", "c", "d"];

    //remove any pre-existing charts
    d3.select("#PieChart").selectAll("*").remove();

    //set initial height, width and margin
    var width = 450
    var height = 450
    var margin = 40

    //set radius of pieplot as half of width or height minus margin
    var radius = Math.min(width, height) / 2 - margin

    // append the svg object to the div called "PieChart"
    var svg = d3.select("#PieChart")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    //set data for pie chart as the ratings from game info
    let data = {}

    for (let i = 0; i < info.state.ratings.length; i++) {
        data[chart_data[i]] = info.state.ratings[i].count
    }

    //set the color for each data
    var color = d3.scaleOrdinal()
        .domain(data)
        .range(["#ffcb2b", "#498afb", "#09c372", "#dc0530",])

    //compute location of each data on chart
    var pie = d3.pie()
        .value(function (d) { return d.value; })
    var data_ready = pie(d3.entries(data))

    //build the pie chart

    svg
        .selectAll('whatever')
        .data(data_ready)
        .enter()
        .append('path')
        .attr('d', d3.arc()
            .innerRadius(0)
            .outerRadius(radius)
        )
        .attr('fill', function (d) { return (color(d.data.key)) })
        .attr("stroke", "black")
        .style("stroke-width", "2px")
        .style("opacity", 0.7)


    //return the pie chart component function
    return (
        <div id="PieChart"></div>
    )
}


