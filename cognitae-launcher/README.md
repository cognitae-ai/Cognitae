# Cognitae Launcher

A local web app that auto-discovers all Cognitae agents from the repository and lets you chat with them using any LLM provider. Installable as a PWA.

---

## What it does

- Auto-discovers all agents by reading their Master System Instruction files
- Serves a split-panel UI: agent selector sidebar + streamed chat
- Session history — each agent stores individual conversations; click an agent to browse past sessions or start a new one
- Notes system with Episteme / Techne / Phronesis channels
- **Bring Your Own Key** — works with Anthropic, OpenAI, Groq, Gemini, Mistral, and any other [LiteLLM-supported provider](https://docs.litellm.ai/docs/providers)
- Model selector — switch models directly in the UI (e.g. `claude-opus-4-6`, `gpt-4o`, `groq/llama-3.3-70b-versatile`)

---

## Requirements

- Python 3.10+
- An API key from any supported LLM provider (or leave blank — the server will use env vars if set)

---

## Setup

```bash
cd cognitae-launcher
pip install -r requirements.txt
cp .env.example .env          # optional: add server-side fallback keys
```

`.env.example` shows all supported providers:
```
ANTHROPIC_API_KEY=
# OPENAI_API_KEY=
# GROQ_API_KEY=
# GEMINI_API_KEY=
```

You can leave `.env` blank and supply keys via the UI instead (BYOK). Server-side keys act as a shared fallback for all users.

---

## Run

```bash
python -m uvicorn main:app --port 8000
```

Open `http://localhost:8000` in your browser.

> **Windows note:** Omit `--reload` on Windows — it causes errors with the file watcher.

---

## File structure

```
cognitae-launcher/
├── agent_loader.py     # walks ../Cognitae/ and builds the agent registry
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

## API key & model options

| Method | How |
|--------|-----|
| `.env` file | Set `ANTHROPIC_API_KEY`, `OPENAI_API_KEY`, etc. before starting the server |
| UI (BYOK) | Click the **key** icon in the top-left of the app |

The UI key takes priority over server env vars and is stored only in your browser's localStorage. Use a LiteLLM model string to select your provider:

| Provider | Example model string |
|----------|----------------------|
| Anthropic | `claude-opus-4-6` |
| OpenAI | `gpt-4o` |
| Groq | `groq/llama-3.3-70b-versatile` |
| Gemini | `gemini/gemini-1.5-pro` |
| Mistral | `mistral/mistral-large-latest` |

See the [LiteLLM provider list](https://docs.litellm.ai/docs/providers) for the full set of supported model strings.

---

## PWA

Cognitae Launcher is a Progressive Web App — it can be installed on desktop or mobile and runs offline for the UI shell.

**Install on desktop (Chrome / Edge):**
1. Open the app URL in Chrome or Edge
2. Click the install icon in the address bar (or the browser menu → "Install Cognitae Launcher")
3. The app opens in its own window, separate from the browser

**Install on mobile (iOS Safari / Android Chrome):**
- iOS Safari: tap **Share → Add to Home Screen**
- Android Chrome: tap the browser menu → **Add to Home Screen** or use the install banner

**Offline behaviour:**
The service worker (`sw.js`) caches the UI shell on first load. The app opens and displays correctly without a network connection, but chat requires a live connection to the API server.

---

## Deploy as a live PWA (Render)

1. Push the **full repository** to GitHub — both `Cognitae/` and `cognitae-launcher/` must be present, as the launcher reads `../Cognitae/` for agent files
2. Go to [render.com](https://render.com) → New → Web Service → connect your GitHub repo
3. Render detects `render.yaml` automatically and configures everything
4. In the Render dashboard, optionally set server-side API key env vars (`ANTHROPIC_API_KEY`, `OPENAI_API_KEY`, etc.) — or leave them blank so users supply their own keys via the UI
5. Once deployed, open your `https://your-app.onrender.com` URL in Chrome or Edge and install the PWA from the address bar

> **Note:** Render's free tier spins down after 15 minutes of inactivity. The first request after a sleep takes ~30 seconds to wake. For always-on availability, upgrade to a paid instance.

---

## Notes

- Responses stream token-by-token via Server-Sent Events
- Session history and notes are stored in browser localStorage — clearing site data will erase them
- Do not commit your `.env` file — it is excluded by `.gitignore`
