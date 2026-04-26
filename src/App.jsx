// Root layout: switches between editor view (canvas + panel) and preview mode
import Toolbar from "./components/Toolbar";
import Canvas from "./components/Canvas";
import EditPanel from "./components/EditPanel";
import PreviewMode from "./components/PreviewMode";
import { useFlowStore } from "./hooks/useFlowStore";

export default function App() {
  const {
    nodes,
    selectedId,
    selectedNode,
    isPreview,
    setSelectedId,
    setIsPreview,
    updateNodeText,
    updateNodePosition,
  } = useFlowStore();

  return (
    <div className="flex flex-col h-screen">
      <Toolbar isPreview={isPreview} onTogglePreview={() => setIsPreview((v) => !v)} />

      {isPreview ? (
        <PreviewMode nodes={nodes} onExit={() => setIsPreview(false)} />
      ) : (
        <div className="flex flex-1 overflow-hidden">
          <Canvas
            nodes={nodes}
            selectedId={selectedId}
            onSelect={setSelectedId}
            onDrag={updateNodePosition}
          />
          <EditPanel
            node={selectedNode}
            onUpdate={updateNodeText}
            onClose={() => setSelectedId(null)}
          />
        </div>
      )}
    </div>
  );
}
