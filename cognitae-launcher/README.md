# Cognitae Launcher

A local web app that loads all Cognitae agents from the repository and lets you chat with them via the Anthropic API. Installable as a PWA.

---

## What it does

- Auto-discovers all agents by reading their Master System Instruction files
- Serves a split-panel UI: agent selector sidebar + streamed chat
- Notes system with Episteme / Techne / Phronesis channels
- Conversation history persists per agent in the browser (localStorage)
- Bring Your Own Key — enter your Anthropic API key in the UI, no server config needed

---

## Requirements

- Python 3.10+
- An [Anthropic API key](https://console.anthropic.com/)

---

## Setup

```bash
cd cognitae-launcher
pip install -r requirements.txt
cp .env.example .env          # then add your key, or leave blank and use the UI
```

Edit `.env`:
```
ANTHROPIC_API_KEY=sk-ant-...
```

---

## Run

```bash
python -m uvicorn main:app --port 8000
```

Open `http://localhost:8000` in your browser.

To install as a PWA: open the URL in Chrome or Edge, then use the install prompt in the address bar.

---

## File structure

```
cognitae-launcher/
├── agent_loader.py     # walks Cognitae/ and builds the agent registry
├── main.py             # FastAPI app — /api/agents, /api/chat (SSE), /
├── requirements.txt
├── .env.example
└── static/
    ├── index.html      # single-file frontend (vanilla JS, no build step)
    ├── manifest.json   # PWA manifest
    ├── sw.js           # service worker (offline shell cache)
    └── icon.svg
```

The launcher expects the `Cognitae/` directory to be one level up (`../Cognitae/`). It works out of the box when run from inside the main repository.

---

## API key options

| Method | How |
|--------|-----|
| `.env` file | Set `ANTHROPIC_API_KEY` before starting the server |
| UI (BYOK) | Click the **key** button in the top-left of the app |

The UI key takes priority and is stored only in your browser's localStorage.

---

## Notes

- Model: `claude-opus-4-6` (configurable in `main.py`)
- Responses stream token-by-token via Server-Sent Events
- Do not commit your `.env` file — it is excluded by `.gitignore`
