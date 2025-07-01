import { useState } from "react"
import { NodeData } from "../types"
import { v4 as uuid } from 'uuid'

interface UseWorkflowProps {
    initialNodes?: NodeData[]
}

export const useWorkflow = ({initialNodes}: UseWorkflowProps | undefined={}) => {
    const [nodes,setNodes] = useState<NodeData[]>(initialNodes || [])

    const setNode = (idx: number, newNode: NodeData) => {
        setNodes(nodes.map((node,i) => i === idx ? newNode : node))
    }

    const addNode = (node: Pick<NodeData, "position" | "children" | "className" | "style">) => {
        setNodes([...nodes,{id:uuid(), ...node}])
    }

    return {
        nodes,
        setNode,
        addNode
    }
}
