// Top bar with branding, undo/redo, export, and mode toggle
export default function Toolbar({ isPreview, onTogglePreview, onUndo, onRedo, onExport, canUndo, canRedo }) {
  return (
    <header className="flex items-center justify-between px-5 py-3 border-b border-slate-800 bg-[#13151f] shrink-0">
      <div className="flex items-center gap-2">
        <span className="text-indigo-400 text-lg">⬡</span>
        <span className="font-semibold text-slate-200 tracking-tight">SupportFlow</span>
        <span className="text-xs text-slate-500 ml-1">Visual Builder</span>
      </div>

      {!isPreview && (
        <div className="flex items-center gap-1">
          <button
            onClick={onUndo}
            disabled={!canUndo}
            title="Undo (Ctrl+Z)"
            className="px-3 py-1.5 rounded-lg text-sm text-slate-400 hover:text-slate-200 hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            ↶
          </button>
          <button
            onClick={onRedo}
            disabled={!canRedo}
            title="Redo (Ctrl+Y)"
            className="px-3 py-1.5 rounded-lg text-sm text-slate-400 hover:text-slate-200 hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            ↷
          </button>
          <button
            onClick={onExport}
            title="Export flow as JSON"
            className="px-3 py-1.5 rounded-lg text-sm text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          >
            ⤓ Export
          </button>
        </div>
      )}

      <button
        onClick={onTogglePreview}
        className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-colors
          ${isPreview
            ? "bg-slate-700 hover:bg-slate-600 text-slate-200"
            : "bg-indigo-600 hover:bg-indigo-500 text-white"
          }`}
      >
        {isPreview ? "✎ Editor" : "▶ Preview"}
      </button>
    </header>
  );
}
