import os

source_file = r"f:\Cognitae GitHub\Cognitae\Cognitae_Gaming\Daedalus_Architect\Gemini-Dark Fantasy Archive Game Vision.md"
dest_file = r"f:\Cognitae GitHub\Cognitae\Cognitae_Gaming\Chronos_GM\module_whispering_vault_v1.0.yaml"

with open(source_file, 'r', encoding='utf-8') as f:
    content = f.read()

part1_idx = content.find("Keeper's Compilation: Part 1")
part2_idx = content.find("Keeper's Compilation: Part 2")
part3_idx = content.find("Keeper's Compilation: Part 3")

if part1_idx != -1 and part2_idx != -1 and part3_idx != -1:
    def extract_code_block(start_pos):
        block_start = content.find("```", start_pos)
        if block_start == -1: return ""
        # The block might start with ```\n or ```yaml\n
        newline_pos = content.find("\n", block_start)
        block_end = content.find("```", newline_pos)
        if block_end == -1: return ""
        return content[newline_pos+1:block_end]
        
    part1 = extract_code_block(part1_idx)
    part2 = extract_code_block(part2_idx)
    part3 = extract_code_block(part3_idx)
    
    final_yaml = part1 + part2 + part3
    
    with open(dest_file, 'w', encoding='utf-8') as f:
        f.write(final_yaml)
    print(f"Successfully extracted all 3 YAML parts to {dest_file}")
    print(f"Total lines: {len(final_yaml.splitlines())}")
else:
    print("Could not find the \"Keeper's Compilation: Part X\" headers!")
