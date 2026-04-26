// Renders a single draggable node card on the canvas
import { useRef } from "react";

const TYPE_STYLES = {
  start:    "border-emerald-500 bg-emerald-500/10",
  question: "border-blue-500 bg-blue-500/10",
  end:      "border-rose-500 bg-rose-500/10",
};

const TYPE_BADGE = {
  start:    "bg-emerald-500/20 text-emerald-400",
  question: "bg-blue-500/20 text-blue-400",
  end:      "bg-rose-500/20 text-rose-400",
};

export default function FlowNode({ node, isSelected, onSelect, onDrag }) {
  const dragStart = useRef(null);

  function handleMouseDown(e) {
    e.stopPropagation();
    dragStart.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      nodeX: node.position.x,
      nodeY: node.position.y,
    };

    function onMove(e) {
      const dx = e.clientX - dragStart.current.mouseX;
      const dy = e.clientY - dragStart.current.mouseY;
      onDrag(node.id, {
        x: dragStart.current.nodeX + dx,
        y: dragStart.current.nodeY + dy,
      });
    }

    function onUp() {
      dragStart.current = null;
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }

  return (
    <div
      onMouseDown={handleMouseDown}
      onClick={() => onSelect(node.id)}
      style={{ left: node.position.x, top: node.position.y }}
      className={`absolute w-52 rounded-xl border-2 p-3 cursor-grab active:cursor-grabbing select-none transition-shadow
        ${TYPE_STYLES[node.type]}
        ${isSelected ? "ring-2 ring-white/40 shadow-lg shadow-white/10" : ""}
      `}
    >
      <span className={`text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full ${TYPE_BADGE[node.type]}`}>
        {node.type}
      </span>
      <p className="mt-2 text-sm text-slate-200 leading-snug">{node.text}</p>
      {node.options.length > 0 && (
        <ul className="mt-2 space-y-1">
          {node.options.map((opt, i) => (
            <li key={i} className="text-xs text-slate-400 truncate">→ {opt.label}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
