const Curve = ({ x1,y1,x2,y2 }: { x1: number; y1: number; x2: number; y2: number }) => {

  const controlX = (x1 + x2) / 2;
  const controlY = Math.min(y1, y2) - 50; 

  const pathData = `M ${x1} ${y1}, ${x2} ${y2}`;

  return (
   
      <path d={pathData} stroke="#fefefe" fill="none" strokeWidth="1" />

  );
};

export default Curve;