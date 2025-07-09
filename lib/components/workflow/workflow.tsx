import { useRef } from "react"
import { LinkNode, NodeData } from "../../types"
import {WorkflowNode}  from "../node"
import { useZoomPan } from "../../hooks/useZoom"
import styles from "./workflow.module.css"
import { ZoomPanel } from "./zoomPanel"
import { useNodeLink } from "../../hooks/useNodeLink"
import { filterLinks, getNodeById,getSocketPosition } from "../../utils"
import Curve from "../curve"
import { useWorkflow } from "../../hooks"
import { SvgRenderer } from "../svg"

interface WorkFlowProps extends ReturnType<typeof useWorkflow> {
    height?: string
    width?: string
    backgroundColor?: 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'gray'
}



export const WorkFlow = ({ state:{nodes,links}, actions:{addLink,setNode,setNodeRef}, height = "500px", width = "500px", backgroundColor = "blue" }: WorkFlowProps) => {
    const ref = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const boundRect = ref.current?.getBoundingClientRect();
    const {
      scale, origin, handleZoom,
      handleMouseDown, handleMouseMove, handleMouseUp,
      handleTouchStart, handleTouchMove, handleTouchEnd,
      handlePinchMove, handlePinchEnd, handlePinchStart
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

      if (e.touches.length === 2) {
        // pinch start
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const distance = Math.hypot(
          touch2.clientX - touch1.clientX,
          touch2.clientY - touch1.clientY
        );
        handlePinchStart(distance);
      } else if (e.touches.length === 1) {
        const touch = e.touches[0];
        handleTouchStart(touch.clientX, touch.clientY);
      }
    };
  
    const onTouchMove = (e: React.TouchEvent) => {
      e.stopPropagation();

      if (e.touches.length === 2) {
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const distance = Math.hypot(
          touch2.clientX - touch1.clientX,
          touch2.clientY - touch1.clientY
        );
        handlePinchMove(distance);
      } else if (e.touches.length === 1) {
        const touch = e.touches[0];
        handleTouchMove(touch.clientX, touch.clientY);
      }
    };
  
    const onTouchEnd = (e: React.TouchEvent) => {
      e.stopPropagation();
        if (e.touches.length < 2) {
    handlePinchEnd();
  }

  if (e.touches.length === 0) {
    handleTouchEnd();
  }
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
        <SvgRenderer origin={origin} scale={scale} links={links} nodes={nodes} />
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