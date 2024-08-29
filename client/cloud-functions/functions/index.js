/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");
const axios = require("axios");
const {initializeApp} = require("firebase-admin/app");
const {getFirestore} = require("firebase-admin/firestore");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

initializeApp();

exports.lookUpPlant = onRequest(async (request, response) => {
  try {
    const base64String = request.body.data;
    const data = {
      api_key: process.env.API_KEY,
      images: [base64String],
      modifiers: ["crops_fast", "similar_images", "health_all"],
      plant_language: "en",
      plant_details: ["common_names",
        "url",
        "name_authority",
        "wiki_description",
        "taxonomy",
        "synonyms"],
    };

    const result = await axios.post(process.env.BASE_URL, data);
    response.status(200);
    response.json({data: result.data});
  } catch (error) {
    response.send(error.message);
  }
});

exports.savePlant = onRequest(async (request, response) => {
  try {
    const plantItem = request.body.data;
    const writeResult = await getFirestore()
        .collection("plant-records")
        .add(plantItem);

    response.json({data: writeResult});
  } catch (error) {
    response.send(error.message);
  }
});
