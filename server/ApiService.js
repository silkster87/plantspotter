require('dotenv').config();
const API_KEY = process.env.API_KEY;
const BASE_URL = process.env.BASE_URL;

async function plandIdService(data) {

  data.api_key = API_KEY;
  
  return await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(response => response.json())
    .catch((error) => {
      console.error(error);
    });
}

module.exports = plandIdService;

