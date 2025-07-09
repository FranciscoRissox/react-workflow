import { LinkNode, LinkNodeData, NodeData, SocketPosition } from './types';

export const between = (value: number, min: number, max: number) => {
  return Math.max(min, Math.min(max, value));
};

export const filterLinks = (id: string, links: LinkNode[]): LinkNodeData[] => {
  const filteredLinks = links.filter(link => link.startNode.id === id || link.endNode.id === id);
  return filteredLinks.map(link => (link.startNode.id === id ? link.startNode : link.endNode));
};

export const socketIsConnected = (socketPosition: SocketPosition, linkData: LinkNodeData[]): boolean => {
  return linkData.some(link => link.socket === socketPosition);
};

export const getNodeById = (id: string, nodes: NodeData[]): NodeData => {
  return nodes.find(node => node.id === id)!;
};

export const getSocketPosition = (
  socketPosition: SocketPosition,
  nodePosition: { x: number; y: number },
  nodeRect: DOMRect,
  scale: number
): { x: number; y: number } => {
  switch (socketPosition) {
    case SocketPosition.UP:
      return { x: nodePosition.x + nodeRect.width / (scale * 2), y: nodePosition.y };
    case SocketPosition.DOWN:
      return { x: nodePosition.x + nodeRect.width / (scale * 2), y: nodePosition.y + nodeRect.height / scale };
    case SocketPosition.LEFT:
      return { x: nodePosition.x, y: nodePosition.y + nodeRect.height / (scale * 2) };
    case SocketPosition.RIGHT:
      return { x: nodePosition.x + nodeRect.width / scale, y: nodePosition.y + nodeRect.height / (scale * 2) };
  }
};
