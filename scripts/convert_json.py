import json
import re
import os

filepath = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'itemsData.json')

with open(filepath, 'r', encoding='utf-8') as f:
    text = f.read()

text = text.strip()
if text.startswith('"items"'):
    text = '{' + text
if not text.endswith('}'):
    text = text + '}'
    
# Remove trailing commas
text = re.sub(r',\s*\}', '}', text)
text = re.sub(r',\s*\]', ']', text)
    
try:
    data = json.loads(text)
except json.JSONDecodeError as e:
    # Try to extract the array portion if JSON is badly formed
    match = re.search(r'\[\s*\{.*\}\s*\]', text, re.DOTALL)
    if match:
        try:
            data = json.loads(match.group(0))
        except json.JSONDecodeError as e2:
            print(f"Error parsing JSON array: {e2}")
            exit(1)
    else:
        print(f"Error parsing JSON: {e}")
        exit(1)

items = data.get('items', data) if isinstance(data, dict) else data

new_items = []
for item in items:
    new_item = {
        "name": item.get("name", ""),
        "description": item.get("description", ""),
        "category": item.get("category") or (item.get("category_ids")[0] if item.get("category_ids") else None),
        "price": item.get("price", 0),
        "cost": item.get("cost", 0),
        "ingredients": item.get("ingredients", []),
        "allergens": item.get("allergens", []),
        "dietaryTags": item.get("dietaryTags", []),
        "preparationTime": item.get("preparationTime", 20),
        "isAvailable": item.get("isAvailable", item.get("is_available", True)),
        "isFeatured": item.get("isFeatured", False)
    }
    new_items.append(new_item)

with open(filepath, 'w', encoding='utf-8') as f:
    json.dump(new_items, f, indent=2)

print(f"Successfully converted {len(new_items)} items!")
