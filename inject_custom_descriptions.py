import os
import json
import re

base_dir = r"f:\Cognitae GitHub\Cognitae"

with open("custom_descriptions.json", "r", encoding="utf-8") as f:
    descriptions = json.load(f)

# 1. Update Agent READMEs
for relpath, desc in descriptions.items():
    filepath = os.path.join(base_dir, relpath)
    directory = os.path.dirname(filepath)
    filename = os.path.basename(filepath)
    readme_path = os.path.join(directory, "README.md")
    
    # We only inject if it's an Agent README. The Syntara, Rings, and Game Module Examples 
    # don't have their own individual READMEs at the same level.
    if os.path.exists(readme_path):
        with open(readme_path, "r", encoding="utf-8") as f:
            content = f.read()
            
        header_match = re.search(r"^# Cognitae:\s*(.+?)(?:,|\n)", content, re.MULTILINE)
        if header_match:
            agent_name = header_match.group(1).strip()
        else:
            agent_name = os.path.basename(directory).replace("_", " ")

        # Look for the ## Example Conversation block and replace everything until --- or EOF
        new_injection = f"## Example Conversation\n\n[**Read the 10-turn Live Simulation with {agent_name} ↗**]({filename})\n\n*{desc}*\n\n"
        
        # Regex to find the block
        pattern = re.compile(r"## Example Conversation.*?(?=\n---\s*\n|\Z)", re.MULTILINE | re.DOTALL)
        if pattern.search(content):
            new_content = pattern.sub(new_injection.strip(), content)
            if new_content != content:
                with open(readme_path, "w", encoding="utf-8") as f:
                    f.write(new_content)
                print(f"Updated custom description in Agent README: {readme_path}")
        else:
            print(f"Could not find exact block to replace in {readme_path}")


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
        class_files = [k for k in descriptions.keys() if k.replace('\\', '/').startswith(class_name.replace('\\', '/'))]
        
        links_and_descs = []
        for rel_filepath in class_files:
            abs_filepath = os.path.join(base_dir, rel_filepath)
            
            rel_path = os.path.relpath(abs_filepath, class_dir).replace('\\', '/')
            agent_folder = os.path.basename(os.path.dirname(abs_filepath))
            agent_name = agent_folder.replace("_", " ")
            desc = descriptions[rel_filepath]
            
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
                print(f"Updated custom Class README: {class_name}")

