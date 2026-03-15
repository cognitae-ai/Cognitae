# Cognitae Launcher

Chat with all Cognitae agents in a single web app. Bring your own API key from any major LLM provider. Installable as a PWA.

🌐 **Live app: [cognitae.onrender.com](https://cognitae.onrender.com)**

---

## Using the live app

### 1. Get an API key

You need an API key from one of the supported providers:

| Provider | Get a key | Example model string |
|----------|-----------|----------------------|
| Anthropic (Claude) | [console.anthropic.com](https://console.anthropic.com) | `claude-opus-4-6` |
| OpenAI (GPT) | [platform.openai.com](https://platform.openai.com) | `gpt-4o` |
| Groq (fast & free tier) | [console.groq.com](https://console.groq.com) | `groq/llama-3.3-70b-versatile` |
| Google Gemini | [aistudio.google.com](https://aistudio.google.com) | `gemini/gemini-1.5-pro` |
| Mistral | [console.mistral.ai](https://console.mistral.ai) | `mistral/mistral-large-latest` |

> **Groq** offers a free tier with generous rate limits — a good option to get started without a credit card.

### 2. Enter your key in the app

1. Open [cognitae.onrender.com](https://cognitae.onrender.com) in Chrome or Edge
2. Click the **key icon** (🔑) in the top-left corner
3. Enter your **model string** (e.g. `claude-opus-4-6`) and your **API key**
4. Click **Save** — your key is stored only in your browser, never sent to our servers

### 3. Start chatting

- Click any agent in the left sidebar to open their session list
- Start a **New Session** or continue a previous conversation
- Responses stream in real time, token by token

### Install as a PWA

For a native app-like experience, install it directly from the browser:

**Desktop (Chrome / Edge):** Click the install icon in the address bar → "Install Cognitae"

**iOS Safari:** Tap **Share → Add to Home Screen**

**Android Chrome:** Tap the browser menu → **Add to Home Screen**

> **Note:** The app is hosted on Render's free tier and sleeps after 15 minutes of inactivity. The first message after a period of no use may take ~30 seconds to respond while the server wakes up.

---

## Notes system

The sidebar includes a Notes area with three built-in channels — **Episteme**, **Techne**, and **Phronesis** — plus the ability to create custom channels. Save any agent response to notes using the save button that appears on messages.

---

## Running locally

If you want to run the launcher against your own copy of the Cognitae repository:

```bash
cd cognitae-launcher
pip install -r requirements.txt
cp .env.example .env   # optional: add server-side fallback API keys
python -m uvicorn main:app --port 8000
```

Open `http://localhost:8000`. The launcher auto-discovers all agents from the repository.

> **Windows:** Omit `--reload` — it causes errors with the file watcher.

---

## File structure

```
cognitae-launcher/
├── agent_loader.py     # agent discovery — walks repo for Master System Instruction files
├── main.py             # FastAPI app — /api/agents, /api/chat (SSE streaming)
├── requirements.txt
├── .env.example
└── static/
    ├── index.html      # single-file frontend (vanilla JS, no build step)
    ├── manifest.json   # PWA manifest
    ├── sw.js           # service worker (offline shell cache)
    └── icon.svg
```

---

## Self-hosting on Render

1. Fork or clone this repository to your own GitHub account
2. Go to [render.com](https://render.com) → **New → Web Service** → connect your repo
3. Set the **Runtime** to `Python 3`, **Root Directory** to `cognitae-launcher`, **Build Command** to `pip install -r requirements.txt`, **Start Command** to `uvicorn main:app --host 0.0.0.0 --port $PORT`
4. Optionally add server-side API key env vars in the Render dashboard (`ANTHROPIC_API_KEY`, `OPENAI_API_KEY`, etc.) as a shared fallback — or leave blank and let users BYOK
5. Deploy — your instance will be live at `https://your-app.onrender.com`

---

## Technical notes

- Keys entered in the UI are stored in **browser localStorage only** — never transmitted to the server beyond the single API call
- Session history and notes are stored in browser localStorage — clearing site data will erase them
- Responses stream via **Server-Sent Events** (SSE)
- No build step — the entire frontend is a single `index.html`

