import './style.css';
import { useWorkflow, WorkFlow } from '@franciscorissox/react-workflow';

const baseNode: any = {
  position: {
    x: 500,
    y: 500,
  },
  style: {
    height: 50,
    width: 200,
    border: '1px solid black',
    borderRadius: '6px',
  },
  enabledSockets: {
    LEFT: { lineStyle: { strokeWidth: 2, strokeColor: 'green' } },
    RIGHT: { lineStyle: { strokeWidth: 2, strokeColor: 'green' } },
  },
};

const startNode = {
  ...baseNode,
  children: 'Start',
};

const endNode = {
  ...baseNode,
  children: 'End',
};

const apiNode = {
  ...baseNode,
  children: 'Api Call',
};

const functionNode = {
  ...baseNode,
  children: 'Function',
};

function App() {
  const workflow = useWorkflow();

  return (
    <div className="w-full h-screen bg-gray-200 flex">
      <div className="h-screen bg-blue-500 w-30 flex flex-col">
        <div className="w-full bg-gray-200">
          <h1 className="text-center text-blue-950 font-bold text-xl">React Workflow</h1>
        </div>
        <div className="flex flex-col h-[100%]">
          <AddNode onAddNode={() => workflow.actions.addNode(startNode)} text="Add Start" />
          <AddNode onAddNode={() => workflow.actions.addNode(endNode)} text="Add End" />
          <AddNode onAddNode={() => workflow.actions.addNode(apiNode)} text="Add Api call" />
          <AddNode onAddNode={() => workflow.actions.addNode(functionNode)} text="Add Function" />
        </div>

        <GitHubButton />
      </div>
      <div className="w-[100%]">
        <WorkFlow {...workflow} width="100%" height="100%" />
      </div>
    </div>
  );
}

const AddNode = ({ onAddNode, text }: { onAddNode: (node: any) => void; text: string }) => {
  return (
    <button
      className="bg-blue-200 border-blue-300 text-white p-2 rounded mt-2 mx-2"
      onClick={() => onAddNode({ type: 'node', data: { label: text } })}
    >
      <div className="flex flex-row items-center justify-center text-blue-950">{text}</div>
    </button>
  );
};

const GitHubButton = () => {
  return (
    <button className=" mt-5 w-full h-10 bg-blue-300 flex flex-row items-center justify-center font-semibold text-xs">
      <a href="https://github.com/FranciscoRissox/react-workflow" target="_blank" rel="noreferrer">
        <img
          src="https://icongr.am/simple/github.svg?size=24&color=currentColor"
          alt="github"
          className="inline-block mr-1"
        />
        <div className="inline-block text-blue-950">Visit GitHub</div>
      </a>
    </button>
  );
};
export default App;
