const express = require('express');
const router = express.Router();
const { getPlants, lookUpPlant, savePlant } = require('./controller/plantController');

router.get('/', (req, res) => {
  res.send('Hello, world!');
});

router.post('/plants', getPlants);
router.post('/plantLookUp', lookUpPlant);
router.post('/save', savePlant);

router.get('/*', (req, res) => {
  res.status(400).send('Error: not found');
});

module.exports = router;