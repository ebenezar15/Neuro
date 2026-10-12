# Rewiring

Rewiring is an interactive, installable app: 468 visual maps of the brain, emotions, patterns and relationships, a 90-day plan that joins study to daily practice, 15 in-depth studies, and practical tools for everyday struggles.

Open `index.html` in any modern browser. It is a single self-contained file and works offline once it has been opened from a web server.

## What's inside

| Tab | What it does |
| --- | --- |
| **Today** | A 10-second window-of-tolerance check-in that suggests matching practices, quick help for ten states, a daily micro-practice, your habit "pathways", and lookup flowcharts. |
| **90 days** | *The Regulated Mind*, a 90-day plan in which every day has five steps: check in, learn (linked to the Atlas maps and a study), practise (linked to a toolkit tool), apply it as an if-then for a real moment, and reflect (Scripture, journal prompt, check in again). Every seventh day reviews your own notes from the week. Progress, notes and if-thens are saved and exported. |
| **Struggles** | 39 everyday moments (racing thoughts at night, the same fight with your partner, doomscrolling…), each with *Right now / Today / Rewire it* steps, a line to say to yourself, linked practices and maps. |
| **Library** | All original Atlas maps (mind maps, brain maps, metaphors, comparison sheets, scales, flowcharts, therapy approaches) plus 12 interactive models and new maps and comparison sheets (Helping vs. Rescuing vs. Enabling, Care vs. Control, Forgiveness vs. Trust vs. Reconciliation and more), filterable by shelf and type. 13 studies (belief formation, emotions, shame, forgiveness, revenge and justice, apology, love or control, the gospel of union, and others) open in a reader with contents, linked plan days and maps, and notes. |
| **Toolkit** | 54 practices with breath pacers, timers and fixes. Fill-in tools for thought records, DEAR MAN scripts, values compass, urge surfing, 5-4-3-2-1 grounding, opposite action, HALT, Cope Ahead, IFS parts check-ins, and two quick checks: Helping, Rescuing or Enabling? and Care or Control? |
| **Journal** | Saved entries, check-in history chart, pathways, saved maps, map notes, and plain-text export. |

All personal data stays in the browser on the device (`localStorage`). Nothing is uploaded.

Settings offers three looks (Atlas, Editorial like the study pages, and Cadenza like Practise-app and Booky) and 18 colour schemes, each with light and dark versions: the originals (Sage, Ocean, Dusk, Clay, Forest, High contrast), the study pages (Paper & Pine, Kelp & Ochre, Navy Manuscript) and the Cadenza family (Cadenza violet, Orchid, Indigo ink, Emerald, Rose, Notes orange, Graphite, Booky ocean, Sepia). One-tap buttons match the app to your other projects. Back and forward buttons in the top bar (or Alt + ← / →) move through the pages you have visited.

## Install on iPad, iPhone or Mac

Serve the folder over HTTPS (for example with GitHub Pages), open it in Safari, then **Share → Add to Home Screen** (iPad/iPhone) or **File → Add to Dock** (Mac). It then opens full-screen like an app and works offline.

## Editing

Source lives in `src/`:

- `atlas-data.js`, `atlas-engine.js`, `atlas.css`: the original Atlas content, diagrams and styles
- `additions.js`: new practices, everyday struggles and interactive model content
- `additions2.js`: maps, comparison sheets, struggles and quick checks drawn from the studies
- `plan-data.js`, `studies.js`: the 90-day plan and the studies, generated from the source pages
- `gut.js`, `gut-ui.js`: the Brain & Gut shelf (interactive axis model, maps, comparison sheets, practices, struggles, study) and its diary and plant-tally tools
- `plan-links.js`: links each plan day to its maps, practices and study
- `widgets.js`: fill-in tools and interactive model visuals
- `plan.js`: the 90-day plan views and the study reader
- `app.js`, `app.css`, `shell.html`: the app shell, navigation and views

Rebuild with `node build.js`, which writes `index.html` (and `dist/rewiring-atlas.html`, a body-only version for embedding).

*Educational, not diagnostic.* In crisis in India, call Tele-MANAS (free, 24/7): 14416 or 1-800-891-4416. Elsewhere, contact your local emergency number or a trusted person.

## Newer sections

- **Brain Tour**: an animated brain; tap the amygdala, prefrontal cortex, hippocampus and ten other regions, or play six scenarios (a scary moment, calming with breath, building a habit, making a memory, naming a feeling, pain).
- **Mind & Body Conditions**: headaches, tension pain, chronic pain, heart, breathing, skin, immunity and fatigue, each with the stress pathway, red flags, steps, why they work and scripture; plus an interactive body map.
- **Gospel Parenting**: seven age stages, sixteen everyday problems, practices, comparison sheets, a behaviour decoder and a full study.
- Every practice and struggle shows a **mental model**, **why it works**, **how God designed it**, a verse to meditate on and an action for today.
- Every page ends with **In simple words**, a summary a child can follow.
- Pages remember where you were when you come back.

## Tamil edition

`ta/index.html` is the full Tamil app (Rewiring தமிழ்). Rebuild with `node build-ta.js`. UI code translations live in `src-ta/`; content translations are in `i18n/ta/out/` (generated into `src-ta/ta-data.js` by `i18n/ta/gen-data.js`) and are applied to the English data at load time by `src-ta/ta-apply.js`.
