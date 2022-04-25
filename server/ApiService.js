const axios = require('axios');

async function plantIdService(base64String) {

  const API_KEY = process.env.API_KEY;
  const BASE_URL = process.env.BASE_URL;
  
  const data = {
    api_key: API_KEY,
    images: [base64String],
    modifiers: ["crops_fast", "similar_images", "health_all"],
    plant_language: "en",
    plant_details: ["common_names",
                      "url",
                      "name_authority",
                      "wiki_description",
                      "taxonomy",
                      "synonyms"]
  };
  
  return await axios.post(BASE_URL, data);
}

module.exports = { plantIdService };

