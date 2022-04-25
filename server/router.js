const express = require('express');
const router = express.Router();
const { 
  getPlants,
  lookUpPlant, 
  savePlant, 
  deletePlant, 
  deleteUser } = require('./controller/plantController');

router.get('/', (req, res) => {
  res.send('This is back end server for plant spotter');
});

router.post('/plants', getPlants);
router.post('/plantLookUp', lookUpPlant);
router.post('/save', savePlant);
router.delete('/plantItem/:id', deletePlant);
router.delete('/deleteUser', deleteUser);

router.get('/*', (req, res) => {
  res.status(404).send('Error: not found');
});

module.exports = router;