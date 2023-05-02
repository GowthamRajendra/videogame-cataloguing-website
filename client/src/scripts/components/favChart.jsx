// bar chart of user's game ratings, displayed in profile page.
export default function FavChart(props) {
    let margin = { top: 20, right: 30, bottom: 40, left: 90 };
    let width = 450;
    let height = 450;

    d3.select("#FavChart").selectAll("*").remove()

    let svg = d3.select("#FavChart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    let data = {
        "-1": 0,    // unrated
        "1": 0,     // 1 stars...
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0,
    };

    // for labels
    const ratings = {
        "-1": "Unrated",
        "1": "1 Star",
        "2": "2 Stars",
        "3": "3 Stars",
        "4": "4 Stars",
        "5": "5 Stars",
    }

    props.gameDetails.map((game) => {
        data[game.rating] += 1
    });

    let chart_data = [];


    Object.entries(data).sort((a, b) => b[0] - a[0]).map(([key, val]) => {
        chart_data.push({ "rating": ratings[key], "count": val })
    });

    var color = d3.scaleLinear()
        .domain([-1, 1, 2, 3, 4, 5])
        .range(["#000000", "#ff0000", "#ffa500", "#ffff00", "#b9ff00", "#00ff00"])


    // x-axis
    let x = d3.scaleLinear()
        .domain([0, Math.max(...Object.values(data))]) // largest number of ratings is the max
        .range([0, width]);

    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", `translate(-10,0)rotate(-45)`)
        .style("text-anchor", "end")
        .style("fill", "#fff");

    // // y-axis
    let y = d3.scaleBand()
        .range([0, height])
        .domain(chart_data.map((data) => data.rating))
        .padding(0.1);

    svg.append("g")
        .call(d3.axisLeft(y))
        .selectAll("text")
        .style("fill", "#fff");

    //bars
    svg.selectAll("myRect")
        .data(chart_data)
        .enter()
        .append("rect")
        .attr("x", x(0))
        .attr("y", function (d) { return y(d.rating); })
        .attr("width", function (d) { return x(d.count); })
        .attr("height", y.bandwidth())
        .attr("fill", function (d) {
            let c = parseInt(d.rating);
            if (!c) { // unrated = NaN
                c = -1; // make unrated black color
            }
            return color(c)
        });

    return (<div id="FavChart"></div>)
}