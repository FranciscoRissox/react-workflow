import React, { useRef, useEffect, useCallback } from 'react';
import styles from './node.module.css';
import { LinkNodeData, NodeData } from '../../types';
import { Socket } from './socket';
import { SocketPosition } from '../../types';
import { socketIsConnected } from '../../utils';

type WorkflowNodeProps = {
  nodeData: NodeData;
  setPosition: (pos: { x: number; y: number }) => void;
  canvasRect: DOMRect | undefined;
  scale: number;
  canvasRef: React.RefObject<HTMLDivElement>;
  selectNode: (id: string, position: SocketPosition) => boolean;
  links: LinkNodeData[];
  setNodeRef: (id: string, nodeRef: React.RefObject<HTMLDivElement>) => void;
};

const OFFSET = 2500;

export const WorkflowNode: React.FC<WorkflowNodeProps> = ({
  nodeData,
  setPosition,
  canvasRect,
  scale,
  canvasRef,
  selectNode,
  links,
  setNodeRef,
}) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({
    startX: 0,
    startY: 0,
    initialX: 0,
    initialY: 0,
  });

  useEffect(() => {
    if (nodeRef.current) {
      setNodeRef(nodeData.id, nodeRef as any);
    }
  }, [nodeData.id, nodeRef.current]);

  // Mouse handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    posRef.current.startX = e.clientX;
    posRef.current.startY = e.clientY;
    posRef.current.initialX = nodeData.position.x;
    posRef.current.initialY = nodeData.position.y;

    canvasRef.current?.addEventListener('mousemove', handleMouseMove);
    canvasRef.current?.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      const dx = e.clientX - posRef.current.startX;
      const dy = e.clientY - posRef.current.startY;

      updatePosition(dx, dy);
    },
    [canvasRect]
  );

  const handleMouseUp = () => {
    canvasRef.current?.removeEventListener('mousemove', handleMouseMove);
    canvasRef.current?.removeEventListener('mouseup', handleMouseUp);
  };

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation();
    const touch = e.touches[0];
    posRef.current.startX = touch.clientX;
    posRef.current.startY = touch.clientY;
    posRef.current.initialX = nodeData.position.x;
    posRef.current.initialY = nodeData.position.y;

    canvasRef.current?.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvasRef.current?.addEventListener('touchend', handleTouchEnd);
  };

  const handleTouchMove = (e: TouchEvent) => {
    e.stopPropagation();
    const touch = e.touches[0];
    const dx = touch.clientX - posRef.current.startX;
    const dy = touch.clientY - posRef.current.startY;

    updatePosition(dx, dy);
  };

  const handleTouchEnd = () => {
    canvasRef.current?.removeEventListener('touchmove', handleTouchMove);
    canvasRef.current?.removeEventListener('touchend', handleTouchEnd);
  };

  // Common position update logic
  const updatePosition = (dx: number, dy: number) => {
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

  // Cleanup
  useEffect(() => {
    return () => {
      canvasRef.current?.removeEventListener('mousemove', handleMouseMove);
      canvasRef.current?.removeEventListener('mouseup', handleMouseUp);
      canvasRef.current?.removeEventListener('touchmove', handleTouchMove);
      canvasRef.current?.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <div
      data-testid="workflow-node"
      ref={nodeRef}
      className={`${styles.workflownode} ${nodeData.className ?? ''}`}
      style={{
        left: nodeData.position.x + OFFSET,
        top: nodeData.position.y + OFFSET,
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        position: 'absolute',
        ...(nodeData.style ?? {}),
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      {nodeData.enabledSockets &&
        Object.keys(nodeData.enabledSockets).map((key: string) => {
          const socketPosition = SocketPosition[key as keyof typeof SocketPosition];
          return (
            <Socket
              key={key}
              connected={socketIsConnected(socketPosition, links)}
              selectNode={(position: SocketPosition) => selectNode(nodeData.id, position)}
              position={socketPosition}
              scale={scale}
            />
          );
        })}
      {nodeData.children}
    </div>
  );
};
