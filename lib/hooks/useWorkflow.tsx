import { useState } from 'react';
import { LinkNode, NodeData } from '../types';
import { v4 as uuid } from 'uuid';

interface UseWorkflowProps {
  initialNodes?: NodeData[];
  initialLinks?: LinkNode[];
}

export const useWorkflow = ({ initialNodes, initialLinks }: UseWorkflowProps | undefined = {}) => {
  const [nodes, setNodes] = useState<NodeData[]>(initialNodes || []);
  const [links, setLinks] = useState<LinkNode[]>(initialLinks || []);

  const setNode = (idx: number, newNode: NodeData) => {
    setNodes(nodes.map((node, i) => (i === idx ? newNode : node)));
  };

  const addNode = (node: Pick<NodeData, 'position' | 'children' | 'className' | 'style' | 'enabledSockets'>) => {
    setNodes([...nodes, { id: uuid(), ...node }]);
  };

  const addLink = (link: LinkNode) => {
    setLinks([...links, link]);
  };

  const setNodeRef = (id: string, nodeRef: React.RefObject<HTMLDivElement>) => {
    setNodes(nodes.map(node => (node.id === id ? { ...node, nodeRef: nodeRef } : node)));
  };

  return {
    state: {
      nodes,
      links,
    },
    actions: {
      setNode,
      addNode,
      addLink,
      setNodeRef,
    },
  };
};
