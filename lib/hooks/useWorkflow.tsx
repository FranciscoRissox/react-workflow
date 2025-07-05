import { useState } from "react"
import { LinkNode, NodeData } from "../types"
import { v4 as uuid } from 'uuid'

interface UseWorkflowProps {
    initialNodes?: NodeData[]
}

export const useWorkflow = ({initialNodes}: UseWorkflowProps | undefined={}) => {
    const [nodes,setNodes] = useState<NodeData[]>(initialNodes || [])
    const [links,setLinks] = useState<LinkNode[]>([])

    const setNode = (idx: number, newNode: NodeData) => {
        setNodes(nodes.map((node,i) => i === idx ? newNode : node))
    }

    const addNode = (node: Pick<NodeData, "position" | "children" | "className" | "style"|"enabledSockets">) => {
        setNodes([...nodes,{id:uuid(), ...node}])
    }

    const addLink = (link: LinkNode) => {
        setLinks([...links,link])
    }

    return {
        nodes,
        setNode,
        addNode,
        links,
        addLink
    }
}
