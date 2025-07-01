import { useRef } from "react"
import { NodeData } from "../../types"
import {WorkflowNode}  from "../node"
import { useZoom } from "../../hooks/useZoom"
import styles from "./workflow.module.css"
import { ZoomPanel } from "./zoomPanel"

interface WorkFlowProps {
    nodes: NodeData[]
    setNode: (idx: number, node: NodeData) => void
    height?: string
    width?: string
    backgroundColor?: 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'gray'
}

export const WorkFlow = ({nodes,setNode, height= "500px", width= "500px", backgroundColor= "blue"}: WorkFlowProps) => {
    const ref = useRef<HTMLDivElement>(null)
    const backgroundRef = useRef<HTMLDivElement>(null)
    const boundRect = ref.current?.getBoundingClientRect();
    const {scale,handleZoomIn,handleZoomOut} = useZoom()

    const handleWheel = (e: WheelEvent) => {
        e.preventDefault()
        if (e.deltaY < 0) {
            handleZoomIn();
        } else {
            handleZoomOut();
        }
    };
    
    return (
        <div ref={ref} className={styles.workflowcontainer} style={{height: height, width: width,overflow: "hidden"}} onWheel={handleWheel as any}>
            <ZoomPanel handleZoomIn={handleZoomIn} handleZoomOut={handleZoomOut} />   
            <div ref={backgroundRef} className={styles.workflow + " " + styles[backgroundColor]} style={{transform: `scale(${scale})`, transformOrigin: "top left",height:`calc(${height} + ${backgroundRef.current?.offsetHeight}px)`, width:`calc(${width} + ${backgroundRef.current?.offsetWidth}px)`}} />
            {nodes.map((node,idx) => (
                <WorkflowNode key={node.id} nodeData={node} setPosition={(pos) => setNode(idx, {...node, position: pos})} canvasRect={boundRect} scale={scale} />
            ))}
        </div>
    )
}   