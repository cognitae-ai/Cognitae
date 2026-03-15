"""
agent_loader.py — Cognitae agent discovery and registry.

Walks the Cognitae/ directory tree. Any folder containing a file whose
name starts with "Master System Instruction" is treated as an agent.
"""

from __future__ import annotations

import os
import re
from dataclasses import dataclass, field
from pathlib import Path
from typing import Optional

import yaml


COGNITAE_ROOT = Path(__file__).parent.parent / "Cognitae"

# Maps parent directory name → display class name
CLASS_MAP = {
    "Cognitae_Phronesis": "Phronesis",
    "Cognitae_Episteme": "Episteme",
    "Cognitae_Techne": "Techne",
    "Cognitae_Audit": "Audit",
    "Cognitae_Gaming": "Gaming",
    "Cognitae_Intergrator": "Integrator",  # preserves the existing typo
}


@dataclass
class AgentSpec:
    id: str
    name: str           # short name, e.g. "Auren"
    full_name: str      # from MSI filename, e.g. "Auren, The Strategic Sovereign"
    agent_class: str    # Phronesis / Episteme / etc.
    system_prompt: str
    description: str = ""
    directory: str = ""


def _extract_full_name(msi_filename: str) -> str:
    """Pull the agent title out of the MSI filename.

    'Master System Instruction for Auren, The Strategic Sovereign.txt'
    → 'Auren, The Strategic Sovereign'
    """
    stem = Path(msi_filename).stem
    # Strip leading variants: "Master System Instruction for " / "Master System Instruction "
    cleaned = re.sub(r"^Master System In(?:s)?tructions?(?:\s+for)?\s+", "", stem, flags=re.IGNORECASE).strip()
    return cleaned or stem


def _extract_short_name(full_name: str, dir_name: str) -> str:
    """Get the first word of full_name, falling back to first segment of dir_name."""
    if full_name:
        first_word = full_name.split(",")[0].split()[0]
        if first_word:
            return first_word
    return dir_name.split("_")[0]


def _load_description(agent_dir: Path) -> str:
    """Try to pull a brief description from the 000 index YAML."""
    for f in sorted(agent_dir.iterdir()):
        if f.name.startswith("000") and f.suffix in (".yml", ".yaml"):
            try:
                with open(f, encoding="utf-8", errors="replace") as fh:
                    data = yaml.safe_load(fh)
                if isinstance(data, dict):
                    # Try common keys
                    for key in ("purpose", "description", "overview", "agent_description"):
                        val = data.get(key)
                        if val and isinstance(val, str):
                            return val.strip()
                    # Nested: scroll_overview, core_identity, etc.
                    for val in data.values():
                        if isinstance(val, dict):
                            for sub_key in ("purpose", "description", "overview"):
                                sub_val = val.get(sub_key)
                                if sub_val and isinstance(sub_val, str):
                                    return sub_val.strip()
            except Exception:
                pass
    return ""


def discover_agents(cognitae_root: Optional[Path] = None) -> dict[str, AgentSpec]:
    """Walk COGNITAE_ROOT and return a registry of all agents."""
    root = cognitae_root or COGNITAE_ROOT

    if not root.exists():
        raise FileNotFoundError(f"Cognitae root not found: {root}")

    agents: dict[str, AgentSpec] = {}

    for dirpath, dirnames, filenames in os.walk(root):
        # Find MSI file in this directory
        msi_files = [
            f for f in filenames
            if f.lower().startswith("master system instruction")
            or f.lower().startswith("master system intruction")
        ]
        if not msi_files:
            continue

        agent_dir = Path(dirpath)
        parent_dir = agent_dir.parent.name
        dir_name = agent_dir.name

        # Skip non-agent directories (e.g. Expositor Prototype, Ring_MD)
        if parent_dir not in CLASS_MAP:
            continue

        msi_file = msi_files[0]  # Take first if multiple
        msi_path = agent_dir / msi_file

        try:
            system_prompt = msi_path.read_text(encoding="utf-8", errors="replace")
        except Exception as e:
            print(f"  [warn] Could not read {msi_path}: {e}")
            continue

        full_name = _extract_full_name(msi_file)
        name = _extract_short_name(full_name, dir_name)
        agent_class = CLASS_MAP[parent_dir]
        agent_id = dir_name.lower().replace(" ", "_").replace("-", "_")
        description = _load_description(agent_dir)

        agents[agent_id] = AgentSpec(
            id=agent_id,
            name=name,
            full_name=full_name,
            agent_class=agent_class,
            system_prompt=system_prompt,
            description=description,
            directory=str(agent_dir),
        )

    return agents


# Module-level registry, built once at import time
AGENTS: dict[str, AgentSpec] = {}


def load_agents() -> dict[str, AgentSpec]:
    global AGENTS
    AGENTS = discover_agents()
    print(f"[cognitae] Loaded {len(AGENTS)} agents:")
    for agent_id, agent in sorted(AGENTS.items(), key=lambda x: (x[1].agent_class, x[1].name)):
        print(f"  [{agent.agent_class}] {agent.name} ({agent_id})")
    return AGENTS
