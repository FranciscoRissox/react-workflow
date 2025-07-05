export type NodeData = {
    id: string;
    position: { x: number; y: number };
    className?: string
    children?: React.ReactNode
    style?: React.CSSProperties
    enabledSockets?:{
        UP?:boolean,
        DOWN?:boolean,
        LEFT?:boolean,
        RIGHT?:boolean
    }
}

export type LinkNode = {
    startNode: LinkNodeData;
    endNode: LinkNodeData;
}

export type LinkNodeData = {
    id: string;
    socket:SocketPosition;
}

export enum SocketPosition {
    UP,
    DOWN,
    LEFT,
    RIGHT
}