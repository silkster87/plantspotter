const { plantIdService } = require('../ApiService');
const { plantModel } = require('../models/plantModel');
const mockData = require('./mockData');

function sortPlantsByDate(arr) {
  return arr.sort((a, b) => (Date.parse(b.date) - Date.parse(a.date)));
}

async function getPlants(req, res) {
  const userEmail = req.body.data;
  try {
    const plantsList = await plantModel.find( { userEmail: userEmail } );
    const sortedPlantsList = sortPlantsByDate(plantsList);
    
    res.status(200);
    res.send({data : sortedPlantsList});
  } catch (error) {
    res.status(500).send('Unable to get plants - try again.');
    console.error('ERROR IN GETPLANTS: ', error);
  }
}

async function savePlant(req, res) {
  const plantItem = req.body.data;
  const result = await plantModel.create(plantItem);
  console.log(result);
  res.status(201);
  res.send({data : result});
}

async function lookUpPlant(req, res) {
  const base64String = req.body.data;
  try {
    plantIdService(base64String)
    .then(response => {
      console.log('PlantAPI DATA: ', response.data);
      res.status(200);
      res.send({ data : response.data});
    });
  } catch (err) {
    res.status(500).send('Unable to use plant ID service. Please try again');
    console.log('ERROR IN LOOKUPPLANT: ', err) 
  }
}

async function deletePlant(req, res) {
  const plantId = req.params.id;
  const result = await plantModel.findByIdAndDelete(plantId);
  console.log('Plant removed: ', result);
  res.status(200);
  res.send({ data : result});
}

async function deleteUser(req, res) {
  const userEmail = req.body.data;
  const result = await plantModel.deleteMany({ userEmail: userEmail });
  //result = { deletedCount : 1 } etc...
  console.log('Removed records: ', result);
  res.status(200);
  res.send({ data : result });
}

module.exports = { getPlants, lookUpPlant, savePlant, deletePlant, deleteUser };