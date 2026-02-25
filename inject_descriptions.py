import os
import glob
import re

base_dir = r"f:\Cognitae GitHub\Cognitae"
example_files = glob.glob(os.path.join(base_dir, "**", "*EXAMPLE_CONVERSATION*.md"), recursive=True)

pantheon_easter_egg = " *(Note for the discerning observer: The architecture of the 'Whistleblower Paradigm'—involving Project Seraph and the coercive 'Algorithmic Séance'—bears a striking thematic resemblance to the dark convergence of technology and uploaded consciousness seen in AMC's Pantheon... right down to this Integrator's namesake.)*"

def get_description(filepath):
    # Hardcoded edge cases
    if "Echo_EXAMPLE_CONVERSATION" in filepath:
        return "This document provides a complete 10-turn live simulation with Echo Resonance. It demonstrates Echo's ability to act as the Resonance Architect, designing a multi-act, cross-platform revelation strategy for a complex narrative project without relying on cheap marketing tricks."
    if "Game Module Examples_EXAMPLE_CONVERSATION" in filepath:
        return "This document provides a complete 10-turn live simulation demonstrating Daedalus and Chronos working together to architect and execute a playable interactive fiction module."
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    match = re.search(r"^# Example Conversation:.*?\n+(.+?)\n+", content, re.MULTILINE | re.DOTALL)
    if match:
        desc = match.group(1).strip()
        desc = desc.replace('\n', ' ')
        if "Caspian_EXAMPLE_CONVERSATION" in filepath and "Caspian_Intergrator" in filepath:
            desc += pantheon_easter_egg
        return desc
    return ""

descriptions = {}
for filepath in example_files:
    desc = get_description(filepath)
    if desc:
        descriptions[filepath] = desc

# 1. Update Sub-directory READMEs
for filepath in descriptions.keys():
    directory = os.path.dirname(filepath)
    filename = os.path.basename(filepath)
    readme_path = os.path.join(directory, "README.md")
    
    if os.path.exists(readme_path):
        with open(readme_path, "r", encoding="utf-8") as f:
            content = f.read()
            
        header_match = re.search(r"^# Cognitae:\s*(.+?)(?:,|\n)", content, re.MULTILINE)
        if header_match:
            agent_name = header_match.group(1).strip()
        else:
            agent_name = os.path.basename(directory).replace("_", " ")

        desc = descriptions[filepath]
        old_injection = f"\n## Example Conversation\n[**Read the 10-turn Live Simulation with {agent_name} ↗**]({filename})\n\n"
        
        # Find exactly where to place it
        pattern = re.compile(rf"## Example Conversation\n\[\*\*Read the 10-turn Live Simulation with {re.escape(agent_name)} ↗\*\*\]\({re.escape(filename)}\)\n+", re.MULTILINE)
        if pattern.search(content):
            new_content = pattern.sub(f"## Example Conversation\n[**Read the 10-turn Live Simulation with {agent_name} ↗**]({filename})\n\n*{desc}*\n\n", content)
            if new_content != content:
                with open(readme_path, "w", encoding="utf-8") as f:
                    f.write(new_content)
                print(f"Updated description in Agent README: {readme_path}")
        else:
            # Handle Echo if the header was inserted before
            pattern_echo = re.compile(rf"## Example Conversation\n\[\*\*Read the 10-turn Live Simulation with {re.escape(agent_name)} ↗\*\*\]\({re.escape(filename)}\)(?!\n\n\*)", re.MULTILINE)
            if pattern_echo.search(content):
                new_content = pattern_echo.sub(f"## Example Conversation\n[**Read the 10-turn Live Simulation with {agent_name} ↗**]({filename})\n\n*{desc}*\n\n", content)
                if new_content != content:
                    with open(readme_path, "w", encoding="utf-8") as f:
                        f.write(new_content)
                    print(f"Updated description in Agent README: {readme_path}")


# 2. Update Class READMEs
classes = [
    "Cognitae _Audit",
    "Cognitae_Episteme",
    "Cognitae_Gaming",
    "Cognitae_Intergrator",
    "Cognitae_Phronesis",
    "Cognitae_Techne"
]

for class_name in classes:
    class_dir = os.path.join(base_dir, class_name)
    readme_path = os.path.join(class_dir, "README.md")
    if not os.path.exists(readme_path):
        continue
        
    with open(readme_path, "r", encoding="utf-8") as f:
        content = f.read()
        
    if "## Live Simulations" in content:
        class_files = [f for f in descriptions.keys() if f.startswith(class_dir)]
        
        links_and_descs = []
        for filepath in class_files:
            rel_path = os.path.relpath(filepath, class_dir).replace('\\', '/')
            agent_folder = os.path.basename(os.path.dirname(filepath))
            agent_name = agent_folder.replace("_", " ")
            desc = descriptions[filepath]
            
            links_and_descs.append(f"* [**{agent_name}** - 10-Turn Live Simulation ↗](./{rel_path})\n  *{desc}*\n")
            
        links_and_descs.sort()
        
        new_block = "## Live Simulations\n\nExplore these complete 10-turn live simulations to see how the agents in this class operate in real-world scenarios:\n\n"
        new_block += "\n".join(links_and_descs) + "\n"
        
        pattern = re.compile(r"## Live Simulations.*?(?=\n## |\n---|\Z)", re.MULTILINE | re.DOTALL)
        if pattern.search(content):
            new_content = pattern.sub(new_block.strip() + "\n\n", content)
            if new_content != content:
                with open(readme_path, "w", encoding="utf-8") as f:
                    f.write(new_content)
                print(f"Updated Class README: {class_name}")

