const { plantIdService } = require('../ApiService');
const { plantModel } = require('../models/plantModel');
const mockData = require('./mockData');

async function getPlants(req, res) {
  const userEmail = req.body.data;
  try {
    const plantsList = await plantModel.find( { userEmail: userEmail } );
    res.status(200);
    res.send({data : plantsList});
  } catch (error) {
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
  
  await plantIdService(base64String)
    .then(response => {
      console.log('PlantAPI DATA: ', response.data);
      res.status(200);
      res.send({ data : response.data});
    })
    .catch((err) => { console.log('ERROR IN LOOKUPPLANT: ', err) });
  
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