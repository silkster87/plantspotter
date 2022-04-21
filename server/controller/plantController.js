const plantIdService = require('../ApiService');

async function getPlants(req, res) {
  //Get plants that were saved in user DB
}

async function lookUpPlant(req, res) {
  //Get plant info by using the plant Service API
  //console.log('Request: ', JSON.stringify(req.body.data).slice(1));
  const base64String = req.body.data;
  console.log('String length: ', base64String.length);
  res.send({ data : 'Received base64String from server'});
  res.status(200);
  // await plantIdService(data)
  //   .then(response => {
  //     res.status(200);
  //     res.json(response);
  //   });
  
}

module.exports = { getPlants, lookUpPlant };