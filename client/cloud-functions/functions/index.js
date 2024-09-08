/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onCall, HttpsError} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");
const axios = require("axios");
const {initializeApp} = require("firebase-admin/app");
const {getFirestore} = require("firebase-admin/firestore");
require("dotenv").config();

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

initializeApp();

exports.lookUpPlant = onCall(async (request) => {
  try {
    const base64String = request.data.data;

    if (typeof base64String !== "string") {
      throw new HttpsError("invalid-argument",
          "Data passed must be base64 string.");
    }

    if (!request.auth) {
      throw new HttpsError("failed-precondition", "Not authenticated.");
    }

    const data = {
      api_key: process.env.API_KEY,
      images: [`data:image/jpg;base64,${base64String}`]};

    const headers = {
      "Content-Type": "application/json",
      "Api-Key": process.env.API_KEY,
    };

    const result = await axios({
      method: "post",
      url: `${process.env.BASE_URL}?details=description`,
      data,
    }, {headers});

    return result.data;
  } catch (error) {
    console.error("Error lookUpPlant:", error.message);
    throw new HttpsError("internal", error.message);
  }
});

exports.savePlant = onCall(async (request) => {
  try {
    const plantItem = request.data.data;

    if (!request.auth) {
      throw new HttpsError("failed-precondition", "Not authenticated.");
    }
    await getFirestore()
        .collection("plant-records")
        .add(plantItem);

    return {data: plantItem};
  } catch (error) {
    throw new HttpsError("internal", error.message);
  }
});
