
function init(elements) {
	
  let width = 700;
  let height = 600;
  let margin = {left:60, top:60, right:60, bottom:60};
  let innerWidth  = outerWidth  - margin.left - margin.right;
  let innerHeight = outerHeight - margin.top  - margin.bottom;
  let barPadding = 0.2
 
  const svg = d3.select("body").append("svg")
	.attr("width", 700)
	.attr("height", 600)
	.style("background-color", d3.color("rgb(169, 168, 159)"))
    ;

  var subgroups = elements.columns.slice(1)
  var groups = d3.map(elements, function(d){return(d.Date)})

  const x = d3.scaleBand()
    .domain(d3.range(elements.length))
	.range([margin.left, width - margin.right])
	.padding(barPadding)
	;

  const y = d3.scaleLinear()
    .domain([0, 15])
	.range([height - margin.bottom, margin.top])
	;

  var color = d3.scaleOrdinal()
    .domain(subgroups)
    .range(['#d01212','#9f0d0d','#64e6ea', '#46a1a3'])
	
  var stackedData = d3.stack()
    .keys(subgroups)
	(elements)

  svg.append("g")
    .selectAll("g")
    .data(stackedData)
    .enter().append("g")
      .attr("fill", function(d) { return color(d.key); })
      .selectAll("rect")
      .data(function(d) { return d; })
      .enter().append("rect")
        .attr("x", (d, i) => x(i))
        .attr("y", function(d) { return y(d[1]); })
        .attr("height", function(d) { return y(d[0]) - y(d[1]); })
        .attr("width",x.bandwidth())
	  
  let colorLegendG = svg.append("g") 
    .attr("class", "color-legend")
	.attr("transform", "translate(500, 30)");
	
  var colorLegend = d3.legendColor()
    .scale(color)
    .shapePadding(4)
    .shapeWidth(25)
    .shapeHeight(25)
    .labelOffset(4);
	  
// From hereon, this is the code for the X and Y axis.
  function xAxis(g) {
	g.attr("transform", `translate(0, ${height - margin.bottom})`)
	.call(d3.axisBottom(x).tickFormat(i => elements[i].Date))
	.attr("font-size", "15px")
  }
	
  function yAxis(g) {
	g.attr("transform", `translate(${margin.left}, 0)`)
	.call(d3.axisLeft(y).ticks(null, elements.format))
	.attr("font-size", "15px")
  }
	
  svg.append("g").call(xAxis);
  svg.append("g").call(yAxis);
  colorLegendG.call(colorLegend);
  svg.node();
  
  const xText = svg.append("text")
  .attr("x", 340)
  .attr("y", 590)
  .attr("text-anchor","middle")
  .attr("font-family", "sans-serif")
  .attr("font-size", "22px")
  .attr("fill", "black")
  .text("Date of Play (2020)");

 const yText = svg.append("text")
  .attr("text-anchor","middle")
  .attr("font-family", "sans-serif")
  .attr("font-size", "22px")
  .attr("fill", "black")
  .attr("transform", "translate(10,300) rotate(90)")
  .text("Number of Games");
  
};

