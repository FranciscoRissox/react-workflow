import { useEffect } from "react";
import {useWorkflow,WorkFlow} from "../lib/main"

const randomHexColor = () => {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

function App() {
    const {nodes,setNode,addNode} = useWorkflow()
  useEffect(() => {
    addNode({position:{x:5000,y:5000},style:{backgroundColor:randomHexColor()}})
  },[])
  return (
    <div style={{}}>
      <button style={{zIndex:200}} onClick={() => {addNode({position:{x:0,y:0},style:{backgroundColor:randomHexColor()}})}}>Add node</button>
      <WorkFlow nodes={nodes} setNode={setNode} backgroundColor="gray" width="1000px" height="800px"/>
    </div>
  )
}

export default App
