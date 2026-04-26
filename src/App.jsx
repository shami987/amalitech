// Root layout: switches between editor view (canvas + panel) and preview mode
import { useState, useEffect } from "react";
import Toolbar from "./components/Toolbar";
import Canvas from "./components/Canvas";
import EditPanel from "./components/EditPanel";
import PreviewMode from "./components/PreviewMode";
import { useFlowStore } from "./hooks/useFlowStore";

export default function App() {
  const {
    nodes, selectedId, selectedNode, isPreview,
    setSelectedId, setIsPreview,
    updateNodeText, updateNodePosition, snapshotPosition,
    undo, redo, exportFlow, canUndo, canRedo,
  } = useFlowStore();

  const [activeId, setActiveId] = useState(null);

  // Keyboard shortcuts for undo/redo
  useEffect(() => {
    function onKey(e) {
      if (e.ctrlKey && e.key === "z") { e.preventDefault(); undo(); }
      if (e.ctrlKey && e.key === "y") { e.preventDefault(); redo(); }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [undo, redo]);

  // Clear active highlight when leaving preview
  function handleExitPreview() {
    setIsPreview(false);
    setActiveId(null);
  }

  return (
    <div className="flex flex-col h-screen">
      <Toolbar
        isPreview={isPreview}
        onTogglePreview={() => setIsPreview((v) => !v)}
        onUndo={undo}
        onRedo={redo}
        onExport={() => exportFlow(nodes)}
        canUndo={canUndo}
        canRedo={canRedo}
      />

      {isPreview ? (
        <PreviewMode nodes={nodes} onExit={handleExitPreview} onActiveNode={setActiveId} />
      ) : (
        <div className="flex flex-1 overflow-hidden">
          <Canvas
            nodes={nodes}
            selectedId={selectedId}
            activeId={activeId}
            onSelect={setSelectedId}
            onDrag={updateNodePosition}
            onDragEnd={() => snapshotPosition(nodes)}
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
