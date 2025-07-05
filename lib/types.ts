export type NodeData = {
    id: string;
    position: { x: number; y: number };
    className?: string
    children?: React.ReactNode
    style?: React.CSSProperties
    nodeRef?:React.RefObject<HTMLDivElement>
    socketRef?:{
        UP:React.RefObject<HTMLDivElement>|null,
        DOWN:React.RefObject<HTMLDivElement>|null,
        LEFT:React.RefObject<HTMLDivElement>|null,
        RIGHT:React.RefObject<HTMLDivElement>|null
    }
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