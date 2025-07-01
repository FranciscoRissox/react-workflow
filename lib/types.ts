export type NodeData = {
    id: string;
    position: { x: number; y: number };
    className?: string
    children?: React.ReactNode
    style?: React.CSSProperties
}