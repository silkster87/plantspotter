const plantIdService = require('../ApiService');

async function getPlants(req, res) {
  //Get plants that were saved in user DB
}

async function lookUpPlant(req, res) {
  //Get plant info by using the plant Service API
  const data = req.body;
  await plantIdService(data)
    .then(response => {
      res.status(200);
      res.json(response);
    });
  
}

module.exports = { getPlants, lookUpPlant };