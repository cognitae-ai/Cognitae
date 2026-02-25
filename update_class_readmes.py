import os
import glob
import re

base_dir = r"f:\Cognitae GitHub\Cognitae"
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
        print(f"No README found for {class_name}")
        continue
        
    # Get all example conversations in this class
    example_files = glob.glob(os.path.join(class_dir, "**", "*EXAMPLE_CONVERSATION*.md"), recursive=True)
    
    # Filter out game examples or syntara ring if needed, but actually we want all of them here!
    links = []
    for filepath in example_files:
        # relative path from class dir
        rel_path = os.path.relpath(filepath, class_dir).replace('\\', '/')
        
        # Agent name from folder
        agent_folder = os.path.basename(os.path.dirname(filepath))
        agent_name = agent_folder.replace("_", " ")
        
        links.append(f"* [**{agent_name}** - 10-Turn Live Simulation ↗](./{rel_path})")
        
    if not links:
        continue
        
    links.sort()
    
    with open(readme_path, "r", encoding="utf-8") as f:
        content = f.read()
        
    if "## Live Simulations" in content:
        print(f"Skipped {class_name}, already has Live Simulations")
        continue
        
    injection = "## Live Simulations\n\nExplore these complete 10-turn live simulations to see how the agents in this class operate in real-world scenarios:\n\n"
    injection += "\n".join(links) + "\n\n"
    
    # Try to inject before "## How to Use" or "---"
    if "## How to Use" in content:
        new_content = content.replace("## How to Use", injection + "## How to Use")
    elif "\n---\n### Navigate" in content:
        new_content = content.replace("\n---\n### Navigate", injection + "---\n### Navigate")
    elif "\n--- \n### Navigate" in content:
        new_content = content.replace("\n--- \n### Navigate", injection + "--- \n### Navigate")
    else:
        new_content = content + "\n" + injection
        
    with open(readme_path, "w", encoding="utf-8") as f:
        f.write(new_content)
    
    print(f"Successfully updated {class_name} README with {len(links)} simulations.")
