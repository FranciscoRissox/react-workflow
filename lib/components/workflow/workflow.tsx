import { useRef } from "react"
import { LinkNode, NodeData } from "../../types"
import {WorkflowNode}  from "../node"
import { useZoomPan } from "../../hooks/useZoom"
import styles from "./workflow.module.css"
import { ZoomPanel } from "./zoomPanel"
import { useNodeLink } from "../../hooks/useNodeLink"
import { filterLinks, getNodeById,getSocketPosition } from "../../utils"
import Curve from "../curve"

interface WorkFlowProps {
    nodes: NodeData[]
    setNode: (idx: number, node: NodeData) => void
    height?: string
    width?: string
    links: LinkNode[]
    addLink: (link: LinkNode) => void
    backgroundColor?: 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'gray'
    setNodeRef: (id:string,nodeRef:React.RefObject<HTMLDivElement>) => void
}



export const WorkFlow = ({ nodes, links, addLink, setNode, setNodeRef, height = "500px", width = "500px", backgroundColor = "blue" }: WorkFlowProps) => {
    const ref = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const boundRect = ref.current?.getBoundingClientRect();
    const {
      scale, origin, handleZoom,
      handleMouseDown, handleMouseMove, handleMouseUp,
      handleTouchStart, handleTouchMove, handleTouchEnd
    } = useZoomPan()
    const { selectNode } = useNodeLink((link: LinkNode) => addLink(link))
  
    const handleWheel = (e: WheelEvent) => {
      handleZoom(e.clientX, e.clientY, e.deltaY)
    };
  
    const stopPropagation = (e: any, func: any) => {
      e.stopPropagation()
      func(e)
    }
  
    // Touch event wrappers
    const onTouchStart = (e: React.TouchEvent) => {
      e.stopPropagation();
      const touch = e.touches[0];
      handleTouchStart(touch.clientX, touch.clientY);
    };
  
    const onTouchMove = (e: React.TouchEvent) => {
      e.stopPropagation();
      const touch = e.touches[0];
      handleTouchMove(touch.clientX, touch.clientY);
    };
  
    const onTouchEnd = (e: React.TouchEvent) => {
      e.stopPropagation();
      handleTouchEnd();
    };
  
    return (
      <div
        ref={containerRef}
        className={styles.workflowcontainer}
        style={{ height: height, width: width, overflow: "hidden" }}
        onWheel={(e) => stopPropagation(e, handleWheel)}
        onMouseDown={(e) => stopPropagation(e, () => handleMouseDown(e.clientX, e.clientY))}
        onMouseMove={(e) => stopPropagation(e, () => handleMouseMove(e.clientX, e.clientY))}
        onMouseUp={(e) => stopPropagation(e, handleMouseUp)}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <svg
                    className={styles.svgcontent}
                    width="25000"
                    height="25000"
                    style={{
                    transform: `translate(${origin.x}px, ${origin.y}px) scale(${scale})`,
                    transformOrigin: "top left",
                    pointerEvents: "none",
                    }}
                >
                    {links.map((link, idx) => {
                    const startNode = getNodeById(link.startNode.id, nodes);
                    const endNode = getNodeById(link.endNode.id, nodes);

                    const startSocket = link.startNode.socket
                    const endSocket = link.endNode.socket
                    
                    if(!startNode.nodeRef || !endNode.nodeRef){
                        return null
                    }
                    const startPos = getSocketPosition(startSocket,startNode?.position,startNode?.nodeRef.current!.getBoundingClientRect()!,scale)
                    const endPos = getSocketPosition(endSocket,endNode?.position,endNode?.nodeRef.current!.getBoundingClientRect()!,scale)

                    return (
                        <Curve
                        key={idx}
                        x1={startPos.x}
                        y1={startPos.y}
                        x2={endPos.x}
                        y2={endPos.y}
                        />
                    );
                    })}
            </svg>
            <div className={styles.workflowcontent+" "+styles.workflow+" "+styles[backgroundColor]} ref={ref} style={{height:"25000px",width:"25000px",transform: `translate(${origin.x}px, ${origin.y}px) scale(${scale})`}}>
                {nodes.map((node,idx) => {
                    return (
                        <WorkflowNode setNodeRef={setNodeRef} links={filterLinks(node.id,links)} selectNode={selectNode} canvasRef={ref as any} key={node.id} nodeData={node} setPosition={(pos) => setNode(idx, {...node, position: pos})} canvasRect={boundRect} scale={scale} />
                    )
                })}
                
                
            </div>
       
            
            <ZoomPanel handleZoomIn={()=>handleZoom(0,0,-1)} handleZoomOut={()=>handleZoom(0,0,1)} />
        </div>
    )
}   