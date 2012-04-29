var width = 960,
    height = 1500;

var color = d3.scale.category10();

var force = d3.layout.force()
    .charge(-100)
    .linkDistance(100)
    .size([width, height]);

var svg = d3.select("#chart").append("svg")
    .attr("width", width)
    .attr("height", height);
	
function addNode(r) {
	force.nodes().push(r)
	return svg.data(r)
		.enter()
		.append("circle")
		.attr("class","node")
		.attr("r", function(d) {d.score;})
		.call(force.drag);
		
}

function updateForce() {
	var links = svg.selectAll("line.link");
	var nodes = svg.selectAll("circle.node");
    links.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    nodes.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });	
}

d3.json("json_astro.json", function(json) {
  console.log(json);
  force
      .nodes(json.nodes)
      .links(json.links)
      .start();

  var link = svg.selectAll("line.link")
      .data(json.links)
    .enter().append("line")
      .attr("class", "link")
      .style("stroke-width", function(d) { return 10*Math.pow(d.value,.05)});

  var node = svg.selectAll("circle.node")
      .data(json.nodes)
    .enter().append("circle")
      .attr("class", "node")
      .attr("r", 5)
      .style("fill", function(d) { return color(d.group); })
      .call(force.drag);

  node.append("title")
      .text(function(d) { return d.name; });
});


force.on("tick", updateForce)
node = {score: 10}
//addNode(node)


