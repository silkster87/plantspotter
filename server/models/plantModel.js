const mongoose = require('mongoose');

const { Schema } = mongoose;

const plantSchema = new Schema({
  userEmail: { type: String, required: true },
  title: String,
  description: String,
  date: { type: Date, default: Date.now},
  imageUrl: String,
  plantInfoUrl: String,
});

const plantModel = mongoose.model('Plant', plantSchema);

async function connect() {
  try {
    await mongoose.connect('mongodb://localhost:27017/PlantSpotter');
  } catch (err) {
    console.error(err);
  }
}

module.exports = { plantModel, connect };