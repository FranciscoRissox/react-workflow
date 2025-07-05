export type NodeData = {
    id: string;
    position: { x: number; y: number };
    className?: string
    children?: React.ReactNode
    style?: React.CSSProperties
    enabledSockets?:{
        up?:boolean,
        down?:boolean,
        left?:boolean,
        right?:boolean
    }
}