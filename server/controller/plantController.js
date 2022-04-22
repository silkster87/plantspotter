const { plantIdService } = require('../ApiService');
const { plantModel } = require('../models/plantModel');
const mockData = require('./mockData');

async function getPlants(req, res) {
  //Get plants that were saved in user DB for userEmail
  const userEmail = req.body.data;
  try {
    console.log(userEmail);
    const plantsList = await plantModel.find( { userEmail: userEmail } );
    res.status(200);
    res.send({data : plantsList});
  } catch (error) {
    console.error(error);
  }
}

async function savePlant(req, res) {
  //Save plant to DB
  const plantItem = req.body.data;
  const result = await plantModel.create(plantItem);
  console.log(result);
  res.status(201);
  res.send({data : result});
}

async function lookUpPlant(req, res) {
  const base64String = req.body.data;
  //console.log('String length: ', base64String.length);
  // res.send({ data : 'Received base64String from server'});
  // res.status(200);
  //let jsonResponseFromPlantAPI = mockData;
  //console.log('Mock Data', mockData);

  await plantIdService(base64String)
    .then(response => {
      console.log('PlantAPI DATA: ', response.data);
      res.status(200);
      res.send({ data : response.data});
    })
    .catch((err) => { console.log(err) });
}

async function deletePlant(req, res) {
  const plantId = req.params.id;
  const result = await plantModel.findByIdAndDelete(plantId);
  console.log('Plant removed: ', result);
  res.status(200);
  res.send({ data : result});
}

module.exports = { getPlants, lookUpPlant, savePlant, deletePlant };