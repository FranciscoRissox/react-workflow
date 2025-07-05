import { useRef } from "react"
import { LinkNode, NodeData } from "../../types"
import {WorkflowNode}  from "../node"
import { useZoomPan } from "../../hooks/useZoom"
import styles from "./workflow.module.css"
import { ZoomPanel } from "./zoomPanel"
import { useNodeLink } from "../../hooks/useNodeLink"
import { filterLinks } from "../../utils"

interface WorkFlowProps {
    nodes: NodeData[]
    setNode: (idx: number, node: NodeData) => void
    height?: string
    width?: string
    links: LinkNode[]
    addLink: (link: LinkNode) => void
    backgroundColor?: 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'gray'
}



export const WorkFlow = ({nodes,links,addLink,setNode, height= "500px", width= "500px", backgroundColor= "blue"}: WorkFlowProps) => {
    const ref = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const boundRect = ref.current?.getBoundingClientRect();
    const {scale,origin,handleZoom,handleMouseDown,handleMouseMove,handleMouseUp} = useZoomPan()
    const {selectNode} = useNodeLink((link: LinkNode) => addLink(link))
    
    const handleWheel = (e: WheelEvent) => {
        handleZoom(e.clientX,e.clientY,e.deltaY)
    };

    const stopPropagation = (e: any,func: any) => {
        e.stopPropagation()
        func(e)
    }

    console.log(links)
    
    return (
        <div ref={containerRef} className={styles.workflowcontainer} style={{height: height, width: width,overflow: "hidden"}} onWheel={(e)=>stopPropagation(e,handleWheel)} onMouseDown={(e) => stopPropagation(e,()=>handleMouseDown(e.clientX,e.clientY))} onMouseMove={(e) => stopPropagation(e,()=>handleMouseMove(e.clientX,e.clientY))} onMouseUp={(e)=>stopPropagation(e,handleMouseUp)}>
            <div className={styles.workflowcontent+" "+styles.workflow+" "+styles[backgroundColor]} ref={ref} style={{height:"25000px",width:"25000px",transform: `translate(${origin.x}px, ${origin.y}px) scale(${scale})`}}>
                {nodes.map((node,idx) => {
                    console.log("nodeId:",node.id,"nodeLinks:",filterLinks(node.id,links))
                    return (
                        <WorkflowNode links={filterLinks(node.id,links)} selectNode={selectNode} canvasRef={ref as any} key={node.id} nodeData={node} setPosition={(pos) => setNode(idx, {...node, position: pos})} canvasRect={boundRect} scale={scale} />
                    )
                })}
            </div>
            <ZoomPanel handleZoomIn={()=>handleZoom(0,0,-1)} handleZoomOut={()=>handleZoom(0,0,1)} />
        </div>
    )
}   