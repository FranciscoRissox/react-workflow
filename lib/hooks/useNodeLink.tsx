import { useState } from "react"
import { LinkNode, LinkNodeData, SocketPosition } from "../types"

export const useNodeLink = (addLink: (link: LinkNode) => void) => {
    const [isConnecting,setIsConnecting] = useState(false)
    const [startNode,setStartNode] = useState<LinkNodeData|null>(null)

    const selectNode = (id:string,position:SocketPosition) => {
        if(isConnecting){
            addLink({startNode:startNode!,endNode:{id,socket:position}})
            setStartNode(null)
            setIsConnecting(false)
        }else{
            setStartNode({id,socket:position})
            setIsConnecting(true)
        }
    }

    return {
        selectNode,
        isConnecting,
        startNode
    }
}
