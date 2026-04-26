// Draws SVG bezier connector lines between parent and child nodes, highlights active path
const NODE_W = 208; // matches w-52 = 13rem = 208px
const NODE_H = 110; // approximate card height

export default function Connectors({ nodes, activeId }) {
  const lines = [];

  nodes.forEach((node) => {
    node.options.forEach((opt) => {
      const target = nodes.find((n) => n.id === opt.nextId);
      if (!target) return;

      const isActive = node.id === activeId;
      const x1 = node.position.x + NODE_W / 2;
      const y1 = node.position.y + NODE_H;
      const x2 = target.position.x + NODE_W / 2;
      const y2 = target.position.y;
      const cy = (y1 + y2) / 2;
      const path = `M ${x1} ${y1} C ${x1} ${cy}, ${x2} ${cy}, ${x2} ${y2}`;
      const color = isActive ? "#a78bfa" : "#6366f1";

      // Arrow head pointing downward into target node
      const arrowSize = 6;
      const arrow = `M ${x2} ${y2} l ${-arrowSize / 2} ${-arrowSize} l ${arrowSize} 0 Z`;

      lines.push(
        <g key={`${node.id}-${opt.nextId}-${opt.label}`}>
          <path d={path} stroke="#000" strokeWidth="4" fill="none" strokeOpacity="0.3" />
          <path d={path} stroke={color} strokeWidth={isActive ? 2.5 : 1.5} fill="none" strokeOpacity="0.9" />
          <path d={arrow} fill={color} />
        </g>
      );
    });
  });

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
      {lines}
    </svg>
  );
}
