const mongoose = require("mongoose");
require("dotenv").config();

const mongoUri = process.env.MONGODB;

async function initializeDatabase() {
  await mongoose
    .connect(mongoUri)
    .then(() => {
      console.log("Database is connected successfully");
    })
    .catch((error) => console.log("Error in connecting database.", error));
}

module.exports = { initializeDatabase };
