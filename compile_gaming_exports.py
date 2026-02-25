import os
import re

# Compile Daedalus Simulation
daedalus_base_dir = r"f:\Cognitae GitHub\Cognitae\Cognitae_Gaming\Daedalus_Architect"
daedalus_source_file = os.path.join(daedalus_base_dir, "Gemini-Dark Fantasy Archive Game Vision.md")
daedalus_dest_file = os.path.join(daedalus_base_dir, "Daedalus_EXAMPLE_CONVERSATION_24_02_2026.md")

if os.path.exists(daedalus_source_file):
    with open(daedalus_source_file, 'r', encoding='utf-8') as f:
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
    content = response_pattern.sub("**Daedalus_Architect:**\n", content)
    content = content.replace("## Response:", "**Daedalus_Architect:**\n")

    header = """# Example Conversation: Daedalus Architect

This document provides a complete 10-turn live simulation with Daedalus_Architect to demonstrate its game creation capabilities, adherence to its core pillars, and YAML module generation.

---

"""
    final_content = header + content + "\n"
    with open(daedalus_dest_file, 'w', encoding='utf-8') as f:
        f.write(final_content)
    print(f"Successfully compiled Daedalus_Architect to {os.path.basename(daedalus_dest_file)}")


# Compile Chronos Simulation
chronos_base_dir = r"f:\Cognitae GitHub\Cognitae\Cognitae_Gaming\Chronos_GM"
chronos_source_file = os.path.join(chronos_base_dir, "Gemini-Module Upload For Dark Fantasy Experience.md")
chronos_dest_file = os.path.join(chronos_base_dir, "Chronos_EXAMPLE_CONVERSATION_24_02_2026.md")

if os.path.exists(chronos_source_file):
    with open(chronos_source_file, 'r', encoding='utf-8') as f:
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
    content = response_pattern.sub("**Chronos_GM:**\n", content)
    content = content.replace("## Response:", "**Chronos_GM:**\n")

    header = """# Example Conversation: Chronos GM Engine

This document provides a complete 10-turn live simulation with Chronos_GM running "The Whispering Vault" module. It demonstrates the engine's ability to initialize state, track custom vitals (Lucidity and Insight), process specific entity commands (Parse, Erase), manage global module variables, and dynamically respond to conditional logic defined in the game YAML.

---

"""
    final_content = header + content + "\n"
    with open(chronos_dest_file, 'w', encoding='utf-8') as f:
        f.write(final_content)
    print(f"Successfully compiled Chronos_GM to {os.path.basename(chronos_dest_file)}")

# Compile Caspian Integrator Simulation
caspian_base_dir = r"f:\Cognitae GitHub\Cognitae\Cognitae_Intergrator\Caspian_Intergrator"
caspian_source_file = os.path.join(caspian_base_dir, "Gemini-Syntara Ring Architectural Integration.md")
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
