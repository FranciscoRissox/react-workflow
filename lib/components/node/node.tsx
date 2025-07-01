import React, { useRef, useEffect } from 'react';
import styles from './node.module.css';
import { NodeData } from '../../types';

type WorkflowNodeProps = {
  nodeData: NodeData;
  setPosition: (pos: { x: number; y: number }) => void;
  canvasRect: DOMRect | undefined;
};

export const WorkflowNode: React.FC<WorkflowNodeProps> = ({ nodeData, setPosition, canvasRect }) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({
    startX: 0,
    startY: 0,
    initialX: 0,
    initialY: 0,
  });

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    posRef.current.startX = e.clientX;
    posRef.current.startY = e.clientY;
    posRef.current.initialX = nodeData.position.x;
    posRef.current.initialY = nodeData.position.y;

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    e.preventDefault();
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
  };

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  useEffect(() => {
    // Limpieza por si acaso
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);
  return (
    <div
      ref={nodeRef}
      className={`${styles.workflownode} ${nodeData.className ?? ''}`}
      style={{
        left: nodeData.position.x,
        top: nodeData.position.y,
        position: 'absolute',
        ...(nodeData.style ?? {}),
      }}
    >
      <div className={styles.workflownodeheader} onMouseDown={handleMouseDown}>
        X
      </div>
      {nodeData.children}
    </div>
  );
};
