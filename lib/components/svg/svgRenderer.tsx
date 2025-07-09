import styles from "./svgRenderer.module.css"
import { LinkNode } from "../../types"
import { getNodeById } from "../../utils";
import { getSocketPosition } from "../../utils";
import Link from "./link";
import { NodeData } from "../../types";

export const SvgRenderer = ({origin,scale, links,nodes}: {origin:{x:number,y:number},scale:number, links:LinkNode[],nodes:NodeData[]}) => {
    return (
        <svg className={styles.svgrenderer} width="25000"
        height="25000"
        style={{
        transform: `translate(${origin.x}px, ${origin.y}px) scale(${scale})`,
        transformOrigin: "top left",
        pointerEvents: "none",
        }}>
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

                    const lineStyle = startNode.enabledSockets?.[startSocket as keyof typeof startNode.enabledSockets]?.lineStyle
                    return (
                        <Link
                        key={idx}
                        coordinates={{x1:startPos.x,y1:startPos.y,x2:endPos.x,y2:endPos.y}}
                        style={lineStyle}
                        />
                    );
                    })}
        </svg>
    )
}