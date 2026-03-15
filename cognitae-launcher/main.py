"""
main.py — Cognitae Launcher API

FastAPI server that:
- Discovers and loads all Cognitae agents at startup
- Exposes GET /api/agents to list them
- Exposes POST /api/chat for SSE-streamed conversations
- Serves the frontend from /static/index.html
"""

import asyncio
import json
import os
from pathlib import Path

import litellm
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.responses import HTMLResponse, StreamingResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

from agent_loader import AgentSpec, load_agents

load_dotenv()

app = FastAPI(title="Cognitae Launcher")

STATIC_DIR = Path(__file__).parent / "static"
app.mount("/static", StaticFiles(directory=str(STATIC_DIR)), name="static")

# ── Startup ──────────────────────────────────────────────────────────────────

AGENTS: dict[str, AgentSpec] = {}


@app.on_event("startup")
async def startup():
    global AGENTS
    AGENTS = load_agents()
    if not AGENTS:
        print("[warn] No agents found. Check COGNITAE_ROOT path in agent_loader.py")


# ── Models ───────────────────────────────────────────────────────────────────

class Message(BaseModel):
    role: str   # "user" | "assistant"
    content: str


class ChatRequest(BaseModel):
    agent_id: str
    messages: list[Message]
    api_key: str | None = None   # BYOK: client-supplied key takes priority
    model: str = "claude-opus-4-6"  # any LiteLLM model string


# ── Routes ───────────────────────────────────────────────────────────────────

@app.get("/")
async def index():
    html_path = STATIC_DIR / "index.html"
    return HTMLResponse(content=html_path.read_text(encoding="utf-8"))


@app.get("/api/agents")
async def get_agents():
    return [
        {
            "id": a.id,
            "name": a.name,
            "full_name": a.full_name,
            "class": a.agent_class,
            "description": a.description,
        }
        for a in sorted(AGENTS.values(), key=lambda x: (x.agent_class, x.name))
    ]


@app.post("/api/chat")
async def chat(req: ChatRequest):
    agent = AGENTS.get(req.agent_id)
    if not agent:
        raise HTTPException(status_code=404, detail=f"Agent '{req.agent_id}' not found")

    # api_key=None lets LiteLLM fall back to env vars (ANTHROPIC_API_KEY, OPENAI_API_KEY, etc.)
    api_key = req.api_key or None

    messages = [{"role": "system", "content": agent.system_prompt}]
    messages += [{"role": m.role, "content": m.content} for m in req.messages]

    async def generate():
        try:
            response = await litellm.acompletion(
                model=req.model,
                messages=messages,
                stream=True,
                api_key=api_key,
                max_tokens=4096,
            )
            async for chunk in response:
                delta = chunk.choices[0].delta.content
                if delta:
                    payload = json.dumps({"delta": delta})
                    yield f"data: {payload}\n\n"
                    await asyncio.sleep(0)
        except Exception as e:
            error_payload = json.dumps({"error": str(e)})
            yield f"data: {error_payload}\n\n"
        finally:
            yield "data: [DONE]\n\n"

    return StreamingResponse(
        generate(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "X-Accel-Buffering": "no",
        },
    )
