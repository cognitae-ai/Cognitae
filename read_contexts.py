import json

with open("conversation_contexts.json", "r", encoding="utf-8") as f:
    data = json.load(f)

# Group them into three batches
keys = list(data.keys())
batches = [keys[i:i + 9] for i in range(0, len(keys), 9)]

for idx, batch in enumerate(batches):
    print(f"--- BATCH {idx+1} ---")
    for key in batch:
        print(f"\nFILE: {key}")
        print("CONTEXT:")
        print(data[key][:1000]) # just need the first 1000 characters to figure out what's going on
    print("\n" + "="*50 + "\n")
