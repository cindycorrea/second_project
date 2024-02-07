const { MongoClient } = require("mongodb");
const dotenv = require("dotenv").config();

async function connectDB() {
  const URI = process.env.URI;
  const client = new MongoClient(URI);

  try {
    await client.connect();
    console.log('You\'re a wizard, Cindy!')
  } catch (error) {
    console.error("Nope, no database connection.");
  }
  return client;
}

module.exports = { connectDB };
