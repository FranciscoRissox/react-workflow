import { useState } from "react"

const MAX=2
const MIN=0.1

export const useZoom = () => {
    const [scale,setScale] = useState(1)

    const handleZoomIn = () => {
        setScale(scale => Math.min(scale + 0.1,MAX))
    }

    const handleZoomOut = () => {
        setScale(scale => Math.max(scale - 0.1,MIN))
    }

    return {scale,handleZoomIn,handleZoomOut}
}
