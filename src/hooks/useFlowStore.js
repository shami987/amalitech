// Manages all shared app state: nodes, selection, undo/redo history, and preview mode
import { useState, useCallback, useRef } from "react";
import flowData from "../data/flowData";

export function useFlowStore() {
  const [nodes, setNodes] = useState(flowData.nodes);
  const [selectedId, setSelectedId] = useState(null);
  const [isPreview, setIsPreview] = useState(false);

  // Undo/redo stacks hold snapshots of nodes array
  const undoStack = useRef([]);
  const redoStack = useRef([]);

  // Saves current nodes to undo stack before every mutation
  function snapshot(current) {
    undoStack.current.push(current);
    redoStack.current = [];
  }

  const updateNodeText = useCallback((id, text) => {
    setNodes((prev) => {
      snapshot(prev);
      return prev.map((n) => (n.id === id ? { ...n, text } : n));
    });
  }, []);

  const updateNodePosition = useCallback((id, position) => {
    setNodes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, position } : n))
    );
  }, []);

  // Saves position snapshot only on drag end, not every mousemove
  const snapshotPosition = useCallback((prevNodes) => {
    snapshot(prevNodes);
  }, []);

  const undo = useCallback(() => {
    if (!undoStack.current.length) return;
    setNodes((current) => {
      redoStack.current.push(current);
      return undoStack.current.pop();
    });
  }, []);

  const redo = useCallback(() => {
    if (!redoStack.current.length) return;
    setNodes((current) => {
      undoStack.current.push(current);
      return redoStack.current.pop();
    });
  }, []);

  const exportFlow = useCallback((currentNodes) => {
    const data = { ...flowData, nodes: currentNodes };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "flow_data.json";
    a.click();
    URL.revokeObjectURL(url);
  }, []);

  const selectedNode = nodes.find((n) => n.id === selectedId) ?? null;

  return {
    nodes,
    selectedId,
    selectedNode,
    isPreview,
    setSelectedId,
    setIsPreview,
    updateNodeText,
    updateNodePosition,
    snapshotPosition,
    undo,
    redo,
    exportFlow,
    canUndo: undoStack.current.length > 0,
    canRedo: redoStack.current.length > 0,
  };
}
