import json
import time
import requests
import os

API_URL = 'https://pos.ihub24.com/api/restaurant/menu-items'
COOKIE = '__Host-next-auth.csrf-token=393df1f905e0d5d5e6a623973f5a87febdac41693033a6f4429fc53607aa2ef0%7C51b775ad3827e576ebca4082306025dfb692638700a9cbe025b8bbb3b41fcd8a; __Secure-next-auth.callback-url=https%3A%2F%2Fpos.ihub24.com%2Flogin; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..TTRtkpeyY7v9ql9s.dsM5hX-z4oW4_-0df8RZvBl92fZnik8h4tfD52k9Ud9GUN1BjZSE66cHPOT4rnt4efdHCJL5YPtk7dejR8qNWUAHeRNN7ktgDMq1w4cm0SeUzoI7tWHoUdU3I-Q0C-P3QRQYNM9CXQssNdOejlE1B-nuAzwjLiaCBSsJLlK9qriDFJe-4vup0--eHMjVNwtea3B3ww-GCIv3UnWx0lf6Npr4yPc0DhrKjcur4IxpixfoDchq8uqkUZ8evK6h87-7MisSQadrZ-FWBwSR6YMSHNymt73nAJ80FA.gkGmMNJCbIqaF09fsDKYxQ'

def insert_items():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    data_path = os.path.join(script_dir, 'itemsData.json')
    
    if not os.path.exists(data_path):
        print(f"File not found: {data_path}")
        print("Please create 'itemsData.json' in the scripts folder and paste your array of items in it.")
        return
        
    try:
        with open(data_path, 'r', encoding='utf-8') as f:
            items = json.load(f)
            
        print(f"Found {len(items)} items to insert.")
        
        headers = {
            'Cookie': COOKIE,
            'Content-Type': 'application/json'
        }
        
        for item in items:
            # Map the fields from the large list you pasted earlier to the new Postman format
            payload = {
                "name": item.get("name", ""),
                "description": item.get("description", ""),
                # If category_ids exists (from the long list), use the first one, otherwise use category
                "category": item.get("category") or (item.get("category_ids")[0] if item.get("category_ids") else ""),
                "price": item.get("price", 0),
                "cost": item.get("cost", 0),
                "ingredients": item.get("ingredients", []),
                "allergens": item.get("allergens", []),
                "dietaryTags": item.get("dietaryTags", []),
                "preparationTime": item.get("preparationTime", 20),
                # Map is_available to isAvailable
                "isAvailable": item.get("isAvailable", item.get("is_available", True)),
                "isFeatured": item.get("isFeatured", False)
            }
            
            # Keep additional fields like image and product_type if they are accepted
            if "image" in item:
                payload["image"] = item["image"]
            if "product_type" in item:
                payload["product_type"] = item["product_type"]
                
            print(f"Inserting item: {payload['name']}")
            
            response = requests.post(API_URL, headers=headers, json=payload)
            
            if response.status_code in [200, 201]:
                try:
                    response_data = response.json()
                except ValueError:
                    response_data = "OK"
                print(f"Successfully inserted {payload['name']}. Response: {response_data}")
            else:
                print(f"Failed to insert {payload['name']}: {response.status_code} {response.reason}")
                print(f"Error details: {response.text}")
                
            # Add a delay between requests to avoid overwhelming the server
            time.sleep(0.5)
            
        print("Finished processing all items.")
        
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    insert_items()
