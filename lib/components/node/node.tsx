import React, { useRef, useEffect, useCallback } from 'react';
import styles from './node.module.css';
import { NodeData } from '../../types';
import { Socket } from './socket';

type WorkflowNodeProps = {
  nodeData: NodeData;
  setPosition: (pos: { x: number; y: number }) => void;
  canvasRect: DOMRect | undefined;
  scale: number;
  canvasRef: React.RefObject<HTMLDivElement>;
};

export const WorkflowNode: React.FC<WorkflowNodeProps> = ({ nodeData, setPosition, canvasRect, scale,canvasRef }) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({
    startX: 0,
    startY: 0,
    initialX: 0,
    initialY: 0,
  });

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    posRef.current.startX = e.clientX;
    posRef.current.startY = e.clientY;
    posRef.current.initialX = nodeData.position.x;
    posRef.current.initialY = nodeData.position.y;

    canvasRef.current?.addEventListener('mousemove', handleMouseMove);
    canvasRef.current?.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const dx = e.clientX - posRef.current.startX;
    const dy = e.clientY - posRef.current.startY;

    let newX = posRef.current.initialX + dx;
    let newY = posRef.current.initialY + dy;

    if (canvasRect && nodeRef.current) {
      const nodeRect = nodeRef.current.getBoundingClientRect();

      const leftLimit = 0;
      const topLimit = 0;
      const rightLimit = canvasRect.width - nodeRect.width;
      const bottomLimit = canvasRect.height - nodeRect.height;

      newX = Math.max(leftLimit, Math.min(newX, rightLimit));
      newY = Math.max(topLimit, Math.min(newY, bottomLimit));
    }

    setPosition({ x: newX, y: newY });
  },[canvasRect]);

  const handleMouseUp = () => {
    canvasRef.current?.removeEventListener('mousemove', handleMouseMove);
    canvasRef.current?.removeEventListener('mouseup', handleMouseUp);
  };

  useEffect(() => {
    // Limpieza por si acaso
    return () => {
      canvasRef.current?.removeEventListener('mousemove', handleMouseMove);
      canvasRef.current?.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);
  return (
    <div
      ref={nodeRef}
      className={`${styles.workflownode} ${nodeData.className ?? ''}`}
      style={{
        left: nodeData.position.x,
        top: nodeData.position.y,
        transform: `scale(${scale})`,
        transformOrigin: "top left",
        position: 'absolute',
        ...(nodeData.style ?? {}),
      }}
    >
      <div  className={styles.workflownodeheader} onMouseDown={handleMouseDown}>
        X
      </div>
      {
        nodeData.enabledSockets && Object.keys(nodeData.enabledSockets).map((key:string)=>{
            if(nodeData.enabledSockets![key as "up" | "down" | "left" | "right"]) return <Socket position={key as "up" | "down" | "left" | "right"} scale={scale}/>
        })
      }
      {nodeData.children}
    </div>
  );
};
