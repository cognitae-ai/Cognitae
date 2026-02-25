import os
import re

base_dir = r"f:\Cognitae GitHub\Cognitae"

classes_info = {
    "Cognitae_Phronesis": ("Agents for strategy, ethics, wellness, and navigation.", "Phronesis (Practical Wisdom)", "Agents focused on strategy, navigation, wellness, and relationships—the \"why\" and \"when\" of action."),
    "Cognitae_Episteme": ("Agents for knowledge, memory, patterns, and logic.", "Episteme (Abstract Knowledge)", "Agents focused on knowledge, memory, patterns, and logical coherence—the \"what\" of understanding."),
    "Cognitae_Techne": ("Agents for creation, implementation, and communication.", "Techne (Skilled Craft)", "Agents focused on creation, implementation, and communication—the \"how\" of making."),
    "Cognitae_Audit": ("Agents for verification, quality, and safety.", "Audit (Verification)", "Agents focused on ensuring logical coherence, quality, and safety across the ecosystem."),
    "Cognitae_Intergrator": ("The kernel agent for orchestrating the framework.", "Integrator (Orchestration)", "The kernel of the framework, designed to synthesize the abilities of other Cognitae."),
    "Cognitae_Gaming": ("Agents for storytelling, game mastery, and world architecture.", "Gaming (Worldbuilding)", "Agents focused on storytelling, game mastery, and world architecture.")
}

for cls in classes_info.keys():
    readme_path = os.path.join(base_dir, cls, "README.md")
    if not os.path.exists(readme_path):
        continue

    with open(readme_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Generate navigation block
    nav_lines = [
        "---",
        "### Navigate to Other Classes",
        "",
        "| Class | Description |",
        "| :--- | :--- |"
    ]
    for other_cls, (short_desc, _, _) in classes_info.items():
        if other_cls != cls:
            nav_lines.append(f"| **[{other_cls}](../{other_cls}/)** | {short_desc} |")
    
    new_nav_block = "\n".join(nav_lines) + "\n"

    # Replace existing block or append
    pattern = re.compile(r"---\s*\n### Navigate to Other Classes.*?(?=\Z)", re.MULTILINE | re.DOTALL)
    if pattern.search(content):
        new_content = pattern.sub(new_nav_block, content)
    else: # append to end
        new_content = content + "\n\n" + new_nav_block

    if new_content != content:
        with open(readme_path, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"Updated Navigation in {cls}/README.md")

print("Done updates.")
