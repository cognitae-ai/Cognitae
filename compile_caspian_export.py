import os
import re

caspian_base_dir = r"f:\Cognitae GitHub\Cognitae\Cognitae_Intergrator\Caspian_Intergrator"
caspian_source_file = os.path.join(caspian_base_dir, "Gemini-Syntara Ring Architectural Integration (3).md")
caspian_dest_file = os.path.join(caspian_base_dir, "Caspian_EXAMPLE_CONVERSATION_25_02_2026.md")

if os.path.exists(caspian_source_file):
    with open(caspian_source_file, 'r', encoding='utf-8') as f:
        content = f.read()

    start_idx = content.find("## Prompt:")
    if start_idx != -1:
        content = content[start_idx:]

    footer_idx = content.find("Powered by [Gemini Exporter]")
    if footer_idx != -1:
        dash_idx = content.rfind("---", 0, footer_idx)
        if dash_idx != -1:
            content = content[:dash_idx].strip()

    content = content.replace("## Prompt:", "**User:**\n")

    response_pattern = re.compile(r"## Response:\n.*?said\n-+\n", re.MULTILINE | re.IGNORECASE)
    content = response_pattern.sub("**Caspian_Integrated:**\n", content)
    content = content.replace("## Response:", "**Caspian_Integrated:**\n")

    header = """# Example Conversation: Caspian Integrator (Syntara Ring)

This document provides a complete 10-turn live simulation with the Caspian Integrator orchestrating the "Syntara Ring"—a foundational integration of Auren, Syn, Aelis, Virel, Elari, and Luma. It demonstrates the engine's ability to dynamically ingest capabilities via `/ingest_cognitae`, synthesize a multi-agent workflow for a high-stakes "Whistleblower Paradigm" scenario via `/guide_workflow`, adapt to a sudden crisis using Luma's protocols, and finally perform a `/reflect_mastery` analysis of the user's execution.

---

"""
    final_content = header + content + "\n"
    with open(caspian_dest_file, 'w', encoding='utf-8') as f:
        f.write(final_content)
    print(f"Successfully compiled Caspian Integrator to {os.path.basename(caspian_dest_file)}")
else:
    print(f"File not found: {caspian_source_file}")
