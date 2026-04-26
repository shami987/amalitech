// Manages all shared app state: nodes, selected node, edit mode, and preview mode
import { useState, useCallback } from "react";
import flowData from "../data/flowData";

export function useFlowStore() {
  const [nodes, setNodes] = useState(flowData.nodes);
  const [selectedId, setSelectedId] = useState(null);
  const [isPreview, setIsPreview] = useState(false);

  const updateNodeText = useCallback((id, text) => {
    setNodes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, text } : n))
    );
  }, []);

  const updateNodePosition = useCallback((id, position) => {
    setNodes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, position } : n))
    );
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
  };
}
