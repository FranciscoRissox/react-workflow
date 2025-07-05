import styles from "./socket.module.css"


export const Socket = ({position,scale}: {position: "up" | "down" | "left" | "right";scale: number}) => {


    const positionX = ()=>{
        if(position === "up" || position === "down")  return "50%"
        if(position === "left") return "0%"
        if(position === "right") return "100%"
    }
    const positionY = ()=>{
        if(position === "up") return "0%"
        if(position === "down") return "100%"
        if(position === "left" || position === "right") return "50%"
    }

    return (
        <div className={styles.socket} style={{position:"absolute",transformOrigin: "center",transform: `scale(${scale}) translate(-50%,-50%)`,top:positionY(),left:positionX()}}></div>
    )
}