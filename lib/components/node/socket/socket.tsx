import { useEffect, useState } from "react";
import styles from "./socket.module.css"
import { SocketPosition } from "../../../types";


export const Socket = ({selectNode,position,scale,connected}: {selectNode: (position:SocketPosition) => void;position: SocketPosition;scale: number;connected?: boolean}) => {
    const [isConnecting,setIsConnecting] = useState(false)

    useEffect(()=>{if(connected) setIsConnecting(false)},[connected])

    const positionX = ()=>{
        if(position === SocketPosition.UP || position === SocketPosition.DOWN)  return "50%"
        if(position === SocketPosition.LEFT) return "0%"
        if(position === SocketPosition.RIGHT) return "100%"
    }
    const positionY = ()=>{
        if(position === SocketPosition.UP) return "0%"
        if(position === SocketPosition.DOWN) return "100%"
        if(position === SocketPosition.LEFT || position === SocketPosition.RIGHT) return "50%"
    }

    const onClick = () => {
        if(!isConnecting && !connected){
            selectNode(position)
            setIsConnecting(true)
        }
    }

    return (
        <>
            <div className={`${styles.socket} ${isConnecting ? styles.connecting : ""} ${connected ? styles.connected : ""}`} onClick={!connected ? onClick : undefined} style={{position:"absolute",transformOrigin: "center",transform: `scale(${scale}) translate(-50%,-50%)`,top:positionY(),left:positionX()}}></div>
        </>
        
    )
}