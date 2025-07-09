import { LineFigures, LineStyle } from '../../types';
import { v4 as uuidv4 } from 'uuid';
interface LinkProps {
  coordinates: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  };
  style?: LineStyle;
}

const Link = ({ coordinates, style }: LinkProps) => {
  const deltaX = Math.abs(coordinates.x2 - coordinates.x1) * 0.5;
  const deltaY = Math.abs(coordinates.y2 - coordinates.y1) * 0.5;

  const id = uuidv4();

  let pathData = '';

  if (Math.abs(coordinates.x2 - coordinates.x1) < 40) {
    const controlY1 = coordinates.y1 + deltaY;
    const controlY2 = coordinates.y2 - deltaY;

    pathData = `M ${coordinates.x1},${coordinates.y1}
      C ${coordinates.x1},${controlY1}
        ${coordinates.x2},${controlY2}
        ${coordinates.x2},${coordinates.y2}`;
  } else {
    pathData = `M ${coordinates.x1},${coordinates.y1}
      C ${coordinates.x1 + deltaX},${coordinates.y1}
        ${coordinates.x2 - deltaX},${coordinates.y2}
        ${coordinates.x2},${coordinates.y2}`;
  }

  const markerWidth = style?.strokeWidth ? style.strokeWidth * 10 : 30;

  return (
    <>
      <defs>
        <marker id={id + 'arrow'} markerWidth={markerWidth} markerHeight={markerWidth} refX="9" refY="3" orient="auto">
          <path d="M0,0 L0,6 L9,3 z" fill={style?.strokeColor || '#fefefe'} />
        </marker>
        <marker
          id={id + 'arrowReverse'}
          markerWidth={markerWidth}
          markerHeight={markerWidth}
          refX="0"
          refY="3"
          orient="auto"
        >
          <path d="M9,0 L9,6 L0,3 z" fill={style?.strokeColor || '#fefefe'} />
        </marker>
        <marker id={id + 'circle'} markerWidth={markerWidth} markerHeight={markerWidth} refX="9" refY="3" orient="auto">
          <circle cx="5" cy="5" r="5" fill={style?.strokeColor || '#fefefe'} />
        </marker>
      </defs>
      <path
        d={pathData}
        stroke={style?.strokeColor || '#fefefe'}
        fill="none"
        strokeWidth={style?.strokeWidth || '1'}
        strokeDasharray={style?.strokeStyle === 'dashed' ? '5 5' : undefined}
        markerEnd={
          style?.endFigure === LineFigures.ARROW
            ? 'url(#' + id + 'arrow)'
            : style?.endFigure === LineFigures.CIRCLE
              ? 'url(#' + id + 'circle)'
              : 'none'
        }
        markerStart={
          style?.startFigure === LineFigures.ARROW
            ? 'url(#' + id + 'arrowReverse)'
            : style?.startFigure === LineFigures.CIRCLE
              ? 'url(#' + id + 'circle)'
              : 'none'
        }
      />
    </>
  );
};

export default Link;
