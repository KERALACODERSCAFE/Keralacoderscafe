import json
import time
import requests
import os

API_URL = 'https://pos.ihub24.com/api/restaurant/categories'
COOKIE = '__Host-next-auth.csrf-token=393df1f905e0d5d5e6a623973f5a87febdac41693033a6f4429fc53607aa2ef0%7C51b775ad3827e576ebca4082306025dfb692638700a9cbe025b8bbb3b41fcd8a; __Secure-next-auth.callback-url=https%3A%2F%2Fpos.ihub24.com%2Flogin; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..DHJO9f2FE3Yhv_r8.ZpvdfHCm-feiLLPn-V5PslkWW9_TqB6ty0eK8cXj71DqsfMfC_KMqDyoQmYSzLvuDG3UDynSJbvuhk_0cd_nkNn_uZR1_g5SUHZXUD11GP04EmlXeQSo9jMpUnsPxIpHhhJ6ACzrp3XJ-PLH1PpUip_EEMeIybY5rq9LK3E_XWlSJQI-R_kjdUtftFHBgbHBvrQLJCHU4Tk17DKMolzrQFmkwAxa7ip1DmCLqmlwu2k1GAnun0hQsTwP5iuRPFq6yhLlPD5_mrW8l91CxymKrjV1ixP0qryeiQ.U-NS7nJ5YRRFK2KUFHAtLA'

def insert_categories():
    # Construct the path to the JSON file based on the script's location
    script_dir = os.path.dirname(os.path.abspath(__file__))
    data_path = os.path.join(script_dir, 'categoriesData.json')
    
    try:
        with open(data_path, 'r', encoding='utf-8') as f:
            categories = json.load(f)
            
        print(f"Found {len(categories)} categories to insert.")
        
        headers = {
            'Cookie': COOKIE,
            'Content-Type': 'application/json'
        }
        
        for category in categories:
            print(f"Inserting category: {category.get('name', 'Unknown')}")
            
            response = requests.post(API_URL, headers=headers, json=category)
            
            if response.status_code in [200, 201]:
                try:
                    response_data = response.json()
                except ValueError:
                    response_data = "OK"
                print(f"Successfully inserted {category.get('name')}. Response: {response_data}")
            else:
                print(f"Failed to insert {category.get('name')}: {response.status_code} {response.reason}")
                print(f"Error details: {response.text}")
                
            # Add a small delay between requests to avoid rate limiting
            time.sleep(0.5)
            
        print("Finished processing all categories.")
        
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    insert_categories()
