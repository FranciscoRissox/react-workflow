import {useWorkflow,WorkFlow} from "../lib/main"

const randomHexColor = () => {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

function App() {
    const {nodes,setNode,addNode} = useWorkflow()

  return (
    <div style={{width:"100vw",height:"100vh"}}>
    <button onClick={() => {addNode({position:{x:0,y:0},style:{backgroundColor:randomHexColor()}})}}>Add node</button>
    
      <WorkFlow nodes={nodes} setNode={setNode} backgroundColor="gray" width="100%" height="100%" />
   
    </div>
  )
}

export default App
