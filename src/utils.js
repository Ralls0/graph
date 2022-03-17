function getConnectorPoints(from, to) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  let angle = Math.atan2(-dy, dx);

  const radius = 50;

  return [
    from.x + -radius * Math.cos(angle + Math.PI),
    from.y + radius * Math.sin(angle + Math.PI),
    to.x + -radius * Math.cos(angle),
    to.y + radius * Math.sin(angle),
  ];
}

function getConnectorPointsTo(from, x, y) {
  console.log("[i] X: ", x, " Y: ", y, " from: ", from);
  const dx = x - from.x;
  const dy = y - from.y;
  let angle = Math.atan2(-dy, dx);

  const radius = 50;

  return [
    from.x + -radius * Math.cos(angle + Math.PI),
    from.y + radius * Math.sin(angle + Math.PI),
    x + -radius * Math.cos(angle),
    y + radius * Math.sin(angle),
  ];
}

function getConnectorPointsFrom(x, y, to) {
  console.log("[i] X: ", x, " Y: ", y, " to: ", to);
  const dx = to.x - x;
  const dy = to.y - y;
  let angle = Math.atan2(-dy, dx);

  const radius = 50;

  return [
    x + -radius * Math.cos(angle + Math.PI),
    y + radius * Math.sin(angle + Math.PI),
    to.x + -radius * Math.cos(angle),
    to.y + radius * Math.sin(angle),
  ];
}

export { getConnectorPoints, getConnectorPointsTo, getConnectorPointsFrom };
