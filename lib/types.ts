export enum LineFigures {
  ARROW = 'arrow',
  CIRCLE = 'circle',
  NONE = 'none',
}

export type LineStyle = {
  strokeWidth?: number;
  strokeColor?: string;
  strokeStyle?: string;
  endFigure?: LineFigures;
  startFigure?: LineFigures;
};

export type SocketConfig = {
  lineStyle?: LineStyle;
  clickable?: boolean;
};

export type NodeData = {
  id: string;
  position: { x: number; y: number };
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  nodeRef?: React.RefObject<HTMLDivElement>;
  socketRef?: {
    UP: React.RefObject<HTMLDivElement> | null;
    DOWN: React.RefObject<HTMLDivElement> | null;
    LEFT: React.RefObject<HTMLDivElement> | null;
    RIGHT: React.RefObject<HTMLDivElement> | null;
  };
  enabledSockets?: {
    UP?: SocketConfig;
    DOWN?: SocketConfig;
    LEFT?: SocketConfig;
    RIGHT?: SocketConfig;
  };
};

export type LinkNode = {
  startNode: LinkNodeData;
  endNode: LinkNodeData;
};

export type LinkNodeData = {
  id: string;
  socket: SocketPosition;
};

export enum SocketPosition {
  UP = 'UP',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}
