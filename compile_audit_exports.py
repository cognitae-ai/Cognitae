import os
import glob
import re

base_dir = r"f:\Cognitae GitHub\Cognitae\Cognitae _Audit"

for agent_dir in os.listdir(base_dir):
    full_agent_dir = os.path.join(base_dir, agent_dir)
    if not os.path.isdir(full_agent_dir):
        continue
    
    # Find the Gemini export file
    gemini_files = glob.glob(os.path.join(full_agent_dir, "Gemini-*.md"))
    if not gemini_files:
        continue
    gemini_file = gemini_files[0]
    
    # Find the destination file
    dest_files = glob.glob(os.path.join(full_agent_dir, "*_EXAMPLE_CONVERSATION_24_02_2026.md"))
    if not dest_files:
        continue
    dest_file = dest_files[0]
    
    agent_name = agent_dir.replace("_", " ")
    
    with open(gemini_file, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Extract everything after the first "## Prompt:"
    start_idx = content.find("## Prompt:")
    if start_idx != -1:
        content = content[start_idx:]
        
    # Remove the footer
    footer_idx = content.find("Powered by [Gemini Exporter]")
    if footer_idx != -1:
        # Find the preceding "---"
        dash_idx = content.rfind("---", 0, footer_idx)
        if dash_idx != -1:
            content = content[:dash_idx].strip()
            
    # Standardize the Prompt and Response headers
    content = content.replace("## Prompt:", "**User:**\n")
    
    # Replace ## Response:\nAgentName said\n---------------------
    # This might have slight variations in naming (e.g. Locus_Expositor vs Locus)
    # So we'll use a regex to match the pattern
    response_pattern = re.compile(r"## Response:\n.*said\n-+\n", re.MULTILINE)
    content = response_pattern.sub(f"**{agent_name}:**\n", content)
    
    # Also replace any stray ## Response: with the agent name, just in case
    content = content.replace("## Response:", f"**{agent_name}:**\n")
    
    header = f"""# Example Conversation: {agent_name}

This document provides a complete 10-turn live simulation with {agent_name} to demonstrate its core capabilities, boundary enforcement, and operational flow.

---

"""
    
    final_content = header + content + "\n"
    
    with open(dest_file, 'w', encoding='utf-8') as f:
        f.write(final_content)
        
    print(f"Successfully compiled {agent_name} to {os.path.basename(dest_file)}")

print("Compilation complete.")
