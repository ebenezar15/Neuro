# Rewiring Atlas

An interactive, installable app version of the Rewiring Atlas: 374 visual maps of the brain, emotions, patterns and relationships, with practical tools for everyday struggles.

Open `index.html` in any modern browser. It is a single self-contained file and works offline once it has been opened from a web server.

## What's inside

| Tab | What it does |
| --- | --- |
| **Today** | A 10-second window-of-tolerance check-in that suggests matching practices, quick help for ten states, a daily micro-practice, your habit "pathways", and lookup flowcharts. |
| **Struggles** | 30 everyday moments (racing thoughts at night, the same fight with your partner, doomscrolling…), each with *Right now / Today / Rewire it* steps, a line to say to yourself, linked practices and maps. |
| **Library** | All original Atlas maps (mind maps, brain maps, metaphors, comparison sheets, scales, flowcharts, therapy approaches) plus 12 new interactive models, filterable by shelf and type. |
| **Toolkit** | 54 practices with breath pacers, timers and fixes. Fill-in tools for thought records, DEAR MAN scripts, values compass, urge surfing, 5-4-3-2-1 grounding, opposite action, HALT, Cope Ahead and IFS parts check-ins. |
| **Journal** | Saved entries, check-in history chart, pathways, saved maps, map notes, and plain-text export. |

All personal data stays in the browser on the device (`localStorage`). Nothing is uploaded.

## Install on iPad, iPhone or Mac

Serve the folder over HTTPS (for example with GitHub Pages), open it in Safari, then **Share → Add to Home Screen** (iPad/iPhone) or **File → Add to Dock** (Mac). It then opens full-screen like an app and works offline.

## Editing

Source lives in `src/`:

- `atlas-data.js`, `atlas-engine.js`, `atlas.css`: the original Atlas content, diagrams and styles
- `additions.js`: new practices, everyday struggles and interactive model content
- `widgets.js`: fill-in tools and interactive model visuals
- `app.js`, `app.css`, `shell.html`: the app shell, navigation and views

Rebuild with `node build.js`, which writes `index.html` (and `dist/rewiring-atlas.html`, a body-only version for embedding).

*Educational, not diagnostic.* In crisis in India, call Tele-MANAS (free, 24/7): 14416 or 1-800-891-4416. Elsewhere, contact your local emergency number or a trusted person.
