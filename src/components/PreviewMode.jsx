// Simulates the bot conversation by traversing the flow graph
import { useState, useEffect, useRef } from "react";

export default function PreviewMode({ nodes, onExit, onActiveNode }) {
  const startNode = nodes.find((n) => n.type === "start");
  const [currentId, setCurrentId] = useState(startNode?.id ?? null);
  const [history, setHistory] = useState([]);
  const bottomRef = useRef(null);

  const current = nodes.find((n) => n.id === currentId);
  const isEnd = current?.options.length === 0;

  // Notify parent of active node so canvas can highlight it
  useEffect(() => { onActiveNode(currentId); }, [currentId]);

  // Auto-scroll chat to latest message
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [currentId]);

  function pick(nextId) {
    setHistory((h) => [...h, currentId]);
    setCurrentId(nextId);
  }

  function restart() {
    setCurrentId(startNode?.id ?? null);
    setHistory([]);
  }

  return (
    <div className="flex-1 flex flex-col items-center bg-[#0f1117] p-6 overflow-y-auto">
      <div className="w-full max-w-md flex flex-col gap-3">

        {/* Chat history */}
        {history.map((id) => {
          const n = nodes.find((n) => n.id === id);
          return (
            <div key={id} className="self-start bg-slate-800 text-slate-400 text-sm rounded-2xl rounded-tl-sm px-4 py-2 max-w-xs">
              {n?.text}
            </div>
          );
        })}

        {/* Current bot message */}
        {current && (
          <div className="self-start bg-indigo-600 text-white text-sm rounded-2xl rounded-tl-sm px-4 py-2 max-w-xs">
            {current.text}
          </div>
        )}

        {/* Options or restart */}
        <div className="flex flex-col gap-2 mt-2">
          {!isEnd && current?.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => pick(opt.nextId)}
              className="self-end bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm rounded-2xl rounded-tr-sm px-4 py-2 text-right transition-colors"
            >
              {opt.label}
            </button>
          ))}

          {isEnd && (
            <button
              onClick={restart}
              className="self-center mt-4 px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm rounded-full transition-colors"
            >
              ↺ Restart
            </button>
          )}
        </div>

        <div ref={bottomRef} />
      </div>

      <button
        onClick={onExit}
        className="mt-8 text-xs text-slate-500 hover:text-slate-300 underline"
      >
        ← Back to Editor
      </button>
    </div>
  );
}
