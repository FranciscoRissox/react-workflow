
import './style.css'
import { useWorkflow, WorkFlow } from "@franciscorissox/react-workflow";

const baseNode: any = {
  position:{
    x:500,y:500
  },
  style:{
    height:50,
    width:200,
    border:'1px solid black',
    borderRadius:'6px'
  },
  enabledSockets:{
    LEFT:{lineStyle:{strokeWidth:1,strokeColor:'gray'}},
    RIGHT:{lineStyle:{strokeWidth:1,strokeColor:'gray'}},
  }
}

const startNode = {
  ...baseNode, children: 'Start'
}

const endNode = {
  ...baseNode, children: 'End'
}

const apiNode = {
  ...baseNode, children: 'Api Call'
}

const functionNode = {
  ...baseNode, children: 'Function'
}

function App() {

  const workflow = useWorkflow();
  
  return (
    <div className="w-full h-screen bg-gray-200 flex">
      <div className='h-screen bg-gray-500 w-1/4 flex flex-col'>
        <AddNode onAddNode={() => workflow.actions.addNode(startNode)} text="Add Start"/>
        <AddNode onAddNode={() => workflow.actions.addNode(endNode)} text="Add End"/>
        <AddNode onAddNode={() => workflow.actions.addNode(apiNode)} text="Add Api call"/>
        <AddNode onAddNode={() => workflow.actions.addNode(functionNode)} text="Add Function"/>
      </div>
      <div className='w-3/4'>
        <WorkFlow {...workflow} width='800px' height='800px'/>
      </div>
    </div>
  )
}

const AddNode = ({onAddNode,text}: {onAddNode: (node: any) => void, text: string}) => {
  return (
    <button className='bg-blue-500 text-white p-2 rounded mt-2 mx-2' onClick={() => onAddNode({type: 'node', data: {label: text}})}>{text}</button>
  )
}

export default App
