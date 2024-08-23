async function draw() {
  // GET DATA
  const data = await d3.json("data.json");
  const xAccessor = (d) => d.currently.humidity;
  const yAccessor = (d) => d.currently.apparentTemperature;

  // DIMENSIONS
  let dimensions = {
    width: 800,
    height: 800,
    margin: {
      top: 50,
      bottom: 50,
      left: 50,
      right: 50,
    },
  };
  dimensions.ctrWidth =
    dimensions.width - dimensions.margin.left - dimensions.margin.right;
  dimensions.ctrHeight =
    dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

  // PREPARE AREA
  const svg = d3
    .select("#chart")
    .append("svg")
    .attr("width", dimensions.width)
    .attr("height", dimensions.height)
    .attr("fill", "#000");

  const ctr = svg
    .append("g")
    .style(
      "transform",
      `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`
    );

  // SCALES
  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(data, xAccessor))
    .rangeRound([0, dimensions.ctrWidth])
    .clamp(true);
  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(data, yAccessor))
    .rangeRound([dimensions.ctrHeight, 0]) // Reverse to position higher on top, lower on bottom
    .clamp(true);

  // DRAW CIRCLES
  ctr
    .selectAll("circle")
    .data(data)
    .join("circle")
    .attr("cx", (d) => xScale(xAccessor(d)))
    .attr("cy", (d) => yScale(yAccessor(d)))
    .attr("r", 3)
    .attr("fill", "blue")
    .attr("data-temp", yAccessor);

  // AXES
  const xAxis = d3.axisBottom(xScale).ticks(5).tickFormat(d => d * 100 + '%');
  const yAxis = d3.axisLeft(yScale);

  const xAxisGroup = ctr
    .append("g")
    .call(xAxis)
    .style("transform", `translateY(${dimensions.ctrHeight}px)`)
    .classed("axis", true);

  xAxisGroup
    .append("text")
    .attr("x", dimensions.ctrWidth / 2)
    .attr("y", dimensions.margin.bottom - 10)
    .attr("fill", "black")
    .text("Humidity");

  const yAxisGroup = ctr.append("g").call(yAxis).classed("axis", true);

  yAxisGroup
    .append("text")
    .attr("x", -dimensions.ctrHeight / 2)
    .attr("y", -dimensions.margin.left + 15)
    .attr("fill", "black")
    .html("Temperature &deg;F")
    .style("transform", "rotate(270deg)")
    .style("text-anchor", "middle");
}

draw();
