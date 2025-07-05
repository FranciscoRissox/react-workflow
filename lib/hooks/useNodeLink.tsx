import { useState } from "react"
import { LinkNode, LinkNodeData, SocketPosition } from "../types"

export const useNodeLink = (addLink: (link: LinkNode) => void) => {
    const [isConnecting,setIsConnecting] = useState(false)
    const [startNode,setStartNode] = useState<LinkNodeData|null>(null)

    const selectNode = (id:string,position:SocketPosition) => {
        if(isConnecting){
            //cant connect the same node
            if(startNode?.id===id){
                return false;
            }
            addLink({startNode:startNode!,endNode:{id,socket:position}})
            setStartNode(null)
            setIsConnecting(false)
            return true;
        }else{
            setStartNode({id,socket:position})
            setIsConnecting(true)
            return true;
        }
    }

    return {
        selectNode,
        isConnecting,
        startNode
    }
}
