// tailored for this example (assumes g#plot, d.id)
function onMouseOver(d) {
  var tooltip = d3.select("text#tooltip");

  // initialize if missing
  if (tooltip.size() < 1) {
    tooltip = d3.select("g#plot").append("text").attr("id", "tooltip");
  }

  // calculate bounding box of plot WITHOUT tooltip
  tooltip.style("display", "none");
  onMouseMove(d);

  var bbox = {
    plot: d3.select("g#plot").node().getBBox()
  }

  // restore tooltip display but keep it invisible
  tooltip.style("display", null);
  tooltip.style("visibility", "hidden");

  // now set tooltip text and attributes
  tooltip.text(d.name + " in " + d.city + ", " + d.state);

  tooltip.attr("text-anchor", "end");
  tooltip.attr("dx", -5);
  tooltip.attr("dy", -5);

  // calculate resulting bounding box of text
  bbox.text = tooltip.node().getBBox();

  // determine if need to show right of pointer
  if (bbox.text.x < bbox.plot.x) {
    tooltip.attr("text-anchor", "start");
    tooltip.attr("dx", 5);
  }

  // determine if need to show below pointer
  if (bbox.text.y < bbox.plot.y) {
    tooltip.attr("dy", bbox.text.height / 2);

    // also need to fix dx in this case
    // so it doesn't overlap the mouse pointer
    if (bbox.text.x < bbox.plot.x) {
      tooltip.attr("dx", 15);
    }
  }

  tooltip.style("visibility", "visible");
  d3.select(this).classed("selected", true);
}

function onMouseMove(d) {
  var coords = d3.mouse(d3.select("g#plot").node());

  d3.select("text#tooltip")
    .attr("x", coords[0])
    .attr("y", coords[1]);
}

function onMouseOut(d) {
  d3.select(this).classed("selected", false);
  d3.select("text#tooltip").style("visibility", "hidden");
}
