const express = require('express');
const router = express.Router();
const { getPlants, lookUpPlant } = require('./controller/plantController');

// router.get('/', (req, res) => {
//   res.send('Hello, world!');
// });

router.get('/plants', getPlants);
router.post('/plantLookUp', lookUpPlant);

router.get('/*', (req, res) => {
  res.status(400).send('Error: not found');
});

module.exports = router;