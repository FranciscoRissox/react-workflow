import { LinkNode, LinkNodeData, SocketPosition } from "./types"

export const between = (value: number, min: number, max: number) => {
    return Math.max(min, Math.min(max, value))
}

export const filterLinks = (id:string, links:LinkNode[]):LinkNodeData[] => {
    const filteredLinks = links.filter(link=>link.startNode.id===id || link.endNode.id===id)
    return filteredLinks.map(link=>link.startNode.id===id ? link.startNode : link.endNode)
}

export const socketIsConnected = (socketPosition:SocketPosition,linkData:LinkNodeData[]):boolean => {
    return linkData.some(link=>link.socket===socketPosition)
}