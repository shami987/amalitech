// Draws SVG bezier connector lines between parent and child nodes
const NODE_W = 208; // matches w-52 = 13rem = 208px
const NODE_H = 110; // approximate card height

export default function Connectors({ nodes }) {
  const lines = [];

  nodes.forEach((node) => {
    node.options.forEach((opt) => {
      const target = nodes.find((n) => n.id === opt.nextId);
      if (!target) return;

      // Start from bottom-center of parent, end at top-center of child
      const x1 = node.position.x + NODE_W / 2;
      const y1 = node.position.y + NODE_H;
      const x2 = target.position.x + NODE_W / 2;
      const y2 = target.position.y;

      const cy = (y1 + y2) / 2;
      const path = `M ${x1} ${y1} C ${x1} ${cy}, ${x2} ${cy}, ${x2} ${y2}`;

      lines.push(
        <g key={`${node.id}-${opt.nextId}-${opt.label}`}>
          {/* Shadow for depth */}
          <path d={path} stroke="#000" strokeWidth="4" fill="none" strokeOpacity="0.3" />
          <path d={path} stroke="#6366f1" strokeWidth="2" fill="none" strokeOpacity="0.8" />
          {/* Arrow head */}
          <circle cx={x2} cy={y2} r="3" fill="#6366f1" />
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
