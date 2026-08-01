const fs = require('fs');
const path = require('path');

const API_URL = 'https://pos.ihub24.com/api/restaurant/categories?=null';

const COOKIE = '__Host-next-auth.csrf-token=393df1f905e0d5d5e6a623973f5a87febdac41693033a6f4429fc53607aa2ef0%7C51b775ad3827e576ebca4082306025dfb692638700a9cbe025b8bbb3b41fcd8a; __Secure-next-auth.callback-url=https%3A%2F%2Fpos.ihub24.com%2Flogin; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..DHJO9f2FE3Yhv_r8.ZpvdfHCm-feiLLPn-V5PslkWW9_TqB6ty0eK8cXj71DqsfMfC_KMqDyoQmYSzLvuDG3UDynSJbvuhk_0cd_nkNn_uZR1_g5SUHZXUD11GP04EmlXeQSo9jMpUnsPxIpHhhJ6ACzrp3XJ-PLH1PpUip_EEMeIybY5rq9LK3E_XWlSJQI-R_kjdUtftFHBgbHBvrQLJCHU4Tk17DKMolzrQFmkwAxa7ip1DmCLqmlwu2k1GAnun0hQsTwP5iuRPFq6yhLlPD5_mrW8l91CxymKrjV1ixP0qryeiQ.U-NS7nJ5YRRFK2KUFHAtLA';

async function insertCategories() {
  try {
    // 1. Read the bundle data from the JSON file
    const dataPath = path.join(__dirname, 'categoriesData.json');
    const fileContent = fs.readFileSync(dataPath, 'utf-8');
    const categories = JSON.parse(fileContent);

    console.log(`Found ${categories.length} categories to insert.`);

    // 2. Loop through each category and send a POST request
    for (const category of categories) {
      console.log(`Inserting category: ${category.name}`);
      
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Cookie': COOKIE,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(category)
      });

      // 3. Handle the response
      if (!response.ok) {
        console.error(`Failed to insert ${category.name}: ${response.status} ${response.statusText}`);
        const errorText = await response.text();
        console.error('Error details:', errorText);
      } else {
        // Try parsing JSON if available, otherwise just log success
        let responseData = null;
        try {
          responseData = await response.json();
        } catch (e) {
          // Response wasn't JSON
        }
        console.log(`Successfully inserted ${category.name}. Response:`, responseData || 'OK');
      }

      // Add a small 500ms delay between requests to prevent overwhelming the server (rate limiting)
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    console.log('Finished processing all categories.');

  } catch (error) {
    console.error('An unexpected error occurred:', error);
  }
}

// Execute the function
insertCategories();
