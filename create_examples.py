import os

repo_dir = r"f:\Cognitae GitHub\Cognitae"

# The top level class directories
class_dirs = [
    "Cognitae_Phronesis",
    "Cognitae_Techne",
    "Cognitae_Episteme",
    "Cognitae _Audit",
    "Cognitae_Audit",  # Just in case the space was fixed
    "Cognitae_Gaming",
    "Cognitae_Intergrator"
]

template = """# Example Conversation: {agent_name}

This document provides a sample interaction with {agent_name} to demonstrate its core capabilities and operational flow.

## 1. Initialization

**User:**
*(Prompt to initialize the session)*

**{agent_title}:**
*(Agent's response)*

## 2. Core Interaction

**User:**
*(User command or input)*

**{agent_title}:**
*(Agent's response)*

## 3. Results / Output

**User:**
*(Continuing the interaction)*

**{agent_title}:**
*(Final output or synthesis)*
"""

for cdir in class_dirs:
    class_path = os.path.join(repo_dir, cdir)
    if not os.path.exists(class_path):
        continue

    for item in os.listdir(class_path):
        item_path = os.path.join(class_path, item)
        if os.path.isdir(item_path):
            # Check if there is a README.md to consider it an agent directory
            readme_path = os.path.join(item_path, "README.md")
            if os.path.exists(readme_path):
                # We have an agent directory! Create the example file.
                agent_folder_name = os.path.basename(item_path)
                
                # Format a nice agent name from folder name (e.g., Auren_Strategic -> Auren Strategic)
                agent_name = agent_folder_name.replace("_", " ")
                agent_title = agent_name.split()[0] if " " in agent_name else agent_name
                
                example_path = os.path.join(item_path, "EXAMPLE_CONVERSATION.md")
                
                # Write the file if it doesn't already exist
                if not os.path.exists(example_path):
                    content = template.format(agent_name=agent_name, agent_title=agent_title)
                    with open(example_path, "w", encoding="utf-8") as f:
                        f.write(content)
                    print(f"Created: {example_path}")
                else:
                    print(f"Already exists: {example_path}")

print("Done generating example conversation templates.")
