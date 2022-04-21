const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./router.js');
const bodyParser = require('body-parser');
require('dotenv').config();

const PORT = process.env.PORT || 3030;

app.use(cors());
app.use(bodyParser.json({limit: '100mb'}));
app.use(router);


app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
