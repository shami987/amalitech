// Edit panel that updates selected node text in real-time
export default function EditPanel({ node, onUpdate, onClose }) {
  if (!node) return (
    <div className="w-72 border-l border-slate-800 bg-[#13151f] p-5 flex items-center justify-center">
      <p className="text-slate-500 text-sm text-center">Click a node to edit it</p>
    </div>
  );

  return (
    <div className="w-72 border-l border-slate-800 bg-[#13151f] p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Edit Node</h2>
        <button onClick={onClose} className="text-slate-500 hover:text-slate-300 text-lg leading-none">✕</button>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs text-slate-500">Type</label>
        <span className="text-sm text-slate-300 capitalize">{node.type}</span>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs text-slate-500" htmlFor="node-text">Question / Message</label>
        <textarea
          id="node-text"
          rows={4}
          value={node.text}
          onChange={(e) => onUpdate(node.id, e.target.value)}
          className="bg-slate-800/60 border border-slate-700 rounded-lg p-2 text-sm text-slate-200 resize-none focus:outline-none focus:border-indigo-500"
        />
      </div>

      {node.options.length > 0 && (
        <div className="flex flex-col gap-1">
          <label className="text-xs text-slate-500">Options</label>
          {node.options.map((opt, i) => (
            <div key={i} className="text-xs text-slate-400 bg-slate-800/40 rounded px-2 py-1">
              → {opt.label} <span className="text-slate-600">#{opt.nextId}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
