const Curve = ({ x1,y1,x2,y2 }: { x1: number; y1: number; x2: number; y2: number }) => {
  const deltaX = Math.abs(x2 - x1) * 0.5;
  const deltaY = Math.abs(y2 - y1) * 0.5;

  let pathData = '';

  if (Math.abs(x2 - x1) < 40) {
    const controlY1 = y1 + deltaY;
    const controlY2 = y2 - deltaY;

    pathData = `M ${x1},${y1}
      C ${x1},${controlY1}
        ${x2},${controlY2}
        ${x2},${y2}`;
  } else {
    pathData = `M ${x1},${y1}
      C ${x1 + deltaX},${y1}
        ${x2 - deltaX},${y2}
        ${x2},${y2}`;
  }

  return (
    <path
      d={pathData}
      stroke="#fefefe"
      fill="none"
      strokeWidth="1"
    />
  );
};

export default Curve;