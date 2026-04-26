// Infinite-feel canvas that holds all nodes and their SVG connectors
import FlowNode from "./FlowNode";
import Connectors from "./Connectors";

export default function Canvas({ nodes, selectedId, onSelect, onDrag }) {
  return (
    <div
      className="relative flex-1 overflow-auto bg-[#0f1117]"
      style={{ backgroundImage: "radial-gradient(circle, #1e2030 1px, transparent 1px)", backgroundSize: "28px 28px" }}
      onClick={() => onSelect(null)}
    >
      {/* Fixed-size inner area matching canvas_size from flow data */}
      <div className="relative" style={{ width: 1400, height: 900 }}>
        <Connectors nodes={nodes} />
        {nodes.map((node) => (
          <FlowNode
            key={node.id}
            node={node}
            isSelected={selectedId === node.id}
            onSelect={onSelect}
            onDrag={onDrag}
          />
        ))}
      </div>
    </div>
  );
}
