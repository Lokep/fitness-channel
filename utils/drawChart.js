export function drawChart(chart, position, color, type = "point") {
  chart
    .line({ sortable: false })
    .position(position)
    .color(color)
    .shape("smooth")
    .animate({
      update: {
        animation: "lineUpdate",
      },
    });

  console.log(type);

  if (type === "point") {
    chart.point().position(position).color(color).adjust("stack").size(2.5);
  } else {
    chart.interval().position(position).color(color).adjust("stack").size(25);
  }
}
