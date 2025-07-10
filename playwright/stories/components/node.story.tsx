import React from 'react';
import { WorkflowNode } from '../../../lib/components/node';
import { SocketPosition } from '../../../lib/types';

type WorkflowNodeProps = {};

export function WorkflowNodeForTest() {
  const canvasRect = { x: 0, y: 0, width: 100, height: 100, bottom: 0, left: 0, right: 0, top: 0, toJSON: () => {} };
  const canvasRef = React.useRef<HTMLDivElement>(null);
  const selectNode = (id: string, position: SocketPosition) => {
    return true;
  };
  return (
    <WorkflowNode
      nodeData={{ id: '1', position: { x: 0, y: 0 } }}
      setPosition={() => {}}
      canvasRect={canvasRect}
      scale={1}
      canvasRef={canvasRef as any}
      selectNode={selectNode}
      links={[]}
      setNodeRef={ref => {}}
    />
  );
}
