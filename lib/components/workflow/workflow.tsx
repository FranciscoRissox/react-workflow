import { useRef } from "react"
import { NodeData } from "../../types"
import {WorkflowNode}  from "../node"
import styles from "./workflow.module.css"


interface WorkFlowProps {
    nodes: NodeData[]
    setNode: (idx: number, node: NodeData) => void
    height?: string
    width?: string
    backgroundColor?: 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'gray'
}

export const WorkFlow = ({nodes,setNode, height= "500px", width= "500px", backgroundColor= "blue"}: WorkFlowProps) => {
    const ref = useRef<HTMLDivElement>(null)
    const boundRect = ref.current?.getBoundingClientRect();
  
    return (
        <div ref={ref} className={styles.workflow + " " + styles[backgroundColor]} style={{height: height, width: width}}>
            {nodes.map((node,idx) => (
                <WorkflowNode key={node.id} nodeData={node} setPosition={(pos) => setNode(idx, {...node, position: pos})} canvasRect={boundRect} />
            ))}
        </div>
    )
}   