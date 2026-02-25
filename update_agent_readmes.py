import os
import glob
import re

base_dir = r"f:\Cognitae GitHub\Cognitae"
example_files = glob.glob(os.path.join(base_dir, "**", "*EXAMPLE_CONVERSATION*.md"), recursive=True)

success_count = 0
skip_count = 0

for filepath in example_files:
    if "Game Module Examples" in filepath:
        continue
    if "Syntara_Ring" in filepath or "Caspian_Rings" in filepath:
        continue

    directory = os.path.dirname(filepath)
    filename = os.path.basename(filepath)
    readme_path = os.path.join(directory, "README.md")
    
    if os.path.exists(readme_path):
        with open(readme_path, "r", encoding="utf-8") as f:
            content = f.read()
        
        if "## Example Conversation" in content or "## Live Simulation" in content:
            print(f"Skipped (already injected): {readme_path}")
            skip_count += 1
            continue

        header_match = re.search(r"^# Cognitae:\s*(.+?)(?:,|\n)", content, re.MULTILINE)
        if header_match:
            agent_name = header_match.group(1).strip()
        else:
            agent_name = os.path.basename(directory).replace("_", " ")

        injection = f"\n## Example Conversation\n[**Read the 10-turn Live Simulation with {agent_name} ↗**]({filename})\n\n"
        
        nav_pattern = r"\n---\s*\n### Navigation\n"
        
        if re.search(nav_pattern, content):
            new_content = re.sub(nav_pattern, f"{injection}---\n### Navigation\n", content)
        else:
            new_content = content + "\n" + injection
        
        with open(readme_path, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"Updated: {readme_path} with {agent_name}")
        success_count += 1

print(f"\nFinished processing. Success: {success_count}, Skipped: {skip_count}")
