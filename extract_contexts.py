import os
import glob
import json

base_dir = r"f:\Cognitae GitHub\Cognitae"
example_files = glob.glob(os.path.join(base_dir, "**", "*EXAMPLE_CONVERSATION*.md"), recursive=True)

summaries = {}

for filepath in example_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract the first few turns to get the context
    # Find the first "User:" or "**User:**" prompt and grab the next 1500 characters
    idx = content.find("User:")
    if idx == -1:
        idx = content.find("**User:**")
        
    if idx != -1:
        context = content[idx:idx+2500]
    else:
        context = content[:2500]
        
    # Get just the relative path for easy identification
    rel_path = os.path.relpath(filepath, base_dir)
    summaries[rel_path] = context

with open("conversation_contexts.json", "w", encoding="utf-8") as f:
    json.dump(summaries, f, indent=2)

print(f"Extracted context for {len(summaries)} files.")
