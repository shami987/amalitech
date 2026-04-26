# SupportFlow Visual Builder

A visual decision tree editor for building and testing customer support conversation flows. Built for SupportFlow AI — replacing messy spreadsheet configs with an interactive flowchart editor.

**[Live Demo →](https://your-vercel-url.vercel.app)** &nbsp;|&nbsp; **[Design File →](https://your-figma-link)**

---

## Overview

SupportFlow Visual Builder lets support teams design, edit, and test automated bot conversation flows through a drag-and-drop canvas — no spreadsheets, no code.

![Editor View](./public/preview-editor.png)

---

## Features

### Visual Graph Editor
- Nodes are rendered on an infinite-feel dot-grid canvas at their exact `x/y` coordinates from the flow data
- SVG bezier curves connect parent nodes to child nodes based on flow logic
- Proper directional arrow heads on every connector
- Color-coded node types: **green** = start, **blue** = question, **red** = end

### Real-time Editing
- Click any node to open the edit panel
- Edit question text and see changes reflect on the canvas instantly
- All changes are managed in-memory (no backend required)

### Drag & Drop Repositioning
- Drag any node to reposition it freely on the canvas
- SVG connector lines update live as nodes move
- Drag moves are undoable

### Undo / Redo
- Full history stack for both text edits and drag repositions
- Toolbar buttons with disabled state when history is empty
- Keyboard shortcuts: `Ctrl+Z` to undo, `Ctrl+Y` to redo

### Preview Mode (Bot Simulator)
- Hit **▶ Preview** to switch from editor to a chat interface
- The app starts at the `start` node and traverses the graph as the user picks options
- Previous messages appear as a chat history
- A **Restart** button appears when a leaf node (end of conversation) is reached
- The active node is highlighted on the canvas in real-time as you traverse the flow

### Export Flow
- **⇓ Export** downloads the current edited flow as `flow_data.json`
- Lets managers save their changes and hand off to engineering

---

## Wildcard Feature: Undo / Redo History

**Why this feature?**

In a visual editor, mistakes are inevitable — a manager drags a node to the wrong place or accidentally clears a question. Without undo, they have to remember what the text was or refresh and lose all their work. Undo/redo is the single feature that makes an editor feel *professional* and *safe to use*.

**How it works:**

A snapshot-based history stack is maintained in `useFlowStore`. Before every mutation (text edit or drag end), the current nodes array is pushed onto an undo stack. Undo pops from that stack and pushes to a redo stack. This is intentionally lightweight — no external library, just `useRef` arrays holding immutable snapshots.

**Business value:**

It removes the fear of experimentation. Support managers can freely try different conversation paths, knowing they can always step back. This directly increases adoption of the tool.

---

## Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | React + Vite | Component model maps naturally to nodes/canvas; fast dev server |
| Styling | Tailwind CSS | Custom design system without component libraries |
| Graph rendering | Custom SVG | Built from scratch — no react-flow, jsPlumb, or mermaid.js |
| State | useState + useRef | Sufficient for this scope; no Redux needed |
| Deployment | Vercel | Zero-config, instant deploys from Git |

---

## Project Structure

```
src/
├── data/
│   └── flowData.js          # Flow graph source of truth
├── hooks/
│   └── useFlowStore.js      # All state: nodes, selection, undo/redo, export
├── components/
│   ├── Toolbar.jsx           # Header with undo/redo/export/mode toggle
│   ├── Canvas.jsx            # Scrollable dot-grid canvas
│   ├── FlowNode.jsx          # Draggable node card, color-coded by type
│   ├── Connectors.jsx        # SVG bezier lines with arrow heads
│   ├── EditPanel.jsx         # Right panel for editing node text
│   └── PreviewMode.jsx       # Chat UI that traverses the flow graph
└── App.jsx                   # Root layout and keyboard shortcuts
```

---

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

---

## Design System

| Token | Value | Usage |
|---|---|---|
| Canvas background | `#0f1117` | Main canvas |
| Panel background | `#13151f` | Toolbar and edit panel |
| Start node | `emerald-500` | Entry point of the flow |
| Question node | `blue-500` | Decision points |
| End node | `rose-500` | Terminal messages |
| Connector lines | `indigo-500` | Default path |
| Active connector | `violet-400` | Currently traversed path in preview |

---

## Constraints Met

- ✅ No flowchart/graph libraries (react-flow, jsPlumb, mermaid.js) — SVG drawn manually
- ✅ No component libraries (Bootstrap, Material UI, Chakra UI) — custom components with Tailwind
- ✅ Nodes positioned absolutely using `x/y` from JSON data
- ✅ In-memory state only — no backend or database
