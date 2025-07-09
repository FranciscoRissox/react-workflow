import { useRef, useState } from 'react';

const MAX = 1.2;
const MIN = 0.8;

export const useZoomPan = () => {
  const [origin, setOrigin] = useState({ x: -2500, y: -2500 });
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [lastX, setLastX] = useState<number | null>(null);
  const [lastY, setLastY] = useState<number | null>(null);

  const initialPinchDistance = useRef<number | null>(null);
  const lastScale = useRef<number>(scale);

  const handleZoom = (mouseX: number, mouseY: number, delta: number) => {
    const scaleAmount = 0.1;

    const oldScale = scale;
    if (delta < 0) {
      setScale(scale => Math.min(scale + scaleAmount, MAX));
    } else {
      setScale(scale => Math.max(scale - scaleAmount, MIN));
    }

    setOrigin(origin => ({
      x: origin.x - (mouseX - origin.x) * (scale / oldScale - 1),
      y: origin.y - (mouseY - origin.y) * (scale / oldScale - 1),
    }));
  };

  const handleMouseDown = (clientX: number, clientY: number) => {
    setIsDragging(true);
    setLastX(clientX);
    setLastY(clientY);
  };

  const handleMouseMove = (clientX: number, clientY: number) => {
    if (isDragging) {
      if (lastX !== null && lastY !== null) {
        setOrigin(origin => {
          const newX = Math.max(-5000, Math.min(-100, origin.x + (clientX - lastX)));
          const newY = Math.max(-5000, Math.min(-100, origin.y + (clientY - lastY)));
          return { x: newX, y: newY };
        });
      }
      setLastX(clientX);
      setLastY(clientY);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setLastX(null);
    setLastY(null);
  };

  // Touch handlers
  const handleTouchStart = (touchX: number, touchY: number) => {
    setIsDragging(true);
    setLastX(touchX);
    setLastY(touchY);
  };

  const handleTouchMove = (touchX: number, touchY: number) => {
    if (isDragging) {
      if (lastX !== null && lastY !== null) {
        setOrigin(origin => {
          const newX = Math.max(-5000, Math.min(-100, origin.x + (touchX - lastX)));
          const newY = Math.max(-5000, Math.min(-100, origin.y + (touchY - lastY)));
          return { x: newX, y: newY };
        });
      }
      setLastX(touchX);
      setLastY(touchY);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setLastX(null);
    setLastY(null);
  };

  const handlePinchStart = (distance: number) => {
    initialPinchDistance.current = distance;
    lastScale.current = scale;
  };

  const handlePinchMove = (distance: number) => {
    if (initialPinchDistance.current) {
      const scaleChange = distance / initialPinchDistance.current;
      let newScale = lastScale.current * scaleChange;

      newScale = Math.max(MIN, Math.min(MAX, newScale));
      setScale(newScale);
    }
  };

  const handlePinchEnd = () => {
    initialPinchDistance.current = null;
  };

  return {
    scale,
    origin,
    handleZoom,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handlePinchMove,
    handlePinchEnd,
    handlePinchStart,
  };
};
