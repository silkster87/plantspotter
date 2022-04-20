const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./router.js');
require('dotenv').config();

const PORT = process.env.PORT || 3030;

app.use(cors());
app.use(router);
app.use(express.json());

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
